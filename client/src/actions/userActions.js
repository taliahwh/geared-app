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
  UPDATE_USER_PROFILE_REQUEST,
  UPDATE_USER_PROFILE_SUCCESS,
  UPDATE_USER_PROFILE_FAILURE,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAILURE,
  VIEW_NOTIFICATION_REQUEST,
  VIEW_NOTIFICATION_SUCCESS,
  VIEW_NOTIFICATION_FAILURE,
  USER_LOGOUT,
} from '../constants/userConstants';

import gearedApi from '../api/geared';

import * as RootNavigation from '../navigation/RootNavigation';

export const signIn = (username, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_SIGN_IN_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await gearedApi.post(
      '/api/users/signin',
      { username, password },
      config
    );

    dispatch({ type: USER_SIGN_IN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_SIGN_IN_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = () => async (dispatch) => {
  dispatch({ type: USER_LOGOUT });
};

export const signUp =
  (firstName, lastName, email, username, password, confirmPassword) =>
  async (dispatch) => {
    try {
      dispatch({ type: USER_SIGN_UP_REQUEST });

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await gearedApi.post(
        '/api/users/signup',
        {
          firstName,
          lastName,
          email,
          username,
          password,
          confirmPassword,
        },
        config
      );

      dispatch({ type: USER_SIGN_UP_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: USER_SIGN_UP_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getUserDetails = (id) => async (dispatch, getState) => {
  const { authToken } = getState().userSignIn;
  try {
    dispatch({ type: USER_DETAILS_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    };

    const { data } = await gearedApi.get(`/api/users/${id}`, config);

    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getUserPosts = (id) => async (dispatch, getState) => {
  const { authToken } = getState().userSignIn;
  try {
    dispatch({ type: USER_POSTS_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    };

    const { data } = await gearedApi.get(`/api/users/collection/${id}`, config);

    dispatch({ type: USER_POSTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_POSTS_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateProfile =
  (
    newProfileImage,
    newBio,
    interest1,
    interest2,
    interest3,
    interest4,
    newFullName,
    newWebsite
  ) =>
  async (dispatch, getState) => {
    const { authToken } = getState().userSignIn;
    try {
      dispatch({ type: UPDATE_USER_PROFILE_REQUEST });

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
      };

      const { data } = await gearedApi.put(
        '/api/users/profile',
        {
          newProfileImage,
          newBio,
          interest1,
          interest2,
          interest3,
          interest4,
          newFullName,
          newWebsite,
        },
        config
      );

      dispatch({ type: UPDATE_USER_PROFILE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: UPDATE_USER_PROFILE_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const updatePassword =
  (newPassword, confirmPassword) => async (dispatch, getState) => {
    const { authToken } = getState().userSignIn;
    try {
      dispatch({ type: UPDATE_PASSWORD_REQUEST });

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
      };

      const { data } = await gearedApi.put(
        '/api/users/password',
        {
          newPassword,
          confirmPassword,
        },
        config
      );

      dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: UPDATE_PASSWORD_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const completeSignUp =
  (
    dateOfBirth,
    newProfileImage,
    newBio,
    interest1,
    interest2,
    interest3,
    interest4,
    newFullName,
    newWebsite
  ) =>
  async (dispatch, getState) => {
    const { token: authToken } = getState().userSignUp.userInfo;
    try {
      dispatch({ type: UPDATE_USER_PROFILE_REQUEST });

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
      };

      const { data } = await gearedApi.put(
        '/api/users/profile',
        {
          dateOfBirth,
          newProfileImage,
          newBio,
          interest1,
          interest2,
          interest3,
          interest4,
          newFullName,
          newWebsite,
        },
        config
      );

      dispatch({ type: USER_SIGN_IN_SUCCESS, payload: data });
      dispatch({ type: UPDATE_USER_PROFILE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: UPDATE_USER_PROFILE_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const viewNotification =
  (notificationId) => async (dispatch, getState) => {
    const { authToken } = getState().userSignIn;
    try {
      dispatch({ type: VIEW_NOTIFICATION_REQUEST });

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
      };

      const { data } = await gearedApi.put(
        `api/users/notification/${notificationId}`,
        {
          notificationId,
        },
        config
      );

      dispatch({ type: VIEW_NOTIFICATION_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: VIEW_NOTIFICATION_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
