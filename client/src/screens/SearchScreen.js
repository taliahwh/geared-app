import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SearchScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.textInputContainer}>
          <Ionicons
            name="search-outline"
            size={20}
            color="black"
            style={styles.searchIcon}
          />
          <TextInput
            // onChangeText={onChangeNumber}
            // value={number}
            placeholder="Search for anything"
            placeholderTextColor={'#a1a1aa'}
            // maxLength={45}
            style={styles.textInput}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    backgroundColor: '#fff',
    height: 50,
    display: 'flex',
    alignItems: 'center',
  },
  textInputContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '90%',
    backgroundColor: 'pink',
    backgroundColor: '#e4e4e7',
    paddingVertical: 7,
    borderRadius: 2,
  },
  textInput: {
    width: '85%',
    // backgroundColor: 'pink',
  },
  searchIcon: {
    marginHorizontal: 10,
    color: '#71717a',
    width: '5%',
    // backgroundColor: 'orange',
  },
});

export default SearchScreen;
