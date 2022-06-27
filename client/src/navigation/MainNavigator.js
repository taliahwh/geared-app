import React, { useEffect } from 'react';
import {
  createNavigationContainerRef,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useDispatch, useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Components
import LogoTitle from '../components/LogoTitle';

// Screens
import SearchScreen from '../screens/SearchScreen';

import HomeScreenNavigator from './HomeScreenNavigator';
import ProfileNavigator from './ProfileNavigator';
import DashboardNavigator from './DashboardNavigator';
import MessagesNavigator from './MessagesNavigator';

// Actions
import { getProfileDetails } from '../actions/userActions';

export const navigationRef = createNavigationContainerRef();

export const navigate = (name, params) => {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
};

const Tab = createBottomTabNavigator();

const MainNavigator = () => {
  // User info from redux state
  const {
    loading: loadingProfileDetails,
    profileDetails,
    error: errorProfileDetails,
  } = useSelector((state) => state.userDetails);

  // const notifications =
  //   userDetails && userDetails.notifications.length === 0
  //     ? ''
  //     : userDetails.notifications.length;

  return (
    <Tab.Navigator
      initialRouteName="Feed"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName;

          if (route.name === 'Feed') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Search') {
            iconName = focused ? 'search' : 'search-outline';
          } else if (route.name === 'Dashboard') {
            iconName = focused ? 'file-tray-full' : 'file-tray-full-outline';
          } else if (route.name === 'Messages') {
            iconName = focused ? 'mail-open' : 'mail-open-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person-circle' : 'person-circle-outline';
          }
          return <Ionicons name={iconName} size={27} color={'black'} />;
        },
        tabBarShowLabel: false,
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="Feed"
        component={HomeScreenNavigator}
        options={({ route }) => {
          const focusedRouteName = getFocusedRouteNameFromRoute(route);
          if (focusedRouteName === 'CommentScreenFromHome') {
            return {
              tabBarStyle: { display: 'none' },
              headerShown: false,
            };
          }

          return {
            tabBarStyle: { display: 'flex' },
            headerShown: false,
          };
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          headerShown: true,
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
        }}
      />
      <Tab.Screen
        name="Dashboard"
        component={DashboardNavigator}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Messages"
        component={MessagesNavigator}
        options={{
          headerShown: false,
          tabBarBadge: 3,
          tabBarBadgeStyle: {
            backgroundColor: '#3E5E7E',
            fontSize: 12,
            fontWeight: '500',
            color: '#fff',
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileNavigator}
        options={{
          headerTitle: 'Profile',
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
          tabBarBadge: 1,
          tabBarBadgeStyle: {
            backgroundColor: '#3E5E7E',
            fontSize: 12,
            fontWeight: '500',
            color: '#fff',
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default MainNavigator;
