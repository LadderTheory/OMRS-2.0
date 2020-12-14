const { channel } = require("../../models/db.model");
const db = require("../../models/db.model");
const Channel = db.channel;

  //Adds a new channel
  exports.addChannel = (req, res) => {
    let channel = new Channel({
      name: req.body.name,
      active: true});
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
  exports.deactivateChannel = (req, res) => {
  Channel.findById(req.params.deactivate)
  .exec((err, foundChannels) => {
    if(foundChannels.active === true)
    {
      foundChannels.active =false;
      foundChannels.save();
      res.send('This Channel has been made inactive');
    }
    else if(foundChannels.active === false)
    {
      foundChannels.active = true;
      foundChannels.save();
      res.send('This Channel has been made active');
    }
  });
}