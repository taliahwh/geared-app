import React from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { Header } from 'react-navigation-stack';

const KeyboardAvoidingWrapper = ({ children }) => {
  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={Header.HEIGHT + 30}
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      style={styles.wrapper}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        {children}
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

// just some styles for our app
const styles = StyleSheet.create({});

export default KeyboardAvoidingWrapper;
