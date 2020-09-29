const db = require("../models/db.model");
const AirliftMission = db.AirliftMission;
var bcrypt = require("bcryptjs");

 exports.AirliftMissionParameters = (req, res) => {
    AirliftMission.find(function(err, parameters){
      if (!err) {
        res.send(parameters)
      } else {
        res.send(err);
      }   
    });
  };
  exports.missionsBoard = (req, res) => {
    Mission.find(function(err, foundMissions){
      if (!err) {
        res.send(foundMissions);
      } else {
        res.send(err);
      }   
    });
  };

  exports.updateMission = (req, res) => {
    Mission.update(
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

  exports.missionByID = (req, res) => {
    console.log(req.params.id);
    Mission.findById(req.params.id, function(err, foundMission){
      if (foundMission) {
        res.send(foundMission);
      } else {
        res.send("No missions matching that mission number were found");
      }
    });
  };

  exports.addMission = (req, res) => {
    let mission = new Mission(req.body);
  mission.save(function(err){
    if (!err) {
      res.send("Successfully added a new mission");
    } else {
      res.send(err);
    }
  });
  };

  exports.deleteMission = (req, res) => {
    Mission.deleteOne({_id: req.params.id}, function(err){
      if(!err) {
        res.send("Successfully deleted Missions Number " + req.params.id);
      } else {
        res.send(err);
      }
    });
  }
  
 
  
