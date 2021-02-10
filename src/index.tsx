import auth from '@react-native-firebase/auth';
import React, { useCallback, useEffect, useState } from 'react';
import { LogBox } from 'react-native';
import {
  AnimatedTabBarNavigator,
  DotSize,
  TabElementDisplayOptions,
} from 'react-native-animated-nav-tab-bar';
import 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';
import { useAuth } from './hooks/useAuth';
import FavoritesPage from './pages/Favorites';
import ProfilePage from './pages/Profile';
import SearchPage from './pages/Search';
import Routes from './routes';
import api from './services/api';
import { translate } from './locales';

LogBox.ignoreLogs(['VirtualizedLists should never be nested']);

interface ITabIconProps {
  focused: boolean;
  color: string;
}

const Tab = AnimatedTabBarNavigator();

const Root: React.FC = () => {
  const [initializing, setInitializing] = useState(true);
  const { setUser, isCreatingUser } = useAuth();

  const onAuthStateChanged = useCallback(
    async (firebaseUser) => {
      try {
        const idToken = await auth()?.currentUser?.getIdToken(true);
        if (idToken && !isCreatingUser) {
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
        }
      } catch (err) {
        console.log(err);
      }

      if (initializing) {
        setInitializing(false);
      }
    },
    [initializing, isCreatingUser, setUser],
  );

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);

    return subscriber;
  }, [initializing, onAuthStateChanged, setUser]);

  if (initializing) {
    return null;
  }

  const TabBarIcon = (props: any) => {
    return (
      <Icon
        name={props.name}
        size={props.size ? props.size : 24}
        color={props.tintColor}
      />
    );
  };

  return (
    <>
      <Tab.Navigator
        tabBarOptions={{
          labelStyle: {
            fontFamily: 'OpenSans-Bold',
          },
          activeTintColor: '#ffffff',
          inactiveTintColor: '#223322',
          activeBackgroundColor: '#43cfc3',
        }}
        appearence={{
          shadow: true,
          whenActiveShow: TabElementDisplayOptions.BOTH,
          dotSize: DotSize.MEDIUM,
        }}>
        <Tab.Screen
          name="Home"
          component={Routes}
          options={{
            title: 'Home',
            tabBarIcon: ({ focused, color }: ITabIconProps) => (
              <TabBarIcon focused={focused} tintColor={color} name="home" />
            ),
          }}
        />
        <Tab.Screen
          name="Search"
          component={SearchPage}
          options={{
            title: translate('tab.search'),
            tabBarIcon: ({ focused, color }: ITabIconProps) => (
              <TabBarIcon focused={focused} tintColor={color} name="search" />
            ),
          }}
        />

        <Tab.Screen
          name="Favorites"
          component={FavoritesPage}
          options={{
            title: translate('tab.favorites'),
            tabBarVisible: true,
            tabBarIcon: ({ focused, color }: ITabIconProps) => (
              <TabBarIcon focused={focused} tintColor={color} name="heart" />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfilePage}
          options={{
            title: translate('tab.profile'),
            tabBarIcon: ({ focused, color }: ITabIconProps) => (
              <TabBarIcon focused={focused} tintColor={color} name="user" />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
};

export default Root;
