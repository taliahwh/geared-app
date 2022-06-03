import {
  EXPLORE_POSTS_REQUEST,
  EXPLORE_POSTS_SUCCESS,
  EXPLORE_POSTS_FAILURE,
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
