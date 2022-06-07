import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

// Actions
import { logout } from '../actions/userActions';

const TAG_NAMES = [
  {
    id: 1,
    name: 'Cade Cunningham',
  },
  {
    id: 2,
    name: 'Pistons',
  },
  {
    id: 3,
    name: 'RJ Barrett',
  },
  {
    id: 4,
    name: 'Zion Williamson',
  },
];

const TagRender = ({ name }) => <Text style={styles.tags}>{name}</Text>;
const Separator = () => {
  return <View style={{ width: 1, backgroundColor: '#fff' }} />;
};

const ProfileHeader = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <View style={styles.container}>
      <View style={styles.userInfoContainer}>
        <Image
          style={styles.userImage}
          source={{
            uri: 'https://i0.wp.com/sneakerhistory.com/wp-content/uploads/2019/03/fab-five-air-force-max-black-socks.jpg?fit=1280%2C1600&ssl=1',
          }}
        />
        <View style={styles.userNameContainer}>
          <Text style={styles.userDisplayName}>Dennis Rodman</Text>
          <Text style={styles.username}>@fab_five</Text>
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
          {/* <TouchableOpacity onPress={() => console.log('Pressed')}>
            <Ionicons name="ellipsis-horizontal" size={24} color="black" />
          </TouchableOpacity> */}
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

      <Text style={styles.description}>
        Detroit Pistons, Tigers, Lions fan. Open to some trading. Cards ship
        within two days.
      </Text>

      <View style={styles.tagsContainer}>
        {/* <Text style={styles.lookingFor}>Collecting:</Text> */}
        <FlatList
          data={TAG_NAMES}
          renderItem={({ item }) => <TagRender name={item.name} />}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={Separator}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      </View>

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
});

export default ProfileHeader;
