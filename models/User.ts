import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 60
    },
    email: {
        type: String,
        required: true,
        maxlength: 254 // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
    },
    phone: {
        // Pull from clerk profile if not available here
        required: false,
        maxlength: 15, // https://stackoverflow.com/questions/3350500/international-phone-number-max-and-min
    },
    studentId: {
        required: true,
        length: 8
    },
    admin: {
        type: Boolean
    },
    grade: {
        type: Number,
        enum: [9, 10, 11, 12],
    }

}, {timestamps: true});

export default mongoose.models.User || mongoose.model('User', UserSchema)