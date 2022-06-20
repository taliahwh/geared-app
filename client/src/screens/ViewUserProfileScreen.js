import React, { useState } from 'react';

import { View, StyleSheet, Dimensions, StatusBar } from 'react-native';

// Components
import ProfileHeader from '../components/ProfileHeader';
import CollectionGrid from '../components/CollectionGrid';

const ViewUserProfileScreen = ({ route }) => {
  const { userId } = route.params;
  return (
    <View style={styles.collectionContainter}>
      <ProfileHeader userId={userId} />
      <CollectionGrid userId={userId} />
    </View>
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
  collectionContainter: {
    flex: 1,
  },
});

export default ViewUserProfileScreen;
