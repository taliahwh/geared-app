import React, { useState } from 'react';

import { Text, View, StyleSheet, Dimensions, StatusBar } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

import CollectionRoute from '../components/tab-view/CollectionRoute';
import ReviewsRoute from '../components/tab-view/ReviewsRoute';

const initialLayout = { width: Dimensions.get('window').width };

const renderScene = SceneMap({
  collection: CollectionRoute,
  reviews: ReviewsRoute,
});

const renderTabBar = (props) => (
  <TabBar
    {...props}
    indicatorStyle={styles.indicator}
    style={styles.tabBar}
    renderLabel={({ route }) => <Text style={styles.label}>{route.title}</Text>}
  />
);

const ViewUserProfileScreen = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'collection', title: 'Collection' },
    { key: 'reviews', title: 'Reviews' },
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
    backgroundColor: '#fff',
  },
});

export default ViewUserProfileScreen;
