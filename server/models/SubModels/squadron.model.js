const mongoose = require("mongoose");

const Squadron = mongoose.model(
  "Squadron",
  new mongoose.Schema({
    name: String,
    active: Boolean
  })
);

module.exports = Squadron;