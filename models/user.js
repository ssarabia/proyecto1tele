const mongoose = require("mongoose");
const passportLocalMongooose = require("passport-local-mongoose")

var UserSchema = new mongoose.Schema({
  username: String,
  password: String
});

UserSchema.plugin(passportLocalMongooose);

module.exports = mongoose.model("User", UserSchema);
