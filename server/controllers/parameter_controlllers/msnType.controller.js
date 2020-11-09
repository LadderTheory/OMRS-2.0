const db = require("../../models/db.model");
const MsnType = db.msnType;

  //Adds a new Msn Type
  exports.addMsnType = (req, res) => {
    let msnType = new MsnType(req.body);
    msnType.save(function(err){
      if (!err) {
        res.send("Successfully added a new mission type");
      } else {
        res.send(err);
      }
    });
}

//Find all Msn Types
 exports.findMsnTypes = (req, res) => {
    MsnType.find(function(err, foundMsnTypes){
        if (!err) {
          res.send(foundMsnTypes);
        } else {
          res.send(err);
        }   
      });
};
//Updates a msnType
 exports.updateMsnType = (req, res) => {
  MsnType.update(
    {_id: req.params.id}, 
    {$set: req.body},
     function(err){
       if (!err) {
         res.send("Successfully updated MissionType information.");
       } else {
         res.send(err);
       }
     }
    );
};
 //Deletes a msnType
 exports.deleteMsnType = (req, res) => {
  MsnType.deleteOne({_id: req.params.id}, function(err){
    if(!err) {
      res.send("Successfully deleted MissionType");
    } else {
      res.send(err);
    }
  })
}; 