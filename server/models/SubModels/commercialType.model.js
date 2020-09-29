const mongoose = require("mongoose");

const CommType = mongoose.model(
  "CommercialType",
  new mongoose.Schema({
    name: String
  })
);

module.exports = CommType;