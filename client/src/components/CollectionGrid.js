import React, { useRef } from 'react';
import { Asset } from 'expo-asset';
import {
  FlatList,
  Image,
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Text,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect, useScrollToTop } from '@react-navigation/native';

// Components
import Loader from './Loader';
import AlertMessage from './AlertMessage';

// Actions
import { getUserPosts } from '../actions/userActions';
import { CLEAR_POSTS_DATA } from '../constants/userConstants';

const thirdWindowWidth = Dimensions.get('window').width / 3;

const ImageRender = ({ src }) => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={src} />
    </View>
  );
};
const Separator = () => {
  return <View style={{ width: 1, backgroundColor: '#fff' }} />;
};

const CollectionGrid = ({ userId }) => {
  // Hooks
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const scrollRef = useRef(null);
  useScrollToTop(scrollRef);

  // State from redux
  const {
    loading: loadingUserPosts,
    posts,
    error: errorUserPosts,
  } = useSelector((state) => state.userPosts);

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getUserPosts(userId));
    }, [dispatch])
  );

  return (
    <>
      {loadingUserPosts && <Loader />}
      {errorUserPosts && <AlertMessage>{errorUserPosts}</AlertMessage>}
      {posts && posts.length > 0 && (
        <FlatList
          ref={scrollRef}
          data={posts}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                /* 1. Navigate to the Details route with params */
                navigation.navigate('Post Details', {
                  postId: item._id,
                });
              }}
            >
              <ImageRender src={{ uri: item.images[0].imgUrl }} />
            </TouchableOpacity>
          )}
          numColumns={3}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={Separator}
        />
      )}
      {posts && posts.length === 0 && (
        <View style={styles.noPostsContainer}>
          <Text>No posts yet.</Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    margin: 0.7,
  },
  image: {
    justifyContent: 'center',
    alignItems: 'center',
    height: thirdWindowWidth,
    width: thirdWindowWidth,
  },
});

export default CollectionGrid;
