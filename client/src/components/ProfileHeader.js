import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Pressable,
  Linking,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

// Actions
import { logout, followUser } from '../actions/userActions';

const TagRender = ({ name }) => <Text style={styles.tags}>{name}</Text>;

const Separator = () => {
  return <View style={{ width: 1, backgroundColor: '#fff' }} />;
};

const ProfileHeader = ({
  userId,
  profileImage,
  name,
  username,
  bio,
  website,
  interests,
  followingCount,
  followersCount,
  isFollowing,
}) => {
  // Hooks
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleNavigate = (query) => {
    if (query === 'followers') {
      navigation.navigate('Followers', { userId });
    }
    if (query === 'following') {
      navigation.navigate('Following', { userId });
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleFollowUser = () => {
    dispatch(followUser(userId));
  };

  return (
    <View style={styles.container}>
      <View style={styles.userInfoContainer}>
        <Image
          style={styles.userImage}
          source={{
            uri: profileImage,
          }}
        />
        <View style={styles.userNameContainer}>
          <Text style={styles.userDisplayName}>{name}</Text>
          <Text style={styles.username}>{`@${username}`}</Text>
          <View style={styles.ratingsContainer}>
            <Ionicons name="star" size={15} color="#3E5E7E" />
            <Ionicons name="star" size={15} color="#3E5E7E" />
            <Ionicons name="star" size={15} color="#3E5E7E" />
            <Ionicons name="star" size={15} color="#3E5E7E" />
            <Ionicons name="star" size={15} color="#3E5E7E" />
            <Text>(13)</Text>
          </View>
        </View>

        <View>
          <Pressable
            style={styles.pickerContainer}
            onPress={() => MenuProvider.open}
          >
            <Menu>
              <MenuTrigger>
                <Ionicons name="ellipsis-horizontal" size={24} color="black" />
              </MenuTrigger>
              <MenuOptions style={styles.menu}>
                <MenuOption onSelect={handleLogout}>
                  <Text
                    style={{
                      fontSize: 15,
                      paddingVertical: 2,
                      textAlign: 'center',
                      fontWeight: '500',
                    }}
                  >
                    Sign Out
                  </Text>
                </MenuOption>
              </MenuOptions>
            </Menu>
          </Pressable>
        </View>
      </View>

      {bio !== '' && <Text style={styles.description}>{bio}</Text>}
      {website && (
        <Text
          style={styles.website}
          onPress={() => {
            Linking.openURL(`https://${website}`);
          }}
        >
          {website}
        </Text>
      )}

      {interests && (
        <View style={styles.tagsContainer}>
          <FlatList
            data={interests}
            renderItem={({ item }) =>
              item.name !== null && <TagRender name={item.name} />
            }
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={Separator}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      )}

      <View style={styles.followersAndShareContainer}>
        <View style={styles.followersContainer}>
          <TouchableOpacity
            onPress={() => handleNavigate('following')}
            activeOpacity={1}
          >
            <View>
              <Text style={styles.count}>{followingCount}</Text>
              <Text>following</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleNavigate('followers')}
            activeOpacity={1}
          >
            <View>
              <Text style={styles.count}>{followersCount}</Text>
              <Text>followers</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.followBtnContainer}>
          <TouchableOpacity onPress={handleFollowUser} activeOpacity={0.7}>
            {isFollowing ? (
              <Text style={styles.followingBtn}>Following</Text>
            ) : (
              <Text style={styles.followBtn}>Follow</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  userInfoContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  userImage: {
    flex: 2,
    // backgroundColor: 'pink',
    height: 68,
    borderWidth: 1,
    borderColor: '#d4d4d4',
    borderRadius: 1000,
    // marginBottom: 5,
  },

  userNameContainer: {
    flex: 8,
    // backgroundColor: 'orange',
    display: 'flex',
    marginLeft: 15,
    justifyContent: 'space-between',
  },
  userDisplayName: {
    fontSize: 20,
    fontWeight: '700',
  },
  username: {
    fontSize: 15,
    color: '#737373',
  },
  ratingsContainer: {
    display: 'flex',
    flexDirection: 'row',
    // backgroundColor: 'pink',
    width: '40%',
    justifyContent: 'space-between',
  },
  tagsContainer: {
    // backgroundColor: 'pink',
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  lookingFor: { marginRight: 7 },
  tags: {
    marginRight: 10,
    fontSize: 13,
    fontWeight: '500',
    color: '#a3a3a3',
    backgroundColor: '#F1F1F1',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 10,
    overflow: 'hidden',
  },
  description: {
    marginTop: 10,
    // fontSize: 15,
  },
  followersAndShareContainer: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 3,
  },
  followersContainer: {
    display: 'flex',
    flexDirection: 'row',
    flex: 4,
    justifyContent: 'space-between',
  },
  followBtnContainer: {
    flex: 6,
    marginLeft: 25,
    display: 'flex',
    justifyContent: 'center',
  },
  followBtn: {
    backgroundColor: '#3E5E7E',
    width: '100%',
    textAlign: 'center',
    paddingVertical: 5,
    fontWeight: '600',
    fontSize: 15,
    borderRadius: 3,
    overflow: 'hidden',
    color: '#fff',
  },
  followingBtn: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#3E5E7E',
    width: '100%',
    textAlign: 'center',
    paddingVertical: 5,
    fontWeight: '600',
    fontSize: 15,
    borderRadius: 3,
    overflow: 'hidden',
    color: '#3E5E7E',
  },
  count: {
    fontWeight: '600',
  },
  menu: {
    borderRadius: 10,
    padding: 7,
  },
  website: {
    color: '#3E5E7E',
    fontWeight: '500',
    marginTop: 3,
  },
});

export default ProfileHeader;
