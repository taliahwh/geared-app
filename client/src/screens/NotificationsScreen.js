import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

// Components
import Notification from '../components/Notification';

const NotificationScreen = () => {
  return (
    <View style={styles.container}>
      <Notification
        profileImage={
          'https://celticswire.usatoday.com/wp-content/uploads/sites/39/2022/02/USATSI_17700835.jpg?w=1000&h=600&crop=1'
        }
        username={'juice777'}
        timePosted={'2 DAYS AGO'}
        notificationType={'Like Post'}
      />
      <Notification
        profileImage={
          'https://celticswire.usatoday.com/wp-content/uploads/sites/39/2022/02/USATSI_17700835.jpg?w=1000&h=600&crop=1'
        }
        username={'juice777'}
        timePosted={'2 DAYS AGO'}
        notificationType={'Comment'}
      />
    </View>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
