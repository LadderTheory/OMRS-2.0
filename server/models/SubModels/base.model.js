const mongoose = require("mongoose");

const base = mongoose.model(
  "base",
  new mongoose.Schema({
    name: String
  })
);

module.exports = base;