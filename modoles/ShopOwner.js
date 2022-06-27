import mongoose from 'mongoose';

const { ObjectId } = mongoose.Schema;
const ShopOwner = new mongoose.Schema({
    nameShop: {
        type: String,
        trim: true,
        required: true
    },
    user_id: {
        type: ObjectId,
        ref: 'users',
    },
    photo: {
        type: String
    },
    followers: {
        type: Number,
        trim: true
    },
    product_reviews: {
        type: Number,
        trim: true
    }
}, { timestamps: true });
module.exports = mongoose.model('shopowner', ShopOwner);