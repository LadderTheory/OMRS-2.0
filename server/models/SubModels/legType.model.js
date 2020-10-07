const mongoose = require("mongoose");

const LegType = mongoose.model(
  "LegType",
  new mongoose.Schema({
    name: String
  })
);

module.exports = LegType;