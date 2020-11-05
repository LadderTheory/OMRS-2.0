const db = require("../models/db.model");
const User = db.user;
var bcrypt = require("bcryptjs");
const { role } = require("../models/db.model");
const Squadron = require("../models/SubModels/squadron.model");
const Role = db.role;

exports.UserList = (req, res) => {
  User.find()
  .populate('roles')
  .exec((err, users) => {
    if (!err) {
      res.send([{
        id: users._id,
        username: users.username,
        email: users.email,
        firstName: users.firstName,
        lastName: users.lastName,
        phone: users.phone,
        squadron: users.squadron,
        roles: users.roles,
        active: users.active
      }])
    } else {
      res.send(err);
    }   
  });
};

exports.updateUser = (req, res) => {
  const { firstName, lastName, email, phone, squadron, password } = req.body;
  const query = {};
  if (firstName) { 
    query.firstName = firstName
  }
  if (lastName) {
    query.lastName = lastName
  }
  if (email) {
    query.email = email
  }
  if (phone) {
    query.phone = phone
  }
  if (squadron) {
    query.squadron = squadron
  }
  if (password) {
    query.password = bcrypt.hashSync(password, 8)
  }
  console.log(query);
  User.update(
    {_id: req.params.id}, 
    {$set: query },
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
  .exec((err, user) => {
    if (user) {
      res.send({
        id: user._id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        squadron: user.squadron,
        roles: user.roles,
        active: user.active
      });
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
            res.send('The user is no longer an admin')
          } else {
            res.send(err);
          }
        });
      } else {
        Role.findOne({ name: 'admin' }, (err, foundRole) => {
          if(!err) {
            foundUser.roles.push(foundRole._id);
            foundUser.save();
            res.send('The user is now an admin')

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

exports.makeActive = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user.active === false ) {
      user.active = true;
      user.save();
      res.send('The account has been activated');
    } else {
      user.active = false;
      user.save();
      res.send('The account has been deactivated');
    }
  } catch (err) {
    console.log(err);
    res.send('Something went wrong');
  }
}



