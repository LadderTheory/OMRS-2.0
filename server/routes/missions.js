const express = require('express');
const router = express.Router();
const Mission = require('../models/mission.model');

//This is the Router for the missions functionality

// GET missions listing endpoint.
router.get('/', function(req, res, next) {
  Mission.find(function(err, foundMissions){
    if (!err) {
      res.send(foundMissions);
    } else {
      res.send(err);
    }   
  });
});

// Add a mission endpoint
router.post('/', function(req, res, next) {
  let mission = new Mission(req.body);
  mission.save(function(err){
    if (!err) {
      res.send("Successfully added a new mission");
    } else {
      res.send(err);
    }
  });
});

//Delete all missions endpoint
router.delete('/', function(req, res, next) {
  Mission.deleteMany(function(err){
    if(!err) {
      res.send("Successfully deleted all missions");
    } else {
      res.send(err);
    }
  });
});

//Get a specific mission endpoint
router.get('/:msnNumber', function(req, res, next) {
  Mission.findOne({msnNumber: req.params.msnNumber}, function(err, foundMission){
    if (foundMission) {
      res.send(foundMission);
    } else {
      res.send("No missions matching that mission number were found");
    }
  });
});

//update a specific mission with PUT endpoint
router.put('/:msnNumber', function(req,res, next) {
  Mission.update(
    {msnNumber: req.params.msnNumber}, 
    {msnNumber: req.body.msnNumber,
     callSign: req.body.callSign, 
     squadron: req.body.squadron,
     airframe: req.body.airframe,
     source: req.body.source,
     destination: req.body.destination,
     msnDate: req.body.msnDate},
     {overwrite: true},
     function(err){
       if (!err) {
         res.send("Successfully updated mission.");
       } else {
         res.send(err);
       }
     }
    );
});

//update a specific mission with PATCH endpoint
router.patch('/:msnNumber', function(req,res, next) {
  Mission.update(
    {msnNumber: req.params.msnNumber}, 
    {$set: req.body},
     function(err){
       if (!err) {
         res.send("Successfully updated mission.");
       } else {
         res.send(err);
       }
     }
    );
});

//delete only a specific mission endpoint
router.delete('/:msnNumber', function(req, res, next) {
  Mission.deleteOne({msnNumber: req.params.msnNumber}, function(err){
    if(!err) {
      res.send("Successfully deleted Missions Number " + req.params.msnNumber);
    } else {
      res.send(err);
    }
  });
});

module.exports = router;
