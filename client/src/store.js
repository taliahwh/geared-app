import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';
import { combineReducers, applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';

import {
  createPostReducer,
  explorePostsReducer,
  likePostReducer,
  commentPostReducer,
  postDetailsReducer,
  savePostsReducer,
  viewLikedPostsReducer,
  viewSavedPostsReducer,
  deleteCommentReducer,
} from './reducers/postReducers';

import {
  notificationsReducer,
  userDetailsReducer,
  userPostsReducer,
  userSignInReducer,
  userSignUpReducer,
  userUpdatePasswordReducer,
  userUpdateProfileReducer,
  viewNotificationReducer,
} from './reducers/userReducers';

const reducer = combineReducers({
  explorePosts: explorePostsReducer,
  createPost: createPostReducer,
  postDetails: postDetailsReducer,
  likePost: likePostReducer,
  likedPosts: viewLikedPostsReducer,
  savePost: savePostsReducer,
  savedPosts: viewSavedPostsReducer,
  comment: commentPostReducer,
  notifications: notificationsReducer,
  deleteComment: deleteCommentReducer,
  userSignIn: userSignInReducer,
  userSignUp: userSignUpReducer,
  userDetails: userDetailsReducer,
  userPosts: userPostsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userUpdatePassword: userUpdatePasswordReducer,
  userViewNotification: viewNotificationReducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['userSignIn'],
};

const persistedReducer = persistReducer(persistConfig, reducer);

// Initial state when the redux store loads
const initialState = {};

const middleware = [thunk];

const store = createStore(
  persistedReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export const persistor = persistStore(store);

export default store;
