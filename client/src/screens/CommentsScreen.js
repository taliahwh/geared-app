import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TextInput,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';

// Components
import Comment from '../components/Comment';

const commentContainerHeight = Dimensions.get('window').height / 17;

const CommentsScreen = () => {
  return (
    <View style={styles.container}>
      {/* Create comment section */}
      <View style={styles.createCommentSection}>
        <Image
          style={styles.userImage}
          source={{
            uri: 'https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg',
          }}
        />

        <TextInput
          style={styles.textInput}
          // ref={register.username}
          // value={userDetails.username}
          placeholder={'Say something...'}
          placeholderTextColor={'#a1a1aa'}
          maxLength={400}
          multiline
        />
        <Text style={styles.sendBtn}>SEND</Text>
      </View>

      <ScrollView style={styles.commentsSection}>
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
    </View>
  );
};

export default CommentsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // paddingTop: 10,
  },
  createCommentSection: {
    minHeight: 55,
    paddingHorizontal: 15,
    // marginTop: 10,
    borderBottomWidth: 1,
    borderColor: '#d4d4d4',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 3,
  },
  userImage: {
    height: 30,
    width: 30,
    borderRadius: 30 / 2,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#d4d4d4',
  },
  textInput: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingBottom: 10,
    paddingTop: 10,
    paddingHorizontal: 15,
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 20,
    minHeight: 20,
    flexDirection: 'row',
    alignSelf: 'center',
    width: '96%',
    // backgroundColor: 'transparent',
  },
  sendBtn: {
    color: '#a1a1aa',
    fontWeight: '500',
  },
  commentsSection: {
    marginTop: 10,
  },
});
