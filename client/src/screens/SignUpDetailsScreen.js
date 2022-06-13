import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  SafeAreaView,
  Image,
  Modal,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

// Components
import Alert from '../components/Alert';
import ModalComponent from '../components/Modal';

const modalHeight = Dimensions.get('window').height / 4;

const SignUpDetailsScreen = ({ route }) => {
  // Hooks
  const navigation = useNavigation();
  const { firstName, lastName, email, username, password, confirmPassword } =
    route.params;

  // Input state
  const [dateOfBirth, setDateOfBirth] = useState({
    month: null,
    day: null,
    year: null,
  });
  const [profileImage, setProfileImage] = useState(null);
  const [bio, setBio] = useState('');
  const [interests1, setInterests1] = useState('');
  const [interests2, setInterests2] = useState('');
  const [interests3, setInterests3] = useState('');
  const [interests4, setInterests4] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);

  // Input ref
  const dayRef = useRef();
  const yearRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  // Modals
  const [bioModalVisible, setBioModalVisible] = useState(false);
  const [interestsModalVisible, setInterestsModalVisible] = useState(false);

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

  const handleSubmit = () => {
    let currentYear = new Date().getFullYear();
    const newUser = {
      firstName,
      lastName,
      email,
      username,
      password,
      confirmPassword,
    };
    console.log(dateOfBirth);

    if (
      (dateOfBirth.month && dateOfBirth.month <= 0) ||
      dateOfBirth.month > 12
    ) {
      setAlertMessage('Invalid date');
      return setShowAlert(true);
    }
    if ((dateOfBirth.day && dateOfBirth.day <= 0) || dateOfBirth.day > 31) {
      setAlertMessage('Invalid date');
      return setShowAlert(true);
    }
    if (
      (dateOfBirth.year && dateOfBirth.year <= 1920) ||
      dateOfBirth.year > currentYear
    ) {
      setAlertMessage('Invalid date');
      return setShowAlert(true);
    }
  };

  return (
    <SafeAreaView style={styles.screenContainer}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            {showAlert && <Alert>{alertMessage}</Alert>}

            <View style={styles.inputContainer}>
              <View style={styles.textInputContainer}>
                <Text style={styles.inputTitle}>Date of birth</Text>

                <View style={styles.dobContainer}>
                  <TextInput
                    style={styles.input}
                    value={dateOfBirth.month}
                    onChangeText={(value) =>
                      setDateOfBirth({ ...dateOfBirth, month: value })
                    }
                    placeholder="MM"
                    placeholderTextColor={'#a1a1aa'}
                    autoCapitalize="none"
                    returnKeyType="next"
                    keyboardType="numeric"
                    maxLength={2}
                    onSubmitEditing={() => {
                      dayRef.current.focus();
                    }}
                  />
                  <Text>/</Text>
                  <TextInput
                    style={styles.input}
                    ref={dayRef}
                    value={dateOfBirth.day}
                    onChangeText={(value) =>
                      setDateOfBirth({ ...dateOfBirth, day: value })
                    }
                    placeholder="DD"
                    placeholderTextColor={'#a1a1aa'}
                    autoCapitalize="none"
                    returnKeyType="next"
                    keyboardType="numeric"
                    maxLength={2}
                    onSubmitEditing={() => {
                      yearRef.current.focus();
                    }}
                  />
                  <Text>/</Text>
                  <TextInput
                    style={styles.input}
                    ref={yearRef}
                    value={dateOfBirth.year}
                    onChangeText={(value) =>
                      setDateOfBirth({ ...dateOfBirth, year: value })
                    }
                    placeholder="YYYY"
                    placeholderTextColor={'#a1a1aa'}
                    autoCapitalize="none"
                    returnKeyType="done"
                    keyboardType="numeric"
                    maxLength={4}
                    onSubmitEditing={() => {
                      yearRef.current.focus();
                    }}
                  />
                </View>
              </View>

              <View style={styles.textInputContainer}>
                <Text style={styles.inputTitle}>Bio</Text>

                <TouchableOpacity
                  onPress={() => setBioModalVisible(true)}
                  activeOpacity={0.8}
                >
                  <View style={styles.chevronContainer}>
                    <Text style={styles.optionalText}>optional</Text>
                    <Ionicons
                      name="ios-chevron-forward-outline"
                      size={22}
                      color="#71717a"
                    />
                  </View>
                </TouchableOpacity>
              </View>

              <View style={styles.textInputContainer}>
                <Text style={styles.inputTitle}>Interests</Text>

                <TouchableOpacity
                  onPress={() => setInterestsModalVisible(true)}
                  activeOpacity={0.8}
                >
                  <View style={styles.chevronContainer}>
                    <Text style={styles.optionalText}>optional</Text>
                    <Ionicons
                      name="ios-chevron-forward-outline"
                      size={22}
                      color="#71717a"
                    />
                  </View>
                </TouchableOpacity>
              </View>

              <View style={styles.profileImageSection}>
                <Text style={styles.inputTitle}>Profile image</Text>

                {!profileImage ? (
                  <TouchableOpacity
                    onPress={() => pickImage()}
                    activeOpacity={1}
                  >
                    <Image
                      style={styles.profileImageContainer}
                      source={{
                        uri: 'https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg',
                      }}
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => pickImage()}
                    activeOpacity={1}
                  >
                    <Image
                      source={{ uri: profileImage }}
                      style={{ width: 30, height: 30, borderRadius: 100 }}
                    />
                  </TouchableOpacity>
                )}
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
                        placeholder="Something about yourself..."
                        placeholderTextColor={'#a1a1aa'}
                        autoFocus={true}
                        returnKeyType="done"
                        maxLength={128}
                      />
                    }
                  />
                </Modal>
              </View>

              {/* Listing Type Modal */}
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
                            value={interests1}
                            onChangeText={(value) => setInterests1(value)}
                            placeholder="Stephen Curry"
                            placeholderTextColor={'#a1a1aa'}
                            // autoFocus={true}
                            // returnKeyType="done"
                            maxLength={128}
                          />
                          <TextInput
                            style={styles.interestInput}
                            value={interests2}
                            onChangeText={(value) => setInterests2(value)}
                            placeholder="New York Yankees"
                            placeholderTextColor={'#a1a1aa'}
                            // autoFocus={true}
                            // returnKeyType="done"
                            maxLength={128}
                          />
                          <TextInput
                            style={styles.interestInput}
                            value={interests3}
                            onChangeText={(value) => setInterests3(value)}
                            placeholder="Atlanta Hawks"
                            placeholderTextColor={'#a1a1aa'}
                            // autoFocus={true}
                            // returnKeyType="done"
                            maxLength={128}
                          />
                          <TextInput
                            style={styles.interestInput}
                            value={interests4}
                            onChangeText={(value) => setInterests4(value)}
                            placeholder="Anthony Edwards"
                            placeholderTextColor={'#a1a1aa'}
                            // autoFocus={true}
                            // returnKeyType="done"
                            maxLength={128}
                          />
                        </View>
                      </View>
                    }
                  />
                </Modal>
              </View>

              <TouchableOpacity onPress={handleSubmit}>
                <Text style={styles.signUpBtn}>Sign Up</Text>
              </TouchableOpacity>

              <View style={styles.signUpTextContainer}>
                <Text style={styles.signUpText}>Have an account?</Text>
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => navigation.navigate('Login')}
                >
                  <Text
                    style={{
                      textDecorationLine: 'underline',
                      fontWeight: '500',
                    }}
                  >
                    Login
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    fontSize: 45,
    fontWeight: '800',
    fontStyle: 'italic',
    // textAlign: 'center',
  },
  container: {
    display: 'flex',
    // backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%',
  },
  textInputContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#d4d4d4',
    paddingBottom: 7,
  },
  inputTitle: {
    fontSize: 16,
  },
  chevronContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionalText: {
    fontSize: 13,
    color: '#a1a1aa',
    marginRight: 5,
  },
  dobContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    paddingHorizontal: 7,
  },
  profileImageSection: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // marginVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#d4d4d4',
    paddingBottom: 7,
  },
  profileImageContainer: {
    borderWidth: 1,
    borderColor: '#d4d4d4',
    height: 30,
    width: 30,
    borderRadius: 100,
  },
  signUpBtn: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    backgroundColor: '#3E5E7E',
    color: '#fff',
    paddingVertical: 11,
    marginTop: 15,
  },
  signUpTextContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 13,
  },
  signUpText: {
    textAlign: 'center',
    paddingRight: 5,
  },
  // Modal

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    backgroundColor: 'rgba(0,0,0,0.5)',
    height: '100%',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 5,
    paddingTop: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: modalHeight,
    width: '100%',
  },
  textInput: {
    height: 40,
    borderColor: '#000000',
    paddingHorizontal: 10,
  },
  modalContainer: {
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  modalDisplayText: {
    fontSize: 15,
    color: '#3f3f46',
    textAlign: 'center',
  },
  interestTagContainer: {
    marginTop: 15,
  },
  interestInput: {
    borderBottomWidth: 1,
    borderColor: '#d4d4d4',
    marginVertical: 10,
    paddingVertical: 7,
    paddingHorizontal: 7,
  },
});

export default SignUpDetailsScreen;
