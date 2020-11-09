const mongoose = require("mongoose");

const Base = mongoose.model(
  "Base",
  new mongoose.Schema({
    name: String,
    Active: Boolean
  })
);

module.exports = Base;