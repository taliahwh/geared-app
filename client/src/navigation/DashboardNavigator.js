import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import DashboardScreen from '../screens/DashboardScreen';
import EditBioScreen from '../screens/EditBioScreen';
import EditInterestsScreen from '../screens/EditInterestsScreen';

const Stack = createStackNavigator();

const DashboardNavigator = () => {
  return (
    <Stack.Navigator options={{ headerBackTitleVisible: false }}>
      <Stack.Screen
        name="Home"
        component={DashboardScreen}
        options={{
          headerTitle: 'Dashboard',
          // headerTitle: (props) => <LogoTitle {...props} />,
          // headerTintColor: '#fff',
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
        }}
      />
      <Stack.Screen
        name="Edit Bio"
        component={EditBioScreen}
        options={{
          headerTitle: 'Bio',
          // headerTitle: (props) => <LogoTitle {...props} />,
          // headerTitle: (props) => <LogoTitle {...props} />,
          // headerTintColor: '#fff',

          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="Edit Interests"
        component={EditInterestsScreen}
        options={{ headerTitle: 'Interests', headerBackTitleVisible: false }}
      />
    </Stack.Navigator>
  );
};

export default DashboardNavigator;
