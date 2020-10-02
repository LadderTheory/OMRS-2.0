const db = require("../../models/db.model");
const Aircraft = db.aircraft;

  //Adds a new aircraft type
  exports.addAircraft = (req, res) => {
    let aircraft = new Aircraft(req.body);
    aircraft.save(function(err){
      if (!err) {
        res.send("Successfully added a new aircraft");
      } else {
        res.send(err);
      }
    });
}

//Find all aircraft
 exports.findAircraft = (req, res) => {
    Aircraft.find(function(err, foundAircraft){
        if (!err) {
          res.send(foundAircraft);
        } else {
          res.send(err);
        }   
      });
};

 //Update an aircraft
 exports.updateAircraft = (req, res) => {
  Aircraft.update(
    {_id: req.params.id}, 
    {$set: { name: req.body.name}},
     function(err){
       if (!err) {
         res.send("Successfully updated aircraft information.");
       } else {
         res.send(err);
       }
     }
    );
};
 //Delete an aircraft
 exports.deleteAircraft = (req, res) => {
  Aircraft.deleteOne({_id: req.params.id}, function(err){
    if(!err) {
      res.send("Successfully deleted aircraft");
    } else {
      res.send(err);
    }
  });
}