var mongoose = require("mongoose"),
    passportLocalMongoosse = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
    username:String,
    password:String
});

userSchema.plugin(passportLocalMongoosse);
module.exports = mongoose.model("user",userSchema);