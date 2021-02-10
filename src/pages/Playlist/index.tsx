import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react';
import { Alert, Animated, StyleSheet, View, Text } from 'react-native';
import Toast from 'react-native-simple-toast';
import {
  ApiConfig,
  ApiScope,
  ContentItem,
  remote,
} from 'react-native-spotify-remote';
import SpotifyAuth from 'react-native-spotify-remote/dist/SpotifyAuth';
import SpotifyRemote from 'react-native-spotify-remote/dist/SpotifyRemote';
import Entypo from 'react-native-vector-icons/Entypo';
import IonIcon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useCollapsibleHeader } from 'react-navigation-collapsible';
import { GoBackButton } from '../../components/AuthModal/styles';
import PlaylistSkeleton from '../../components/PlaylistSkeleton';
import TrackBar from '../../components/TrackBar';
import { SPOTIFY_API } from '../../config/constants';
import env from '../../env_config';
import { IUser, useAuth } from '../../hooks/useAuth';
import { useTrackBar } from '../../hooks/useTrackBar';
import { IBook } from '../../models/IBook';
import { IPlayList } from '../../models/IPlaylist';
import api from '../../services/api';
import { parseInput } from '../../utils/parseInput';
import { ISpotifyPlayList } from '../AddPlaylist';
import {
  BookAuthor,
  BookButton,
  BookCover,
  BookScrollView,
  BooksSectionTitle,
  BookTitle,
  CirclePlayButton,
  ContentContainer,
  DeletePlaylistButton,
  FavoriteButton,
  HeaderContainer,
  MusicCover,
  MusicLength,
  MusicTitle,
  PlaylistCover,
  PlaylistDescription,
  PlaylistDuration,
  PlaylistInfoContainer,
  PlaylistLength,
  PlaylistMusic,
  PlaylistTitle,
  Separator,
  TitleSpacing,
  TopPlayButton,
  TrackListContainer,
  TracksSectionTitle,
  TrackTitleContainer,
  PlaylistFavorites,
} from './styles';
import { translate } from '../../locales';

interface IRoute {
  route: {
    params: {
      playlist: IPlayList;
    };
  };
}

const spotifyConfig: ApiConfig = {
  clientID: env.SPOTIFY_CLIENT_ID,
  redirectURL: env.SPOTIFY_REDIRECT_URL,
  tokenRefreshURL: env.SPOTIFY_TOKEN_REFRESH_URL,
  tokenSwapURL: env.SPOTIFY_TOKEN_SWAP_URL,
  scopes: [ApiScope.AppRemoteControlScope, ApiScope.UserFollowReadScope],
};

