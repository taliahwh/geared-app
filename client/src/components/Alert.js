import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Alert = ({ children }) => {
  return <Text style={styles.alert}>{children}</Text>;
};

const styles = StyleSheet.create({
  alert: {
    // backgroundColor: '#f87171',
    color: '#f87171',
    paddingTop: 20,
    paddingBottom: 7,
    width: '100%',
    marginBottom: 10,
    textAlign: 'center',
    fontWeight: '500',
  },
});

export default Alert;
