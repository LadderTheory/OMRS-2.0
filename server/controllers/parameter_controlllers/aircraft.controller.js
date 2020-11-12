const db = require("../../models/db.model");
const Aircraft = db.aircraft;

  //Adds a new aircraft type
  exports.addAircraft = (req, res) => {
    let aircraft = new Aircraft({ 
      name: req.body.name,
      active: true
    });
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
    {$set: req.body} ,
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
  exports.deactivateAircraft = (req, res) => {
    console.log(req.params.deactivate);
    Aircraft.findById(req.params.deactivate)
    .exec((err, foundAircraft) => {
      console.log(foundAircraft);
      if(foundAircraft.active === true)
      {
        foundAircraft.active =false;
        foundAircraft.save();
        res.send('This Aircraft has been made inactive');
      }
      else if(foundAircraft.active === false)
      {
        foundAircraft.active = true;
        foundAircraft.save();
        res.send('This Aircraft has been made active');
      }
    });
  }

