import auth from '@react-native-firebase/auth';
import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import AuthModal from '../../components/AuthModal';
import FavoritesSkeleton from '../../components/FavoritesSkeleton';
import PlaylistCard from '../../components/PlaylistCard';
import TrackBar from '../../components/TrackBar';
import { IPlayList } from '../../models/IPlaylist';
import api from '../../services/api';
import { Container, EmptyListText, LoadingContainer, Title } from './styles';
import { translate } from '../../locales';

const FavoritesPage = () => {
  const isFocused = useIsFocused();
  const [favorites, setFavorites] = useState([]);
  const [shouldReloadPage, setShoudlReloadPage] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const idToken = await auth()?.currentUser?.getIdToken(true);
        if (isFocused && idToken) {
          const { data } = await api.get('/user/favorites', {
            headers: { AuthToken: idToken },
          });

          setFavorites(data);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [isFocused, shouldReloadPage]);

  const renderFavoritePlaylist = ({ item }: { item: IPlayList }) => {
    return <PlaylistCard item={item} />;
  };

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1000,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim, isFocused]);

  return (
    <>
      <Container>
        {auth().currentUser && !isLoading && favorites.length ? (
          <FlatGrid
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={<Title>{translate('favorites.title')}</Title>}
            data={favorites}
            itemDimension={160}
            style={styles.gridView}
            spacing={10}
            renderItem={renderFavoritePlaylist}
            keyExtractor={(item) => item._id}
          />
        ) : (
          <LoadingContainer>
            {isLoading ? (
              <FavoritesSkeleton />
            ) : (
              <EmptyListText>
                {translate('favorites.no_favorites')}
              </EmptyListText>
            )}
          </LoadingContainer>
        )}
      </Container>

      <AuthModal
        shouldReloadPage={(shoudlReload: boolean) =>
          setShoudlReloadPage(shoudlReload)
        }
      />
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

export default FavoritesPage;
