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

//Get a set of missions by squadron
router.get('/squadron/:squadron', function(req, res, next){
  Mission.find( { squadron: req.params.squadron}, function (err, foundMissions){
    if(foundMissions){
      res.send(foundMissions);
    }
    else{
      res.send("no missions for the selected squadron can be found");
    }
  });
});

//Get a set of missions by date
router.get('msnDate/:msnDate', function(req, res, next){
  Mission.find({msnDate : req.params.msnDate}, function(err, foundMissions){
    if(foundMissions){
      res.send(foundMissions);
    }
    else{
      res.send("no missions for the selected dates can be found");
    }
  })
})

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
router.get('/:id', function(req, res, next) {
  Mission.findById(req.params.id, function(err, foundMission){
    if (foundMission) {
      res.send(foundMission);
    } else {
      res.send("No missions matching that mission number were found");
    }
  });
});

//update a specific mission with PUT endpoint
router.put('/:id', function(req,res, next) {
  Mission.update(
    {id: req.params.id}, 
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
router.patch('/:id', function(req, res, next) {
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
});

//delete only a specific mission endpoint
router.delete('/:id', function(req, res, next) {
  Mission.deleteOne({_id: req.params.id}, function(err){
    if(!err) {
      res.send("Successfully deleted Missions Number " + req.params.id);
    } else {
      res.send(err);
    }
  });
});

module.exports = router;
