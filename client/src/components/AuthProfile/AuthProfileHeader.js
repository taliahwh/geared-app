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
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

// Components
import Loader from '../Loader';
import ProfileHeaderLoader from '../Loaders/ProfileHeaderLoader';
import AlertMessage from '../AlertMessage';

// Actions
import { logout, getUserDetails } from '../../actions/userActions';

const TagRender = ({ name }) => <Text style={styles.tags}>{name}</Text>;
const Separator = () => {
  return <View style={{ width: 1, backgroundColor: '#fff' }} />;
};

const AuthProfileHeader = () => {
  const dispatch = useDispatch();

  // State from redux
  const { _id: userId } = useSelector((state) => state.userSignIn.userInfo);
  const {
    loading: loadingUserDetails,
    userDetails,
    error: errorUserDetails,
  } = useSelector((state) => state.userDetails);

  const handleLogout = () => {
    dispatch(logout());
  };

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getUserDetails(userId));
    }, [dispatch])
  );

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
                renderItem={({ item }) => <TagRender name={item.name} />}
                keyExtractor={(item) => item.id}
                ItemSeparatorComponent={Separator}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              />
            </View>
          )}

          <View style={styles.followersAndShareContainer}>
            <View style={styles.followersContainer}>
              <View>
                <Text style={styles.count}>113</Text>
                <Text>followers</Text>
              </View>
              <View>
                <Text style={styles.count}>196</Text>
                <Text>following</Text>
              </View>
            </View>
            <View style={styles.shareBtnContainer}>
              <Text style={styles.shareBtn}>Share collection</Text>
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
  shareBtnContainer: {
    flex: 6,
    marginLeft: 25,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shareBtn: {
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
    borderWidth: 1,
    borderColor: '#d4d4d4',
    padding: 3,
  },
  website: {
    color: '#3E5E7E',
    fontWeight: '500',
    marginTop: 3,
  },
});

export default AuthProfileHeader;