import React, { useState } from 'react';

import { Text, View, StyleSheet, Dimensions, StatusBar } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

import FollowingRoute from '../components/tab-view/FollowingRoute';
import ExploreRoute from '../components/tab-view/ExploreRoute';

const initialLayout = { width: Dimensions.get('window').width };

const renderScene = SceneMap({
  explore: ExploreRoute,
  following: FollowingRoute,
});

const renderTabBar = (props) => (
  <TabBar
    {...props}
    indicatorStyle={styles.indicator}
    style={styles.tabBar}
    renderLabel={({ route }) => <Text style={styles.label}>{route.title}</Text>}
  />
);

const HomeScreen = ({ navigation }) => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'explore', title: 'Explore' },
    { key: 'following', title: 'Following' },
  ]);

  return (
    <>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        style={styles.container}
        renderTabBar={renderTabBar}
      />
    </>
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
    backgroundColor: '#27272a',
  },
  tabBar: {
    backgroundColor: 'white',
  },
});

export default HomeScreen;
