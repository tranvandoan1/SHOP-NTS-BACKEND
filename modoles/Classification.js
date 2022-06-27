import mongoose from "mongoose";

const Classification = new mongoose.Schema(
  {
    name: {
      type: String,
    },

    connection: {
      type: String,
    },
    linked: {
      type: String,
    },
    photo: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("classify", Classification);
