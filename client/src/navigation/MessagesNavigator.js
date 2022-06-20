import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

import MessagesScreen from '../screens/MessagesScreen';
import ChatScreen from '../screens/ChatScreen';
import PostDetailsScreen from '../screens/PostDetailsScreen';

const Stack = createStackNavigator();

const MessagesNavigator = () => {
  return (
    <Stack.Navigator
      options={{
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen
        name="Home"
        component={MessagesScreen}
        options={{
          headerTitle: 'Messages',
          headerStyle: {
            elevation: 0,
            shadowOpacity: 1,
            borderBottomWidth: 0.5,
          },
        }}
      />
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          headerTitle: 'Chat',
          headerBackTitleVisible: false,
          headerStyle: {
            elevation: 0,
            shadowOpacity: 1,
            borderBottomWidth: 0.5,
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default MessagesNavigator;
