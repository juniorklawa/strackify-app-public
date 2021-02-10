import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import FlashMessage from 'react-native-flash-message';
import 'react-native-gesture-handler';
import SplashScreen from 'react-native-splash-screen';
import Root from '.';
import AppProvider from './hooks';

const App: React.FC = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <>
      <AppProvider>
        <StatusBar barStyle="light-content" backgroundColor="#000000" />
        <NavigationContainer>
          <Root />
        </NavigationContainer>
        <FlashMessage position="top" />
      </AppProvider>
    </>
  );
};

export default App;
