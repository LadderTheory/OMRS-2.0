const mongoose = require("mongoose");

const Aircraft = mongoose.model(
  "Aircraft",
  new mongoose.Schema({
    name: String,
    active:Boolean
  })
);

module.exports = Aircraft;