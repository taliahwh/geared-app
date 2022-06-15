import React, { useState, useRef } from 'react';
import { View, Dimensions, Image, StyleSheet } from 'react-native';
import Carousel from 'react-native-snap-carousel';
// import CarouselCardItem from './CarouselCardItem';

const SLIDER_WIDTH = Dimensions.get('window').width;

const CarouselCardItem = ({ item }) => {
  return (
    <Image
      source={{ uri: item.imgUrl }}
      style={styles.image}
      // resizeMode="cover"
    />
  );
};

const FullWidthCarouselCards = ({ images }) => {
  const isCarousel = useRef(null);
  const [index, setIndex] = useState(0);

  return (
    <View>
      <Carousel
        layout="default"
        ref={isCarousel}
        data={images}
        renderItem={CarouselCardItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={SLIDER_WIDTH}
        // inactiveSlideShift={0}

        inactiveSlideOpacity={0.2}
        onSnapToItem={(index) => setIndex(index)}
        useScrollView={true}
        lockScrollWhileSnapping={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    height: SLIDER_WIDTH,
  },
});

export default FullWidthCarouselCards;
