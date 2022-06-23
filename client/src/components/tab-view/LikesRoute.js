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
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect, useScrollToTop } from '@react-navigation/native';

// Components
import Loader from '../Loader';
import AlertMessage from '../AlertMessage';

// Actions
import { getLikedPosts } from '../../actions/postActions';

const thirdWindowWidth = Dimensions.get('window').width / 4;

const bam = Asset.fromModule(require('../../assets/test-images/IMG_1676.jpg'));
const tatum = Asset.fromModule(require('../../assets/test-images/tatum.jpg'));

const IMAGES = [
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
];

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

const LikesRoute = () => {
  // Hooks
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const scrollRef = useRef(null);
  useScrollToTop(scrollRef);

  // State from redux
  const {
    loading: loadingLikedPosts,
    posts,
    errpr: errorLikedPosts,
  } = useSelector((state) => state.likedPosts);

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getLikedPosts());
    }, [dispatch])
  );

  return (
    <>
      {loadingLikedPosts && <ActivityIndicator />}
      {errorLikedPosts && <AlertMessage>{errorLikedPosts}</AlertMessage>}
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
          numColumns={4}
          keyExtractor={(item) => `${item.id} 02135`}
          ItemSeparatorComponent={Separator}
        />
      )}
      {posts && posts.length === 0 && (
        <View style={styles.noPostsContainer}>
          <Text>No liked posts.</Text>
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

export default LikesRoute;
