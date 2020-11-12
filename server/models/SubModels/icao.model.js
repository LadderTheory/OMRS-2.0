const mongoose = require("mongoose");

const ICAO = mongoose.model(
  "ICAO",
  new mongoose.Schema({
    name: String,
    active: Boolean
  })
);

module.exports = ICAO;