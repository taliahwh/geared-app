import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

import ProfileScreen from '../screens/ProfileScreen';
import PostDetailsScreen from '../screens/PostDetailsScreen';
import CommentsScreen from '../screens/CommentsScreen';
import NotificationsScreen from '../screens/NotificationsScreen';

import { Ionicons } from '@expo/vector-icons';

import { HeaderBack, HeaderNotification } from '../components/HeaderBackImages';

const Stack = createStackNavigator();

const ProfileNavigator = () => {
  return (
    <Stack.Navigator options={{ headerBackTitleVisible: false }}>
      <Stack.Screen
        name="UserProfile"
        component={ProfileScreen}
        options={{
          headerTitle: '',
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
            // height: 60,
          },
          headerLeft: HeaderNotification,
        }}
      />
      <Stack.Screen
        name="PostDetails"
        component={PostDetailsScreen}
        options={{
          headerTitle: '',
          headerBackTitleVisible: false,
          headerBackImage: HeaderBack,
        }}
      />
      <Stack.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{
          headerTitle: 'Notifications',
          headerBackTitleVisible: false,
          headerBackImage: HeaderBack,
        }}
      />
      <Stack.Screen
        name="Comments"
        component={CommentsScreen}
        options={{
          headerTitle: 'Comments',
          headerBackTitleVisible: false,
          headerBackImage: HeaderBack,
        }}
      />
    </Stack.Navigator>
  );
};

export default ProfileNavigator;
