import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Animated, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FlatGrid } from 'react-native-super-grid';
import Entypo from 'react-native-vector-icons/Entypo';
import { useCollapsibleHeader } from 'react-navigation-collapsible';
import CategorySkeleton from '../../components/CategorySkeleton';
import PlaylistCard from '../../components/PlaylistCard';
import TrackBar from '../../components/TrackBar';
import { translate } from '../../locales';
import { IPlayList } from '../../models/IPlaylist';
import api from '../../services/api';
import {
  Container,
  EmptyListContainer,
  EmptyListText,
  GoBackButton,
  LoadMoreButtonText,
  LoadMoreContainer,
} from './styles';

interface IRoute {
  route: {
    params: {
      category: string;
    };
  };
}

const CategoryPage = ({ route }: IRoute) => {
  const navigation = useNavigation();
  const options = {
    navigationOptions: {
      headerTitleStyle: {
        color: '#1b1a24',
        fontFamily: 'OpenSans-Bold',
      },
      headerStyle: { backgroundColor: '#fff' },
      title: translate(`categories.${route.params.category}`),
      headerLeft: () => (
        <GoBackButton
          onPress={() => {
            navigation.goBack();
          }}>
          <Entypo name="chevron-thin-left" color="#1b1a24" size={24} />
        </GoBackButton>
      ),
    },
  };
  const {
    onScroll,
    containerPaddingTop,
    scrollIndicatorInsetTop,
  } = useCollapsibleHeader(options);

  const [currentCategory, setCategory] = useState<IPlayList[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { category } = route.params;

  const renderCategoryItem = ({ item }: { item: IPlayList }) => {
    return <PlaylistCard item={item} />;
  };

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const response = await api.get(
          `playlists/category/${category}/${currentPage}`,
        );
        setCategory(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadMore = useCallback(async () => {
    try {
      setCurrentPage((prevState) => prevState + 1);
      setIsLoadingMore(true);
      const response = await api.get(
        `playlists/category/${category}/${currentPage + 1}`,
      );
      setCategory((prevState) => [...prevState, ...response.data]);
    } catch (err) {
    } finally {
      setIsLoadingMore(false);
    }
  }, [category, currentPage]);

  if (isLoading) {
    return <CategorySkeleton />;
  }

  return (
    <>
      <Animated.ScrollView
        onScroll={onScroll}
        contentContainerStyle={{ paddingTop: containerPaddingTop, flex: 1 }}
        scrollIndicatorInsets={{ top: scrollIndicatorInsetTop }}>
        <Container>
          {currentCategory.length ? (
            <FlatGrid
              showsVerticalScrollIndicator={false}
              data={currentCategory}
              itemDimension={160}
              style={styles.gridView}
              spacing={10}
              renderItem={renderCategoryItem}
              onEndReachedThreshold={0.01}
              ListFooterComponent={
                <>
                  {currentCategory?.length >= 20 && (
                    <LoadMoreContainer>
                      {isLoadingMore ? (
                        <ActivityIndicator size="large" color="#43cfc3" />
                      ) : (
                        <TouchableOpacity onPress={loadMore}>
                          <LoadMoreButtonText>
                            {translate('utils.load_more')}
                          </LoadMoreButtonText>
                        </TouchableOpacity>
                      )}
                    </LoadMoreContainer>
                  )}
                </>
              }
            />
          ) : (
            <EmptyListContainer>
              <EmptyListText>
                {translate('category.no_category_playlists')}
              </EmptyListText>
            </EmptyListContainer>
          )}
        </Container>
      </Animated.ScrollView>
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

export default CategoryPage;
