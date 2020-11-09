const mongoose = require("mongoose");

const Aircraft = mongoose.model(
  "Aircraft",
  new mongoose.Schema({
    name: String,
    Active:Boolean
  })
);

module.exports = Aircraft;