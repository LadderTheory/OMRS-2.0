const db = require("../../models/db.model");
const Base = db.base;

//Adds a new base
exports.addBase = async (req, res) => {
  let base = new Base({
    name: req.body.name,
    active: true
  });
  try {
    await base.save()
    res.send({id: base._id, message: "Base Added"})
  } catch (err) {
    console.log(err)
  }
}
//Find all bases
exports.findBases = async (req, res) => {
  try {
    const data = await Base.find().exec()
    res.send(data)
  } catch (err) {
    console.log(err)
  }
};
//Updates a base
exports.updateBase = async (req, res) => {
  try {
    await Base.updateOne(
      { _id: req.params.id },
      { $set: req.body }).exec()
      res.send("Base Updated")
  } catch (err) {
    console.log(err)
  }
};
exports.deactivateBases = async (req, res) => {
  try {
    await Base.findById(req.params.id)
    .exec((err, foundBases) => {
      if (foundBases.active === true) {
        foundBases.active = false;
        foundBases.save();
        res.send('This Base has been made inactive');
      }
      else if (foundBases.active === false) {
        foundBases.active = true;
        foundBases.save();
        res.send('This Base has been made active');
      }
    });
  } catch (err) {
    console.log(err)
  }
}