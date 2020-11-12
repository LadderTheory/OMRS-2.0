const mongoose = require("mongoose");

const Operation = mongoose.model(
  "Operation",
  new mongoose.Schema({
    name: String,
    active: Boolean
  })
);

module.exports = Operation;