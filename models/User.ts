import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 60,
    },
    email: {
      type: String,
      required: true,
      maxlength: 254, // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
    },
    phone: {
      // Pull from clerk profile if not available here
      type: Number,
      maxlength: 15, // https://stackoverflow.com/questions/3350500/international-phone-number-max-and-min
    },
    studentId: {
      type: String,
      length: 8,
    },
    admin: {
      type: Boolean,
      default: false,
    },
    grade: {
      type: Number,
      enum: [10, 11, 12],
    },
    clerkUserId: {
      type: String,
      required: true
    }
}, {timestamps: true});

export default mongoose.models.User || mongoose.model('User', UserSchema)
