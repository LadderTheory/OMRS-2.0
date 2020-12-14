const { msnType } = require("../../models/db.model");
const db = require("../../models/db.model");
const MsnType = db.msnType;

  //Adds a new Msn Type
  exports.addMsnType = (req, res) => {
    let msnType = new MsnType({
      name: req.body.name,
      active: true});
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
  exports.deactivateMsnType = (req, res) => {
  msnType.findById(req.params.deactivate)
  .exec((err, foundMsnTypes) => {
    if(foundMsnTypes.active === true)
    {
      foundMsnTypes.active =false;
      foundMsnTypes.save();
      res.send('This Mission Type has been made inactive');
    }
    else if(foundMsnTypes.active === false)
    {
      foundMsnTypes.active = true;
      foundMsnTypes.save();
      res.send('This Mission Type has been made active');
    }
  });
}