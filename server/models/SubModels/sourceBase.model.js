const mongoose = require("mongoose");

const sourceBase = mongoose.model(
  "sourceBase",
  new mongoose.Schema({
    name: String
  })
);

module.exports = sourceBase;