const db = require("../../models/db.model");
const MsnType = db.msnType;

//Adds a new Msn Type
exports.addMsnType = async (req, res) => {
  let msnType = new MsnType({
    name: req.body.name,
    active: true
  });
  try {
    await msnType.save()
    res.send({id:msnType._id, message:"Mission Type Added"})
  } catch (err) {
    console.log(err)
  }
}
//Find all Msn Types
exports.findMsnTypes = async (req, res) => {
  try {
    const data = await MsnType.find().exec();
    res.send(data)
  } catch (err) {
    console.log(err)
  }
};
//Updates a msnType
exports.updateMsnType = async (req, res) => {
  try {
    await MsnType.updateOne(
      { _id: req.params.id },
      { $set: req.body }).exec()
    res.send("Mission Type Updated")
  } catch (err) {
    console.log(err)
  }
};
exports.deactivateMsnType = async (req, res) => {
  try {
    await msnType.findById(req.params.id)
      .exec((err, foundMsnTypes) => {
        if (foundMsnTypes.active === true) {
          foundMsnTypes.active = false;
          foundMsnTypes.save();
          res.send('This Mission Type has been made inactive');
        }
        else if (foundMsnTypes.active === false) {
          foundMsnTypes.active = true;
          foundMsnTypes.save();
          res.send('This Mission Type has been made active');
        }
      })
  } catch (err) {
    console.log(err)
  }
}