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

/**
 * KeyboardAvoidingComponent
 * * Component that uses KeyboardAvoidingView helper to display text inputs without keyboard interefence.
 * * It is rendered in a modal, as an inline text input with title property, or as a standalone text input
 * @param textInput returns a TextInput
 * @param modal If true, returns a header with props that are required: leftHeaderBtn, rightHeaderBtn, and closeModal (default: false)
 * @param leftHeaderButton Left header btn of modal, Ionicons recommended for ease of use
 * @param rightHeaderButton Right header btn of modal, Ionicons recommended for ease of use
 * todo: finish modal implementation
 * todo: add inline styling option
 * todo: add standalone input option
 */

const containerHeight = Dimensions.get('window').height / 4;

const KeyboardAvoidingComponent = ({
  modal = false,
  textValue,
  onChangeText,
  onSubmit,
  closeModal,
  header,
  textInput,
}) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        {modal && (
          <View style={styles.inner}>
            <View style={styles.headerContainer}>
              <Ionicons name="ios-checkmark-sharp" size={24} color="white" />
              <Text style={styles.headerTitle}>{header}</Text>
              <Pressable onPress={closeModal}>
                <Ionicons name="ios-checkmark-sharp" size={24} color="black" />
              </Pressable>
            </View>
            {/* <TextInput
              style={styles.textInput}
              // value={textValue}
              placeholder="Edit your bio..."
              placeholderTextColor={'#a1a1aa'}
              autoFocus={true}
              returnKeyType="done"
              // multiline={true}
              onEndEditing={closeModal}
            /> */}
            {textInput}
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

export default KeyboardAvoidingComponent;
