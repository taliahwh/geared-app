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

// Components
import TradingCardPost from '../TradingCardPost';
import CarouselCards from '../carousel/CarouselCards';

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
    console.log(item.username);
    return (
      <TradingCardPost
        username={item.listedBy.username}
        description={item.description}
      />
    );
  };

  useEffect(() => {
    dispatch(getExplorePosts());
  }, [dispatch]);
  return (
    // <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
    //   <TradingCardPost forSale={true} />
    //   <TradingCardPost />
    //   <TradingCardPost />
    //   <TradingCardPost forSale={true} />
    //   <TradingCardPost offers={true} />
    //   <Text style={styles.footer}>End of posts.</Text>
    // </ScrollView>

    <View style={styles.container}>
      {/* {posts && (
        <FlatList
          data={posts}
          renderItem={renderItem}
          // numColumns={3}
          keyExtractor={(item) => item._id}
          // ItemSeparatorComponent={Separator}
        />
      )} */}
      {loadingExplorePosts && <ActivityIndicator />}
      {posts && posts.length > 0 && (
        <FlatList
          data={posts}
          renderItem={renderItem}
          // numColumns={3}
          keyExtractor={(item) => item._id}
          // ItemSeparatorComponent={Separator}
        />
      )}
    </View>
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
