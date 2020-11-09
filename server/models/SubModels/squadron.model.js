const mongoose = require("mongoose");

const Squadron = mongoose.model(
  "Squadron",
  new mongoose.Schema({
    name: String,
    Active: Boolean
  })
);

module.exports = Squadron;