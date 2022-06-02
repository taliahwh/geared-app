import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const FollowingRoute = () => {
  return (
    <View style={styles.container}>
      <Text>You are not following anyone yet.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F1F1',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FollowingRoute;
