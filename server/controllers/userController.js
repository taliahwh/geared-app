import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';

import generateToken from '../utils/generateToken.js';

import User from '../models/userModel.js';

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
      email: user.email,
      profileImage: user.profileImage,
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

  if (email) {
    const userByEmail = await User.find({ email });

    if (!userByEmail) {
      res.status(404);
      throw new Error('No account with that email');
    }

    const correctPassword = await bcrypt.compare(
      password,
      userByEmail.password
    );

    if (!correctPassword) {
      res.status(400);
      throw new Error('Invalid password.');
    }

    if (userByEmail && correctPassword) {
      sendUserData(userByEmail);
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
    interests,
    profileImage,
  } = req.body;
  console.log(req.body.firstName);
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
    interests: interests || [],
    profileImage,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: `${firstName} ${lastName}`,
      username: user.username,
      email: user.email,
      dateOfBirth,
      bio,
      interests,
      profileImage,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Something went wrong.');
  }
});

export { signIn, signUp };
