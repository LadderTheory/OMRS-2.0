const mongoose = require("mongoose");

const Channel = mongoose.model(
  "Channel",
  new mongoose.Schema({
    name: String
  })
);

module.exports = Channel;