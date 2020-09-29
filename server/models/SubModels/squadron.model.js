const mongoose = require("mongoose");

const squadron = mongoose.model(
  "squadron",
  new mongoose.Schema({
    name: String
  })
);

module.exports = squadron;