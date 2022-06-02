import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  Modal,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import moment from 'moment';
import { Ionicons } from '@expo/vector-icons';

import SectionedMultiSelect from 'react-native-sectioned-multi-select';

// Components
import KeyboardAvoidingComponent from '../KeyboardAvoidingComponent';

// Styles
import styles from '../../styles/ProfileSettingsRouteStyles';

const ProfileSettingsRoute = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState('');
  const [open, setOpen] = useState(false);
  const formattedDOB = moment(date).format('MM/D/YYYY');
  const dateToday = moment().format('L');
  const [bio, setBio] = useState('Edit bio screen');

  const {
    control,
    handleSubmit,
    // formState: { errors, isValid },
  } = useForm({
    mode: 'onBlur',
  });

  const onSubmit = (data) => {
    const { username, email, password, firstName, lastName, bio, website } =
      data;

    const updatedProfileSettings = {
      username: username || '',
      email: email || '',
      password: password || '',
      firstName: firstName || '',
      lastName: lastName || '',
      date: formattedDOB === 'Invalid date' ? '' : formattedDOB,
      bio: bio || '',
      website: website || '',
    };
    console.log(updatedProfileSettings);
  };

  const showDatePicker = () => {
    setOpen(true);
  };

  const hideDatePicker = () => {
    setOpen(false);
  };

  const handleConfirm = (date) => {
    setDate(date);
    hideDatePicker();
  };

  return (
    <KeyboardAwareScrollView style={styles.container} enableOnAndroid>
      {/* <ScrollView > */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>User Details</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.inputTitle}>Username</Text>

          <Controller
            control={control}
            name="username"
            render={({ field: { onChange, value, onBlur } }) => (
              <TextInput
                style={styles.inputSection}
                // ref={register.username}
                value={value}
                onChangeText={(value) => onChange(value)}
                onBlur={onBlur}
                placeholder="fav_five"
                placeholderTextColor={'#a1a1aa'}
                maxLength={25}
                autoCapitalize="none"
                textContentType="username"
              />
            )}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputTitle}>Email</Text>
          {/* <Controller
            control={control}
            name="username"
            render={({ field: { onChange, value, onBlur } }) => ()} */}
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value, onBlur } }) => (
              <TextInput
                style={styles.inputSection}
                value={value}
                onChangeText={(value) => onChange(value)}
                onBlur={onBlur}
                placeholder="example@geared.com"
                placeholderTextColor={'#a1a1aa'}
                maxLength={25}
                autoCapitalize="none"
                textContentType="emailAddress"
              />
            )}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputTitle}>Password</Text>
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value, onBlur } }) => (
              <TextInput
                style={styles.inputSection}
                value={value}
                onChangeText={(value) => onChange(value)}
                onBlur={onBlur}
                placeholder=""
                placeholderTextColor={'#a1a1aa'}
                // maxLength={25}
                secureTextEntry={true}
                autoCapitalize="none"
                // textContentType="emailAddress"
              />
            )}
          />
        </View>

        <View style={styles.imageInputContainer}>
          <Text style={styles.inputTitle}>Picture</Text>
          <Image
            style={styles.userImage}
            source={{
              uri: 'https://i0.wp.com/sneakerhistory.com/wp-content/uploads/2019/03/fab-five-air-force-max-black-socks.jpg?fit=1280%2C1600&ssl=1',
            }}
          />
        </View>
        {/* <View style={styles.border} /> */}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About me</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.inputTitle}>First name</Text>
          <Controller
            control={control}
            name="firstName"
            render={({ field: { onChange, value, onBlur } }) => (
              <TextInput
                style={styles.inputSection}
                value={value}
                onChangeText={(value) => onChange(value)}
                onBlur={onBlur}
                placeholder="Dennis"
                placeholderTextColor={'#a1a1aa'}
                maxLength={25}
                // autoCapitalize="none"
                textContentType="name"
              />
            )}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputTitle}>Last name</Text>
          <Controller
            control={control}
            name="lastName"
            render={({ field: { onChange, value, onBlur } }) => (
              <TextInput
                style={styles.inputSection}
                value={value}
                onChangeText={(value) => onChange(value)}
                onBlur={onBlur}
                placeholder="Rodman"
                placeholderTextColor={'#a1a1aa'}
                maxLength={25}
                // autoCapitalize="none"
                textContentType="familyName"
              />
            )}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputTitle}>Date of birth</Text>
          <TouchableOpacity onPress={showDatePicker}>
            <Text style={{ color: '#000' }}>
              {formattedDOB === 'Invalid date' ? dateToday : formattedDOB}
            </Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={open}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('Edit Interests')}>
          <View style={styles.flexInputContainer}>
            <Text style={styles.flexInputTitle}>Interests</Text>

            <Text style={styles.flexPlaceholderSection}>
              Pistons, Cade Cunningham, RJ Barrett
            </Text>
            <Ionicons
              name="ios-chevron-forward-outline"
              size={24}
              color="black"
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <View style={styles.flexInputContainer}>
            <Text style={styles.flexInputTitle}>Bio</Text>

            <Text style={styles.flexPlaceholderSection}>
              Something about yourself...
            </Text>
            <Ionicons
              name="ios-chevron-forward-outline"
              size={24}
              color="black"
            />
          </View>
        </TouchableOpacity>

        <View style={styles.inputContainer}>
          <Text style={styles.inputTitle}>My website</Text>
          <Controller
            control={control}
            name="website"
            render={({ field: { onChange, value, onBlur } }) => (
              <TextInput
                style={styles.inputSection}
                value={value}
                onChangeText={(value) => onChange(value)}
                onBlur={onBlur}
                placeholder="www.yoursite.com"
                placeholderTextColor={'#a1a1aa'}
                // maxLength={25}
                autoCapitalize="none"
                // textContentType="familyName"
              />
            )}
          />
        </View>

        {/* Modal */}

        <View style={styles.centeredView}>
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              setModalVisible(!modalVisible);
            }}
          >
            <KeyboardAvoidingComponent
              header={'Bio'}
              closeModal={() => setModalVisible(false)}
              modal={true}
              textInput={
                <Controller
                  control={control}
                  name="bio"
                  render={({ field: { onChange, value, onBlur } }) => (
                    <TextInput
                      style={styles.textInput}
                      value={value}
                      onChangeText={(value) => onChange(value)}
                      onBlur={onBlur}
                      placeholder="Something about yourself..."
                      placeholderTextColor={'#a1a1aa'}
                      autoFocus={true}
                      returnKeyType="done"
                      maxLength={128}
                    />
                  )}
                />
              }
            />
          </Modal>
        </View>

        <TouchableOpacity onPress={handleSubmit(onSubmit)}>
          <Text style={styles.btn}>Save</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default ProfileSettingsRoute;
