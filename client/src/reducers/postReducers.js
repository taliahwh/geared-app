import {
  EXPLORE_POSTS_REQUEST,
  EXPLORE_POSTS_SUCCESS,
  EXPLORE_POSTS_FAILURE,
  CREATE_NEW_POST_REQUEST,
  CREATE_NEW_POST_SUCCESS,
  CREATE_NEW_POST_FAILURE,
  POST_DETAILS_REQUEST,
  POST_DETAILS_SUCCESS,
  POST_DETAILS_FAILURE,
} from '../constants/postConstants';

export const explorePostsReducer = (state = { posts: [] }, action) => {
  switch (action.type) {
    case EXPLORE_POSTS_REQUEST:
      return { loading: true, ...state };
    case EXPLORE_POSTS_SUCCESS:
      return {
        loading: false,
        posts: action.payload,
      };
    case EXPLORE_POSTS_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const createPostReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_NEW_POST_REQUEST:
      return { loading: true };
    case CREATE_NEW_POST_SUCCESS:
      return {
        loading: false,
        post: action.payload,
      };
    case CREATE_NEW_POST_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const postDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_DETAILS_REQUEST:
      return { loading: true };
    case POST_DETAILS_SUCCESS:
      return {
        loading: false,
        postDetails: action.payload,
      };
    case POST_DETAILS_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
