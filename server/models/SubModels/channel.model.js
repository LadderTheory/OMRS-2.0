const mongoose = require("mongoose");

const Channel = mongoose.model(
  "Channel",
  new mongoose.Schema({
    name: String,
    active: Boolean
  })
);

module.exports = Channel;