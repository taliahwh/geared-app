import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { MenuProvider } from 'react-native-popup-menu';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './src/store';
import { LogBox } from 'react-native';

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

  useEffect(
    () =>
      LogBox.ignoreLogs([
        `ViewPropTypes will be removed from React Native. Migrate to ViewPropTypes exported from 'deprecated-react-native-prop-types'.`,
      ]),

    []
  );

  return (
    <NavigationContainer ref={navigationRef}>
      {authToken === null ? <AuthNavigator /> : <MainNavigator />}
    </NavigationContainer>
  );
};

export default AppWrapper;
