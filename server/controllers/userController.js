import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';

import generateToken from '../utils/generateToken.js';

import User from '../models/userModel.js';
import Post from '../models/postModel.js';
/**
 * @desc Authenticate user and get token
 * @route POST /user/signup
 * @access Public
 */
const signIn = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  const sendUserData = (user) => {
    res.json({
      _id: user._id,
      name: user.name,
      username: user.username,
      token: generateToken(user._id),
    });
  };

  if (username) {
    const userByUsername = await User.findOne({ username });

    if (!userByUsername) {
      res.status(404);
      throw new Error('Username not found');
    }

    const correctPassword = await bcrypt.compare(
      password,
      userByUsername.password
    );

    if (!correctPassword) {
      res.status(400);
      throw new Error('Invalid password.');
    }

    if (userByUsername && correctPassword) {
      sendUserData(userByUsername);
    } else {
      res.status(401);
      throw new Error('Invalid email or password');
    }
  }
});

/**
 * @desc Create new user
 * @route POST /user/signup
 * @access Public
 */
const signUp = asyncHandler(async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    username,
    password,
    confirmPassword,
    dateOfBirth,
    bio,
    profileImage,
  } = req.body;

  // Find user by email
  const emailExists = await User.findOne({ email });

  if (emailExists) {
    res.status(404);
    throw new Error('Email already exists');
  }

  // Find user by username
  const usernameExists = await User.findOne({ username });

  if (usernameExists) {
    res.status(404);
    throw new Error('Username already exists');
  }

  if (password !== confirmPassword) {
    res.status(400);
    throw new Error('Passwords do not match. Please try again.');
  }

  // Password strength requirement (uppercase, lowercase, number and special char)
  if (password.length < 8) {
    res.status(400);
    throw new Error('Password must be at least 8 characters.');
  }

  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasNonalphas = /\W/.test(password);
  if (!hasUpperCase || !hasLowerCase || !hasNumbers || !hasNonalphas) {
    res.status(400);
    throw new Error(
      'Password must be at least 8 characters, contain an upper and lowercase letter, a number, and special character.'
    );
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await User.create({
    name: `${firstName} ${lastName}`,
    email,
    username,
    password: hashedPassword,
    dateOfBirth,
    bio: bio || '',
    profileImage:
      profileImage ||
      'https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg',
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: `${firstName} ${lastName}`,
      username: user.username,
      email: user.email,
      dateOfBirth,
      bio,
      profileImage,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Something went wrong.');
  }
});

// @desc Update user profile
// @route PUT /api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const { id: userId } = req.user;
  const {
    newProfileImage,
    newBio,
    interest1,
    interest2,
    interest3,
    interest4,
    newFullName,
    newWebsite,
  } = req.body;

  const user = await User.findById(userId);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  // // Password check
  // if (newPassword && !newConfirmPassword) {
  //   res.status(401);
  //   throw new Error('Confirm password is required');
  // }

  // if (newPassword && newPassword !== confirmPassword) {
  //   res.status(400);
  //   throw new Error('Passwords do not match. Please try again.');
  // }

  // // Password strength requirement (uppercase, lowercase, number and special char)
  // if (newPassword && newPassword.length < 8) {
  //   res.status(400);
  //   throw new Error('Password must be at least 8 characters.');
  // }

  // const hasUpperCase = /[A-Z]/.test(newPassword);
  // const hasLowerCase = /[a-z]/.test(newPassword);
  // const hasNumbers = /\d/.test(newPassword);
  // const hasNonalphas = /\W/.test(newPassword);
  // if (!hasUpperCase || !hasLowerCase || !hasNumbers || !hasNonalphas) {
  //   res.status(400);
  //   throw new Error(
  //     'Password must be at least 8 characters, contain an upper and lowercase letter, a number, and special character.'
  //   );
  // }

  // const hashedPassword = await bcrypt.hash(password, 12);

  user.profileImage = newProfileImage || user.profileImage;
  user.bio = newBio || user.bio;
  // user.interests[0].name = interest1 || user.interests[0].name;
  // user.interests[1].name = interest2 || user.interests[1].name;
  // user.interests[2].name = interest3 || user.interests[2].name;
  // user.interests[3].name = interest4 || user.interests[3].name;
  user.name = newFullName || user.name;
  user.website = newWebsite || user.website;

  const updatedUser = await user.save();
  // console.log(updatedUser);

  res.status(200).json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    profileImage: updatedUser.profileImage,
    bio: updatedUser.bio,
    interests: updatedUser.interests,
    website: updatedUser.website,
    token: generateToken(updatedUser._id),
  });
});

// @desc Get user details by id
// @route GET /api/users/:id
// @access Private
const getUserDetails = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id).select('-password');

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  res.status(200).json(user);
});

/**
 * @desc Fetch all user's posts (collection) by their id
 * @route GET /posts/collection/:id
 * @access Public
 */
const getPostsByUserId = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const user = await User.findById(id);

  if (!user) {
    res.status(403);
    throw new Error('Unauthorized. Must be signed in.');
  }

  // dot notation for nested documents (mongoose)
  const posts = await Post.find({
    'listedBy.userId': String(user._id),
  });

  if (!posts) {
    res.status(404);
    throw new Error('User does not have any listings.');
  }

  const userCollection = posts.reverse();
  res.status(200).json(userCollection);
});

export { signIn, signUp, getUserDetails, getPostsByUserId, updateUserProfile };
