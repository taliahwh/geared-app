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
      unique: true,
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
    profileImage: {
      type: String,
      default:
        'https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg',
    },
    dateOfBirth: {
      type: String,
    },
    bio: {
      type: String,
    },
    website: {
      type: String,
    },
    interests: {
      type: [Object],
    },
    savedPosts: {
      type: [postSchema],
      default: [],
    },
    likedPosts: {
      type: [postSchema],
      default: [],
    },
  },
  {
    // Automatically generates createdAt and updatedAt fields
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);

export default User;
