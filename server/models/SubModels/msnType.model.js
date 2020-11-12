const mongoose = require("mongoose");

const MsnType = mongoose.model(
  "MsnType",
  new mongoose.Schema({
    name: String,
    active: Boolean
  })
);

module.exports = MsnType;