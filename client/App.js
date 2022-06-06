import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider, useSelector } from 'react-redux';
import store from './src/store';

// Navigators
import MainNavigator from './src/navigation/MainNavigator';
import AuthNavigator from './src/navigation/AuthNavigator';

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

const App = () => {
  const { authToken } = useSelector((state) => state.userSignIn);

  return (
    <NavigationContainer>
      {authToken === null ? <AuthNavigator /> : <MainNavigator />}
      {/* <MainNavigator />
      <AuthNavigator /> */}
    </NavigationContainer>
  );
};

export default AppWrapper;
