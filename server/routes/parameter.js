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
  router.get('/:id', function(req, res, next) {
    Parameter.findById(req.params.id, function(err, foundParameter){
      if (foundParameter) {
        res.send(foundParameter);
      } else {
        res.send("No parameter matching that parameter number was found");
      }
    });
  });

  //Get all of type squadron
   router.get('/squadron/:squadron', function(req, res, next){
     Parameter.find({Type: "Squadron"}, function(err, foundSquadrons){
       if(foundSquadrons){
         res.send(foundSquadrons);
       }else{
         res.send("No squadrons could be found.");
       }
     })
   })

  module.exports = router;
