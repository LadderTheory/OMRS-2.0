const mongoose = require("mongoose");

const SourceBase = mongoose.model(
  "SourceBase",
  new mongoose.Schema({
    name: String
  })
);

module.exports = SourceBase;