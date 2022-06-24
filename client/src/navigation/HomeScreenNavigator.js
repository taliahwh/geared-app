import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TransitionPresets } from '@react-navigation/stack';
import { View } from 'react-native';

import HomeScreen from '../screens/HomeScreen';
import ViewUserProfileScreen from '../screens/ViewUserProfileScreen';
import PostDetailsScreen from '../screens/PostDetailsScreen';
import CommentsScreen from '../screens/CommentsScreen';

import { Ionicons } from '@expo/vector-icons';
<Ionicons name="ios-bookmark" size={24} color="black" />;

const Stack = createStackNavigator();

const HomeScreenNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerTitle: 'Feed',
            headerStyle: {
              elevation: 0,
              shadowOpacity: 0,
              borderBottomWidth: 0,
            },
          }}
        />
        <Stack.Screen
          name="Profile Details"
          component={ViewUserProfileScreen}
          options={{
            headerTitle: '',
            headerBackTitleVisible: false,
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
      </Stack.Group>

      {/* Modals */}
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen
          name="CommentScreenFromHome"
          component={CommentsScreen}
          options={{
            headerTitle: 'Comments',
            headerBackTitleVisible: false,
            // ...TransitionPresets.ModalSlideFromBottomIOS,

            headerBackImage: () => (
              <View style={{ marginLeft: 15 }}>
                <Ionicons name="close-outline" size={28} color="black" />
              </View>
            ),
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default HomeScreenNavigator;
