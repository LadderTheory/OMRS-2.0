const mongoose = require("mongoose");

const MsnType = mongoose.model(
  "MsnType",
  new mongoose.Schema({
    name: String
  })
);

module.exports = MsnType;