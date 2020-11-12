const mongoose = require("mongoose");

const parameterSchema = mongoose.Schema

const Parameter = new parameterSchema({

Name:String,
Type:String

});

module.exports = mongoose.model("Parameter", Parameter);