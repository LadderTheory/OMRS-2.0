const db = require("../../models/db.model");
const Base = db.base;

  //Adds a new base
  exports.addBase = (req, res) => {
    let base = new Base(req.body);
    base.save(function(err){
      if (!err) {
        res.send("Successfully added a new base");
      } else {
        res.send(err);
      }
    });
}

 //Find all bases
 exports.findBases = (req, res) => {
    Base.find(function(err, foundBases){
        if (!err) {
          res.send(foundBases);
        } else {
          res.send(err);
        }   
      });
};

 //Updates a base
 exports.updateBase = (req, res) => {
  Base.update(
    {_id: req.params.id}, 
    {$set: { name: req.body.name}},
     function(err){
       if (!err) {
         res.send("Successfully updated base information.");
       } else {
         res.send(err);
       }
     }
    );
};
 //Deletes a base
 exports.deleteBase = (req, res) => {
  Base.deleteOne({_id: req.params.id}, function(err){
    if(!err) {
      res.send("Successfully deleted base");
    } else {
      res.send(err);
    }
  });
}