import React from 'react';
import {
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
  Pressable,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

const containerHeight = Dimensions.get('window').height / 2;

const Modal = ({ modal = false, closeModal, header, input }) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        {modal && (
          <View style={styles.inner}>
            <View style={styles.headerContainer}>
              <Pressable onPress={closeModal}>
                <Ionicons name="close-outline" size={26} color="#ef4444" />
              </Pressable>

              <Text style={styles.headerTitle}>{header}</Text>
              <Pressable onPress={closeModal}>
                <Ionicons name="ios-checkmark-sharp" size={24} color="black" />
              </Pressable>
            </View>
            {input}
          </View>
        )}
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  inner: {
    paddingVertical: 5,
    borderRadius: 5,
    // justifyContent: 'space-around',
    backgroundColor: '#fff',
    height: containerHeight,
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderColor: '#d4d4d4',
    marginBottom: 5,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '700',
  },
  headerIcon: {},
  textInput: {
    height: 40,
    borderColor: '#000000',
    paddingHorizontal: 10,
  },
  btnContainer: {
    backgroundColor: 'white',
    marginTop: 12,
  },
});

export default Modal;