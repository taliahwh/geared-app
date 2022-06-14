import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';
import { combineReducers, applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';

import {
  createPostReducer,
  explorePostsReducer,
  postDetailsReducer,
} from './reducers/postReducers';

import {
  userDetailsReducer,
  userPostsReducer,
  userSignInReducer,
  userSignUpReducer,
} from './reducers/userReducers';

const reducer = combineReducers({
  explorePosts: explorePostsReducer,
  createPost: createPostReducer,
  postDetails: postDetailsReducer,
  userSignIn: userSignInReducer,
  userSignUp: userSignUpReducer,
  userDetails: userDetailsReducer,
  userPosts: userPostsReducer,
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
