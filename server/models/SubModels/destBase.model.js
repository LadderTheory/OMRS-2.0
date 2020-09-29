const mongoose = require("mongoose");

const DestBase = mongoose.model(
  "DestBase",
  new mongoose.Schema({
    name: String
  })
);

module.exports = DestBase;