const PLaylistPage = ({ route }: IRoute) => {
  const options = {
    navigationOptions: {
      headerTitleStyle: {
        color: '#1b1a24',
        fontFamily: 'OpenSans-Bold',
      },
      headerStyle: { backgroundColor: '#fff' },
      title: 'Soundtrack',
      headerLeft: () => (
        <GoBackButton
          onPress={() => {
            navigation.goBack();
          }}>
          <Entypo name="chevron-thin-left" color="#1b1a24" size={24} />
        </GoBackButton>
      ),
      headerRight: () => (
        <>
          {playlist.creatorId === user?.uid && (
            <DeletePlaylistButton onPress={showConfirmDeleteAlert}>
              <Icon name="delete" color="#1b1a24" size={24} />
            </DeletePlaylistButton>
          )}
        </>
      ),
    },
  };
  const {
    onScroll,
    containerPaddingTop,
    scrollIndicatorInsetTop,
  } = useCollapsibleHeader(options);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [
    auxCurrentPlaylist,
    setAuxCurrentPlaylist,
  ] = useState<ISpotifyPlayList | null>(null);
  const [item, setItem] = useState<ContentItem>();
  const { user, setUser } = useAuth();

  const {
    hasPlayerAction,
    setHasPlayerAction,
    setCurrentPlayerState,
    currentPlaylist,
    setCurrentPlaylist,
    isActive,
    setIsActive,
    playButtonText,
    setPlayButtonText,
  } = useTrackBar();

  const navigation = useNavigation();

  const { playlist } = route.params;

  const handleDeletePlaylist = useCallback(async () => {
    try {
      const idToken = await auth()?.currentUser?.getIdToken(true);

      await api.delete(`/playlists/${playlist._id}`, {
        headers: { AuthToken: idToken },
      });

      navigation.navigate('Dashboard');
    } catch (error) {
      console.warn(error);
    }
  }, [navigation, playlist._id]);

  const showConfirmDeleteAlert = useCallback(() => {
    Alert.alert(
      translate('utils.warning'),
      translate('playlist.delete_playlist'),
      [
        {
          text: translate('utils.yes'),
          onPress: async () => await handleDeletePlaylist(),
        },
        {
          text: translate('utils.no'),
        },
      ],
    );
  }, [handleDeletePlaylist]);

  async function handlePlayButton() {
    setIsActive(!isActive);
    const playerState = await remote.getPlayerState();

    if (!playerState.isPaused) {
      setPlayButtonText('PLAY NOW');
      await remote.pause();
      return;
    }
    setPlayButtonText('PAUSE');
    await remote.resume();

    const playerStateUpdated = await remote.getPlayerState();
    setCurrentPlayerState(playerStateUpdated);
  }

  const playTrackInItem = useCallback(
    async (index: number) => {
      if (item === undefined) {
        Toast.show(
          'Antes de usar o app você deve ouvir pelo menos 2 segundos de música no Spotify!',
          5000,
        );
      }

      if (item !== undefined) {
        setHasPlayerAction(true);
        try {
          setCurrentPlaylist(auxCurrentPlaylist);
          const playerState = await remote.getPlayerState();

          setCurrentPlayerState(playerState);

          setIsActive(true);
          await remote.playItemWithIndex(item, index);
        } catch (err) {
          console.error("Couldn't authorize with or connect to Spotify", err);
        }
      }
    },
    [
      auxCurrentPlaylist,
      item,
      setCurrentPlayerState,
      setCurrentPlaylist,
      setHasPlayerAction,
      setIsActive,
    ],
  );

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);

        const session = await SpotifyAuth.authorize(spotifyConfig);
        await SpotifyRemote.connect(session.accessToken);

        const playListId = parseInput(playlist.playlistUrl);

        const spotifyApi = `${SPOTIFY_API}/playlists/${playListId}`;

        const { data } = await axios.get(spotifyApi, {
          headers: { Authorization: `Bearer ${session.accessToken}` },
        });

        const alreadyFavorited = user?.favoritePlaylistsIds.some(
          (id: string) => id === playlist._id,
        );

        setIsFavorite(!!alreadyFavorited);
        const playerState = await remote.getPlayerState();

        const contentItem: ContentItem = {
          title: data.name,
          id: data.id,
          children: data.tracks.items,
          playable: true,
          availableOffline: false,
          container: true,
          subtitle: data.description,
          uri: data.uri,
        };
        setItem(contentItem);
        setAuxCurrentPlaylist(data);
        setCurrentPlayerState(playerState);
      } catch (err) {
        if (err.code === 'EUNSPECIFIED') {
          console.log(err.message);

          Toast.show(translate('playlist.duration_error'), 5000);
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playlist._id, playlist.playlistUrl]);

  useEffect(() => {
    let interval: null | NodeJS.Timeout = null;
    if (isActive) {
      interval = setInterval(() => {
        fetchData();
      }, 1000);
    } else if (!isActive) {
      if (interval) {
        clearInterval(interval);
      }
    }

    async function fetchData() {
      const playerState = await remote.getPlayerState();
      setCurrentPlayerState(playerState);
      setPlayButtonText(playerState.isPaused ? 'PLAY NOW' : 'PAUSE');
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isActive, setCurrentPlayerState, setPlayButtonText]);

  async function toggleFavoritePlaylist() {
    const idToken = await auth()?.currentUser?.getIdToken(true);

    if (!idToken) {
      return Alert.alert('Ops!', translate('playlist.no_account_favorite'), [
        {
          text: translate('utils.yes'),
          onPress: () => navigation.navigate('Profile', { isNewUser: true }),
        },
        {
          text: translate('utils.no'),
        },
      ]);
    }

    try {
      if (idToken) {
        if (isFavorite) {
          setIsFavorite(false);
          const filteredPlaylistList = user?.favoritePlaylistsIds.filter(
            (id) => id !== playlist._id,
          );
          setIsFavorite(false);

          const updatedUser = {
            ...user,
            favoritePlaylistsIds: filteredPlaylistList as string[],
          } as IUser;

          setUser(updatedUser);

          await api.put(
            '/user/removeFavoritePlaylist',
            {
              playlistId: playlist._id,
            },
            { headers: { AuthToken: idToken } },
          );

          return;
        }
        setIsFavorite(true);
        await api.put(
          '/user/addFavoritePlaylist',
          {
            playlistId: playlist._id,
          },
          { headers: { AuthToken: idToken } },
        );

        const updatedUser = {
          ...user,
          favoritePlaylistsIds: [
            ...(user?.favoritePlaylistsIds as string[]),
            playlist._id,
          ],
        } as IUser;

        setUser(updatedUser);
      }

      return;
    } catch (err) {
      console.log(err);
    }
  }

  const getPlaylistTotalDuration = useCallback(() => {
    const playlistDuration = auxCurrentPlaylist?.tracks.items.reduce(
      (acc, i) => {
        return acc + i.track.duration_ms;
      },
      0,
    );

    return moment.duration(playlistDuration, 'milliseconds').humanize();
  }, [auxCurrentPlaylist]);

  const checkPlaylistsId = useCallback(() => {
    const routePlaylistId = playlist
      .playlistUrl!.split('playlist/')
      .pop()
      ?.split('?')[0]
      .trim();

    const fetchedPlaylistId = currentPlaylist?.external_urls.spotify
      .split('playlist/')
      .pop()
      ?.split('?')[0]
      .trim();

    return routePlaylistId === fetchedPlaylistId;
  }, [currentPlaylist, playlist.playlistUrl]);

  const getFavoritedTimes = useCallback(() => {
    return playlist.favNumber && playlist.favNumber > 1
      ? `Favoritado ${playlist.favNumber} vezes`
      : `Favoritado ${playlist.favNumber} vez`;
  }, [playlist.favNumber]);

  return (
    <>
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={onScroll}
        contentContainerStyle={{ paddingTop: containerPaddingTop }}
        scrollIndicatorInsets={{ top: scrollIndicatorInsetTop }}
        style={styles.scrollViewContainer}>
        <HeaderContainer>
          <View>
            <PlaylistCover source={{ uri: playlist.playlistCoverSource }} />
            <TopPlayButton
              onPress={async () => {
                setCurrentPlaylist(auxCurrentPlaylist);
                if (!hasPlayerAction) {
                  await playTrackInItem(0);
                  return;
                }

                if (checkPlaylistsId()) {
                  await handlePlayButton();
                  return;
                }

                setHasPlayerAction(true);
                await playTrackInItem(0);
              }}>
              <CirclePlayButton>
                <IonIcon
                  name={
                    playButtonText === 'PAUSE' && checkPlaylistsId()
                      ? 'pause-circle'
                      : 'play-circle'
                  }
                  color="black"
                  size={64}
                />
              </CirclePlayButton>
            </TopPlayButton>
          </View>
          <PlaylistInfoContainer>
            <TitleSpacing />

            <PlaylistTitle adjustsFontSizeToFit={true}>
              {playlist.name}
            </PlaylistTitle>

            <FavoriteButton
              hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
              onPress={() => toggleFavoritePlaylist()}>
              <Icon
                name={isFavorite ? 'heart' : 'heart-outline'}
                color="#43cfc3"
                size={24}
              />
            </FavoriteButton>
          </PlaylistInfoContainer>
          {playlist.favNumber && (
            <PlaylistFavorites>{getFavoritedTimes()}</PlaylistFavorites>
          )}

          <PlaylistLength>{`@${playlist.creator}`}</PlaylistLength>

          <PlaylistDescription>{playlist.description}</PlaylistDescription>

          <Separator />
        </HeaderContainer>

        <View>
          <BooksSectionTitle>{translate('playlist.books')}</BooksSectionTitle>
          <BookScrollView
            showsHorizontalScrollIndicator={false}
            horizontal={true}>
            {playlist.recommendedBooks.map((book: IBook, i) => (
              <BookButton
                index={i}
                key={book._id}
                onPress={() =>
                  navigation.navigate('BookDetailsPage', { book })
                }>
                <BookCover
                  source={{
                    uri: book.bookCoverUrl,
                  }}
                />
                <BookTitle numberOfLines={1}>{book.title}</BookTitle>
                <BookAuthor numberOfLines={1}>{book.author}</BookAuthor>
              </BookButton>
            ))}
          </BookScrollView>

          <TrackListContainer>
            <Separator />
            <TrackTitleContainer>
              <TracksSectionTitle>
                {translate('playlist.tracks')}
              </TracksSectionTitle>
              <PlaylistDuration>
                ({getPlaylistTotalDuration()})
              </PlaylistDuration>
            </TrackTitleContainer>
            {!isLoading ? (
              <>
                {auxCurrentPlaylist?.tracks.items.map((music, i) => (
                  <PlaylistMusic
                    onPress={async () => await playTrackInItem(i)}
                    key={i}>
                    <MusicCover
                      source={{
                        uri: music?.track.album.images[0].url,
                      }}
                    />
                    <ContentContainer>
                      <MusicTitle>{music.track.name}</MusicTitle>
                      <MusicLength>{music.track.artists[0].name}</MusicLength>
                    </ContentContainer>
                    <MusicLength>
                      {moment.utc(music.track.duration_ms).format('mm:ss')}
                    </MusicLength>
                  </PlaylistMusic>
                ))}
              </>
            ) : (
              <PlaylistSkeleton />
            )}
          </TrackListContainer>
        </View>
      </Animated.ScrollView>
      <TrackBar />
    </>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flex: 1,
  },
});

export default PLaylistPage;
