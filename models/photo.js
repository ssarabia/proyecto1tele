const mongoose = require("mongoose");

const photoSchema = new mongoose.Schema({
  name: String,
  source: String,
  description: String,
  publico: String,
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: String
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
    }
  ]
});

module.exports = mongoose.model("Photo", photoSchema);
