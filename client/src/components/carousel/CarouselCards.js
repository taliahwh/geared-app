import React, { useState, useRef } from 'react';
import { View, Dimensions, StyleSheet, Image } from 'react-native';
import Carousel from 'react-native-snap-carousel';

const SLIDER_WIDTH = Dimensions.get('window').width + 98;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.75);

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
    height: 350,
    // width: 50,
  },
});

export default CarouselCards;
