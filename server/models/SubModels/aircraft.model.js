const mongoose = require("mongoose");

const Aircraft = mongoose.model(
  "Aircraft",
  new mongoose.Schema({
    name: String,
  })
);

module.exports = Aircraft;