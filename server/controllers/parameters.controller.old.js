
const db = require("../models/db.model");
const Parameter = db.parameters;

//This is the router for Paramters
    exports.findParameters = (req, res) => {
    Parameter.find(function(err, foundParameter){
        if (!err) {
          res.send(foundParameter);
        } else {
          res.send(err);
        }   
      });
};

  // Add a mission endpoint
    exports.postEndpoint = (req, res) => {
    let parameter = new Parameter(req.body);
    parameter.save(function(err){
      if (!err) {
        res.send("Successfully added a new parameter");
      } else {
        res.send(err);
      }
    });
}

//deletes a specific squadron
    exports.deleteSquadron = (req, res) =>{
    Parameter.deleteOne({Type:"Squadron", Name: req.params.squadron}, function(err, foundSquadrons){
        if(foundSquadrons)
        {
          res.send(foundSquadrons);
        }
        else{
          res.send(err);
        }
      });
}

//deletes a specific airframe
    exports.deleteAirframe = (req, res) => {
    Parameter.deleteOne({Type:"Airframe", Name: req.params.airframe}, function(err, foundAirframes){
        if(foundAirframes)
        {
          res.send(foundAirframes);
        }
        else{
          res.send(err);
        }
      });
}

//deletes a specifc location
exports.deleteLocation = (req, res) => {
    Parameter.deleteOne({Type:"Location", Name: req.params.location}, function(err, foundLocations){
        if(foundLocations)
        {
          res.send(foundLocations);
        }
        else{
          res.send(err);
        }
      });
}

//Delete all missions endpoint
  exports.deleteMissionEndpoints = (req, res) => {
    Parameter.deleteMany(function(err){
        if(!err) {
          res.send("Successfully deleted all parameters");
        } else {
          res.send(err);
        }
      });
}

//Get a specific mission endpoint
  exports.getMissionEndpoint = (req, res) => {
    Parameter.findById(req.params.id, function(err, foundParameter){
        if (foundParameter) {
          res.send(foundParameter);
        } else {
          res.send("No parameter matching that parameter number was found");
        }
      });
}
  
//Get all of type squadron
  exports.getSquadrons = (req, res) => {
    Parameter.find({Type: "Squadron"}, function(err, foundSquadrons){
        if(foundSquadrons){
          res.send(foundSquadrons);
        }else{
          res.send("No squadrons could be found.");
        }
      })
}
  

//get all of type airframe
   exports.getAirframes = (req, res) => {
    Parameter.find({Type: "Airframe"}, function(err, foundAirframes){
        if(foundAirframes){
          res.send(foundAirframes);
        }else{
          res.send("No airframes could be found.");
        }
      })
}
   
//get all of type location
    exports.getLocations = (req, res) => {
    Parameter.find({Type: "Location"}, function(err, foundLocations){
        if(foundLocations){
          res.send(foundLocations);
        }else{
          res.send("No locations could be found.");
        }
      })
}

//This section routes the data for updating Squadrons
  exports.updateSquadron = (req, res) => {
    Parameter.findOneAndUpdate({Type:"Squadron", Name: req.params.squadron}, {Name:req.body.newSquadron}, {upsert:false, useFindAndModify:false},  function(err, foundSquadrons){
        if(foundSquadrons)
        {
          res.send(foundSquadrons);
        }
        else{
          res.send(err);
        }
      });
}
  
 //This section routes the data for updating Airframes
  exports.updateAirframe = (req, res) => {
    Parameter.findOneAndUpdate({Type:"Airframe", Name: req.params.airframe}, {Name:req.body.newAirframe}, {upsert:false, useFindAndModify:false},  function(err, foundAirframes){
        if(foundAirframes)
        {
    
          res.send(foundAirframes);
        }
        else{
          res.send(err);
        }
      });
}
 
  //This section routes the data for updating Locations
  exports.updateLocation = (req, res) => {
    Parameter.findOneAndUpdate({Type:"Location", Name: req.params.location}, {Name:req.body.newLocation}, {upsert:false, useFindAndModify:false},  function(err, foundLocations){
        if(foundLocations)
        {
          res.send(foundLocations);
        }
        else{
          res.send(err);
        }
      });
}
