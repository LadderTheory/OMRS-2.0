const express = require('express');
const router = express.Router();
const Admin = require('../models/admin.model');

//This is the Router for the admins functionality

//GET admins listing endpoint.
router.get('/', function(req,res, next)
{
    Admin.find(function(err, foundAdmins)
    {
        if(!err)
        {
            res.send(foundAdmins);
        }
        else{
            res.send(err);
        }
    });
});

//Add an admin endpoint
router.post('/', function(req, res, next) {
    let admin = new Admin(req.body);
    admin.save(function(err){
      if (!err) {
        res.send("Successfully added a new admin!");
      } else {
        res.send(err);
      }
    });
  });
  
  
  //Get a specific admin endpoint
  router.get('/:id', function(req, res, next) {
    Admin.findById(req.params.id, function(err, foundAdmin){
      if (foundAdmin) {
        res.send(foundAdmin);
      } else {
        res.send("No admins matching that username were found");
      }
    });
  });
  
 
  
  //update a specific admin with PATCH endpoint
  router.patch('/:id', function(req, res, next) {
    Admin.update(
      {_id: req.params.id}, 
      {$set: req.body},
       function(err){
         if (!err) {
           res.send("Successfully updated admin!");
         } else {
           res.send(err);
         }
       }
      );
  });
  
  //delete only a specific admin endpoint
  router.delete('/:id', function(req, res, next) {
    Admin.deleteOne({_id: req.params.id}, function(err){
      if(!err) {
        res.send("Successfully deleted Admin: " + req.params.id);
      } else {
        res.send(err);
      }
    });
  });
  
  module.exports = router;
  