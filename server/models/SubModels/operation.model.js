const mongoose = require("mongoose");

const operation = mongoose.model(
  "operation",
  new mongoose.Schema({
    name: String
  })
);

module.exports = operation;