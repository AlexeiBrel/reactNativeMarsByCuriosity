import React, { useState, useEffect, useCallback } from 'react'
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';

import { StatusBar, View, StyleSheet, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'


import IntroScreen from './src/screens/IntroScreen';
import SelectScreen from './src/screens/SelectScreen';
import HomeScreen from './src/screens/HomeScreen';
import DetailsScreen from './src/screens/DetailsScreen';
import { PhotosProvider } from './src/context/photosContext';

const Stack = createNativeStackNavigator();

SplashScreen.preventAutoHideAsync();

const App = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          'Dosis-Bold': require('./assets/fonts/Dosis-Bold.ttf'),
          'Dosis-ExtraLight': require('./assets/fonts/Dosis-ExtraLight.ttf'),
          'Dosis-Regular': require('./assets/fonts/Dosis-Regular.ttf'),
        });
      } catch (error) {
        Alert.alert('Error', error)
      } finally {
        setIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (isReady) {
      await SplashScreen.hideAsync();
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }

  return (
    <View style={styles.wrap} onLayout={onLayoutRootView}>
      <PhotosProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name='Intro' component={IntroScreen} options={{ headerShown: false }} />
            <Stack.Screen name='Select' component={SelectScreen} options={{ headerShown: false }} />
            <Stack.Screen name='Home' component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name='Details' component={DetailsScreen} options={{ headerShown: false }} />
          </Stack.Navigator>
          <StatusBar style='auto' />
        </NavigationContainer>
      </PhotosProvider>
    </View>
  )
}

export default App

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
  }
})