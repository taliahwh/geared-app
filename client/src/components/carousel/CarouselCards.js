import React, { useState, useRef } from 'react';
import { View, Dimensions, StyleSheet, Image } from 'react-native';
import Carousel from 'react-native-snap-carousel';

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Dimensions.get('window').width - 30;

const CarouselCardItem = ({ item }) => {
  return <Image source={{ uri: item.imgUrl }} style={styles.image} />;
};

const CarouselCards = ({ images }) => {
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
        itemWidth={ITEM_WIDTH}
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

export default CarouselCards;
