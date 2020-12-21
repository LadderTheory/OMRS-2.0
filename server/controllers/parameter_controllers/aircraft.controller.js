const db = require("../../models/db.model");
const Aircraft = db.aircraft;

//Adds a new aircraft type
exports.addAircraft = async (req, res) => {
  let aircraft = new Aircraft({
    name: req.body.name,
    active: true
  });
  try {
    await aircraft.save();
    res.send({id: aircraft._id, message:"Aircraft Added"});
  } catch (err) {
    console.log(err);
  }
}
//Find all aircraft
exports.findAircraft = async (req, res) => {
  try {
    const data = await Aircraft.find().exec();
    res.send(data);
  } catch (err) {
    console.log(err);
  }
};
//Update an aircraft
exports.updateAircraft = async (req, res) => {
  try {
    await Aircraft.updateOne(
      { _id: req.params.id },
      { $set: req.body }).exec();
    res.send('Aircraft Updated')
  } catch (err) {
    console.log(err)
  }
};
exports.deactivateAircraft = async (req, res) => {
  try {
    await Aircraft.findById(req.params.id)
      .exec((err, foundAircraft) => {
        if (foundAircraft.active === true) {
          foundAircraft.active = false;
          foundAircraft.save();
          res.send('This Aircraft has been made inactive');
        }
        else if (foundAircraft.active === false) {
          foundAircraft.active = true;
          foundAircraft.save();
          res.send('This Aircraft has been made active');
        }
      });
  } catch (err) {
    console.log(err)
  }
}

