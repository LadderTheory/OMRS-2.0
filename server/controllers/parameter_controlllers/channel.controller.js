const db = require("../../models/db.model");
const Channel = db.channel;

  //Adds a new channel
  exports.addChannel = (req, res) => {
    let channel = new Channel(req.body);
    channel.save(function(err){
      if (!err) {
        res.send("Successfully added a new channel");
      } else {
        res.send(err);
      }
    });
}

//Find all channels
exports.findChannels = (req, res) => {
    Channel.find(function(err, foundChannels){
        if (!err) {
          res.send(foundChannels);
        } else {
          res.send(err);
        }   
      });
};