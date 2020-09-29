const mongoose = require("mongoose");

const CommercialType = mongoose.model(
  "CommercialType",
  new mongoose.Schema({
    name: String
  })
);

module.exports = CommercialType;