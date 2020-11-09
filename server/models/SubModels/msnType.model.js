const mongoose = require("mongoose");

const MsnType = mongoose.model(
  "MsnType",
  new mongoose.Schema({
    name: String,
    Active: Boolean
  })
);

module.exports = MsnType;