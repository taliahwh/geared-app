import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

// Components
import ModalComponent from '../Modal';
import Loader from '../Loader';
import Alert from '../Alert';

// Styles
import styles from '../../styles/ProfileSettingsRouteStyles';

// Actions
import { getUserDetails, updateProfile } from '../../actions/userActions';

const ProfileSettingsRoute = () => {
  // Hooks
  const navigation = useNavigation();
  const dispatch = useDispatch();

  // Redux state
  const { _id: userId } = useSelector((state) => state.userSignIn.userInfo);
  const {
    loading: loadingUserDetails,
    userDetails,
    error: errorUserDetails,
  } = useSelector((state) => state.userDetails);
  const { error: errorUpdateProfile, success: successUpdateProfile } =
    useSelector((state) => state.userDetails);

  // Modals
  const [interestsModalVisible, setInterestsModalVisible] = useState(false);
  const [bioModalVisible, setBioModalVisible] = useState(false);

  // Form state
  const [bio, setBio] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [interest1, setInterest1] = useState('');
  const [interest2, setInterest2] = useState('');
  const [interest3, setInterest3] = useState('');
  const [interest4, setInterest4] = useState('');
  const [website, setWebsite] = useState('');

  const handleSubmit = (data) => {
    const interests = [];
    interest1 &&
      interests.push({
        id: 1,
        name: interest1,
      });
    interest2 &&
      interests.push({
        id: 2,
        name: interest2,
      });
    interest3 &&
      interests.push({
        id: 3,
        name: interest3,
      });
    interest4 &&
      interests.push({
        id: 4,
        name: interest4,
      });

    dispatch(updateProfile(profileImage, bio, interests, fullName, website));
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setProfileImage(result.uri);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getUserDetails(userId));
    }, [dispatch])
  );

  return (
    <>
      {loadingUserDetails && <Loader />}
      {errorUserDetails && <Alert>{errorUserDetails}</Alert>}
      {userDetails && (
        <KeyboardAwareScrollView style={styles.container} enableOnAndroid>
          {errorUpdateProfile && <Alert>{errorUpdateProfile}</Alert>}
          {/* <ScrollView > */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>User Details</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.inputTitle}>Username</Text>

              <TextInput
                style={styles.disabledInputSection}
                // ref={register.username}
                value={userDetails.username}
                placeholder={userDetails.username}
                placeholderTextColor={'#a1a1aa'}
                maxLength={25}
                autoCapitalize="none"
                textContentType="username"
                editable={false}
                selectTextOnFocus={false}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputTitle}>Email</Text>

              <TextInput
                style={styles.disabledInputSection}
                value={userDetails.email}
                placeholder={userDetails.email}
                placeholderTextColor={'#a1a1aa'}
                maxLength={25}
                autoCapitalize="none"
                textContentType="emailAddress"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputTitle}>Password</Text>

              <TextInput
                style={styles.inputSection}
                value={password}
                onChangeText={(value) => setPassword(value)}
                name="password"
                placeholder="•••••••••••"
                placeholderTextColor={'#a1a1aa'}
                // maxLength={25}
                secureTextEntry={true}
                autoCapitalize="none"
                // textContentType="emailAddress"
              />
            </View>

            <View style={styles.imageInputContainer}>
              <Text style={styles.inputTitle}>Picture</Text>
              {!profileImage ? (
                <TouchableOpacity onPress={() => pickImage()} activeOpacity={1}>
                  <Image
                    style={styles.userImage}
                    source={{
                      uri: userDetails.profileImage,
                    }}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => pickImage()} activeOpacity={1}>
                  <Image
                    source={{ uri: profileImage }}
                    style={styles.userImage}
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About me</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.inputTitle}>Full name</Text>

              <TextInput
                style={styles.inputSection}
                value={fullName}
                onChangeText={(value) => setFullName(value)}
                name="fullName"
                placeholder={userDetails.fullName}
                placeholderTextColor={'#a1a1aa'}
                maxLength={25}
                // autoCapitalize="none"
                textContentType="name"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputTitle}>Date of birth</Text>

              <TextInput
                style={styles.disabledInputSection}
                value={userDetails.dateOfBirth}
                onChangeText={(value) => onChange(value)}
                placeholderTextColor={'#a1a1aa'}
                editable={false}
              />
            </View>

            <TouchableOpacity onPress={() => setInterestsModalVisible(true)}>
              <View style={styles.flexInputContainer}>
                <Text style={styles.flexInputTitle}>Interests</Text>

                <Text style={styles.flexPlaceholderSection}></Text>
                <Ionicons
                  name="ios-chevron-forward-outline"
                  size={24}
                  color="black"
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setBioModalVisible(true)}>
              <View style={styles.flexInputContainer}>
                <Text style={styles.flexInputTitle}>Bio</Text>

                <Text style={styles.flexPlaceholderSection}>
                  {userDetails.bio.length > 5
                    ? `${userDetails.bio.slice(0, 24)}...`
                    : 'Something about yourself...'}
                </Text>
                <Ionicons
                  name="ios-chevron-forward-outline"
                  size={24}
                  color="black"
                />
              </View>
            </TouchableOpacity>

            <View style={styles.inputContainer}>
              <Text style={styles.inputTitle}>My website</Text>

              <TextInput
                style={styles.inputSection}
                value={website}
                onChangeText={(value) => setWebsite(value)}
                name="website"
                placeholder="yoursite.com"
                placeholderTextColor={'#a1a1aa'}
                // maxLength={25}
                autoCapitalize="none"
                // textContentType="familyName"
              />
            </View>

            {/* Bio Modal */}
            <View style={styles.centeredView}>
              <Modal
                animationType="fade"
                transparent={true}
                visible={bioModalVisible}
                onRequestClose={() => {
                  Alert.alert('Modal has been closed.');
                  setBioModalVisible(!bioModalVisible);
                }}
              >
                <ModalComponent
                  header={'Bio'}
                  closeModal={() => setBioModalVisible(false)}
                  modal={true}
                  input={
                    <TextInput
                      style={styles.textInput}
                      value={bio}
                      onChangeText={(value) => setBio(value)}
                      placeholder={
                        userDetails.bio.length > 5
                          ? userDetails.bio
                          : 'Something about yourself...'
                      }
                      placeholderTextColor={'#a1a1aa'}
                      autoFocus={true}
                      name="bio"
                      autoCorrect={false}
                      returnKeyType="done"
                      maxLength={128}
                    />
                  }
                />
              </Modal>
            </View>

            {/* Interests Modal */}
            <View style={styles.centeredView}>
              <Modal
                animationType="fade"
                transparent={true}
                visible={interestsModalVisible}
                onRequestClose={() => {
                  Alert.alert('Modal has been closed.');
                  setInterestsModalVisible(!interestsModalVisible);
                }}
              >
                <ModalComponent
                  header={'Interests'}
                  closeModal={() => setInterestsModalVisible(false)}
                  modal={true}
                  input={
                    <View style={styles.modalContainer}>
                      <Text style={styles.modalDisplayText}>
                        Create a few interest tags to connect with other users
                        and make your profile more accessible
                      </Text>

                      <View style={styles.interestTagContainer}>
                        <TextInput
                          style={styles.interestInput}
                          value={interest1}
                          onChangeText={(value) => setInterest1(value)}
                          placeholder="Stephen Curry"
                          placeholderTextColor={'#a1a1aa'}
                          autoComplete={'off'}
                          autoCapitalize="words"
                          maxLength={128}
                        />
                        <TextInput
                          style={styles.interestInput}
                          value={interest2}
                          onChangeText={(value) => setInterest2(value)}
                          placeholder={
                            userDetails.interests.length > 1
                              ? userDetails.interests[1].name
                              : 'New York Yankees'
                          }
                          placeholderTextColor={'#a1a1aa'}
                          autoComplete={'off'}
                          autoCapitalize="words"
                          maxLength={128}
                        />
                        <TextInput
                          style={styles.interestInput}
                          value={interest3}
                          onChangeText={(value) => setInterest3(value)}
                          placeholder={
                            userDetails.interests.length > 2
                              ? userDetails.interests[2].name
                              : 'Anthony Edwards'
                          }
                          placeholderTextColor={'#a1a1aa'}
                          autoComplete={'off'}
                          autoCapitalize="words"
                          maxLength={128}
                        />
                        <TextInput
                          style={styles.interestInput}
                          value={interest4}
                          onChangeText={(value) => setInterest4(value)}
                          placeholder={
                            userDetails.interests.length > 3
                              ? userDetails.interests[3].name
                              : 'Phoenix Mercury'
                          }
                          placeholderTextColor={'#a1a1aa'}
                          autoComplete={'off'}
                          autoCapitalize="words"
                          maxLength={128}
                        />
                      </View>
                    </View>
                  }
                />
              </Modal>
            </View>

            <TouchableOpacity onPress={handleSubmit}>
              <Text style={styles.btn}>Save</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      )}
    </>
  );
};

export default ProfileSettingsRoute;
