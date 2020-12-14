const db = require("../../models/db.model");
const Squadron = db.squadron;

  //Adds a new squadron
  exports.addSquadron = (req, res) => {
    let squadron = new Squadron({
      name: req.body.name,
      active: true});
    squadron.save(function(err){
      if (!err) {
        res.send("Successfully added a new squadron");
      } else {
        res.send(err);
      }
    });
}

//Find all squadrons
 exports.findSquadrons = (req, res) => {
    Squadron.find(function(err, foundSquadrons){
        if (!err) {
          res.send(foundSquadrons);
        } else {
          res.send(err);
        }   
      });
};

 //Updates a squadron
 exports.updateSquadrons = (req, res) => {
  Squadron.update(
    {_id: req.params.id}, 
    {$set:  req.body } ,
     function(err){
       if (!err) {
         res.send("Successfully updated squadron information.");
       } else {
         res.send(err);
       }
     }
    );
};
  exports.deactivateSquadron = (req, res) => {
  Squadron.findById(req.params.deactivate)
  .exec((err, foundSquadrons) => {
    if(foundSquadrons.active === true)
    {
      foundSquadrons.active =false;
      foundSquadrons.save();
      res.send('This Squadron has been made inactive');
    }
    else if(foundSquadrons.active === false)
    {
      foundSquadrons.active = true;
      foundSquadrons.save();
      res.send('This Squadron has been made active');
    }
  });
}


