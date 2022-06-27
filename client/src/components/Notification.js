import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';

const Notification = ({
  profileImage,
  username,
  notificationType,
  timePosted,
}) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.userImage}
        source={{
          uri: profileImage,
        }}
      />

      <View>
        <View style={styles.sentence}>
          <Text style={styles.username}>{username}</Text>

          {notificationType === 'Like Post' && (
            <Text style={{ fontSize: 15 }}>liked your post.</Text>
          )}

          {notificationType === 'Follow' && (
            <Text style={{ fontSize: 15 }}>started following you.</Text>
          )}

          {notificationType === 'Comment' && (
            <Text style={{ fontSize: 15 }}>commented on your post.</Text>
          )}
        </View>
        <Text style={styles.timePosted}>{timePosted}</Text>
      </View>
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  userImage: {
    height: 40,
    width: 40,
    borderRadius: 40 / 2,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#d4d4d4',
    marginRight: 10,
  },
  content: {},
  sentence: {
    display: 'flex',
    flexDirection: 'row',
    fontSize: 15,
  },
  username: {
    fontWeight: '600',
    paddingRight: 4,
    fontSize: 15,
  },
  timePosted: {
    fontSize: 12,
    marginTop: 2,
  },
});
