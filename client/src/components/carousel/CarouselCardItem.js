import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';

const CarouselCardItem = ({ item }) => {
  return <Image source={{ uri: item.imgUrl }} style={styles.image} />;
};

const styles = StyleSheet.create({
  image: {
    height: 350,
    // width: 50,
  },
});

export default CarouselCardItem;
