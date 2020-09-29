const mongoose = require("mongoose");

const commercialType = mongoose.model(
  "commercialType",
  new mongoose.Schema({
    name: String
  })
);

module.exports = commercialType;