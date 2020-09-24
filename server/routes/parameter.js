const express = require('express');
const router = express.Router();
const Parameter = require('../models/parameter.model');

//This is the router for Paramters
router.get('/', function(req, res, next) {
    Parameter.find(function(err, foundParameter){
      if (!err) {
        res.send(foundParameter);
      } else {
        res.send(err);
      }   
    });
  });
  // Add a mission endpoint
  router.post('/', function(req, res, next) {
    let parameter = new Parameter(req.body);
    parameter.save(function(err){
      if (!err) {
        res.send("Successfully added a new parameter");
      } else {
        res.send(err);
      }
    });
  });

  router.delete('/squadron/:squadron', function(req, res, next)
  {
    Parameter.deleteOne({Type:"Squadron", Name: req.params.squadron}, function(err, foundSquadrons){
      if(foundSquadrons)
      {
        res.send(foundSquadrons);
      }
      else{
        res.send(err);
      }
    });
  });
  router.delete('/airframe/:airframe', function(req, res, next)
  {
    Parameter.deleteOne({Type:"Airframe", Name: req.params.airframe}, function(err, foundAirframes){
      if(foundAirframes)
      {
        res.send(foundAirframes);
      }
      else{
        res.send(err);
      }
    });
  });
  router.delete('/location/:location', function(req, res, next)
  {
    Parameter.deleteOne({Type:"Location", Name: req.params.location}, function(err, foundLocations){
      if(foundLocations)
      {
        res.send(foundLocations);
      }
      else{
        res.send(err);
      }
    });
  });
  //Delete all missions endpoint
  router.delete('/', function(req, res, next) {
    Parameter.deleteMany(function(err){
      if(!err) {
        res.send("Successfully deleted all parameters");
      } else {
        res.send(err);
      }
    });
  });
  //Get a specific mission endpoint
  router.get('/findBy/:id', function(req, res, next) {
    Parameter.findById(req.params.id, function(err, foundParameter){
      if (foundParameter) {
        res.send(foundParameter);
      } else {
        res.send("No parameter matching that parameter number was found");
      }
    });
  });
  //Get all of type squadron
   router.get('/squadron', function(req, res, next){
     Parameter.find({Type: "Squadron"}, function(err, foundSquadrons){
       if(foundSquadrons){
         res.send(foundSquadrons);
       }else{
         res.send("No squadrons could be found.");
       }
     })
   })
   //get all of type airframe
   router.get('/airframe', function(req, res, next){
    Parameter.find({Type: "Airframe"}, function(err, foundAirframes){
      if(foundAirframes){
        res.send(foundAirframes);
      }else{
        res.send("No airframes could be found.");
      }
    })
  })
  //This section routes the data for updating Squadrons
  router.patch('/squadron/:squadron', function(req, res, next)
  {
    Parameter.findOneAndUpdate({Type:"Squadron", Name: req.params.squadron}, {Name:req.body.newSquadron}, {upsert:false, useFindAndModify:false},  function(err, foundSquadrons){
      if(foundSquadrons)
      {
        res.send(foundSquadrons);
      }
      else{
        res.send(err);
      }
    });
  });
  //This section routes the data for updating Airframes
  router.patch('/airframe/:airframe', function(req, res, next)
  {
    Parameter.findOneAndUpdate({Type:"Airframe", Name: req.params.airframe}, {Name:req.body.newAirframe}, {upsert:false, useFindAndModify:false},  function(err, foundAirframes){
      if(foundAirframes)
      {
  
        res.send(foundAirframes);
      }
      else{
        res.send(err);
      }
    });
  });
  //This section routes the data for updating Locations
  router.patch('/location/:location', function(req, res, next)
  {
    Parameter.findOneAndUpdate({Type:"Location", Name: req.params.location}, {Name:req.body.newLocation}, {upsert:false, useFindAndModify:false},  function(err, foundLocations){
      if(foundLocations)
      {
  
        res.send(foundLocations);
      }
      else{
        res.send(err);
      }
    });
  });

  //get all of type location
  router.get('/location', function(req, res, next){
    Parameter.find({Type: "Location"}, function(err, foundLocations){
      if(foundLocations){
        res.send(foundLocations);
      }else{
        res.send("No locations could be found.");
      }
    })
  })
  module.exports = router;
