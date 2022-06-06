import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import store from './src/store';

// Navigators
import MainNavigator from './src/navigation/MainNavigator';
import AuthNavigator from './src/navigation/AuthNavigator';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        {/* <MainNavigator /> */}
        <AuthNavigator />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
