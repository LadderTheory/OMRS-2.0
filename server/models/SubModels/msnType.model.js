const mongoose = require("mongoose");

const msnType = mongoose.model(
  "msnType",
  new mongoose.Schema({
    name: String
  })
);

module.exports = msnType;