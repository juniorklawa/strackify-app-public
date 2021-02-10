import auth from '@react-native-firebase/auth';
import React, { createContext, useCallback, useContext, useState } from 'react';
import api from '../services/api';
import { UI_AVATAR_URL } from '../config/constants';

export interface IUser {
  uid: string;
  displayName: string;
  username: string;
  favoritePlaylistsIds: string[];
  photoURL: string;
  email: string;
}

interface IAuthContextData {
  user: IUser | null;
  setUser: (user: IUser) => void;
  authLogin: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  createUser: (
    email: string,
    password: string,
    fullName: string,
  ) => Promise<void>;
  isCreatingUser: boolean;
  setIsCreatingUser: (value: boolean) => void;
}

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isCreatingUser, setIsCreatingUser] = useState<boolean>(false);

  const signOut = useCallback(() => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));

    setUser(null);
  }, [setUser]);

  const authLogin = useCallback(async (email: string, password: string) => {
    try {
      const { user: firebaseUser } = await auth().signInWithEmailAndPassword(
        email,
        password,
      );

      const idToken = await auth()?.currentUser?.getIdToken(true);

      const { data } = await api.get('/user', {
        headers: { AuthToken: idToken },
      });

      setUser({
        displayName: firebaseUser.displayName,
        email: firebaseUser.email,
        photoURL: firebaseUser.photoURL,
        uid: firebaseUser.uid,
        ...data,
      });
    } catch (err) {
      throw new Error(err.code);
    }
  }, []);

  const createUser = async (
    email: string,
    password: string,
    username: string,
  ) => {
    try {
      setIsCreatingUser(true);

      const createdUser = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );

      await createdUser.user.updateProfile({
        displayName: username,
        photoURL: `${UI_AVATAR_URL}${username}`,
      });

      const idToken = await auth()?.currentUser?.getIdToken(true);

      await api.post(
        'user/',
        { ...createdUser, username },
        {
          headers: { AuthToken: idToken },
        },
      );
      setIsCreatingUser(false);
    } catch (err) {
      throw new Error(err.code);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        authLogin,
        createUser,
        signOut,
        isCreatingUser,
        setIsCreatingUser,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): IAuthContextData {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an CodeProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
