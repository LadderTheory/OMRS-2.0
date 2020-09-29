const mongoose = require("mongoose");

const Base = mongoose.model(
  "Base",
  new mongoose.Schema({
    name: String
  })
);

module.exports = Base;