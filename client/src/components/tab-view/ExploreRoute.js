import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  Dimensions,
  FlatList,
  View,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useScrollToTop } from '@react-navigation/native';

// Components
import TradingCardPost from '../TradingCardPost';
import AlertMessage from '../AlertMessage';

// Actions
import { getExplorePosts } from '../../actions/postActions';
import { getUserDetails } from '../../actions/userActions';

const windowWidth = Dimensions.get('window').width;

const ExploreRoute = () => {
  // Hooks
  const scrollRef = useRef(null);
  useScrollToTop(scrollRef);
  const dispatch = useDispatch();
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  // Redux state
  const { _id: userId } = useSelector((state) => state.userSignIn.userInfo);
  const {
    loading: loadingExplorePosts,
    posts,
    error: errorExplorePosts,
  } = useSelector((state) => state.explorePosts);

  const {
    loading: loadingUserDetails,
    userDetails,
    error: errorUserDetails,
  } = useSelector((state) => state.userDetails);

  const { success: successLikePost } = useSelector((state) => state.likePost);
  const { success: successSavePost } = useSelector((state) => state.savePost);
  const { success: successCreatePost } = useSelector(
    (state) => state.createPost
  );

  const savedPosts = userDetails && userDetails.savedPosts;

  const onRefresh = React.useCallback(() => {
    setIsRefreshing(true);

    setTimeout(() => setIsRefreshing(false), 2000);
    dispatch(getExplorePosts());
  }, []);

  const renderItem = ({ item }) => {
    return (
      <TradingCardPost
        post={item}
        username={item.listedBy.username}
        description={item.description}
        images={item.images}
        profileImage={item.listedBy.profileImage}
        location={item.listedBy.location}
        userProfileId={item.listedBy.userId}
        tags={item.tags}
        showcase={item.showcase}
        offers={item.openToOffers}
        forSale={item.forSale}
        datePosted={item.createdAt}
        likesCount={item.likes.length}
        likesIds={item.likes}
        savedPosts={savedPosts}
        postId={item._id}
        commentsCount={item.comments.length}
      />
    );
  };

  useEffect(() => {
    dispatch(getExplorePosts());
    dispatch(getUserDetails(userId));
  }, [dispatch, userId, successLikePost, successSavePost, successCreatePost]);

  return (
    <>
      {errorExplorePosts && <AlertMessage>{errorExplorePosts}</AlertMessage>}

      {loadingExplorePosts && <ActivityIndicator />}
      {posts && posts.length > 0 && (
        <View style={styles.container}>
          <FlatList
            ref={scrollRef}
            data={posts}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
            refreshControl={
              <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
            }
          />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F1F1',
    width: windowWidth,
  },
});

export default ExploreRoute;
