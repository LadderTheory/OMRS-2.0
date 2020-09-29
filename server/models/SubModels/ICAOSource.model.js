const mongoose = require("mongoose");

const ICAOSource = mongoose.model(
  "ICAOSource",
  new mongoose.Schema({
    name: String
  })
);

module.exports = ICAOSource;