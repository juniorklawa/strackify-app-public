import auth from '@react-native-firebase/auth';
import { CommonActions, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import moment from 'moment';
import React, { useCallback, useRef, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  ActivityIndicator,
  Alert,
  Animated,
  Modal,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import { showMessage } from 'react-native-flash-message';
import RBSheet from 'react-native-raw-bottom-sheet';
import Toast from 'react-native-simple-toast';
import { ApiConfig, ApiScope } from 'react-native-spotify-remote';
import SpotifyAuth from 'react-native-spotify-remote/dist/SpotifyAuth';
import SpotifyRemote from 'react-native-spotify-remote/dist/SpotifyRemote';
import { URL } from 'react-native-url-polyfill';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useCollapsibleHeader } from 'react-navigation-collapsible';
import config from '../../../config';
import BooksListSkeleton from '../../components/BooksListSkeleton';
import env from '../../env_config';
import { useAuth } from '../../hooks/useAuth';
import { CATEGORIES } from '../../models/CategoriesEnum';
import { IBook } from '../../models/IBook';
import api from '../../services/api';
import getCategoryIcon from '../../utils/getCategoryIcon';
import { BackButton } from '../Category/styles';
import { BarContainer } from '../Dashboard/styles';
import {
  AddBookButton,
  BookAuthor,
  BookContentContainer,
  BookCover,
  BookResultButton,
  BookResultsScrollView,
  BookTitle,
  BottomSheetCircle,
  BottomSheetImage,
  BottomSheetLabel,
  CategoryBottomSheetButton,
  CategoryButton,
  CategoryGrid,
  CategoryText,
  CenterContainer,
  Container,
  ContentContainer,
  GoBackButton,
  ImageContainer,
  InputContainer,
  LoadPlaylistButton,
  LoadPlaylistText,
  MusicCover,
  MusicLength,
  MusicTitle,
  NextButton,
  NextButtonText,
  PastePlaylistContainer,
  PlaylistCover,
  PlaylistMusic,
  ScrollViewContainer,
  SearchBarContainer,
  SearchBookImage,
  SearchBookInput,
  SectionDescription,
  SectionInput,
  SectionTitle,
  SelectedBookContainer,
  SelectedCategoryCircle,
  SelectedCategoryContainer,
  SelectedCategoryImage,
  SelectedCategoryLabel,
  Title,
} from './styles';
import { translate } from '../../locales';
import AddPlaylistTutorial from '../../components/AddPlaylistTutorial';

interface IStepSpotifyURLProps {
  spotifyURL: string;
  setSpotifyURL: (url: string) => void;
}

interface IArtist {
  name: string;
}

const spotifyConfig: ApiConfig = {
  clientID: env.SPOTIFY_CLIENT_ID,
  redirectURL: env.SPOTIFY_REDIRECT_URL,
  tokenRefreshURL: env.SPOTIFY_TOKEN_REFRESH_URL,
  tokenSwapURL: env.SPOTIFY_TOKEN_SWAP_URL,
  scopes: [ApiScope.AppRemoteControlScope, ApiScope.UserFollowReadScope],
};

interface IFetchedBook {
  id: string;
  volumeInfo: {
    authors: string[];
    title: string;
    imageLinks: {
      thumbnail: string;
    };
  };
}

interface ITrack {
  track: {
    name: string;
    uri: string;
    artists: IArtist[];
    duration_ms: number;
    album: {
      images: IImage[];
      uri: string;
    };
  };
}

interface IImage {
  height: number;
  width: number;
  url: string;
}

export interface ISpotifyPlayList {
  name: string;
  description: string;
  images: IImage[];
  owner: {
    display_name: string;
  };
  primary_color: string | null;

  external_urls: {
    spotify: string;
  };

  tracks: {
    items: ITrack[];
  };
}

export interface IFormattedPlaylist {
  name: string | undefined;
  description: string | undefined;
  category: any;
  creator: string | undefined;
  creatorId: string;
  owner: string | undefined;
  playlistUrl: string | undefined;
  recommendedBooks: any;
  playlistCoverSource: string | undefined;
  favNumber: number;
}

const categoryData = [
  {
    name: 'Fantasia',
    category: CATEGORIES.FANTASY,
    color: '#FF9800',
  },
  {
    name: 'Ação/Aventura',
    category: CATEGORIES.ACTION_ADVENTURE,
    color: '#4CAF50',
  },
  {
    name: 'Ficção Científica',
    category: CATEGORIES.SCIENCE_FICTION,
    color: '#2196F3',
  },
  {
    name: 'Romance',
    category: CATEGORIES.ROMANCE,
    color: '#f44336',
  },
  {
    name: 'Historico',
    category: CATEGORIES.HISTORIC,
    color: '#795548',
  },
  {
    name: 'Espiritualidade',
    category: CATEGORIES.SPIRITUALITY,
    color: '#00BCD4',
  },
  {
    name: 'Drama',
    category: CATEGORIES.DRAMA,
    color: '#607D8B',
  },
  {
    name: 'Biografia',
    category: CATEGORIES.BIOGRAPHY,
    color: '#009688',
  },
  {
    name: 'Terror/Horror',
    category: CATEGORIES.TERROR_HORROR,
    color: '#212121',
  },
];

const StepSpotifyURL: React.FC<IStepSpotifyURLProps> = () => {
  const options = {
    navigationOptions: {
      header: () => {
        return (
          <BarContainer>
            <BackButton onPress={() => navigation.goBack()}>
              <Entypo name="chevron-thin-left" color="#1b1a24" size={24} />
            </BackButton>
          </BarContainer>
        );
      },
    },
  };
  const {
    onScroll,
    containerPaddingTop,
    scrollIndicatorInsetTop,
  } = useCollapsibleHeader(options);

  const { user } = useAuth();

  const navigation = useNavigation();
  const [
    fetchedPlaylist,
    setFetchedPlaylist,
  ] = useState<ISpotifyPlayList | null>(null);

  const [playlistTitle, setPlaylistTitle] = useState<string>('');
  const [playlistDescription, setPlaylistDescription] = useState<string>('');
  const [auxData, setAuxData] = useState<ITrack[] | undefined>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingBook, setIsLoadingBook] = useState<boolean>(false);
  const [isCreatePlaylistLoading, setIsCreatePlaylistLoading] = useState<
    boolean
  >(false);
  const [searchedBook, setSearchedBook] = useState<string>('');
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [spotifyURL, setSpotifyURL] = useState('');
  const [searchedBooksList, setSearchedBooksList] = useState([]);
  const [selectedBooksList, setSelectedBooksList] = useState<IBook[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [isPlaylistTutorialActive, setIsPlaylistTutorialActive] = useState<
    boolean
  >(false);
  const refRBSheet = useRef<RBSheet>(null);

  const { height } = useWindowDimensions();

  async function parseInput() {
    if (spotifyURL.length === 38) {
      const response = await api.get(spotifyURL);
      const html = response.data;

      if (!html.includes('playlist/')) {
        setSpotifyURL('');
        return Toast.show(translate('add_playlist.not_playlist_warning'));
      }
      const id = html
        .split('document.getElementById("l").src = validate("playlist/')
        .pop()
        .split('?')[0]
        .trim();

      setSpotifyURL(`https://open.spotify.com/playlist/${id}`);

      return id;
    }

    if (spotifyURL.length > 39) {
      if (!spotifyURL.includes('playlist/')) {
        setSpotifyURL('');
        return Toast.show(translate('add_playlist.not_playlist_warning'));
      }

      const url = new URL(spotifyURL);
      const route = url.pathname;
      return route.substring(route.lastIndexOf('/') + 1);
    }

    const url = new URL(spotifyURL);
    const route = url.pathname;
    return route.substring(route.lastIndexOf(':') + 1);
  }

  function getPlaylistTotalDuration() {
    const playlistDuration = fetchedPlaylist?.tracks.items.reduce(
      (acc, item) => {
        return acc + item.track.duration_ms;
      },
      0,
    );

    return moment.duration(playlistDuration, 'milliseconds').humanize();
  }

  async function loadPlaylist() {
    try {
      setIsLoading(true);

      const session = await SpotifyAuth.authorize(spotifyConfig);
      await SpotifyRemote.connect(session.accessToken);

      const playListId = await parseInput();

      const spotifyApi = `https://api.spotify.com/v1/playlists/${playListId}`;

      const { data } = await axios.get(spotifyApi, {
        headers: { Authorization: `Bearer ${session.accessToken}` },
      });

      setFetchedPlaylist(data);
      setAuxData(data.tracks.items.slice(0, 5));
      setPlaylistTitle(data.name);
      setPlaylistDescription(data.description);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  async function toggleSeeMore() {
    if (auxData?.length === 5) {
      setAuxData(fetchedPlaylist?.tracks.items);
      return;
    }
    setAuxData(fetchedPlaylist?.tracks.items.slice(0, 5));
  }

  const handleFlashMessage = useCallback((message: string) => {
    showMessage({
      titleStyle: {
        fontFamily: 'OpenSans-Bold',
      },
      description: message,
      message: 'Ops!',
      type: 'warning',
      backgroundColor: '#424242',
      textStyle: {
        fontFamily: 'OpenSans-Regular',
      },
    });
  }, []);

  async function handleSavePlaylist() {
    if (!playlistTitle) {
      handleFlashMessage(translate('add_playlist.title_warning'));

      return;
    }

    if (!selectedBooksList.length) {
      handleFlashMessage(translate('add_playlist.books_list_warning'));
      return;
    }

    if (!selectedCategory) {
      handleFlashMessage(translate('add_playlist.category_warning'));
      return;
    }

    const playlist: IFormattedPlaylist = {
      name: playlistTitle || fetchedPlaylist?.name,
      description: playlistDescription,
      category: selectedCategory.category,
      creator: user?.username as string,
      creatorId: auth().currentUser?.uid as string,
      owner: fetchedPlaylist?.owner.display_name,
      playlistUrl: spotifyURL,
      playlistCoverSource: fetchedPlaylist?.images[0].url,
      recommendedBooks: selectedBooksList,
      favNumber: 0,
    };
    try {
      setIsCreatePlaylistLoading(true);
      await api.post('playlists/', playlist);

      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [
            { name: 'Dashboard' },
            { name: 'PlaylistPage', params: { playlist } },
          ],
        }),
      );
    } catch (err) {
      Alert.alert(translate('utils.error'), err);
    } finally {
      setIsCreatePlaylistLoading(false);
    }
  }

  const handleOnBookPress = useCallback(
    (item: IBook) => {
      if (selectedBooksList.some((book) => book.bookId === item.bookId)) {
        Toast.show(translate('add_playlist.book_already_in_list'));
        return;
      }

      setSelectedBooksList((prevState) => [...prevState, item]);
      setModalVisible(false);
    },
    [selectedBooksList],
  );

  async function onSubmit() {
    try {
      setIsLoadingBook(true);

      const url = `https://www.googleapis.com/books/v1/volumes?q=${searchedBook}&key=${config.GOOD_READS_KEY}&maxResults=40`;
      const { data } = await axios.get(url);

      const filteredBookResult = data.items.filter(
        (book: IFetchedBook) => book.volumeInfo.authors,
      );

      const formattedBookResult = filteredBookResult.map(
        (book: IFetchedBook) => {
          return {
            bookId: book.id,
            author: book.volumeInfo.authors[0],
            bookCoverUrl:
              book.volumeInfo?.imageLinks?.thumbnail ||
              'https://i.stack.imgur.com/1hvpD.jpg',
            title: book.volumeInfo.title,
          };
        },
      );

      setSearchedBooksList(formattedBookResult);
    } catch (error) {
    } finally {
      setIsLoadingBook(false);
    }
  }

  const handleDeleteBook = useCallback((bookId) => {
    setSelectedBooksList((prevState) => {
      return prevState.filter((book: any) => book.bookId !== bookId);
    });
  }, []);

  const handleCloseBottomSheet = useCallback((category) => {
    setSelectedCategory(category);
    refRBSheet!.current?.close();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const alreadyShowTutorial = await AsyncStorage.getItem(
        '@ADD_PLAYLIST_TUTORIAL',
      );

      if (!alreadyShowTutorial) {
        console.log('mostrando');
        setIsPlaylistTutorialActive(true);
        await AsyncStorage.setItem(
          '@ADD_PLAYLIST_TUTORIAL',
          JSON.stringify(true),
        );
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={onScroll}
        contentContainerStyle={{
          paddingTop: containerPaddingTop,
        }}
        scrollIndicatorInsets={{ top: scrollIndicatorInsetTop }}
        keyboardShouldPersistTaps="always">
        <Container>
          {fetchedPlaylist ? (
            <>
              <ImageContainer>
                <PlaylistCover
                  source={{
                    uri: fetchedPlaylist?.images[0].url,
                  }}
                />
              </ImageContainer>

              <LoadPlaylistButton
                onPress={async () => {
                  setFetchedPlaylist(null);
                  setSpotifyURL('');
                }}>
                <LoadPlaylistText>
                  {translate('add_playlist.load_another_playlist')}
                </LoadPlaylistText>
              </LoadPlaylistButton>

              <SectionTitle>
                {translate('add_playlist.playlist_name')}
              </SectionTitle>

              <SectionInput
                onChangeText={(text) => setPlaylistTitle(text)}
                value={playlistTitle}
              />

              <SectionTitle>
                {translate('add_playlist.playlist_description')}
              </SectionTitle>

              <SectionInput
                multiline
                placeholder={translate(
                  'add_playlist.playlist_description_placeholder',
                )}
                placeholderTextColor="#757575"
                onChangeText={(text) => setPlaylistDescription(text)}
                value={playlistDescription}
              />

              <SectionTitle>
                {translate('add_playlist.recommended_books')}
              </SectionTitle>

              <AddBookButton
                onPress={() => {
                  setModalVisible(true);
                }}>
                <Icon name="plus" color="#43cfc3" size={38} />
                <ContentContainer>
                  <MusicTitle>{translate('add_playlist.add_books')}</MusicTitle>
                </ContentContainer>
              </AddBookButton>

              {selectedBooksList.map((item: IBook, i) => (
                <SelectedBookContainer
                  onPress={() =>
                    navigation.navigate('BookDetailsPage', { book: item })
                  }
                  key={i}>
                  <BookCover
                    source={{
                      uri: item.bookCoverUrl,
                    }}
                  />
                  <BookContentContainer>
                    <BookTitle>{item.title}</BookTitle>
                    <BookAuthor>{item.author}</BookAuthor>
                  </BookContentContainer>
                  <TouchableOpacity
                    onPress={() => handleDeleteBook(item.bookId)}>
                    <Icon name="delete" color="#fff" size={18} />
                  </TouchableOpacity>
                </SelectedBookContainer>
              ))}

              <SectionTitle>{translate('add_playlist.category')}</SectionTitle>
              <CategoryButton onPress={() => refRBSheet!.current?.open()}>
                {!selectedCategory ? (
                  <CategoryText>
                    {translate('add_playlist.choose_a_category')}
                  </CategoryText>
                ) : (
                  <SelectedCategoryContainer>
                    <SelectedCategoryCircle color={selectedCategory.color}>
                      <SelectedCategoryImage
                        resizeMode="contain"
                        source={getCategoryIcon(selectedCategory)}
                      />
                    </SelectedCategoryCircle>

                    <SelectedCategoryLabel>
                      {selectedCategory.name}
                    </SelectedCategoryLabel>
                  </SelectedCategoryContainer>
                )}

                <Entypo name="chevron-thin-down" color="#43cfc3" size={20} />
              </CategoryButton>

              <SectionTitle>
                {translate('add_playlist.playlist_owner')}
              </SectionTitle>

              <SectionDescription>
                {fetchedPlaylist?.owner.display_name}
              </SectionDescription>

              <SectionTitle>{translate('add_playlist.tracks')}</SectionTitle>

              <SectionDescription>
                {`${fetchedPlaylist.tracks.items.length} ${translate(
                  'add_playlist.tracks',
                ).toLowerCase()} (${getPlaylistTotalDuration()})`}
              </SectionDescription>

              {auxData?.map((item, i) => (
                <PlaylistMusic key={i}>
                  <MusicCover
                    source={{
                      uri: item?.track.album.images[0].url,
                    }}
                  />

                  <ContentContainer>
                    <MusicTitle>{item.track.name}</MusicTitle>
                    <MusicLength>{item.track.artists[0].name}</MusicLength>
                    <MusicLength>
                      {moment.utc(item.track.duration_ms).format('mm:ss')}
                    </MusicLength>
                  </ContentContainer>
                </PlaylistMusic>
              ))}

              {fetchedPlaylist?.tracks.items.length > 4 && (
                <LoadPlaylistButton
                  onPress={() => {
                    toggleSeeMore();
                  }}>
                  <LoadPlaylistText>
                    {auxData?.length === 5
                      ? translate('add_playlist.see_more')
                      : translate('add_playlist.see_less')}
                  </LoadPlaylistText>
                </LoadPlaylistButton>
              )}

              <NextButton onPress={async () => await handleSavePlaylist()}>
                {isCreatePlaylistLoading ? (
                  <ActivityIndicator size="large" color="white" />
                ) : (
                  <NextButtonText>
                    {translate('add_playlist.save_playlist')}
                  </NextButtonText>
                )}
              </NextButton>
            </>
          ) : (
            <PastePlaylistContainer>
              <Title>{translate('add_playlist.paste_playlist')}</Title>
              <InputContainer
                autoFocus={true}
                selectionColor={'gray'}
                onChangeText={(text) => setSpotifyURL(text)}
                value={spotifyURL}
              />
              <LoadPlaylistButton
                onPress={async () => {
                  await loadPlaylist();
                }}>
                {!isLoading ? (
                  <LoadPlaylistText>
                    {translate('add_playlist.load_playlist')}
                  </LoadPlaylistText>
                ) : (
                  <ActivityIndicator size="large" color="#43cfc3" />
                )}
              </LoadPlaylistButton>
            </PastePlaylistContainer>
          )}
        </Container>
      </Animated.ScrollView>

      <View style={styles.container}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisible}
          onRequestClose={() => {}}>
          <BookResultsScrollView showsVerticalScrollIndicator={false}>
            <ScrollViewContainer>
              <GoBackButton onPress={() => setModalVisible(false)}>
                <Entypo name="chevron-thin-left" color="#212121" size={24} />
              </GoBackButton>
              <SearchBarContainer>
                <Feather
                  style={styles.searchBarIcon}
                  name="search"
                  color="#43cfc3"
                  size={22}
                />

                <SearchBookInput
                  placeholderTextColor="#757575"
                  placeholder="Pesquise pelo título, nome ou autor do livro"
                  returnKeyType="search"
                  onSubmitEditing={() => onSubmit()}
                  selectionColor={'gray'}
                  onChangeText={(text) => setSearchedBook(text)}
                  value={searchedBook}
                />
                <TouchableOpacity
                  hitSlop={{ top: 40, left: 40, right: 40, bottom: 40 }}
                  onPress={() => onSubmit()}>
                  <Entypo
                    style={styles.searchBarIcon}
                    name="chevron-thin-right"
                    color="#43cfc3"
                    size={22}
                  />
                </TouchableOpacity>
              </SearchBarContainer>

              {!isLoadingBook ? (
                <>
                  {searchedBooksList.length > 0 ? (
                    <>
                      {searchedBooksList.map((item: IBook, i) => (
                        <BookResultButton
                          onPress={() => handleOnBookPress(item)}
                          key={i}>
                          <MusicCover
                            source={{
                              uri: item.bookCoverUrl,
                            }}
                          />
                          <ContentContainer>
                            <MusicTitle>{item.title}</MusicTitle>
                            <MusicLength>{item.author}</MusicLength>
                          </ContentContainer>
                        </BookResultButton>
                      ))}
                    </>
                  ) : (
                    <CenterContainer height={height}>
                      <SearchBookImage
                        resizeMode="contain"
                        source={require('../../assets/book_search.png')}
                      />
                    </CenterContainer>
                  )}
                </>
              ) : (
                <BooksListSkeleton />
              )}
            </ScrollViewContainer>
          </BookResultsScrollView>
        </Modal>
      </View>

      <RBSheet
        ref={refRBSheet}
        closeOnDragDown
        height={400}
        customStyles={{
          container: {
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          },
        }}>
        <ScrollView>
          <CategoryGrid>
            {categoryData.map((grid) => (
              <CategoryBottomSheetButton
                key={grid.category}
                onPress={() => handleCloseBottomSheet(grid)}>
                <BottomSheetCircle color={grid.color}>
                  <BottomSheetImage source={getCategoryIcon(grid)} />
                </BottomSheetCircle>
                <BottomSheetLabel>{grid.name}</BottomSheetLabel>
              </CategoryBottomSheetButton>
            ))}
          </CategoryGrid>
        </ScrollView>
      </RBSheet>

      <AddPlaylistTutorial
        setIsPlaylistTutorialActive={setIsPlaylistTutorialActive}
        isPlaylistTutorialActive={isPlaylistTutorialActive}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  searchBarIcon: {
    height: 22,
    width: 22,
  },
});

export default StepSpotifyURL;
