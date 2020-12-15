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
    res.send("Squadron Added")
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
    await Squadron.update(
      { _id: req.params.id },
      { $set: req.body }).exec()
    res.send("Squadon Updated")
  } catch (err) {
    console.log(err)
  }
};
exports.deactivateSquadron = async (req, res) => {
  try {
    await Squadron.findById(req.params.deactivate)
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


