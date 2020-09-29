const db = require("../models/db.model");
const AirliftMission = db.AirliftMission;
var bcrypt = require("bcryptjs");

 exports.UserList = (req, res) => {
    User.find(function(err, users){
      if (!err) {
        res.send(users)
      } else {
        res.send(err);
      }   
    });
  };
  
  exports.updateUser = (req, res) => {
    User.update(
      {_id: req.params.id}, 
      {$set: { username: req.body.username, password: bcrypt.hashSync(req.body.password, 8)}},
       function(err){
         if (!err) {
           res.send("Successfully updated user information.");
         } else {
           res.send(err);
         }
       }
      );
  };
  
  exports.findUserByID = (req, res) => {
    console.log(req.params.id);
    User.findById(req.params.id, function(err, foundUser){
      if (foundUser) {
        res.send(foundUser);
      } else {
        res.send("No User matching that ID was found.");
      }
    });
  };
  
  
  
  exports.deleteUser = (req, res) => {
    User.deleteOne({_id: req.params.id}, function(err){
      if(!err) {
        res.send("Successfully deleted User ");
      } else {
        res.send(err);
      }
    });
  }