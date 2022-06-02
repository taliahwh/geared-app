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

const bam = Asset.fromModule(require('../../assets/test-images/IMG_1676.jpg'));
const tatum = Asset.fromModule(require('../../assets/test-images/tatum.jpg'));

const IMAGES = [
  {
    id: 1,
    name: 'Bam Adebayo',
    src: bam,
  },
  {
    id: 2,
    name: 'Jayson Tatum',
    src: tatum,
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

const LikesRoute = () => {
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

export default LikesRoute;
