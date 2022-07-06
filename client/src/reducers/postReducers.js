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
  LIKE_POST_REQUEST,
  LIKE_POST_SUCCESS,
  LIKE_POST_FAILURE,
  GET_LIKED_POSTS_REQUEST,
  GET_LIKED_POSTS_SUCCESS,
  GET_LIKED_POSTS_FAILURE,
  SAVE_POST_REQUEST,
  SAVE_POST_SUCCESS,
  SAVE_POST_FAILURE,
  COMMENT_POST_REQUEST,
  COMMENT_POST_SUCCESS,
  COMMENT_POST_FAILURE,
  DELETE_COMMENT_REQUEST,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_FAILURE,
  GET_SAVED_POSTS_REQUEST,
  GET_SAVED_POSTS_SUCCESS,
  GET_SAVED_POSTS_FAILURE,
  CLEAR_LIKE_POST_DATA,
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
        success: true,
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
        comments: action.payload.comments.reverse(),
      };
    case POST_DETAILS_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const likePostReducer = (state = {}, action) => {
  switch (action.type) {
    case LIKE_POST_REQUEST:
      return { loading: true };
    case LIKE_POST_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case LIKE_POST_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const commentPostReducer = (state = {}, action) => {
  switch (action.type) {
    case COMMENT_POST_REQUEST:
      return { loading: true };
    case COMMENT_POST_SUCCESS:
      return {
        success: true,
        comment: action.payload,
      };
    case COMMENT_POST_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const deleteCommentReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_COMMENT_REQUEST:
      return { loading: true };
    case DELETE_COMMENT_SUCCESS:
      return {
        success: true,
      };
    case DELETE_COMMENT_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const viewLikedPostsReducer = (state = { posts: {} }, action) => {
  switch (action.type) {
    case GET_LIKED_POSTS_REQUEST:
      return { loading: true };
    case GET_LIKED_POSTS_SUCCESS:
      return {
        loading: false,
        success: true,
        posts: action.payload,
      };
    case GET_LIKED_POSTS_FAILURE:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const savePostsReducer = (state = {}, action) => {
  switch (action.type) {
    case SAVE_POST_REQUEST:
      return { loading: true };
    case SAVE_POST_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case SAVE_POST_FAILURE:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const viewSavedPostsReducer = (state = { posts: {} }, action) => {
  switch (action.type) {
    case GET_SAVED_POSTS_REQUEST:
      return { loading: true };
    case GET_SAVED_POSTS_SUCCESS:
      return {
        loading: false,
        success: true,
        posts: action.payload,
      };
    case GET_SAVED_POSTS_FAILURE:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
