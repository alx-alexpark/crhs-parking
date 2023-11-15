import mongoose, { Schema } from 'mongoose'

const ParkingSpotRequestSchema = new mongoose.Schema({
    user: {
        type: Schema.ObjectId
    },
    vehicle: {
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
        year: {
            required: true,
            type: Number,
            length: 4,
        },
        make: {
            required: true,
            type: String,
            length: 64,
        },
        model: {
            required: true,
            type: String,
            length: 64,
        },
        color: {
            required: true,
            type: String,
            length: 64,
        }
    },
    student: {
        driversLicense: {
            // A url to a bucket (picture)
            type: String,
            maxlength: 100,
            required: true
        },
        legalFirstName: {
            // if it doesen't exist, take directly from user google account
            required: false,
            maxlength: 64,
        },
        legalLastName: {
            // if it doesen't exist, take directly from user google account
            required: false,
            maxlength: 64,
        },
    },
    quadrant: {
        type: String,
        enum: ['9TH_GRADE', '1200', '1600', 'ATHLETICS'],
        required: true
    },
    paymentId: {
        // An invoice number or similar to confirm that the person has indeed paid their dues through PayNGo
        type: String,
        required: true
    }
}, {timestamps: true});

export default mongoose.models.ParkingSpotRequest || mongoose.model('ParkingSpotRequest', ParkingSpotRequestSchema)