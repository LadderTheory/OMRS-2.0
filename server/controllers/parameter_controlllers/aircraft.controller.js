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
    CommType.find(function(err, foundAircraft){
        if (!err) {
          res.send(foundAircraft);
        } else {
          res.send(err);
        }   
      });
};