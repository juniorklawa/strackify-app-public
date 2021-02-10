import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, Animated, StyleSheet, View, ScrollView } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CategoryCard from '../../components/CategoryCard';
import DashboardSkeleton from '../../components/DashboardSkeleton';
import FeaturedBook from '../../components/FeaturedBook';
import NoInternetModal from '../../components/NoInternetModal';
import Section from '../../components/Section';
import TrackBar from '../../components/TrackBar';
import { useAuth } from '../../hooks/useAuth';
import { ICategory } from '../../models/ICategory';
import api from '../../services/api';
import featuredBooks from '../../utils/featuredBooks';
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
  UserNameText,
} from './styles';
import { translate } from '../../locales';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  const [categories, setCategories] = useState<ICategory[]>([]);
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const positionAnim = useRef(new Animated.Value(1000)).current;
  const categoryPositionAnim = useRef(new Animated.Value(1000)).current;
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

        setCategories(data.categories);

        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }).start();

        Animated.timing(positionAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }).start();
        Animated.timing(categoryPositionAnim, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }).start();
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [categoryPositionAnim, fadeAnim, positionAnim]);

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
                {user ? user?.username : `${translate('dashboard.user')}`}
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
            {featuredBooks.map((book: any) => (
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
