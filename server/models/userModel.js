import mongoose from 'mongoose';
import { postSchema } from './postModel.js';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    // collection: {
    //   type: [postSchema],
    //   default: [],
    // },
    // savedPosts: {
    //   type: [postSchema],
    //   default: [],
    // },
    // likedPosts: {
    //   type: [postSchema],
    //   default: [],
    // },
  },
  {
    // Automatically generates createdAt and updatedAt fields
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);

export default User;
