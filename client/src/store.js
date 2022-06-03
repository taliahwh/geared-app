import { combineReducers, applyMiddleware, createStore } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';

import { explorePostsReducer } from './reducers/postReducers';

const reducer = combineReducers({
  explorePosts: explorePostsReducer,
});

// Initial state when the redux store loads
const initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
