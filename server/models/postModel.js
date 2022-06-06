import mongoose from 'mongoose';

export const postSchema = new mongoose.Schema(
  {
    images: {
      type: [
        {
          title: {
            type: String,
            required: true,
          },
          imgUrl: {
            type: String,
            required: true,
          },
        },
      ],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    showcase: {
      type: Boolean,
      default: true,
    },
    forSale: {
      type: Boolean,
      default: false,
    },
    openToOffers: {
      type: Boolean,
      default: false,
    },
    likes: {
      type: [String],
      default: [],
    },
    comments: {
      type: [String],
      default: [],
    },
    listedBy: {
      username: {
        type: String,
        required: true,
      },
      profileImage: {
        type: String,
        required: true,
      },
      location: {
        type: String,
        required: true,
      },
    },
    // userId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   required: true,
    // },
  },

  {
    // Automatically generates createdAt and updatedAt fields
    timestamps: true,
  }
);

const Post = mongoose.model('Post', postSchema);

export default Post;
