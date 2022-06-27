import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

import ProfileScreen from '../screens/ProfileScreen';
import PostDetailsScreen from '../screens/PostDetailsScreen';
import NotificationsScreen from '../screens/NotificationsScreen';

import { Ionicons } from '@expo/vector-icons';

const Stack = createStackNavigator();

const ProfileNavigator = () => {
  const navigation = useNavigation();
  return (
    <Stack.Navigator options={{ headerBackTitleVisible: false }}>
      <Stack.Screen
        name="User Profile"
        component={ProfileScreen}
        options={{
          headerTitle: '',
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
            // height: 60,
          },
          headerLeft: () => (
            <View style={{ marginLeft: 15 }}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate('Notifications')}
              >
                <Ionicons name="ios-notifications" size={25} color="black" />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="User Post Details"
        component={PostDetailsScreen}
        options={{ headerTitle: '', headerBackTitleVisible: false }}
      />
      <Stack.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{
          headerTitle: 'Notifications',
          headerBackTitleVisible: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default ProfileNavigator;
