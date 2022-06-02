import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

// Navigators
import MainNavigator from './src/navigation/MainNavigator';
import AuthNavigator from './src/navigation/AuthNavigator';

const App = () => {
  return (
    <NavigationContainer>
      {/* <MainNavigator /> */}
      <AuthNavigator />
    </NavigationContainer>
  );
};

export default App;
