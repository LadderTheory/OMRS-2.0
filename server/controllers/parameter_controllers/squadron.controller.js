const db = require("../../models/db.model");
const Squadron = db.squadron;

//Adds a new squadron
exports.addSquadron = async (req, res) => {
  let squadron = new Squadron({
    name: req.body.name,
    active: true
  });
  try {
    await squadron.save()
    res.send({id: squadron._id, message:"Squadron Added"})
  } catch (err) {
    console.log(err)
  }
}
//Find all squadrons
exports.findSquadrons = async (req, res) => {
  try {
    const data = await Squadron.find().exec()
    res.send(data)
  } catch (err) {
    console.log(err)
  }
};
//Updates a squadron
exports.updateSquadrons = async (req, res) => {
  try {
    await Squadron.updateOne(
      { _id: req.params.id },
      { $set: req.body }).exec()
    res.send("Squadron Updated")
  } catch (err) {
    console.log(err)
  }
};
//activate or deactivate a squadron based on its current status
exports.deactivateSquadron = async (req, res) => {
  try {
    await Squadron.findById(req.params.id)
      .exec((err, foundSquadrons) => {
        if (foundSquadrons.active === true) {
          foundSquadrons.active = false;
          foundSquadrons.save();
          res.send('This Squadron has been made inactive');
        }
        else if (foundSquadrons.active === false) {
          foundSquadrons.active = true;
          foundSquadrons.save();
          res.send('This Squadron has been made active');
        }
      });
  } catch (err) {
    console.log(err)
  }
}


