import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Dimensions,
} from 'react-native';

// Components
import Comment from '../components/Comment';

const containerHeight = Dimensions.get('window').height / 2;

const CommentsScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <Comment
          displayName={'Andrew'}
          username={'wiggsthechamp'}
          timePosted={'30min'}
          commentMessage={`Man this card is sick.. I've been looking for it for years and could never find one in good enough condition`}
          userImage={
            'https://cdn.vox-cdn.com/thumbor/w5BNsbYSy8kcYYdhoCX4kzqrMu8=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/23635671/1241356583.jpg'
          }
        />
        <Comment
          displayName={'Zach'}
          username={'newbulls'}
          timePosted={'2hr'}
          commentMessage={`Tough 🔥🔥🔥`}
          userImage={
            'https://img.bleacherreport.net/img/images/photos/003/920/637/hi-res-733640ed083eb4ba2e47ba143ab5fb78_crop_north.jpg?1645759696&w=3072&h=2048'
          }
        />
        <Comment
          displayName={'Ty'}
          username={'halihoops'}
          timePosted={'YESTERDAY'}
          commentMessage={`now this is a classic!!`}
          userImage={
            'https://www.gannett-cdn.com/presto/2022/02/12/PIND/cc483fbc-fcc6-42e9-adea-65c9d765df90-USATSI_17663737.jpg'
          }
        />
      </ScrollView>
      <View style={styles.createCommentSection}>
        <Text>Create Comment</Text>
      </View>
    </View>
  );
};

export default CommentsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 10,
  },
  createCommentSection: {
    height: 30,
    backgroundColor: 'orange',
  },
});
