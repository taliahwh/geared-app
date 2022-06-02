import React from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

// Components
import FullWidthCarouselCards from '../components/carousel/FullWidthCarouselCards';

const PostDetailsScreen = ({ route, forSale, offers }) => {
  const { itemId, name } = route.params;
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.headingContainer}>
        <View style={styles.userInformation}>
          <Image
            style={styles.userImage}
            source={{
              uri: 'https://i0.wp.com/sneakerhistory.com/wp-content/uploads/2019/03/fab-five-air-force-max-black-socks.jpg?fit=1280%2C1600&ssl=1',
            }}
          />

          <View style={styles.usernameContainer}>
            <Text style={styles.username}>taliahwh</Text>

            <Text style={styles.location}>Phoenix, Arizona</Text>
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
        <FullWidthCarouselCards />
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

      <View style={styles.descriptionContainer}>
        <Text>
          <Text style={styles.usernameFont}>taliahwh</Text> 2017-2018 Bam
          Adebayo Panini Contenders Rookie Auto 49/65
        </Text>
      </View>

      <Text style={styles.viewComments}>View all 13 comments</Text>

      <View style={styles.cardDetailsContainer}>
        <View style={styles.specsContainer}>
          <Text>Condition</Text>
          <Text style={styles.specsLabel}>Used - Very Good</Text>
        </View>
        <View style={styles.specsContainer}>
          <Text>Graded</Text>
          <Text style={styles.specsLabel}>No</Text>
        </View>
      </View>

      {forSale && (
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>PRICE</Text>
          <Text style={styles.price}>$110</Text>
        </View>
      )}

      {offers && (
        <View>
          <Text style={styles.tag}>Open to offers</Text>
        </View>
      )}

      <Text style={styles.uploadDate}>3 DAYS AGO</Text>

      {/* <View style={styles.commentsContainer}>
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
      </View> */}

      <View style={styles.aboutTheSellerContainer}>
        {/* <Text style={styles.aboutTheSellerTitle}>About the seller</Text> */}
        <View style={styles.sellerInfoContainer}>
          <Image
            style={styles.sellerImage}
            source={{
              uri: 'https://i0.wp.com/sneakerhistory.com/wp-content/uploads/2019/03/fab-five-air-force-max-black-socks.jpg?fit=1280%2C1600&ssl=1',
            }}
          />
          <View style={styles.sellerNameContainer}>
            <Text style={styles.sellerName}>Taliah Wharton</Text>
            <Text style={styles.sellerMeta}>SELLER SINCE MAY 2022</Text>
          </View>
        </View>
        <View style={styles.sellerMenuContainer}>
          <View style={styles.menuOption}>
            <View style={styles.menuOptionContainer}>
              <Text style={styles.menuTitle}>Sold reviews</Text>
              <Text style={styles.menuQty}>22</Text>
            </View>
            <Ionicons
              name="chevron-forward-outline"
              size={24}
              color="black"
              style={styles.menuArrow}
            />
          </View>
          <View style={styles.menuOption}>
            <View style={styles.menuOptionContainer}>
              <Text style={styles.menuTitle}>Selling</Text>
              <Text style={styles.menuQty}>67</Text>
            </View>
            <Ionicons
              name="chevron-forward-outline"
              size={24}
              color="black"
              style={styles.menuArrow}
            />
          </View>
          <View style={styles.menuOption}>
            <View style={styles.menuOptionContainer}>
              <Text style={styles.menuTitle}>Message seller</Text>
              {/* <Text style={styles.menuQty}>22</Text> */}
            </View>
            <Ionicons
              name="chevron-forward-outline"
              size={24}
              color="black"
              style={styles.menuArrow}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    display: 'flex',
  },
  headingContainer: {
    paddingHorizontal: 15,
    paddingTop: 6,
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
    height: 360,
    display: 'flex',
    alignItems: 'center',
  },
  buttonContainer: {
    paddingHorizontal: 15,
    paddingTop: 10,
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
    display: 'flex',
    flexDirection: 'row',
  },
  usernameFont: {
    fontWeight: '500',
    marginRight: 5,
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
  cardDetailsContainer: {
    paddingHorizontal: 15,
    paddingTop: 10,
    display: 'flex',
    flexDirection: 'row',
  },
  specsContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginRight: 10,
  },
  specsLabel: {
    fontWeight: '600',
    marginLeft: 4,
  },
  uploadDate: {
    paddingLeft: 15,
    paddingTop: 4,
    fontSize: 12,
    paddingBottom: 5,
  },
  aboutTheSellerContainer: {
    marginHorizontal: 15,
    borderTopWidth: 1,
    borderColor: '#d4d4d4',
    marginTop: 10,
  },
  aboutTheSellerTitle: {
    fontSize: 18,
    fontWeight: '600',
    paddingVertical: 10,
  },
  sellerInfoContainer: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 15,
    alignItems: 'center',
  },
  sellerImage: {
    flex: 2,
    height: 55,
    borderWidth: 1,
    borderColor: '#d4d4d4',
    borderRadius: 100,
  },
  sellerNameContainer: {
    flex: 12,
  },
  sellerName: {
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 15,
  },
  sellerMeta: {
    fontSize: 11,
    marginLeft: 15,
  },
  sellerMenuContainer: {
    paddingTop: 10,
  },
  menuOption: {
    display: 'flex',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#d4d4d4',
    paddingVertical: 7,
    alignItems: 'center',
    justifyContent: 'space-between',
    // backgroundColor: 'pink',
  },
  menuOptionContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    // width: '100%',
    justifyContent: 'space-between',
    // backgroundColor: 'orange',
    width: '95%',
  },
  menuTitle: {
    fontSize: 17,
    paddingTop: 3,
  },
  menuQty: {
    marginRight: 20,
    fontSize: 16,
    color: '#737373',
  },
  menuArrow: {
    color: '#525252',
  },
});

export default PostDetailsScreen;
