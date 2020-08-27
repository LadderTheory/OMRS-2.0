const mongoose = require("mongoose");

//create admin Schema

const adminSchema = mongoose.Schema

const Admin = new adminSchema({
    fistName:String,
    lastName:String,
    userName:String,
    password:String,
    adminStatus:Boolean
});

module.exports = mongoose.model("Admin", Admin)