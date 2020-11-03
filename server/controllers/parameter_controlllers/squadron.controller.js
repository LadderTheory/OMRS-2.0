const db = require("../../models/db.model");
const Squadron = db.squadron;

  //Adds a new squadron
  exports.addSquadron = (req, res) => {
    let squadron = new Squadron(req.body);
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
    console.log(req.body);
};
 //Deletes a base
 exports.deleteSquadron = (req, res) => {
  Squadron.deleteOne({_id: req.params.id}, function(err){
    if(!err) {
      res.send("Successfully deleted squadron");
    } else {
      res.send(err);
    }
  });
}


