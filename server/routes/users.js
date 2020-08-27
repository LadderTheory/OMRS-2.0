const express = require('express');
const router = express.Router();
const User = require("../models/user.model")

//This is the Router for the user functionality

//GET missions listing endpoint.
router.get('/', function (req, res, next) {
  User.find(function (err, foundUsers) {
    if (!err) {
      res.send(foundUsers);
    } else {
      res.send(err);
    }
  });
});

// router.get('/', function (req, res, next) {
//   const username = req.query.userName;
//   var condition = userName ? { userName: userName } : {};
//   User.find(condition)
//     .then(data => {
//       res.send(data);
//     })
// });




// Add a mission endpoint
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



//Get a specific mission endpoint
router.get('/:userName', function (req, res, next) {
  User.find( { userName: req.params.userName }, function (err, foundUser) {
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

// router.get('/', function(req, res, next) {
//   User.findOne({userName: req.params.userName}, function(err,foundUser)
//   {
//     if(foundUser)
//     {
//       res.send(foundUser);
//     }
//     else{
//       res.send(err);
//     }
//   });
// })





module.exports = router;
