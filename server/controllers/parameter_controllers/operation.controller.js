const db = require("../../models/db.model");
const Operation = db.operation;

  //Adds a new operation
  exports.addOperation = (req, res) => {
    let operation = new Operation({
      name: req.body.name,
      active: true});
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
 //Updates a operation
 exports.updateOperation = (req, res) => {
  Operation.update(
    {_id: req.params.id}, 
    {$set: req.body},
     function(err){
       if (!err) {
         res.send("Successfully updated operation information.");
       } else {
         res.send(err);
       }
     }
    );
};
 //Deletes a operation
 exports.deleteOperation = (req, res) => {
  Operation.deleteOne({_id: req.params.id}, function(err){
    if(!err) {
      res.send("Successfully deleted operation");
    } else {
      res.send(err);
    }
  })
}; 
  exports.deactivateOperation = (req, res) => {
  Operation.findById(req.params.deactivate)
  .exec((err, foundOperations) => {
    console.log(foundOperations);
    if(foundOperations.active === true)
    {
      foundOperations.active =false;
      foundOperations.save();
      res.send('This Operation has been made inactive');
    }
    else if(foundOperations.active === false)
    {
      foundOperations.active = true;
      foundOperations.save();
      res.send('This Operation has been made active');
    }
  });
}