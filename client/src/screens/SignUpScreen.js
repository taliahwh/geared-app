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
import { useForm, Controller } from 'react-hook-form';

const SignUpScreen = () => {
  const navigation = useNavigation();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const {
    control,
    handleSubmit,
    // formState: { errors, isValid },
  } = useForm({
    mode: 'onBlur',
  });

  return (
    <SafeAreaView style={styles.screenContainer}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <Text style={styles.logo}>geared</Text>

            <View style={styles.inputContainer}>
              <Controller
                control={control}
                name="firstName"
                render={({ field: { onChange, value, onBlur } }) => (
                  <TextInput
                    style={styles.input}
                    value={value}
                    onChangeText={(value) => onChange(value)}
                    onBlur={onBlur}
                    placeholder="First name"
                    placeholderTextColor={'#a1a1aa'}
                    autoCapitalize="none"
                    returnKeyType="next"
                    onSubmitEditing={() => {
                      lastNameRef.current.focus();
                    }}
                  />
                )}
              />
              <Controller
                control={control}
                name="lastName"
                render={({ field: { onChange, value, onBlur } }) => (
                  <TextInput
                    style={styles.input}
                    value={value}
                    onChangeText={(value) => onChange(value)}
                    onBlur={onBlur}
                    placeholder="Last name"
                    placeholderTextColor={'#a1a1aa'}
                    autoCapitalize="none"
                    returnKeyType="next"
                    ref={lastNameRef}
                    onSubmitEditing={() => {
                      emailRef.current.focus();
                    }}
                  />
                )}
              />
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, value, onBlur } }) => (
                  <TextInput
                    style={styles.input}
                    value={value}
                    onChangeText={(value) => onChange(value)}
                    onBlur={onBlur}
                    placeholder="Email address"
                    placeholderTextColor={'#a1a1aa'}
                    autoCapitalize="none"
                    returnKeyType="next"
                    ref={emailRef}
                    onSubmitEditing={() => {
                      usernameRef.current.focus();
                    }}
                  />
                )}
              />
              <Controller
                control={control}
                name="username"
                render={({ field: { onChange, value, onBlur } }) => (
                  <TextInput
                    style={styles.input}
                    value={value}
                    onChangeText={(value) => onChange(value)}
                    onBlur={onBlur}
                    placeholder="Username"
                    placeholderTextColor={'#a1a1aa'}
                    autoCapitalize="none"
                    returnKeyType="next"
                    ref={usernameRef}
                    onSubmitEditing={() => {
                      passwordRef.current.focus();
                    }}
                  />
                )}
              />
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, value, onBlur } }) => (
                  <TextInput
                    style={styles.input}
                    value={value}
                    onChangeText={(value) => onChange(value)}
                    onBlur={onBlur}
                    placeholder="Password"
                    placeholderTextColor={'#a1a1aa'}
                    autoCapitalize="none"
                    ref={passwordRef}
                    secureTextEntry
                    onSubmitEditing={() => {
                      confirmPasswordRef.current.focus();
                    }}
                  />
                )}
              />
              <Controller
                control={control}
                name="confirmPassword"
                render={({ field: { onChange, value, onBlur } }) => (
                  <TextInput
                    style={styles.input}
                    value={value}
                    onChangeText={(value) => onChange(value)}
                    onBlur={onBlur}
                    placeholder="Confirm password"
                    placeholderTextColor={'#a1a1aa'}
                    autoCapitalize="none"
                    ref={confirmPasswordRef}
                    secureTextEntry
                  />
                )}
              />

              <Text style={styles.loginBtn}>Sign Up</Text>
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
