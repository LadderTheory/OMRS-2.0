const db = require("../../models/db.model");
const Operation = db.operation;

  //Adds a new operation
  exports.addOperation = (req, res) => {
    let operation = new Operation(req.body);
    operation.save(function(err){
      if (!err) {
        res.send("Successfully added a new operation");
      } else {
        res.send(err);
      }
    });
}

//Find all operations
exports.findOperations = (req, res) => {
    Operation.find(function(err, foundOperations){
        if (!err) {
          res.send(foundOperations);
        } else {
          res.send(err);
        }   
      });
};