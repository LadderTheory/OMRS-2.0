const db = require("../../models/db.model");
const Operation = db.operation;

//Adds a new operation
exports.addOperation = async (req, res) => {
  let operation = new Operation({
    name: req.body.name,
    active: true
  });
  try {
    await operation.save();
    res.send({id: operation._id, message:"Operation Added"})
  } catch (err) {
    console.log(err)
  }
}
//Find all operations
exports.findOperations = async (req, res) => {
  try {
    const data = await Operation.find().exec()
    res.send(data)
  } catch (err) {
    console.log(err)
  }
};
//Updates a operation
exports.updateOperation = async (req, res) => {
  try {
    await Operation.updateOne(
      { _id: req.params.id },
      { $set: req.body }).exec()
    res.send("Operation Updated")
  } catch (err) {
    console.log(err)
  }
};
//activate or deactivate an operation based on its current status
exports.deactivateOperation = async (req, res) => {
  try {
    await Operation.findById(req.params.id)
      .exec((err, foundOperations) => {
        if (foundOperations.active === true) {
          foundOperations.active = false;
          foundOperations.save();
          res.send('This Operation has been made inactive');
        }
        else if (foundOperations.active === false) {
          foundOperations.active = true;
          foundOperations.save();
          res.send('This Operation has been made active');
        }
      });
  } catch (err) {
    console.log(err)
  }
}