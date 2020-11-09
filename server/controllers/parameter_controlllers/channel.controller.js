const { channel } = require("../../models/db.model");
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

//Updates a channel
 exports.updateChannel = (req, res) => {
  Channel.update(
    {_id: req.params.id}, 
    {$set: req.body},
     function(err){
       if (!err) {
         res.send("Successfully updated channel information.");
       } else {
         res.send(err);
       }
     }
    );
};
 //Deletes a channel
 exports.deleteChannel = (req, res) => {
  Channel.deleteOne({_id: req.params.id}, function(err){
    if(!err) {
      res.send("Successfully deleted channel");
    } else {
      res.send(err);
    }
  });
}