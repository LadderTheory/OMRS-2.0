const mongoose = require("mongoose");

const ICAO = mongoose.model(
  "ICAO",
  new mongoose.Schema({
    name: String
  })
);

module.exports = ICAO;