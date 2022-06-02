import React from 'react';
import { Asset } from 'expo-asset';
import {
  ScrollView,
  StyleSheet,
  Dimensions,
  Text,
  FlatList,
} from 'react-native';

// Components
import TradingCardPost from '../TradingCardPost';
import CarouselCards from '../carousel/CarouselCards';

const windowWidth = Dimensions.get('window').width;

const tatum = require('../../assets/test-images/tatum.jpg');

const bam = require('../../assets/test-images/IMG_1676.jpg');

const marcus = require('../../assets/test-images/marcus.jpg');

const ayton = require('../../assets/test-images/ayton.jpg');

const maxey = require('../../assets/test-images/maxey.jpg');

const jb = require('../../assets/test-images/jb.jpg');

const POSTS = [
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

const ExploreRoute = () => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <TradingCardPost forSale={true} />
      <TradingCardPost />
      <TradingCardPost />
      <TradingCardPost forSale={true} />
      <TradingCardPost offers={true} />
      <Text style={styles.footer}>End of posts.</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F1F1',
    width: windowWidth,
  },
  footer: {
    paddingVertical: 20,
    fontWeight: '300',
    fontStyle: 'italic',
    textAlign: 'center',
  },
});

export default ExploreRoute;
