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
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Components
import AlertMessage from '../components/AlertMessage';

const SignUpScreen = () => {
  // Hooks
  const navigation = useNavigation();
  // Input state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  // Input ref
  const lastNameRef = useRef();
  const emailRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const handleSubmit = () => {
    if (!firstName) {
      setAlertMessage('First name is required');
      return setShowAlert(true);
    }
    if (!lastName) {
      setAlertMessage('Last name is required');
      return setShowAlert(true);
    }
    if (!email) {
      setAlertMessage('Email is required');
      return setShowAlert(true);
    }
    if (!password) {
      setAlertMessage('Password is required');
      return setShowAlert(true);
    }
    if (!confirmPassword) {
      setAlertMessage('Confirm password is required');
      return setShowAlert(true);
    }
    if (password !== confirmPassword) {
      setAlertMessage('Passwords do not match');
      return setShowAlert(true);
    }

    // Password strength requirement (uppercase, lowercase, number and special char)
    if (password.length < 8) {
      setAlertMessage('Password must be at least 8 characters.');
      return setShowAlert(true);
    }

    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasNonalphas = /\W/.test(password);
    if (!hasUpperCase || !hasLowerCase || !hasNumbers || !hasNonalphas) {
      setAlertMessage(
        'Password must be at least 8 characters, contain an upper and lowercase letter, a number, and special character.'
      );
      return setShowAlert(true);
    }

    navigation.navigate('Sign Up Details', {
      firstName,
      lastName,
      email,
      username,
      password,
      confirmPassword,
    });
  };

  return (
    <SafeAreaView style={styles.screenContainer}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <Text style={styles.logo}>geared</Text>

            <View style={styles.inputContainer}>
              {showAlert && <AlertMessage>{AlertMessageMessage}</AlertMessage>}

              <TextInput
                style={styles.input}
                value={firstName}
                onChangeText={(value) => setFirstName(value)}
                textContentType="name"
                placeholder="First name"
                placeholderTextColor={'#a1a1aa'}
                autoCapitalize="words"
                returnKeyType="next"
                onSubmitEditing={() => {
                  lastNameRef.current.focus();
                }}
              />

              <TextInput
                style={styles.input}
                value={lastName}
                onChangeText={(value) => setLastName(value)}
                textContentType="familyName"
                placeholder="Last name"
                placeholderTextColor={'#a1a1aa'}
                autoCapitalize="words"
                returnKeyType="next"
                ref={lastNameRef}
                onSubmitEditing={() => {
                  emailRef.current.focus();
                }}
              />

              <TextInput
                style={styles.input}
                value={email}
                onChangeText={(value) => setEmail(value)}
                textContentType="emailAddress"
                placeholder="Email address"
                placeholderTextColor={'#a1a1aa'}
                autoCapitalize="none"
                autoComplete="email"
                returnKeyType="next"
                ref={emailRef}
                onSubmitEditing={() => {
                  usernameRef.current.focus();
                }}
              />

              <TextInput
                style={styles.input}
                value={username}
                onChangeText={(value) => setUsername(value)}
                placeholder="Username"
                placeholderTextColor={'#a1a1aa'}
                autoCapitalize="none"
                returnKeyType="next"
                ref={usernameRef}
                onSubmitEditing={() => {
                  passwordRef.current.focus();
                }}
              />

              <TextInput
                style={styles.input}
                value={password}
                onChangeText={(value) => setPassword(value)}
                placeholder="Password"
                placeholderTextColor={'#a1a1aa'}
                autoCapitalize="none"
                ref={passwordRef}
                secureTextEntry
                onSubmitEditing={() => {
                  confirmPasswordRef.current.focus();
                }}
              />

              <TextInput
                style={styles.input}
                value={confirmPassword}
                onChangeText={(value) => setConfirmPassword(value)}
                placeholder="Confirm password"
                placeholderTextColor={'#a1a1aa'}
                autoCapitalize="none"
                ref={confirmPasswordRef}
                secureTextEntry
              />

              <TouchableOpacity activeOpacity={0.5} onPress={handleSubmit}>
                <Text style={styles.loginBtn}>Continue</Text>
              </TouchableOpacity>

              <View style={styles.signUpTextContainer}>
                <Text style={styles.signUpText}>Have an account?</Text>
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => {
                    navigation.navigate('Login');
                  }}
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
    width: '100%',
    height: '85%',
    display: 'flex',
    // backgroundColor: 'orange',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%',
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#d4d4d4',
    marginVertical: 10,
    paddingVertical: 7,
    paddingHorizontal: 7,
  },
  loginBtn: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    backgroundColor: '#3E5E7E',
    color: '#fff',
    paddingVertical: 11,
    marginTop: 7,
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

export default SignUpScreen;
