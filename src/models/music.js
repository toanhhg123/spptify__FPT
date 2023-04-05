const mongoose = require("mongoose");

const musicSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      auto: true,
    },
    singer: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    releaseDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
    duration: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    audioFile: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Music = mongoose.model("Music", musicSchema);

module.exports = Music;
