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
import { useDispatch, useSelector } from 'react-redux';

// Components
import Alert from '../components/Alert';

// Actions
import { signIn } from '../actions/userActions';

const LoginScreen = () => {
  const navigation = useNavigation();
  const passwordRef = useRef();
  const dispatch = useDispatch();

  const { error: errorSignIn } = useSelector((state) => state.userSignIn);

  const {
    control,
    handleSubmit,
    // formState: { errors, isValid },
  } = useForm({
    mode: 'onBlur',
  });

  const onSubmit = (data) => {
    const { username, password } = data;
    dispatch(signIn(username, password));
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
              {errorSignIn && <Alert>{errorSignIn}</Alert>}

              <Controller
                control={control}
                name="username"
                render={({ field: { onChange, value, onBlur } }) => (
                  <TextInput
                    style={styles.input}
                    value={value}
                    onChangeText={(value) => onChange(value)}
                    onBlur={onBlur}
                    placeholder="Email or Username"
                    placeholderTextColor={'#a1a1aa'}
                    autoCapitalize="none"
                    returnKeyType="next"
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
                  />
                )}
              />

              <TouchableOpacity
                onPress={handleSubmit(onSubmit)}
                activeOpacity={0.5}
              >
                <Text style={styles.loginBtn}>Login</Text>
              </TouchableOpacity>

              <View style={styles.signUpTextContainer}>
                <Text style={styles.signUpText}>Don't have an account?</Text>
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => {
                    navigation.navigate('Sign Up');
                  }}
                >
                  <Text
                    style={{
                      textDecorationLine: 'underline',
                      fontWeight: '500',
                    }}
                  >
                    Sign Up
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
    height: '75%',
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

export default LoginScreen;
