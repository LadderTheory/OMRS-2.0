const mongoose = require("mongoose");

const LegType = mongoose.model(
  "LegType",
  new mongoose.Schema({
    name: String,
    active: Boolean
  })
);

module.exports = LegType;