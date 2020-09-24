const db = require("../models/db.model");
const Mission = db.mission;

exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
  };
  
  exports.userBoard = (req, res) => {
    Mission.find(function(err, foundMissions){
      if (!err) {
        res.send(foundMissions);
      } else {
        res.send(err);
      }   
    });
  };
  
  exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
  };
  
  exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
  };