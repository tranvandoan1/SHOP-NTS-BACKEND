import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema;

const saveuser = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: 32
    },
    avatar: {
        type: String
    },
    user_id: {
        type: ObjectId,
        ref: 'user',
        required: true
    },
    hashed_password: {
        type: String,
        required: false,
    },
    role: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

module.exports = mongoose.model("saveuser", saveuser);