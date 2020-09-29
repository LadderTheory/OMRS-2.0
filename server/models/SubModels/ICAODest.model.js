const mongoose = require("mongoose");

const ICAODest = mongoose.model(
  "ICAODest",
  new mongoose.Schema({
    name: String
  })
);

module.exports = ICAODest;