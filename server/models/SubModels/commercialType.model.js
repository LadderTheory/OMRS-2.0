const mongoose = require("mongoose");

const CommType = mongoose.model(
  "CommType",
  new mongoose.Schema({
    name: String,
    active: Boolean
  })
);

module.exports = CommType;