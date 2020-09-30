const db = require("../../models/db.model");
const LegType = db.legType;

  //Adds a new leg type
  exports.addLegType = (req, res) => {
    let legType = new LegType(req.body);
    legType.save(function(err){
      if (!err) {
        res.send("Successfully added a new leg type");
      } else {
        res.send(err);
      }
    });
}

//Find all leg types
 exports.findLegTypes = (req, res) => {
    LegType.find(function(err, foundLegTypes){
        if (!err) {
          res.send(foundLegTypes);
        } else {
          res.send(err);
        }   
      });
};
//Updates a legtype
 exports.updateLegType = (req, res) => {
  LegType.update(
    {_id: req.params.id}, 
    {$set: { name: req.body.name}},
     function(err){
       if (!err) {
         res.send("Successfully updated LegType information.");
       } else {
         res.send(err);
       }
     }
    );
};
 //Deletes a legtype
 exports.deleteLegType = (req, res) => {
  LegType.deleteOne({_id: req.params.id}, function(err){
    if(!err) {
      res.send("Successfully deleted LegType");
    } else {
      res.send(err);
    }
  })
}; 