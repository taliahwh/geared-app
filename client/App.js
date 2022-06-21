import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider, useSelector } from 'react-redux';
import { MenuProvider } from 'react-native-popup-menu';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './src/store';

// Components
import Loader from './src/components/Loader';

// Navigators
import { navigationRef } from './src/navigation/RootNavigation';
import MainNavigator from './src/navigation/MainNavigator';
import AuthNavigator from './src/navigation/AuthNavigator';

const AppWrapper = () => {
  return (
    <Provider store={store} loading={Loader}>
      <PersistGate persistor={persistor}>
        <MenuProvider>
          <App />
        </MenuProvider>
      </PersistGate>
    </Provider>
  );
};

const App = () => {
  const { authToken } = useSelector((state) => state.userSignIn);

  return (
    <NavigationContainer ref={navigationRef}>
      {authToken === null ? <AuthNavigator /> : <MainNavigator />}
    </NavigationContainer>
  );
};

export default AppWrapper;
