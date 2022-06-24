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
import AlertMessage from '../AlertMessage';

// Actions
import { getSavedPosts } from '../../actions/postActions';

const cardWidth = Dimensions.get('window').width / 4;

const marcus = Asset.fromModule(require('../../assets/test-images/marcus.jpg'));
const ayton = Asset.fromModule(require('../../assets/test-images/ayton.jpg'));
const maxey = Asset.fromModule(require('../../assets/test-images/maxey.jpg'));
const jb = Asset.fromModule(require('../../assets/test-images/jb.jpg'));

const IMAGES = [
  {
    id: 3,
    name: 'Marcus Smart',
    src: marcus,
  },
  {
    id: 4,
    name: 'Deandre Ayton',
    src: ayton,
  },
  {
    id: 5,
    name: 'Tyrese Maxey',
    src: maxey,
  },
  {
    id: 6,
    name: 'Jaylen Brown',
    src: jb,
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

const SavedRoute = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const scrollRef = useRef(null);
  useScrollToTop(scrollRef);

  // State from redux
  const {
    loading: loadingSavedPosts,
    posts,
    errpr: errorSavedPosts,
  } = useSelector((state) => state.savedPosts);

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getSavedPosts());
    }, [dispatch])
  );

  return (
    <>
      {loadingSavedPosts && <ActivityIndicator />}
      {errorSavedPosts && <AlertMessage>{errorSavedPosts}</AlertMessage>}
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
          <Text>No saved posts.</Text>
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
    height: cardWidth,
    width: cardWidth,
  },
  noPostsContainer: {
    // backgroundColor: 'orange',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 15,
  },
});

export default SavedRoute;
