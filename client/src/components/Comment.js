import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Comment = ({
  displayName,
  username,
  timePosted,
  userImage,
  commentMessage,
}) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.userImage}
        source={{
          uri: userImage,
        }}
      />

      <View style={styles.commentContainer}>
        <View style={styles.commentHeader}>
          <View style={styles.userInfoContainer}>
            <Text style={styles.displayName}>{displayName}</Text>
            <Text style={styles.username}>{`@${username}`}</Text>
            <Text style={styles.timePosted}>{timePosted}</Text>
          </View>

          <Ionicons name="ellipsis-horizontal" size={19} color="#a3a3a3" />
        </View>

        <Text style={styles.commentMessage}>{commentMessage}</Text>
      </View>
    </View>
  );
};

export default Comment;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between  ',
    marginBottom: 15,
  },
  userImage: {
    height: 40,
    width: 40,
    borderRadius: 40 / 2,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#d4d4d4',
  },
  commentContainer: {
    flex: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
    marginLeft: 10,
    // height: 80,
    paddingVertical: 7,
    paddingHorizontal: 7,
  },
  commentHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userInfoContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  displayName: {
    fontWeight: '500',
    fontSize: 16,
    marginRight: 3,
  },
  username: {
    fontWeight: '500',
    fontSize: 14,
    color: '#737373',
    marginRight: 6,
  },
  timePosted: {
    fontSize: 11,
    color: '#a3a3a3',
  },
  commentMessage: {
    marginTop: 5,
    // fontSize
  },
});
