const mongoose = require("mongoose");

const aircraft = mongoose.model(
  "aircraft",
  new mongoose.Schema({
    name: String
  })
);

module.exports = aircraft;