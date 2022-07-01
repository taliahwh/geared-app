import React, { useEffect } from 'react';
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

// Components
import ProfileHeaderLoader from './Loaders/ProfileHeaderLoader';
import AlertMessage from '../components/AlertMessage';

// Actions
import { logout, getUserDetails, followUser } from '../actions/userActions';

const TagRender = ({ name }) => <Text style={styles.tags}>{name}</Text>;

const Separator = () => {
  return <View style={{ width: 1, backgroundColor: '#fff' }} />;
};

const ProfileHeader = ({ userId }) => {
  // Hooks
  const dispatch = useDispatch();
  const navigation = useNavigation();

  // State from redux
  // const { _id: authUserId } = useSelector((state) => state.userSignIn.userInfo);
  const {
    loading: loadingUserDetails,
    userDetails,
    error: errorUserDetails,
  } = useSelector((state) => state.userDetails);

  const { success: successFollowUser } = useSelector(
    (state) => state.followUser
  );

  const { success: successUpdateProfile } = useSelector(
    (state) => state.userUpdateProfile
  );

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

  useEffect(() => {
    dispatch(getUserDetails(userId));
  }, [dispatch, userId, successFollowUser, successUpdateProfile]);

  return (
    <View style={styles.container}>
      {loadingUserDetails && <ProfileHeaderLoader />}
      {errorUserDetails && <AlertMessage>{errorUserDetails}</AlertMessage>}

      {userDetails && (
        <>
          <View style={styles.userInfoContainer}>
            <Image
              style={styles.userImage}
              source={{
                uri: userDetails.profileImage,
              }}
            />
            <View style={styles.userNameContainer}>
              <Text style={styles.userDisplayName}>{userDetails.name}</Text>
              <Text style={styles.username}>{`@${userDetails.username}`}</Text>
              <View style={styles.ratingsContainer}>
                <Ionicons name="star" size={15} color="#3E5E7E" />
                <Ionicons name="star" size={15} color="#3E5E7E" />
                <Ionicons name="star" size={15} color="#3E5E7E" />
                <Ionicons name="star" size={15} color="#3E5E7E" />
                <Ionicons name="star" size={15} color="#3E5E7E" />
                <Text>(13)</Text>
                {/* <Ionicons name="star-half" size={15} color="#3E5E7E" /> */}
              </View>
            </View>

            <View>
              <Pressable
                style={styles.pickerContainer}
                onPress={() => MenuProvider.open}
              >
                <Menu>
                  <MenuTrigger>
                    <Ionicons
                      name="ellipsis-horizontal"
                      size={24}
                      color="black"
                    />
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

          {userDetails.bio !== '' && (
            <Text style={styles.description}>{userDetails.bio}</Text>
          )}
          {userDetails.website && (
            <Text
              style={styles.website}
              onPress={() => {
                Linking.openURL(`https://${userDetails.website}`);
              }}
            >
              {userDetails.website}
            </Text>
          )}

          {userDetails.interests && (
            <View style={styles.tagsContainer}>
              {/* <Text style={styles.lookingFor}>Collecting:</Text> */}
              <FlatList
                data={userDetails.interests}
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
                  <Text style={styles.count}>
                    {userDetails.following.length}
                  </Text>
                  <Text>following</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleNavigate('followers')}
                activeOpacity={1}
              >
                <View>
                  <Text style={styles.count}>
                    {userDetails.followers.length}
                  </Text>
                  <Text>followers</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.followBtnContainer}>
              <TouchableOpacity onPress={handleFollowUser} activeOpacity={0.7}>
                <Text style={styles.followBtn}>Follow</Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
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
    fontWeight: '700',
    fontSize: 15,
    borderRadius: 3,
    overflow: 'hidden',
    color: '#fff',
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
