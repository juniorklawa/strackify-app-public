import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import AddPlaylistPage from '../pages/AddPlaylist';
import BookDetailsPage from '../pages/BookDetails';
import CategoryPage from '../pages/Category';
import Dashboard from '../pages/Dashboard';
import PLaylistPage from '../pages/Playlist';

const App = createStackNavigator();

const Routes: React.FC = () => {
  return (
    <App.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        cardStyle: {
          backgroundColor: '#f2f2f2',
        },
      }}>
      <App.Screen
        name="Dashboard"
        component={Dashboard}
        options={{ headerShown: false }}
      />
      <App.Screen
        name="CategoryPage"
        component={CategoryPage}
        options={{
          headerTitleAlign: 'center',
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontFamily: 'OpenSans-Bold',
          },
        }}
      />
      <App.Screen
        name="BookDetailsPage"
        options={{
          headerTitleAlign: 'center',
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontFamily: 'OpenSans-Bold',
          },
        }}
        component={BookDetailsPage}
      />
      <App.Screen name="AddPlaylistPage" component={AddPlaylistPage} />
      <App.Screen
        name="PlaylistPage"
        component={PLaylistPage}
        options={{
          headerTitleAlign: 'center',
          headerTintColor: '#000',
          headerTitleStyle: {
            fontFamily: 'OpenSans-Bold',
          },
        }}
      />
    </App.Navigator>
  );
};

export default Routes;
