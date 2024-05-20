import mongoose, { InferSchemaType, Schema } from 'mongoose';

const ParkingSpotRequestSchema = new Schema(
  {
    user: {
      type: Schema.ObjectId,
    },
    schoolYear: {
      type: String,
    },
    changesRequestedMessage: {
      type: String,
    },
    vehicle: {
      licensePlate: {
        type: String,
        maxlength: 10,
        default: '',
      },
      proofOfInsurance: {
        // A url to a bucket (picture)
        type: String,
        maxlength: 100,
        default: '',
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
        default: '',
      },
      model: {
        type: String,
        maxlength: 64,
        default: '',
      },
      color: {
        type: String,
        maxlength: 64,
        default: '',
      },
    },
    spotNum: {
      type: Number,
      maxlength: 4,
    },
    stickerNum: {
      type: Number,
      maxlength: 15,
    },
    stickerClaimed: {
      type: Boolean,
      defualt: false,
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
    lastInteractingAdminUserId: {
      type: String,
      maxlength: 30,
    },
    formStep: {
      type: Number,
      default: 0,
    },
    parkingSticker: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.models.ParkingSpotRequest ||
  mongoose.model('ParkingSpotRequest', ParkingSpotRequestSchema);

export type ParkingSpotRequestType = InferSchemaType<
  typeof ParkingSpotRequestSchema
>;
