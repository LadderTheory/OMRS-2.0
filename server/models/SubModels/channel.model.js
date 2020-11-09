const mongoose = require("mongoose");

const Channel = mongoose.model(
  "Channel",
  new mongoose.Schema({
    name: String,
    Active: Boolean
  })
);

module.exports = Channel;