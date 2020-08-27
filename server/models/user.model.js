const mongoose = require("mongoose");

//create user Schema
const userSchema = mongoose.Schema

const User = new userSchema({
    firstName:String,
    lastName:String,
    userName:String,
    password:String,
});

module.exports = mongoose.model("User", User);