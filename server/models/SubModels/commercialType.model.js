const mongoose = require("mongoose");

const CommType = mongoose.model(
  "CommType",
  new mongoose.Schema({
    name: String,
    Active: Boolean
  })
);

module.exports = CommType;