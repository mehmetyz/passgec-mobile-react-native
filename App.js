import React, {useState} from 'react';

import {NativeBaseProvider} from 'native-base';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {LoginPage} from './src/screens/Auth/Login';
import {RegisterPage} from './src/screens/Auth/Register';
import {HomePage} from './src/screens/Home/Home';

import {ApplicationContext} from './src/common/context';
import {getData, saveToStorage, clearStorage} from './src/helpers/storage';

const Stack = createNativeStackNavigator();

const App = () => {
  clearStorage();
  const methods = {
    getData,
    saveToStorage,
    clearStorage,
  };

  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <ApplicationContext.Provider value={methods}>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
            initialRouteName="login">
            <Stack.Screen name="login" component={LoginPage} />
            <Stack.Screen name="register" component={RegisterPage} />
            <Stack.Screen name="home" component={HomePage} />
          </Stack.Navigator>
        </ApplicationContext.Provider>
      </NativeBaseProvider>
    </NavigationContainer>
  );
};

export default App;
