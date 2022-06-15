import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  Button,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

// Components
import CarouselCards from './carousel/CarouselCards';

const SLIDER_HEIGHT = Dimensions.get('window').width + 10;

const TradingCardPost = ({
  forSale,
  offers,
  username,
  images,
  description,
  location,
  profileImage,
}) => {
  // const [comment, setComment] = useState('');
  const navigation = useNavigation();
  // console.log(username);
  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <View style={styles.userInformation}>
          <Image
            style={styles.userImage}
            source={{
              uri: profileImage,
            }}
          />

          <View style={styles.usernameContainer}>
            <TouchableOpacity
              onPress={() => {
                /* 1. Navigate to the Details route with params */
                navigation.navigate('User Profile', {
                  itemId: 86,
                  otherParam: 'anything you want here',
                });
              }}
            >
              <Text style={styles.username}>{username}</Text>
            </TouchableOpacity>
            <Text style={styles.location}>{location}</Text>
          </View>
        </View>
        <View style={styles.info}>
          <Ionicons
            name="ellipsis-horizontal"
            size={24}
            color="black"
            style={styles.ellipsis}
          />
        </View>
      </View>
      <View style={styles.imageContainer}>
        <CarouselCards images={images} />
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.likeBtnContainer}>
          <Ionicons name="thumbs-up-outline" size={26} color="black" />
          <Text style={styles.likeCount}>34</Text>
        </View>
        <View style={styles.shareBtns}>
          <Ionicons
            style={styles.btn}
            name="bookmark-outline"
            size={26}
            color="black"
          />
          <Ionicons
            style={styles.btn}
            name="paper-plane-outline"
            size={26}
            color="black"
          />
          <Ionicons
            style={styles.btn}
            name="share-outline"
            size={26}
            color="black"
          />
        </View>
      </View>

      <Text style={styles.descriptionContainer}>{description}</Text>

      {forSale && (
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>PRICE:</Text>
          <Text style={styles.price}>$110</Text>
        </View>
      )}

      {offers && (
        <View>
          <Text style={styles.tag}>Open to offers</Text>
        </View>
      )}

      <Text style={styles.viewComments}>View all 13 comments</Text>
      <View style={styles.commentsContainer}>
        <Image
          style={styles.commentingUserImage}
          source={{
            uri: 'https://i.pinimg.com/originals/d8/aa/8f/d8aa8f6987714957e06ce0fb416641ef.jpg',
          }}
        />
        <View style={styles.commentInput}>
          <Text style={styles.placeholder}>Say something..</Text>
        </View>
        <Text style={styles.sendBtn}>SEND</Text>
      </View>
      {/* <Text>tags</Text> */}
    </View>
  );
};

// {/* <View style={styles.descriptionContainer}>
// <Text>
//   <TouchableOpacity
//     onPress={() => {
//       /* 1. Navigate to the Details route with params */
//       navigation.navigate('User Profile', {
//         itemId: 86,
//         otherParam: 'anything you want here',
//       });
//     }}
//   >
//     <Text style={styles.usernameFont}>{username}</Text>
//   </TouchableOpacity>
//   2017-2018 Bam Adebayo Panini Contenders Rookie Auto 49/65
// </Text>
// </View> */}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginHorizontal: 15,
    paddingTop: 11,
    marginTop: 15,
    borderRadius: 5,
    display: 'flex',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
  },
  headingContainer: {
    paddingHorizontal: 15,
    dispay: 'flex',
    flexDirection: 'row',
  },
  userInformation: {
    paddingVertical: 5,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 45,
    flex: 4,
    // backgroundColor: 'orange',
  },
  info: {
    flex: 1,
    // backgroundColor: 'pink',
    justifyContent: 'center',
  },
  ellipsis: {
    textAlign: 'right',
  },
  userImage: {
    flex: 1,
    // width: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#d4d4d4',
    borderRadius: 100,
  },
  usernameContainer: {
    flex: 6,
    // backgroundColor: 'pink',
    paddingLeft: 10,
    paddingVertical: 2,
  },
  username: {
    fontWeight: '600',
    fontSize: 14,
  },
  location: {
    fontSize: 13,
  },
  imageContainer: {
    paddingTop: 7,
    paddingHorizontal: 15,
    height: SLIDER_HEIGHT,
    display: 'flex',
    alignItems: 'center',
  },
  buttonContainer: {
    paddingHorizontal: 15,
    paddingTop: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  shareBtns: {
    display: 'flex',
    flexDirection: 'row',
  },
  likeBtnContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  likeCount: {
    fontSize: 13,
    paddingLeft: 5,
  },
  btn: {
    paddingLeft: 15,
  },
  descriptionContainer: {
    paddingHorizontal: 15,
    paddingTop: 7,
  },
  usernameFont: {
    fontWeight: '500',
    backgroundColor: 'pink',
    // marginRight: 5,
  },
  viewComments: {
    paddingTop: 7,
    paddingHorizontal: 15,
    color: '#A8A8A8',
  },
  commentsContainer: {
    marginTop: 10,
    paddingHorizontal: 15,
    // paddingBottom: 3,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    borderTopWidth: 1,
    borderColor: '#e4e4e7',
  },
  commentingUserImage: {
    height: 42,
    borderWidth: 1,
    borderColor: '#d4d4d4',
    borderRadius: 100,
    backgroundColor: 'orange',
    flex: 1,
  },
  commentInput: {
    backgroundColor: '#f9fafb',
    paddingLeft: 3,
    paddingVertical: 10,
    flex: 6,
    marginHorizontal: 10,
    borderRadius: 50,
    color: '#404040',
  },
  placeholder: {
    paddingLeft: 10,
    color: '#d4d4d4',
  },
  sendBtn: {
    // backgroundColor: 'orange',
    flex: 1,
    textAlign: 'center',
    fontWeight: '500',
    color: '#a3a3a3',
  },

  priceContainer: {
    paddingHorizontal: 15,
    paddingTop: 5,
    display: 'flex',
    flexDirection: 'row',
  },
  priceLabel: {
    fontWeight: '500',
    fontSize: 15,
  },
  price: {
    fontSize: 15,
  },
  tag: {
    marginTop: 5,
    marginLeft: 13,
    width: 105,
    marginRight: 10,
    fontSize: 13,
    fontWeight: '500',
    color: 'white',
    backgroundColor: '#3E5E7E',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 10,
    overflow: 'hidden',
  },
});

export default TradingCardPost;
