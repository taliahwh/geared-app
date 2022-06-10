import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';
import { combineReducers, applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';

import {
  createPostReducer,
  explorePostsReducer,
} from './reducers/postReducers';

import { userSignInReducer } from './reducers/userReducers';

const reducer = combineReducers({
  explorePosts: explorePostsReducer,
  createPost: createPostReducer,
  userSignIn: userSignInReducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
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
