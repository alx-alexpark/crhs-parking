import mongoose, { InferSchemaType, Schema } from 'mongoose';
import UserType from './User';

const ParkingSpotRequestSchema = new Schema(
  {
    user: {
      type: Schema.ObjectId,
    },
    schoolYear: {
      type: String,
    },
    vehicle: {
      licensePlate: {
        type: String,
        maxlength: 10,
      },
      proofOfInsurance: {
        // A url to a bucket (picture)
        type: String,
        maxlength: 100,
      },
      year: {
        type: Number,
        // length: 4,
        min: 1900,
        max: 9999,
      },
      make: {
        type: String,
        maxlength: 64,
      },
      model: {
        type: String,
        maxlength: 64,
      },
      color: {
        type: String,
        maxlength: 64,
      },
    },
    spotNum: {
      type: Number,
      maxlength:4,
    },
    paymentId: {
      // An invoice number or similar to confirm that the person has indeed paid their dues through PayNGo
      type: String,
    },
    submitted: {
      type: Boolean,
      default: false,
    },
    decision: {
      type: String,
      enum: ['undecided', 'approved', 'denied'],
      default: 'undecided',
    },
  },
  { timestamps: true }
);

export default mongoose.models.ParkingSpotRequest ||
  mongoose.model('ParkingSpotRequest', ParkingSpotRequestSchema);

export type ParkingSpotRequestType = InferSchemaType<
  typeof ParkingSpotRequestSchema
>;
