import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useForm, Controller, Switch } from 'react-hook-form';

import ModalComponent from '../components/Modal';

const CreateListingScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [baseball, setBaseball] = useState(false);

  const {
    control,
    handleSubmit,
    // formState: { errors, isValid },
  } = useForm({
    mode: 'onBlur',
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.cameraBtnContainer}>
        <View style={styles.cameraIconContainer}>
          <Ionicons
            name="camera-outline"
            size={24}
            color="black"
            style={styles.cameraIcon}
          />
        </View>
        <View style={styles.cameraIconContainer}>
          <Ionicons
            name="camera-outline"
            size={24}
            color="black"
            style={styles.cameraIcon}
          />
        </View>
        <View style={styles.cameraIconContainer}>
          <Ionicons
            name="camera-outline"
            size={24}
            color="black"
            style={styles.cameraIcon}
          />
        </View>
        <View style={styles.cameraIconContainer}>
          <Ionicons
            name="camera-outline"
            size={24}
            color="black"
            style={styles.cameraIcon}
          />
        </View>
      </View>

      <View style={styles.descriptionContainer}>
        <Text style={styles.sectionHeader}>DESCRIPTION</Text>
        <Text style={styles.input}>
          Tell us about your item. Start with a headline, then add details
          including card brand and condition.
        </Text>
      </View>
      <Text style={styles.wordCount}>1000</Text>

      <View style={styles.tagsContainer}>
        <Text style={styles.sectionHeader}>TAGS</Text>
        <Text style={styles.input}>
          Provide up to three hashtags so that your card is easier to find by
          other users
        </Text>
      </View>
      <Text style={styles.tagsCount}>Hashtags: 3</Text>

      <View style={styles.infoContainer}>
        <Text style={styles.sectionHeader}>INFO</Text>

        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          activeOpacity={0.9}
        >
          <View style={styles.firstInfoOptionContainer}>
            <Text style={styles.infoOptionTitle}>Sport</Text>
            <View style={styles.textAndChevronContainer}>
              <Text style={styles.infoOptionSelect}>Select</Text>
              <Ionicons
                name="chevron-forward"
                size={24}
                color="black"
                style={styles.chevron}
              />
            </View>
          </View>
        </TouchableOpacity>

        <View style={styles.infoOptionContainer}>
          <Text style={styles.infoOptionTitle}>Condition</Text>
          <View style={styles.textAndChevronContainer}>
            <Text style={styles.infoOptionSelect}>Select</Text>
            <Ionicons
              name="chevron-forward"
              size={24}
              color="black"
              style={styles.chevron}
            />
          </View>
        </View>

        <View style={styles.infoOptionContainer}>
          <Text style={styles.infoOptionTitle}>Listing type</Text>
          <View style={styles.textAndChevronContainer}>
            <Text style={styles.infoOptionSelect}>Select</Text>
            <Ionicons
              name="chevron-forward"
              size={24}
              color="black"
              style={styles.chevron}
            />
          </View>
        </View>

        <View style={styles.infoOptionContainer}>
          <Text style={styles.infoOptionTitle}>Item price</Text>
          <View style={styles.textAndChevronContainer}>
            <Text style={styles.dollar}>$</Text>
          </View>
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
            <ModalComponent
              header={'Sport'}
              closeModal={() => setModalVisible(false)}
              modal={true}
              input={
                <ScrollView>
                  <View style={styles.modalOptionContainer}>
                    <Text style={styles.infoOptionTitle}>Baseball</Text>
                    <Ionicons
                      name="chevron-forward"
                      size={24}
                      color="black"
                      style={styles.chevron}
                    />
                  </View>
                  <View style={styles.modalOptionContainer}>
                    <Text style={styles.infoOptionTitle}>Football</Text>
                    <Ionicons
                      name="chevron-forward"
                      size={24}
                      color="black"
                      style={styles.chevron}
                    />
                  </View>
                  <View style={styles.modalOptionContainer}>
                    <Text style={styles.infoOptionTitle}>Men's Basketball</Text>
                    <Ionicons
                      name="chevron-forward"
                      size={24}
                      color="black"
                      style={styles.chevron}
                    />
                  </View>
                  <View style={styles.modalOptionContainer}>
                    <Text style={styles.infoOptionTitle}>Soccer</Text>
                    <Ionicons
                      name="chevron-forward"
                      size={24}
                      color="black"
                      style={styles.chevron}
                    />
                  </View>
                  <View style={styles.modalOptionContainer}>
                    <Text style={styles.infoOptionTitle}>
                      Women's Basketball
                    </Text>
                    <Ionicons
                      name="chevron-forward"
                      size={24}
                      color="black"
                      style={styles.chevron}
                    />
                  </View>
                </ScrollView>
              }
            />
          </Modal>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingTop: 25,
  },
  cameraBtnContainer: {
    dispaly: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  cameraIcon: {
    padding: 10,
  },
  cameraIconContainer: {
    color: '#a8a29e',
    borderColor: '#d6d3d1',
    borderWidth: 2,
    borderStyle: 'dashed',
  },
  descriptionContainer: {
    marginTop: 30,
    borderBottomWidth: 1,
    borderColor: '#d6d3d1',
  },
  sectionHeader: {
    fontWeight: '600',
    fontSize: 17,
    marginBottom: 8,
  },
  input: {
    color: '#a8a29e',
    fontSize: 15,
    marginBottom: 10,
  },
  wordCount: {
    width: '100%',
    textAlign: 'right',
    color: '#57534e',
    paddingTop: 3,
    fontSize: 13,
  },
  tagsContainer: {
    marginTop: 10,
    borderBottomWidth: 1,
    borderColor: '#d6d3d1',
  },
  tagsCount: {
    width: '100%',
    textAlign: 'left',
    color: '#57534e',
    paddingTop: 3,
    fontSize: 13,
  },
  infoContainer: {
    marginTop: 20,
  },
  infoOptionContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderColor: '#737373',
  },
  firstInfoOptionContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 10,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderColor: '#737373',
  },
  textAndChevronContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoOptionTitle: {
    fontSize: 17,
  },
  infoOptionSelect: {
    fontSize: 15,
    color: '#78716c',
  },
  chevron: {
    paddingLeft: 10,
    color: '#57534e',
  },
  dollar: {
    fontSize: 15,
    color: '#78716c',
    paddingRight: 5,
  },

  // Modal
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    backgroundColor: 'rgba(0,0,0,0.5)',
    height: '100%',
  },
  modalOptionContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderColor: '#737373',
  },
});

export default CreateListingScreen;
