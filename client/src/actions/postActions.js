import axios from 'axios';

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

    const { data } = await axios.get(
      'http://10.0.0.26:5000/api/posts/explore',
      config
    );

    dispatch({ type: EXPLORE_POSTS_SUCCESS, payload: data });
    console.log(data);
  } catch (error) {
    dispatch({ type: EXPLORE_POSTS_FAILURE });
    console.log(error.message);
  }
};
