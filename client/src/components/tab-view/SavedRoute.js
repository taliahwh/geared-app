import React from 'react';
import { Asset } from 'expo-asset';
import {
  FlatList,
  Image,
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const thirdWindowWidth = Dimensions.get('window').width / 3;

const marcus = Asset.fromModule(require('../../assets/test-images/marcus.jpg'));
const ayton = Asset.fromModule(require('../../assets/test-images/ayton.jpg'));
const maxey = Asset.fromModule(require('../../assets/test-images/maxey.jpg'));
const jb = Asset.fromModule(require('../../assets/test-images/jb.jpg'));

const IMAGES = [
  {
    id: 3,
    name: 'Marcus Smart',
    src: marcus,
  },
  {
    id: 4,
    name: 'Deandre Ayton',
    src: ayton,
  },
  {
    id: 5,
    name: 'Tyrese Maxey',
    src: maxey,
  },
  {
    id: 6,
    name: 'Jaylen Brown',
    src: jb,
  },
];

const ImageRender = ({ src }) => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={src} />
    </View>
  );
};
const Separator = () => {
  return <View style={{ width: 1, backgroundColor: '#fff' }} />;
};

const SavedRoute = () => {
  const navigation = useNavigation();
  return (
    <FlatList
      data={IMAGES}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => {
            /* 1. Navigate to the Details route with params */
            navigation.navigate('Post Details', {
              itemId: item.id,
              name: item.name,
            });
          }}
        >
          <ImageRender src={item.src} />
        </TouchableOpacity>
      )}
      numColumns={3}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={Separator}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    margin: 0.7,
  },
  image: {
    justifyContent: 'center',
    alignItems: 'center',
    height: thirdWindowWidth,
    width: thirdWindowWidth,
  },
});

export default SavedRoute;
