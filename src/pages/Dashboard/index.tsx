import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { Alert, Animated, ScrollView, StyleSheet, View } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CategoryCard from '../../components/CategoryCard';
import DashboardSkeleton from '../../components/DashboardSkeleton';
import FeaturedBook from '../../components/FeaturedBook';
import NoInternetModal from '../../components/NoInternetModal';
import Section from '../../components/Section';
import SpotifyAuthModal from '../../components/SpotifyAuthorizationModal';
import TrackBar from '../../components/TrackBar';
import { useAuth } from '../../hooks/useAuth';
import { translate } from '../../locales';
import { ICategory } from '../../models/ICategory';
import { IPlayList } from '../../models/IPlaylist';
import api from '../../services/api';
import getGreeting from '../../utils/getGreeting';
import { BookScrollView } from '../Playlist/styles';
import {
  AvatarButton,
  AvatarImage,
  BarContainer,
  Container,
  GreetContainer,
  GreetText,
  InfoContainer,
  NewPlaylistButton,
  UserNameText
} from './styles';

interface IFeaturedBook {
  title: string;
  bookCoverUrl: string;
  author: string;
  bestPlaylist: IPlayList;
}

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  const [categories, setCategories] = useState<ICategory[]>([]);
  const [featuredBooks, setFeaturedBooks] = useState<IFeaturedBook[]>([]);
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSpotifyAuthModalVisible, setIsSpotifyAuthModalVisible] = useState<
    boolean
  >(false);

  const renderCategoryItem = ({ item }: { item: ICategory }) => {
    return (
      <View>
        <CategoryCard item={item} />
      </View>
    );
  };

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);

        const { data } = await api.get('dashboard');

        const hasShownSpotifyWarning = await AsyncStorage.getItem(
          '@SPOTIFY_AUTH',
        );

        if (!hasShownSpotifyWarning) {
          setIsSpotifyAuthModalVisible(true);
        }

        setCategories(data.categories);
        setFeaturedBooks(data.featuredBooks);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleOnAddPlaylistPress = useCallback(() => {
    if (user) {
      return navigation.navigate('AddPlaylistPage');
    }

    return Alert.alert('Ops!', translate('dashboard.account_alert'), [
      {
        text: translate('dashboard.create_account'),
        onPress: () => navigation.navigate('Profile', { isNewUser: true }),
      },
      {
        text: translate('utils.no'),
      },
    ]);
  }, [navigation, user]);

  const Header = () => {
    return (
      <>
        <BarContainer>
          <InfoContainer>
            <AvatarButton onPress={() => navigation.navigate('Profile')}>
              {user ? (
                <AvatarImage
                  source={{
                    uri: user?.photoURL,
                  }}
                />
              ) : (
                <AvatarImage source={require('../../assets/anon-avatar.png')} />
              )}
            </AvatarButton>
            <GreetContainer>
              <GreetText>{getGreeting()},</GreetText>
              <UserNameText>
                {user ? `@${user?.username}` : `${translate('dashboard.user')}`}
              </UserNameText>
            </GreetContainer>
          </InfoContainer>
          <NewPlaylistButton onPress={handleOnAddPlaylistPress}>
            <Icon name="plus" color="#1b1a24" size={28} />
          </NewPlaylistButton>
        </BarContainer>

        <Section
          timing={350}
          title={translate('dashboard.highlights')}
          subtitle={translate('dashboard.highlights_subtitle')}
        />

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.spacing} />

          <BookScrollView horizontal={true}>
            {featuredBooks?.map((book: any) => (
              <FeaturedBook key={book.title} book={book} />
            ))}
          </BookScrollView>
        </ScrollView>

        <Section
          timing={600}
          title={translate('dashboard.categories')}
          subtitle={translate('dashboard.categories_subtitle')}
        />
      </>
    );
  };

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <>
      <Animated.ScrollView showsVerticalScrollIndicator={false}>
        <Container>
          <FlatGrid
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={<Header />}
            data={categories}
            itemDimension={160}
            style={styles.gridView}
            spacing={10}
            renderItem={renderCategoryItem}
            keyExtractor={(item) => item.title}
          />
        </Container>
      </Animated.ScrollView>
      <TrackBar />
      <NoInternetModal />
      <SpotifyAuthModal
        setIsSpotifyAuthModalVisible={setIsSpotifyAuthModalVisible}
        isSpotifyAuthModalVisible={isSpotifyAuthModalVisible}
      />
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

export default Dashboard;
