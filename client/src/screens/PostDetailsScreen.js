import React from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

// Styles
import styles from '../styles/PostDetailsScreenStyles';

// Components
import FullWidthCarouselCards from '../components/carousel/FullWidthCarouselCards';
import Loader from '../components/Loader';
import AlertMessage from '../components/AlertMessage';

// Actions
import { getPostDetails } from '../actions/postActions';

const PostDetailsScreen = ({ route, forSale, offers }) => {
  // Hooks
  const dispatch = useDispatch();

  // Params from navigation
  const { postId } = route.params;

  // Redux state
  const {
    loading: loadingPostDetails,
    postDetails,
    error: errorPostDetails,
  } = useSelector((state) => state.postDetails);

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getPostDetails(postId));
    }, [dispatch])
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {loadingPostDetails && <Loader />}
      {errorPostDetails && <AlertMessage>{errorPostDetails}</AlertMessage>}
      {postDetails && (
        <>
          <View style={styles.headingContainer}>
            <View style={styles.userInformation}>
              <Image
                style={styles.userImage}
                source={{
                  uri: postDetails.listedBy.profileImage,
                }}
              />

              <View style={styles.usernameContainer}>
                <Text style={styles.username}>
                  {postDetails.listedBy.username}
                </Text>

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
            <FullWidthCarouselCards images={postDetails.images} />
          </View>

          <View style={styles.buttonContainer}>
            <View style={styles.likeBtnContainer}>
              <Ionicons name="thumbs-up-outline" size={26} color="black" />
              <Text style={styles.likeCount}>{postDetails.likes.length}</Text>
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
              {/* <Text style={styles.usernameFont}>
                {postDetails.listedBy.username}
              </Text> */}
              {postDetails.description}
            </Text>
          </View>

          <Text style={styles.viewComments}>View all 13 comments</Text>

          <View style={styles.cardDetailsContainer}>
            <View style={styles.specsContainer}>
              <Text>Condition</Text>
              <Text style={styles.specsLabel}>{postDetails.condition}</Text>
            </View>
            <View style={styles.specsContainer}>
              <Text>Sport</Text>
              <Text style={styles.specsLabel}>{postDetails.sport}</Text>
            </View>
          </View>

          {forSale && (
            <View style={styles.priceContainer}>
              <Text style={styles.priceLabel}>PRICE</Text>
              <Text style={styles.price}>{`$${postDetails.itemPrice}`}</Text>
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
                  uri: postDetails.listedBy.profileImage,
                }}
              />
              <View style={styles.sellerNameContainer}>
                <Text style={styles.sellerName}>
                  {postDetails.listedBy.name || 'Sample name'}
                </Text>
                <Text style={styles.sellerMeta}>JOINED MAY 2022</Text>
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
        </>
      )}
    </ScrollView>
  );
};

export default PostDetailsScreen;
