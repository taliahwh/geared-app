import React, { useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  FlatList,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment';

// Components
import CarouselCards from './carousel/CarouselCards';

// Actions
import { likePost } from '../actions/postActions';
import { CLEAR_LIKE_POST_DATA } from '../constants/postConstants';

const ITEM_WIDTH = Dimensions.get('window').width - 30;

const TagRender = ({ item }) => {
  return <Text style={styles.postTags}>{item}</Text>;
};
const Separator = () => {
  return <View style={{ width: 1, backgroundColor: '#fff' }} />;
};

const TradingCardPost = ({
  forSale,
  offers,
  username,
  images,
  description,
  profileImage,
  postId,
  tags,
  showcase,
  datePosted,
  likesCount,
  likesIds,
  post,
}) => {
  // Hooks
  const navigation = useNavigation();
  const dispatch = useDispatch();

  // Redux state
  const { _id: userId } = useSelector((state) => state.userSignIn.userInfo);
  const { success: successLikePost, error: errorLikePost } = useSelector(
    (state) => state.likePost
  );

  const Likes = () => {
    const userLikedPost = likesIds.includes(userId);
    return (
      <>
        {userLikedPost ? (
          <View style={styles.likeBtnContainer}>
            <Ionicons name="thumbs-up" size={26} color="black" />
            <Text style={styles.likeCount}>{likesCount}</Text>
          </View>
        ) : (
          <View style={styles.likeBtnContainer}>
            <Ionicons name="thumbs-up-outline" size={26} color="black" />
            <Text style={styles.likeCount}>{likesCount}</Text>
          </View>
        )}
      </>
    );
  };

  const handleAlertMessage = () => {
    errorLikePost &&
      Alert.alert('Something went wrong', errorLikePost, [
        {
          text: 'OK',
          onPress: () => {
            console.log('ok pressed');
          },
        },
      ]);
  };

  const handleLikePost = () => {
    dispatch(likePost(post));
    handleAlertMessage();
  };

  useEffect(() => {}, [successLikePost, errorLikePost]);

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
                navigation.navigate('Profile Details', {
                  userId: postId,
                });
              }}
            >
              <Text style={styles.username}>{username}</Text>
            </TouchableOpacity>
            {forSale && <Text style={styles.listingType}>FOR SALE 💸</Text>}
            {offers && <Text style={styles.listingType}>OPEN TO OFFERS❓</Text>}
            {showcase && <Text style={styles.listingType}>SHOWCASE 🌟</Text>}
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
        <TouchableOpacity onPress={() => handleLikePost()}>
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
        <Text style={styles.usernameInDescription}>{`${username} `}</Text>
        {description}
      </Text>

      <View style={styles.tagsContainer}>
        <FlatList
          data={tags}
          renderItem={({ item }) => item !== '' && <TagRender item={item} />}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={Separator}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <Text style={styles.viewComments}>View all 13 comments</Text>

      <Text style={styles.timePosted}>
        {moment(datePosted).startOf('hour').fromNow().toUpperCase()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginHorizontal: 15,
    paddingTop: 11,
    paddingBottom: 20,
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
    zIndex: 1,
  },
  headingContainer: {
    paddingHorizontal: 15,
    dispay: 'flex',
    flexDirection: 'row',
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderColor: '#d4d4d4',
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
  usernameInDescription: {
    fontWeight: '500',
    paddingRight: 5,
  },
  listingType: {
    fontSize: 13,
  },
  imageContainer: {
    paddingHorizontal: 15,
    height: ITEM_WIDTH,
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
    paddingTop: 10,
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
  timePosted: {
    paddingTop: 10,
    paddingHorizontal: 15,
    fontSize: 11,
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

  tagsContainer: {
    // backgroundColor: 'pink',
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  postTags: {
    marginRight: 10,
    fontSize: 13,
    fontWeight: '500',
    color: '#7390AD',
    backgroundColor: '#F1F1F1',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 10,
    overflow: 'hidden',
  },
});

export default TradingCardPost;
