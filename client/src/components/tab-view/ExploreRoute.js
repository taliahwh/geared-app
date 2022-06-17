import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Dimensions,
  Text,
  FlatList,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

// Components
import TradingCardPost from '../TradingCardPost';
import Loader from '../Loader';
import AlertMessage from '../AlertMessage';

// Actions
import { getExplorePosts } from '../../actions/postActions';

const windowWidth = Dimensions.get('window').width;

const ExploreRoute = () => {
  const dispatch = useDispatch();

  const {
    loading: loadingExplorePosts,
    posts,
    error: errorExplorePosts,
  } = useSelector((state) => state.explorePosts);

  const renderItem = ({ item }) => {
    return (
      <TradingCardPost
        username={item.listedBy.username}
        description={item.description}
        images={item.images}
        profileImage={item.listedBy.profileImage}
        location={item.listedBy.location}
        id={item.listedBy.userId}
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
      {loadingExplorePosts && <ActivityIndicator />}
      {posts && posts.length > 0 && (
        <View style={styles.container}>
          <FlatList
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
  footer: {
    paddingVertical: 20,
    fontWeight: '300',
    fontStyle: 'italic',
    textAlign: 'center',
  },
});

export default ExploreRoute;
