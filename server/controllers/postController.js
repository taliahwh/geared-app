import mongoose from 'mongoose';
import asyncHandler from 'express-async-handler';

import Post from '../models/postModel.js';
import User from '../models/userModel.js';

/**
 * @desc Fetch all posts to display in Explore tab
 * @route GET /posts/explore
 * @access Public
 */
const getAllPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({});

  const explorePosts = posts.reverse();
  res.status(200).json(explorePosts);
});

/**
 * @desc Create new post
 * @route POST /posts/
 * @access Public
 */
const createNewPost = asyncHandler(async (req, res) => {
  const { id: userId } = req.user;
  const {
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
  } = req.body;

  const user = await User.findById(userId);
  if (!user) {
    res.status(401);
    throw new Error('Not authorized');
  }
  // console.log(user);

  const newPost = await Post.create({
    images,
    description,
    tags,
    sport: sportValue,
    condition: conditionValue,
    showcase,
    forSale,
    openToOffers,
    itemPrice: itemPrice,
    shippingPrice: shippingPrice,
    location: locationValue,
    listedBy: {
      userId,
      username: user.username,
      profileImage: user.profileImage,
      name: user.name,
    },
  });

  const createdPost = await newPost.save();
  res.status(201).json(createdPost);
});

/**
 * @desc Fetch post details by post id
 * @route GET /posts/:id
 * @access Public
 */
const getPostById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id);
  if (!post) {
    res.status(404);
    throw new Error('Post not found');
  }
  res.status(200).json(post);
});

/**
 * @desc Like post by post id
 * @route PUT /posts/:id/likepost
 * @access Public
 */
const likePost = asyncHandler(async (req, res) => {
  const { id: postId } = req.params;
  const { id: userId } = req.user;

  const user = await User.findById(userId);

  if (!user) {
    res.status(404);
    throw new Error('Nost authorized. Must be logged in to like post.');
  }

  if (!mongoose.Types.ObjectId.isValid(postId)) {
    res.status(404);
    throw new Error('No post with that id');
  }

  const post = await Post.findById(postId);

  /* checks the index to see if the userId already appears in the post's likes */
  const index = post.likes.findIndex((id) => id === String(userId));

  if (index === -1) {
    // like the post
    post.likes.push(userId);
  } else {
    // dislike the post
    // returns an array of likes without the current user's like (removes)
    post.likes = post.likes.filter((id) => id !== String(userId));
  }

  const updatedPost = await post.save();

  // Updating liked posts arr in User model
  const postExistsInLikedPosts = user.likedPosts.includes(
    String(updatedPost._id)
  ); // returns Boolean

  if (!postExistsInLikedPosts) {
    user.likedPosts.push(updatedPost._id); // if post is not in arr, pushed post's id
  }
  if (postExistsInLikedPosts) {
    user.likedPosts = user.likedPosts.filter(
      (id) => id !== String(updatedPost._id)
    );
  }

  await user.save();
  res.status(200).json(updatedPost);
});

/**
 * @desc Fetch all user's liked posts
 * @route GET /posts/likedposts
 * @access Public
 */
const getLikedPosts = asyncHandler(async (req, res) => {
  const { id: userId } = req.user;
  const user = await User.findById(userId);

  if (!user) {
    res.status(404);
    throw new Error('Not authorized. Please sign in.');
  }

  const userLikes = user.likedPosts.map(mongoose.Types.ObjectId); // convert strs to objectId
  const likedPosts = await Post.find({ _id: { $in: userLikes } });
  const likedPostsInOrder = likedPosts.reverse();

  res.status(200).json(likedPostsInOrder);
});

/**
 * @desc Save post by post id
 * @route PUT /posts/:id/savepost
 * @access Public
 */
const savePost = asyncHandler(async (req, res) => {
  const { id: postId } = req.params;
  const { id: userId } = req.user;

  const user = await User.findById(userId);

  if (!user) {
    res.status(404);
    throw new Error('Nost authorized. Must be logged in to save post.');
  }

  if (!mongoose.Types.ObjectId.isValid(postId)) {
    res.status(404);
    throw new Error('No post with that id');
  }

  const postToSave = await Post.findById(postId);

  // Updating saved posts arr in User model
  const postExistsInSavedPosts = user.savedPosts.includes(
    String(postToSave._id)
  ); // returns Boolean

  if (!postExistsInSavedPosts) {
    user.savedPosts.push(postToSave._id); // if post is not in arr, pushed post's id
  }
  if (postExistsInSavedPosts) {
    user.savedPosts = user.savedPosts.filter(
      (id) => id !== String(postToSave._id)
    );
  }

  await user.save();
  // const updatedSavedPosts = user.savedPosts;
  res.status(200).json(user);
});

/**
 * @desc Fetch all user's saved posts
 * @route GET /posts/savedposts
 * @access Public
 */
const getSavedPosts = asyncHandler(async (req, res) => {
  const { id: userId } = req.user;
  const user = await User.findById(userId);

  if (!user) {
    res.status(404);
    throw new Error('Not authorized. Please sign in.');
  }

  const userSavedPosts = user.savedPosts.map(mongoose.Types.ObjectId); // convert strs to objectId
  const savedPosts = await Post.find({ _id: { $in: userSavedPosts } });
  const savedPostsInOrder = savedPosts.reverse();

  res.status(200).json(savedPostsInOrder);
});

export {
  getAllPosts,
  createNewPost,
  getPostById,
  likePost,
  getLikedPosts,
  savePost,
  getSavedPosts,
};
