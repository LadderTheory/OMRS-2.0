const { channel } = require("../../models/db.model");
const db = require("../../models/db.model");
const Channel = db.channel;

//Adds a new channel
exports.addChannel = async (req, res) => {
  let channel = new Channel({
    name: req.body.name,
    active: true
  });
  try {
    await channel.save()
    res.send({id: channel._id, message:"Channel Added"})
  } catch (err) {
    console.log(err)
  }
}
//Find all channels
exports.findChannels = async (req, res) => {
  try {
    const data = await Channel.find().exec();
    res.send(data);
  } catch (err) {
    console.log(err)
  }
};
//Updates a channel
exports.updateChannel = async (req, res) => {
  try {
    await Channel.update(
      { _id: req.params.id },
      { $set: req.body }).exec();
    res.send("Channel Updated")
  } catch (err) {
    console.log(err)
  }
};
exports.deactivateChannel = async (req, res) => {
  try {
    await Channel.findById(req.params.id)
      .exec((err, foundChannels) => {
        if (foundChannels.active === true) {
          foundChannels.active = false;
          foundChannels.save();
          res.send('This Channel has been made inactive');
        }
        else if (foundChannels.active === false) {
          foundChannels.active = true;
          foundChannels.save();
          res.send('This Channel has been made active');
        }
      });
  } catch (err) {
    console.log(err)
  }
}