import auth from '@react-native-firebase/auth';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import Icon from 'react-native-vector-icons/Ionicons';
import PlaylistCard from '../../components/PlaylistCard';
import TrackBar from '../../components/TrackBar';
import { GOOGLE_API_URL } from '../../config/constants';
import env from '../../env_config';
import { translate } from '../../locales';
import { IBook } from '../../models/IBook';
import { IPlayList } from '../../models/IPlaylist';
import api from '../../services/api';
import { EmptyListContainer } from '../Category/styles';
import {
  Container,
  EmptyListText,
  Input,
  LoadingContainer,
  SearchContainer,
  Title,
} from './styles';

const SearchPage = () => {
  const isFocused = useIsFocused();
  const [searchText, setSearchText] = useState('');
  const [searchedList, setSearchedList] = useState<any | []>(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const idToken = await auth()?.currentUser?.getIdToken(true);
        if (isFocused && idToken) {
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [isFocused]);

  const handleSearch = useCallback(async () => {
    try {
      setIsLoading(true);
      const url = `${GOOGLE_API_URL}?q=${searchText}&key=${env.GOOGLE_BOOKS_API}&maxResults=40`;
      const { data } = await axios.get(url);

      const bookIdList = data.items?.map((book: IBook) => book.id);

      const idToken = await auth()?.currentUser?.getIdToken(true);

      const response = await api.post(
        'playlists/book',
        { idList: bookIdList },
        {
          headers: { AuthToken: idToken },
        },
      );
      setSearchedList(response.data);
    } catch (error) {
      console.warn(error);
    } finally {
      setIsLoading(false);
    }
  }, [searchText]);

  const renderCategoryItem = ({ item }: { item: IPlayList }) => {
    return <PlaylistCard item={item} />;
  };

  return (
    <>
      <Container>
        <Title>{translate('search.title')}</Title>
        <SearchContainer>
          <Icon name="search" color="#43cfc3" size={22} />
          <Input
            onSubmitEditing={() => handleSearch()}
            placeholder={translate('search.search_book_input')}
            onChangeText={(text: string) => setSearchText(text)}
            value={searchText}
          />
          <TouchableOpacity onPress={handleSearch}>
            <Icon name="ios-chevron-forward" color="#43cfc3" size={22} />
          </TouchableOpacity>
        </SearchContainer>
        {!isLoading ? (
          <>
            {searchedList?.length ? (
              <FlatGrid
                showsVerticalScrollIndicator={false}
                data={searchedList}
                itemDimension={160}
                style={styles.gridView}
                spacing={10}
                renderItem={renderCategoryItem}
              />
            ) : (
              <EmptyListContainer>
                <EmptyListText>
                  {searchedList?.length === 0
                    ? translate('search.no_playlists_found')
                    : translate('search.type_book_name')}
                </EmptyListText>
              </EmptyListContainer>
            )}
          </>
        ) : (
          <LoadingContainer>
            <ActivityIndicator size="large" color="#43cfc3" />
          </LoadingContainer>
        )}
      </Container>

      <TrackBar />
    </>
  );
};

const styles = StyleSheet.create({
  gridView: {
    marginTop: 10,
    flex: 1,
  },
  spacing: {
    marginLeft: 4,
  },
});

export default SearchPage;
