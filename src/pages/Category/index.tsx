import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Animated, StyleSheet } from 'react-native';
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

  const { category } = route.params;

  const renderCategoryItem = ({ item }: { item: IPlayList }) => {
    return <PlaylistCard item={item} />;
  };

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const response = await api.get(`playlists/category/${category}`);
        setCategory(response.data);

        console.log('response', response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [category]);

  if (isLoading) {
    return <CategorySkeleton />;
  }

  return (
    <>
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={onScroll}
        contentContainerStyle={{ paddingTop: containerPaddingTop }}
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
