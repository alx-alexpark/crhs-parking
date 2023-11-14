import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        maxlength: [60, 'Name cannot be longer than 60 characters']
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        maxlength: [128, "Email cannot be longer than 128 characters"]
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