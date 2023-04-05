const mongoose = require("mongoose");

const musicSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Types.ObjectId,
    auto: true,
  },
});

module.exports = mongoose.model("Music", musicSchema);
