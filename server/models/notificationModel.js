import mongoose from 'mongoose';

export const notificationSchema = new mongoose.Schema(
  {
    viewed: {
      type: Boolean,
      default: false,
    },
    notificationType: {
      type: String,
      required: true,
    },
    notificationBody: {
      type: String,
      required: true,
    },
    requestTo: {
      type: String,
      required: true,
    },
    requestFrom: {
      type: String,
      required: true,
    },
  },

  {
    // Automatically generates createdAt and updatedAt fields
    timestamps: true,
  }
);

const Notification = mongoose.model('Notification', notificationSchema);

export default Notification;
