const db = require("../../models/db.model");
const ICAO = db.icao;

//Adds a new ICAO
exports.addICAO = async (req, res) => {
  let icao = new ICAO({
    name: req.body.name,
    active: true
  });
  try {
    await icao.save()
    res.send("ICAO Added")
  } catch (err) {
    console.log(err)
  }
}
//Find all ICAO
exports.findICAO = async (req, res) => {
  try {
    const data = await ICAO.find().exec()
    res.send(data)
  } catch (err) {
    console.log(err)
  }
};
//Updates an ICAO
exports.updateICAO = async (req, res) => {
  try {
    await ICAO.update(
      { _id: req.params.id },
      { $set: req.body }).exec()
    res.send("ICAO Updated")
  } catch (err) {
    console.log(err)
  }
};
exports.deactivateICAO = async (req, res) => {
  try {
    await ICAO.findById(req.params.deactivate)
      .exec((err, foundICAO) => {
        if (foundICAO.active === true) {
          foundICAO.active = false;
          foundICAO.save();
          res.send('This ICAO has been made inactive');
        }
        else if (foundICAO.active === false) {
          foundICAO.active = true;
          foundICAO.save();
          res.send('This ICAO has been made active');
        }
      });
  } catch (err) {
    console.log(err)
  }

}