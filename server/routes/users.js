const express = require('express');
const router = express.Router();
const User = require("../models/user.model");
const Role = require("../models/role.model");
const { verify } = require('jsonwebtoken');
const controller = require("../controllers/user.controller");

//This is the Route for the user functionality

//GET users listing endpoint.
router.get('/', function (req, res, next) {
  User.find(function (err, foundUsers) {
    if (!err) {
      res.send(foundUsers);
    } else {
      res.send(err);
    }
  });
});


// Add a user endpoint
router.post('/', function (req, res, next) {
  let user = new User(req.body);
  user.save(function (err) {
    if (!err) {
      res.send("Successfully added new user, welcome to the application!");
    } else {
      res.send(err);
    }
  });
});

//Get a specific user by userName
router.get('/userName/', function (req, res, next) {
  User.find( { userName: req.body.userName }, function (err, foundUser) {
    if (foundUser) {
      res.send(foundUser + "I found a User");
    } else {
      res.send("Use not found");
    }
  });
});

//Get a specific user by id
router.get('/:id', function (req, res, next) {
  User.findById(req.params.id, function (err, foundUser) {
    if (foundUser) {
      res.send(foundUser);
    } else {
      res.send("The entered user cannot be found, please try again");
    }
  });
});


//update a specific user with PATCH endpoint
router.patch('/:id', function (req, res, next) {
  User.update(
    { _id: req.params.id },
    { $set: req.body },
    function (err) {
      if (!err) {
        res.send("Successfully updated user.");
      } else {
        res.send(err);
      }
    }
  );
});

//delete only a specific user endpoint
router.delete('/:id', function (req, res, next) {
  User.deleteOne({ _id: req.params.id }, function (err) {
    if (!err) {
      res.send("Successfully deleted User: " + req.params.id);
    } else {
      res.send(err);
    }
  });
});


module.exports = router
