import axios from 'axios';
import geared from '../api/geared';

import {
  EXPLORE_POSTS_REQUEST,
  EXPLORE_POSTS_SUCCESS,
  EXPLORE_POSTS_FAILURE,
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
    console.log(data);

    dispatch({ type: EXPLORE_POSTS_SUCCESS, payload: data });
    console.log(data);
  } catch (error) {
    dispatch({ type: EXPLORE_POSTS_FAILURE });
    console.log(error.message);
  }
};
