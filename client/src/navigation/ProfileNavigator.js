import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ProfileScreen from '../screens/ProfileScreen';
import PostDetailsScreen from '../screens/PostDetailsScreen';

const Stack = createStackNavigator();

const ProfileNavigator = () => {
  return (
    <Stack.Navigator options={{ headerBackTitleVisible: false }}>
      <Stack.Screen
        name="User Profile"
        component={ProfileScreen}
        options={{
          headerTitle: '',
          // headerTitle: (props) => <LogoTitle {...props} />,
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
        name="Post Details"
        component={PostDetailsScreen}
        options={{ headerTitle: '', headerBackTitleVisible: false }}
      />
    </Stack.Navigator>
  );
};

export default ProfileNavigator;
