const db = require("../models/db.model");
const User = db.user;
var bcrypt = require("bcryptjs");
const { role } = require("../models/db.model");
const Role = db.role;

exports.UserList = (req, res) => {
  User.find()
  .populate('roles')
  .exec((err, users) => {
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
  User.findById(req.params.id)
  .populate('roles')
  .exec((err, foundUser) => {
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

exports.makeAdmin = (req, res) => {
  User.findById(req.params.id)
  .populate('roles')
  .exec((err, foundUser) => {
    if (foundUser) {
      var authorities = [];

      for (let i = 0; i < foundUser.roles.length; i++) {
        authorities.push(foundUser.roles[i].name);
      }

      if (authorities.includes('admin')) { 
        Role.findOne({ name: 'admin' }, (err, foundRole) => {
          if(!err) {
            foundUser.roles.remove(foundRole._id);
            foundUser.save();
            res.send('User is no longer an admin')

          } else {
            res.send(err);
          }
        });
      } else {
        Role.findOne({ name: 'admin' }, (err, foundRole) => {
          if(!err) {
            foundUser.roles.push(foundRole._id);
            foundUser.save();
            res.send('User is now admin')

          } else {
            res.send(err);
          }
        });
      }
    } else {
      res.send("No user with that id was found");
    }
  });
};
