import auth from '@react-native-firebase/auth';
import { useIsFocused } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, StyleSheet } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AuthModal from '../../components/AuthModal';
import PlaylistCard from '../../components/PlaylistCard';
import TrackBar from '../../components/TrackBar';
import { useAuth } from '../../hooks/useAuth';
import { IPlayList } from '../../models/IPlaylist';
import api from '../../services/api';
import { EmptyListText } from '../Favorites/styles';
import {
  AvatarPicture,
  Container,
  DeleteAccountButton,
  DeleteAccountText,
  Header,
  HeaderInfoContainer,
  LoadingContainer,
  MyPlaylistsContainer,
  SignOutButtonContainer,
  SignOutText,
  Title,
  UserEmail,
  UserEmailContainer,
  UserName,
} from './styles';
import { translate } from '../../locales';

interface ProfilePageProps {
  route: { params: { isNewUser: boolean } };
}

const ProfilePage = ({ route }: ProfilePageProps) => {
  const { user, signOut } = useAuth();
  const isNewUser = route?.params?.isNewUser || false;
  const [userPlaylists, setUserPlaylists] = useState<IPlayList[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [shouldReloadPage, setShoudlReloadPage] = useState<boolean>(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    async function fetchData() {
      const idToken = await auth()?.currentUser?.getIdToken(true);
      if (isFocused && idToken) {
        try {
          setIsLoading(true);
          const { data } = await api.get('/user/playlists', {
            headers: { AuthToken: idToken },
          });
          setUserPlaylists(data);
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoading(false);
        }
      }
    }

    fetchData();
  }, [isFocused, shouldReloadPage]);

  const renderFavoritePlaylist = ({ item }: { item: IPlayList }) => {
    return <PlaylistCard item={item} />;
  };

  const handleDeleteAccount = useCallback(async () => {
    try {
      signOut();
      auth().currentUser?.delete();
    } catch (error) {
      console.warn(error);
    }
  }, [signOut]);

  const showDeleteAccounAlert = useCallback(() => {
    Alert.alert(
      translate('utils.warning'),
      translate('profile.delete_account_confirmation'),
      [
        {
          text: translate('utils.yes'),
          onPress: async () => await handleDeleteAccount(),
        },
        {
          text: translate('utils.no'),
        },
      ],
    );
  }, [handleDeleteAccount]);

  return (
    <>
      <Container>
        <ScrollView showsVerticalScrollIndicator={false}>
          {user && (
            <>
              <Header>
                <AvatarPicture source={{ uri: user.photoURL }} />
                <HeaderInfoContainer>
                  <UserName>{user.username}</UserName>
                  <UserEmailContainer>
                    <MaterialCommunityIcons
                      name="email"
                      color="#757575"
                      size={14}
                    />
                    <UserEmail>{user.email}</UserEmail>
                  </UserEmailContainer>
                </HeaderInfoContainer>
              </Header>
              {!isLoading ? (
                <>
                  <MyPlaylistsContainer>
                    <Title>{translate('profile.my_playlists')}</Title>
                  </MyPlaylistsContainer>

                  {auth().currentUser && userPlaylists.length ? (
                    <FlatGrid
                      showsVerticalScrollIndicator={false}
                      data={userPlaylists}
                      itemDimension={150}
                      style={styles.gridView}
                      spacing={1}
                      renderItem={renderFavoritePlaylist}
                      keyExtractor={(item) => item._id}
                    />
                  ) : (
                    <EmptyListText>
                      {translate('profile.no_favorites')}
                    </EmptyListText>
                  )}
                </>
              ) : (
                <>
                  <LoadingContainer>
                    <ActivityIndicator size="large" color="#000" />
                  </LoadingContainer>
                </>
              )}
            </>
          )}

          {user && (
            <>
              <DeleteAccountButton onPress={showDeleteAccounAlert}>
                <DeleteAccountText>
                  {translate('profile.delete_account')}
                </DeleteAccountText>
              </DeleteAccountButton>
              <SignOutButtonContainer onPress={signOut}>
                <SignOutText>{translate('utils.exit')}</SignOutText>
              </SignOutButtonContainer>
            </>
          )}
        </ScrollView>
      </Container>
      <AuthModal
        isNewUser={isNewUser}
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
    marginTop: 20,
    flex: 1,
  },
});

export default ProfilePage;
