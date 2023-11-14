import mongoose, { Schema } from 'mongoose'

const ParkingSpotRequestSchema = new mongoose.Schema({
    user: {
        type: Schema.ObjectId
    },
    licensePlate: {
        type: String,
        maxlength: 10,
        required: true
    },
    proofOfInsurance: {
        // A url to a bucket (picture)
        type: String,
        maxlength: 100,
        required: true
    },
    driversLicense: {
        // A url to a bucket (picture)
        type: String,
        maxlength: 100,
        required: true
    },
    quadrant: {
        type: String,
        enum: ['9_GRADE', '1200', '1600'],
        required: true
    },
    paymentId: {
        // An invoice number or similar to confirm that the person has indeed paid their dues through PayNGo
        type: String,
        required: true
    }
}, {timestamps: true});

export default mongoose.models.ParkingSpotRequest || mongoose.model('ParkingSpotRequest', ParkingSpotRequestSchema)