import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  SafeAreaView,
  Image,
  Modal,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

// Components
import Alert from '../components/Alert';
import ModalComponent from '../components/Modal';

// Styles
import styles from '../styles/SignUpDetailsScreenStyles';

// Actions
import { signUp } from '../actions/userActions';

const SignUpDetailsScreen = ({ route }) => {
  // Hooks
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { firstName, lastName, email, username, password, confirmPassword } =
    route.params;

  // Input state
  const [dateOfBirth, setDateOfBirth] = useState({
    month: '',
    day: '',
    year: '',
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

  // Modals
  const [bioModalVisible, setBioModalVisible] = useState(false);
  const [interestsModalVisible, setInterestsModalVisible] = useState(false);

  // State from redux store
  const { error: errorSignUp } = useSelector((state) => state.userSignUp);

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
    let dob;

    if (
      (dateOfBirth.month && dateOfBirth.month <= 0) ||
      dateOfBirth.month > 12 ||
      (dateOfBirth.month && dateOfBirth.month.length < 2)
    ) {
      setAlertMessage('Invalid date');
      return setShowAlert(true);
    }
    if (
      (dateOfBirth.day && dateOfBirth.day <= 0) ||
      dateOfBirth.day > 31 ||
      (dateOfBirth.day && dateOfBirth.day.length < 2)
    ) {
      setAlertMessage('Invalid date');
      return setShowAlert(true);
    }
    if (
      (dateOfBirth.year && dateOfBirth.year <= 1920) ||
      dateOfBirth.year > currentYear ||
      (dateOfBirth.year && dateOfBirth.year.length < 4)
    ) {
      setAlertMessage('Invalid date');
      return setShowAlert(true);
    }

    if (!dateOfBirth.month || !dateOfBirth.day || !dateOfBirth.year) {
      setAlertMessage('Invalid date');
      return setShowAlert(true);
    }

    dob = `${dateOfBirth.month}/${dateOfBirth.day}/${dateOfBirth.year}`;

    const interests = [];
    interests1 && interests.push(interests1);
    interests2 && interests.push(interests2);
    interests3 && interests.push(interests3);
    interests4 && interests.push(interests4);

    dispatch(
      signUp({
        firstName,
        lastName,
        email,
        username,
        password,
        confirmPassword,
        dob,
        bio,
        interests,
        profileImage:
          profileImage ||
          'https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg',
      })
    );
  };

  return (
    <SafeAreaView style={styles.screenContainer}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <Text style={styles.header}>Set up your account</Text>

            <View style={styles.inputContainer}>
              {errorSignUp && <Alert>{errorSignUp}</Alert>}
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

              {showAlert && <Text style={styles.dobAlert}>{alertMessage}</Text>}

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

                <View style={styles.imageAndOptionalText}>
                  <Text style={[styles.optionalText, { paddingRight: 10 }]}>
                    optional
                  </Text>
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
                            autoComplete={'off'}
                            maxLength={128}
                          />
                          <TextInput
                            style={styles.interestInput}
                            value={interests2}
                            onChangeText={(value) => setInterests2(value)}
                            placeholder="New York Yankees"
                            placeholderTextColor={'#a1a1aa'}
                            autoComplete={'off'}
                            maxLength={128}
                          />
                          <TextInput
                            style={styles.interestInput}
                            value={interests3}
                            onChangeText={(value) => setInterests3(value)}
                            placeholder="Atlanta Hawks"
                            placeholderTextColor={'#a1a1aa'}
                            autoComplete={'off'}
                            maxLength={128}
                          />
                          <TextInput
                            style={styles.interestInput}
                            value={interests4}
                            onChangeText={(value) => setInterests4(value)}
                            placeholder="Anthony Edwards"
                            placeholderTextColor={'#a1a1aa'}
                            autoComplete={'off'}
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

export default SignUpDetailsScreen;