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
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

// Components
import Alert from '../components/Alert';

const SignUpDetailsScreen = ({ route }) => {
  // Hooks
  const navigation = useNavigation();
  const { firstName, lastName, email, username, password, confirmPassword } =
    route.params;

  // Input state
  const [dateOfBirth, setDateOfBirth] = useState({
    month: '',
    day: '',
    year: '',
  });
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);

  // Input ref
  const lastNameRef = useRef();
  const emailRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const handleSubmit = () => {
    const newUser = {
      firstName,
      lastName,
      email,
      username,
      password,
      confirmPassword,
    };
    console.log(newUser);
  };

  return (
    <SafeAreaView style={styles.screenContainer}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            {/* <Text style={styles.logo}>geared</Text> */}

            <View style={styles.inputContainer}>
              <View style={styles.textInputContainer}>
                <Text style={styles.inputTitle}>Date of birth</Text>

                <View style={styles.dobContainer}>
                  <TextInput
                    style={styles.input}
                    value={dateOfBirth.month}
                    onChangeText={(value) => setDateOfBirth(value)}
                    placeholder="MM"
                    placeholderTextColor={'#a1a1aa'}
                    autoCapitalize="none"
                    returnKeyType="next"
                    keyboardType="numeric"
                    maxLength={2}
                    // onSubmitEditing={() => {
                    //   lastNameRef.current.focus();
                    // }}
                  />
                  <Text>/</Text>
                  <TextInput
                    style={styles.input}
                    value={dateOfBirth.day}
                    onChangeText={(value) => setDateOfBirth(value)}
                    placeholder="DD"
                    placeholderTextColor={'#a1a1aa'}
                    autoCapitalize="none"
                    returnKeyType="next"
                    keyboardType="numeric"
                    maxLength={2}
                    // onSubmitEditing={() => {
                    //   lastNameRef.current.focus();
                    // }}
                  />
                  <Text>/</Text>
                  <TextInput
                    style={styles.input}
                    value={dateOfBirth.year}
                    onChangeText={(value) => setDateOfBirth(value)}
                    placeholder="YYYY"
                    placeholderTextColor={'#a1a1aa'}
                    autoCapitalize="none"
                    returnKeyType="next"
                    keyboardType="numeric"
                    maxLength={4}
                    // onSubmitEditing={() => {
                    //   lastNameRef.current.focus();
                    // }}
                  />
                </View>
              </View>

              <View style={styles.textInputContainer}>
                <Text style={styles.inputTitle}>Bio</Text>

                <View style={styles.chevronContainer}>
                  <Text style={styles.optionalText}>optional</Text>
                  <Ionicons
                    name="ios-chevron-forward-outline"
                    size={22}
                    color="#71717a"
                  />
                </View>
              </View>

              <View style={styles.textInputContainer}>
                <Text style={styles.inputTitle}>Interests</Text>

                <View style={styles.chevronContainer}>
                  <Text style={styles.optionalText}>optional</Text>
                  <Ionicons
                    name="ios-chevron-forward-outline"
                    size={22}
                    color="#71717a"
                  />
                </View>
              </View>

              <View style={styles.profileImageSection}>
                <Text style={styles.inputTitle}>Profile image</Text>

                <Image
                  style={styles.profileImageContainer}
                  source={{
                    uri: 'https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg',
                  }}
                />
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
});

export default SignUpDetailsScreen;
