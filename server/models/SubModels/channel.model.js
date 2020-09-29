const mongoose = require("mongoose");

const channel = mongoose.model(
  "channel",
  new mongoose.Schema({
    name: String
  })
);

module.exports = channel;