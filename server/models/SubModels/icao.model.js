const mongoose = require("mongoose");

const ICAO = mongoose.model(
  "ICAO",
  new mongoose.Schema({
    name: String,
    Active: Boolean
  })
);

module.exports = ICAO;