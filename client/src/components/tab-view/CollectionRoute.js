import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Components
import ProfileHeader from '../ProfileHeader';
import CollectionGrid from '../CollectionGrid';

const CollectionRoute = () => {
  return (
    <View style={styles.container}>
      <ProfileHeader />
      <CollectionGrid />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CollectionRoute;
