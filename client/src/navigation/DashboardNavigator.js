import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import DashboardScreen from '../screens/DashboardScreen';
import CreateListingScreen from '../screens/CreateListingScreen';

const Stack = createStackNavigator();

const DashboardNavigator = () => {
  return (
    <Stack.Navigator options={{ headerBackTitleVisible: false }}>
      <Stack.Screen
        name="Home"
        component={DashboardScreen}
        options={{
          headerTitle: 'Dashboard',
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
        }}
      />
      <Stack.Screen
        name="Listing"
        component={CreateListingScreen}
        options={{ headerTitle: 'Listing', headerBackTitleVisible: false }}
      />
    </Stack.Navigator>
  );
};

export default DashboardNavigator;
