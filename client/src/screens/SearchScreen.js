import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Notifications from 'expo-notifications';
import { launchImageLibrary } from 'react-native-image-picker';

const SearchScreen = () => {
  const handlePushNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Title',
        body: 'body',
        data: { data: 'data goes here' },
      },
      trigger: { seconds: 2 },
    });
  };

  const handleUpload = async () => {
    const options = {
      title: 'Select Image',
      type: 'library',
      options: {
        maxHeight: 200,
        maxWidth: 200,
        selectionLimit: 1,
        mediaType: 'photo',
        includeBase64: false,
      },
    };

    const image = await launchImageLibrary(options);
    console.log(image);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.textInputContainer}>
          <Ionicons
            name="search-outline"
            size={20}
            color="black"
            style={styles.searchIcon}
          />
          <TextInput
            // onChangeText={onChangeNumber}
            // value={number}
            placeholder="Search for anything"
            placeholderTextColor={'#a1a1aa'}
            // maxLength={45}
            style={styles.textInput}
          />
        </View>
      </View>
      <TouchableOpacity onPress={handlePushNotification}>
        <Text style={styles.notificationBtn}>Push Notification</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleUpload}>
        <Text style={styles.uploadBtn}>Upload</Text>
      </TouchableOpacity>
      {/* <Image
        // source={require('../../../uploads/image-1658343811184.jpg')}
        style={{ width: 50, height: 50 }}
      /> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    backgroundColor: '#fff',
    height: 50,
    display: 'flex',
    alignItems: 'center',
  },
  textInputContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '90%',
    backgroundColor: 'pink',
    backgroundColor: '#e4e4e7',
    paddingVertical: 7,
    borderRadius: 2,
  },
  textInput: {
    width: '85%',
    // backgroundColor: 'pink',
  },
  searchIcon: {
    marginHorizontal: 10,
    color: '#71717a',
    width: '5%',
    // backgroundColor: 'orange',
  },
  notificationBtn: {
    marginTop: 20,
    marginLeft: 125,
    display: 'flex',
    justifyContent: 'center',
    width: 150,
    textAlign: 'center',
    backgroundColor: 'gray',
    padding: 10,
    fontWeight: '500',
    color: 'white',
    fontSize: 15,
  },
  uploadBtn: {
    marginTop: 20,
    marginLeft: 125,
    display: 'flex',
    justifyContent: 'center',
    width: 150,
    textAlign: 'center',
    backgroundColor: 'black',
    padding: 10,
    fontWeight: '500',
    color: 'white',
    fontSize: 15,
  },
});

export default SearchScreen;
