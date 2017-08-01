var mongoose = require("mongoose");

var photoSchema = new mongoose.Schema({
  name: String,
  source: String,
  description: String,
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
    }
  ]
});

module.exports = mongoose.model("Photo", photoSchema);
