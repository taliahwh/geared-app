import {
  USER_SIGN_IN_REQUEST,
  USER_SIGN_IN_SUCCESS,
  USER_SIGN_IN_FAILURE,
  USER_SIGN_UP_REQUEST,
  USER_SIGN_UP_SUCCESS,
  USER_SIGN_UP_FAILURE,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAILURE,
  USER_POSTS_REQUEST,
  USER_POSTS_SUCCESS,
  USER_POSTS_FAILURE,
  USER_LOGOUT,
} from '../constants/userConstants';

const initialState = {
  authToken: null,
  loading: false,
  userInfo: {},
};

export const userSignInReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_SIGN_IN_REQUEST:
      return { ...state, loading: true };
    case USER_SIGN_IN_SUCCESS:
      return {
        loading: false,
        success: true,
        authToken: action.payload.token,
        userInfo: {
          _id: action.payload._id,
          name: action.payload.name,
          email: action.payload.email,
          username: action.payload.username,
        },
      };
    case USER_SIGN_IN_FAILURE:
      return { ...state, error: action.payload };
    case USER_LOGOUT:
      return {
        authToken: null,
        userInfo: {},
      };
    default:
      return state;
  }
};

export const userSignUpReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_SIGN_UP_REQUEST:
      return { loading: true };
    case USER_SIGN_UP_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload };
    case USER_SIGN_UP_FAILURE:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { loading: true };
    case USER_DETAILS_SUCCESS:
      return { loading: false, success: true, userDetails: action.payload };
    case USER_DETAILS_FAILURE:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userPostsReducer = (state = { posts: [] }, action) => {
  switch (action.type) {
    case USER_POSTS_REQUEST:
      return { loading: true };
    case USER_POSTS_SUCCESS:
      return {
        loading: false,
        posts: action.payload,
      };
    case USER_POSTS_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
