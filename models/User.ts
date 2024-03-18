import mongoose, { InferSchemaType } from 'mongoose';

const TodoSchema = new mongoose.Schema({
  about: {
    type: Boolean,
    default: false,
  },
  parkingRequest: {
    type: Boolean,
    default: false,
  },
  accepted: {
    type: Boolean,
    default: false,
  },
});

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

      // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
      maxlength: 254,
    },
    phone: {
      // Pull from Clerk profile if not available here
      type: String,
      default: '+1',
      // https://stackoverflow.com/questions/3350500/international-phone-number-max-and-min
      maxlength: 15,
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
      required: true,
    },
    driversLicense: {
      // format "$bucket/$filename"
      type: String,
      maxlength: 100,
    },
    todoSteps: {
      type: TodoSchema,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model('User', UserSchema);

export type UserType = InferSchemaType<typeof UserSchema>;
