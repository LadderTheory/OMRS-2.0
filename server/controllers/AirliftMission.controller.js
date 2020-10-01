const db = require("../models/db.model");
const AirliftMission = db.AirliftMission;

 exports.airliftMission = (req, res) => {
    AirliftMission.find(function(err, parameters){
      if (!err) {
        res.send(parameters)
      } else {
        res.send(err);
      }   
    });
  };

  //Gets an airlift mission with associated document references
  exports.airliftMsnByID = (req, res) => {
    AirliftMission.findById(req.params.id)
    .populate('squadron')
    .populate('aircraft')
    .populate('base')
    .populate('channel')
    .populate('commType')
    .populate('legType')
    .populate('msnType')
    .populate('operation')
    .populate('sourceBase')
    .populate('destBase')
    .populate('ICAOSource')
    .populate('ICAODest')
    .exec((err, foundAirLiftMission) => {
      if (foundAirLiftMission) {
        res.send(foundAirLiftMission);
      } else {
        res.send("No missions matching that mission id were found");
      }
    });
  };

  exports.updateAirliftMission = (req, res) => {
    AirliftMission.update(
      {_id: req.params.id}, 
      {$set: req.body},
       function(err){
         if (!err) {
           res.send("Successfully updated mission.");
         } else {
           res.send(err);
         }
       }
      );
  };

  exports.airliftMissionByID = (req, res) => {
    console.log(req.params.id);
    AirliftMission.findById(req.params.id, function(err, foundAirliftMissions){
      if (foundAirliftMissions) {
        res.send(foundAirliftMissions);
      } else {
        res.send("No missions matching that mission number were found");
      }
    });
  };

  exports.addAirliftMission = (req, res) => {
    let airliftMission = new AirliftMission(req.body);
  airliftMission.save(function(err){
    if (!err) {
      res.send("Successfully added a new mission");
    } else {
      res.send(err);
    }
  });
  };

  exports.deleteAirliftMission = (req, res) => {
    AirliftMission.deleteOne({_id: req.params.id}, function(err){
      if(!err) {
        res.send("Successfully deleted Missions Number " + req.params.id);
      } else {
        res.send(err);
      }
    });
  }
  
  
 
  
