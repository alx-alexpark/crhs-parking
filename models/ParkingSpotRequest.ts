import mongoose, { Schema } from 'mongoose';
import UserType from './User';

const ParkingSpotRequestSchema = new Schema(
  {
    user: {
      type: Schema.ObjectId,
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
    student: {
      driversLicense: {
        // A url to a bucket (picture)
        type: String,
        maxlength: 100,
      },
      legalFirstName: {
        // if it doesen't exist, take directly from user google account
        type: String,
        maxlength: 64,
      },
      legalLastName: {
        // if it doesen't exist, take directly from user google account
        type: String,
        maxlength: 64,
      },
    },
    quadrant: {
      type: String,
      enum: ['9TH_GRADE', '1200', '1600', 'ATHLETICS'],
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

export default interface ParkingSpotRequestType {
  user: UserType;
  vehicle: {
    licensePlate: string;
    proofOfInsurance: string;
    year: number;
    make: string;
    model: string;
    color: string;
  };
  student: {
    driversLicense: string;
    legalFirstName: string;
    legalLastName: string;
  };
  quadrant: string;
  paymentId: string;
  submitted: boolean;
  decision: string;
}
