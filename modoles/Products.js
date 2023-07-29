import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    cate_id: {
      type: ObjectId,
      ref: "categories",
    },
    shop_id: {
      type: ObjectId,
      ref: "shopowner",
    },
    user_id: {
      type: ObjectId,
      ref: "user",
    },
    photo: {
      type: String,
    },
    photo1: {
      type: String,
    },
    photo2: {
      type: String,
    },
    photo3: {
      type: String,
    },
    photo4: {
      type: String,
    },
    photo5: {
      type: String,
    },
    view: {
      type: Number,
    },
    review: {
      type: Number,
    },

    sold: {
      type: Number,
    },
    description: {
      type: String,
    },
    sale: {
      type: Number,
    },
    origin: {
      type: String,
    },
    trademark: {
      type: String,
    },
    warehouse: {
      type: String,
    },
    sent_from: {
      type: String,
    },
    linked: {
      type: String,
    },
    name_classification: {
      type: String,
    },
    name_commodityvalue: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("products", productSchema);
