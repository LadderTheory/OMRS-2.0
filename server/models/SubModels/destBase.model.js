const mongoose = require("mongoose");

const destBase = mongoose.model(
  "destBase",
  new mongoose.Schema({
    name: String
  })
);

module.exports = destBase;