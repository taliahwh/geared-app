import React, { useEffect } from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

// Styles
import styles from '../styles/PostDetailsScreenStyles';

// Components
import FullWidthCarouselCards from '../components/carousel/FullWidthCarouselCards';
import AlertMessage from '../components/AlertMessage';

// Actions
import { getPostDetails, likePost, savePost } from '../actions/postActions';

const PostDetailsScreen = ({ route, forSale, offers }) => {
  // Hooks
  const dispatch = useDispatch();
  const navigation = useNavigation();

  // Params from navigation
  const { postId } = route.params;

  // Redux state
  const { _id: signedInUserId } = useSelector(
    (state) => state.userSignIn.userInfo
  );
  const { success: successLikePost } = useSelector((state) => state.likePost);
  const {
    loading: loadingPostDetails,
    postDetails,
    error: errorPostDetails,
  } = useSelector((state) => state.postDetails);

  const Likes = () => {
    const userLikedPost = postDetails.likes.includes(signedInUserId);
    return (
      <>
        {postDetails && userLikedPost ? (
          <View style={styles.likeBtnContainer}>
            <Ionicons name="thumbs-up" size={26} color="black" />
            <Text style={styles.likeCount}>{postDetails.likes.length}</Text>
          </View>
        ) : (
          <View style={styles.likeBtnContainer}>
            <Ionicons name="thumbs-up-outline" size={26} color="black" />
            <Text style={styles.likeCount}>{postDetails.likes.length}</Text>
          </View>
        )}
      </>
    );
  };

  const handleLikePost = () => {
    dispatch(likePost(postDetails));
  };

  const navigateToComments = () => {
    navigation.navigate('Comments', {
      postId,
      post: postDetails,
    });
  };

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getPostDetails(postId));
    }, [dispatch, postId])
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {loadingPostDetails && <ActivityIndicator />}
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
            {/* <View style={styles.likeBtnContainer}>
              <Ionicons name="thumbs-up-outline" size={26} color="black" />
              <Text style={styles.likeCount}>{postDetails.likes.length}</Text>
            </View> */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => handleLikePost()}
            >
              <Likes />
            </TouchableOpacity>

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

          <Text style={styles.descriptionContainer}>
            <Text
              style={styles.usernameInDescription}
            >{`${postDetails.listedBy.username} `}</Text>
            {postDetails.description}
          </Text>

          {/* <Text style={styles.viewComments}>View all 13 comments</Text> */}
          {postDetails.comments.length === 0 && (
            <TouchableOpacity onPress={navigateToComments} activeOpacity={0.9}>
              <Text style={styles.viewComments}>Add a comment</Text>
            </TouchableOpacity>
          )}

          {postDetails.comments.length > 5 && (
            <TouchableOpacity onPress={navigateToComments} activeOpacity={0.9}>
              <Text style={styles.viewComments}>
                View all {postDetails.comments.length} comments
              </Text>
            </TouchableOpacity>
          )}

          {postDetails.comments.length <= 5 && postDetails.comments.length > 0 && (
            <TouchableOpacity onPress={navigateToComments} activeOpacity={0.9}>
              <Text style={styles.viewComments}>View all comments</Text>
            </TouchableOpacity>
          )}

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

          <Text style={styles.uploadDate}>
            {moment(postDetails.createdAt)
              .startOf('minute')
              .fromNow()
              .toUpperCase()}
          </Text>

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
