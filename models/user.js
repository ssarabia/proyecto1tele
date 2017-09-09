const mongoose = require("mongoose");
const passportLocalMongooose = require("passport-local-mongoose")

const UserSchema = new mongoose.Schema({
  local   :{
    username: String,
    password: String
  },
  google            : {
       id           : String,
       token        : String,
       email        : String,
       username     : String
   }
});

UserSchema.plugin(passportLocalMongooose);

module.exports = mongoose.model("User", UserSchema);
