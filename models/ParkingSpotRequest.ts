import mongoose, { Schema } from 'mongoose';

const ParkingSpotRequestSchema = new mongoose.Schema(
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
        length: 4,
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
        maxlength: 64,
      },
      legalLastName: {
        // if it doesen't exist, take directly from user google account
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
  },
  { timestamps: true }
);

export default mongoose.models.ParkingSpotRequest ||
  mongoose.model('ParkingSpotRequest', ParkingSpotRequestSchema);
