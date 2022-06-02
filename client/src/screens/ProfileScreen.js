import React, { useState } from 'react';

import { Text, View, StyleSheet, Dimensions, StatusBar } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

import CollectionRoute from '../components/tab-view/CollectionRoute';
import LikesRoute from '../components/tab-view/LikesRoute';
import SavedRoute from '../components/tab-view/SavedRoute';
import ReviewsRoute from '../components/tab-view/ReviewsRoute';
import TestRoute from '../components/tab-view/TestRoute';

const initialLayout = { width: Dimensions.get('window').width };

const renderScene = SceneMap({
  collection: CollectionRoute,
  likes: LikesRoute,
  saved: SavedRoute,
  reviews: ReviewsRoute,
  test: TestRoute,
});

const renderTabBar = (props) => (
  <TabBar
    {...props}
    indicatorStyle={styles.indicator}
    style={styles.tabBar}
    renderLabel={({ route }) => <Text style={styles.label}>{route.title}</Text>}
  />
);

const ProfileScreen = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'collection', title: 'Collection' },
    { key: 'likes', title: 'Likes' },
    { key: 'saved', title: 'Saved' },
    { key: 'reviews', title: 'Reviews' },
    // { key: 'test', title: 'Test' },
  ]);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      style={styles.container}
      renderTabBar={renderTabBar}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
  },
  scene: {
    flex: 1,
  },
  label: {
    color: '#27272a',
    fontWeight: '600',
  },
  indicator: {
    backgroundColor: '#3E5E7E',
  },
  tabBar: {
    backgroundColor: 'white',
  },
});

export default ProfileScreen;
