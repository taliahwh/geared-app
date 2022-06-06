import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';

import generateToken from '../utils/generateToken.js';

import User from '../models/userModel.js';

/**
 * @desc Authenticate user and get token
 * @route POST /user/login
 * @access Public
 */
const signIn = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  const sendUserData = (user) => {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
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

export { signIn };
