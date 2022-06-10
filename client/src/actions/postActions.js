import axios from 'axios';
import geared from '../api/geared';

import {
  EXPLORE_POSTS_REQUEST,
  EXPLORE_POSTS_SUCCESS,
  EXPLORE_POSTS_FAILURE,
  CREATE_NEW_POST_REQUEST,
  CREATE_NEW_POST_SUCCESS,
  CREATE_NEW_POST_FAILURE,
} from '../constants/postConstants';

export const getExplorePosts = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    dispatch({ type: EXPLORE_POSTS_REQUEST });

    const { data } = await geared.get('/api/posts/explore', config);

    dispatch({ type: EXPLORE_POSTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: EXPLORE_POSTS_FAILURE });
    console.log(error.message);
  }
};

export const createPost =
  (
    images,
    description,
    tags,
    sportValue,
    conditionValue,
    showcase,
    forSale,
    openToOffers,
    itemPrice,
    shippingPrice,
    locationValue
  ) =>
  async (dispatch, getState) => {
    const { authToken } = getState().userSignIn;
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
      };

      dispatch({ type: CREATE_NEW_POST_REQUEST });

      const { data } = await geared.post(
        '/api/posts/',
        {
          images,
          description,
          tags,
          sportValue,
          conditionValue,
          showcase,
          forSale,
          openToOffers,
          itemPrice,
          shippingPrice,
          locationValue,
        },
        config
      );

      dispatch({ type: CREATE_NEW_POST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: CREATE_NEW_POST_FAILURE });
      console.log(error.message);
    }
  };
