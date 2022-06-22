import React, { useRef } from 'react';
import { StyleSheet, Dimensions, FlatList, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect, useScrollToTop } from '@react-navigation/native';

// Components
import TradingCardPost from '../TradingCardPost';
import Loader from '../Loader';
import AlertMessage from '../AlertMessage';

// Actions
import { getExplorePosts } from '../../actions/postActions';

const windowWidth = Dimensions.get('window').width;

const ExploreRoute = () => {
  const scrollRef = useRef(null);
  useScrollToTop(scrollRef);
  const dispatch = useDispatch();

  const {
    loading: loadingExplorePosts,
    posts,
    error: errorExplorePosts,
  } = useSelector((state) => state.explorePosts);

  const renderItem = ({ item }) => {
    return (
      <TradingCardPost
        post={item}
        username={item.listedBy.username}
        description={item.description}
        images={item.images}
        profileImage={item.listedBy.profileImage}
        location={item.listedBy.location}
        postId={item.listedBy.userId}
        tags={item.tags}
        showcase={item.showcase}
        offers={item.openToOffers}
        forSale={item.forSale}
        datePosted={item.createdAt}
        likesCount={item.likes.length}
        likesIds={item.likes}
      />
    );
  };

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getExplorePosts());
    }, [dispatch])
  );
  return (
    <>
      {errorExplorePosts && <AlertMessage>{errorExplorePosts}</AlertMessage>}
      {loadingExplorePosts && <Loader />}
      {posts && posts.length > 0 && (
        <View style={styles.container}>
          <FlatList
            ref={scrollRef}
            data={posts}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
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
