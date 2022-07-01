import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const FollowersCard = ({ name, username, profileImage }) => {
  const handleFollowUser = () => {};

  return (
    <View style={styles.container}>
      <View style={styles.imageAndContentContainer}>
        <Image
          style={styles.userImage}
          source={{
            uri: profileImage,
          }}
        />

        <View style={styles.content}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.username}>{`@${username}`}</Text>
        </View>
      </View>

      <View style={styles.btnContainer}>
        <TouchableOpacity onPress={handleFollowUser} activeOpacity={0.6}>
          <Text style={styles.followingBtn}>Following</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageAndContentContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: 'orange',
    flex: 3,
  },
  userImage: {
    height: 50,
    width: 50,
    borderRadius: 50 / 2,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#d4d4d4',
  },
  content: {
    marginLeft: 10,
  },
  name: {
    fontWeight: '600',
    fontSize: 16,
  },
  username: {
    color: '#404040',
  },
  btnContainer: {
    flex: 1,
    // backgroundColor: 'pink',
  },
  followBtn: {
    textAlign: 'center',
    fontWeight: '500',
    // backgroundColor: 'gray',
    color: '#3E5E7E',
    borderColor: '#3E5E7E',
    paddingHorizontal: 7,
    paddingVertical: 5,
    borderWidth: 1,
    borderRadius: 5,
  },
  followingBtn: {
    textAlign: 'center',
    fontWeight: '500',
    backgroundColor: '#3E5E7E',
    color: '#fff',
    borderColor: '#3E5E7E',
    paddingHorizontal: 7,
    paddingVertical: 5,
    borderWidth: 1,
    borderRadius: 5,
    overflow: 'hidden',
  },
});

export default FollowersCard;
