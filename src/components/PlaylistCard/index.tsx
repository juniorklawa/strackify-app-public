import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useRef } from 'react';
import { Animated, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { IUser, useAuth } from '../../hooks/useAuth';
import { IPlayList } from '../../models/IPlaylist';
import api from '../../services/api';
import {
  CardContainer,
  CardContent,
  CategoryDescription,
  CategoryImage,
  CategoryTitle,
  ContentContainer,
  FavoriteButton,
  HeartContainer,
} from './styles';
import { translate } from '../../locales';

interface PlaylistCardProps {
  item: IPlayList;
  isFeatured?: boolean;
  setSelectedPlaylist?: (playlist: IPlayList) => void;
}

const PlaylistCard = ({ item, isFeatured }: PlaylistCardProps) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const animation = new Animated.Value(0);
  const inputRange = [0, 1];
  const outputRange = [1, 0.8];
  const scale = animation.interpolate({ inputRange, outputRange });

  const navigation = useNavigation();
  const { user, setUser } = useAuth();

  const checkIfPlaylistIsFavorited = useCallback(() => {
    return user?.favoritePlaylistsIds.some((id: string) => id === item._id);
  }, [item._id, user]);

  const toggleFavoritePlaylist = useCallback(async () => {
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
        if (checkIfPlaylistIsFavorited()) {
          const filteredPlaylistList = user?.favoritePlaylistsIds.filter(
            (id) => id !== item._id,
          );

          const updatedUser = {
            ...user,
            favoritePlaylistsIds: filteredPlaylistList as string[],
          } as IUser;

          setUser(updatedUser);

          await api.put(
            '/user/removeFavoritePlaylist',
            {
              playlistId: item._id,
            },
            { headers: { AuthToken: idToken } },
          );

          return;
        }

        const updatedUser = {
          ...user,
          favoritePlaylistsIds: [
            ...(user?.favoritePlaylistsIds as string[]),
            item._id,
          ],
        } as IUser;

        setUser(updatedUser);

        await api.put(
          '/user/addFavoritePlaylist',
          {
            playlistId: item._id,
          },
          { headers: { AuthToken: idToken } },
        );
      }

      return;
    } catch (err) {
      console.log(err);
    }
  }, [checkIfPlaylistIsFavorited, item._id, navigation, setUser, user]);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [{ scale }],
      }}>
      <CardContainer
        activeOpacity={1}
        onPress={async () => {
          Animated.spring(animation, {
            toValue: 1,
            useNativeDriver: true,
          }).start();
          setTimeout(() => {
            Animated.spring(animation, {
              toValue: 0,
              useNativeDriver: true,
            }).start();
            setTimeout(() => {
              navigation.navigate('PlaylistPage', { playlist: item });
            }, 50);
          }, 80);
        }}>
        <CategoryImage
          source={{
            uri: item.playlistCoverSource,
          }}>
          <CardContent>
            {!isFeatured && (
              <FavoriteButton onPress={toggleFavoritePlaylist}>
                <HeartContainer>
                  <Icon
                    name="heart"
                    color={checkIfPlaylistIsFavorited() ? '#43cfc3' : '#757575'}
                    size={18}
                  />
                </HeartContainer>
              </FavoriteButton>
            )}
          </CardContent>
          <ContentContainer>
            <CategoryTitle numberOfLines={1}>{item.name}</CategoryTitle>
            <CategoryDescription>@{item.creator}</CategoryDescription>
          </ContentContainer>
        </CategoryImage>
      </CardContainer>
    </Animated.View>
  );
};

export default PlaylistCard;
