const db = require("../../models/db.model");
const Base = db.base;

  //Adds a new base
  exports.addBase = (req, res) => {
    let base = new Base({
      name: req.body.name,
      active: true});
    base.save(function(err){
      if (!err) {
        res.send("Successfully added a new base");
      } else {
        res.send(err);
      }
    });
}

 //Find all bases
 exports.findBases = (req, res) => {
    Base.find(function(err, foundBases){
        if (!err) {
          res.send(foundBases);
        } else {
          res.send(err);
        }   
      });
};

 //Updates a base
 exports.updateBase = (req, res) => {
  Base.update(
    {_id: req.params.id}, 
    {$set: req.body},
     function(err){
       if (!err) {
         res.send("Successfully updated base information.");
       } else {
         res.send(err);
       }
     }
    );
};

  exports.deactivateBases = (req, res) => {
  Base.findById(req.params.deactivate)
  .exec((err, foundBases) => {
    if(foundBases.active === true)
    {
      foundBases.active =false;
      foundBases.save();
      res.send('This Base has been made inactive');
    }
    else if(foundBases.active === false)
    {
      foundBases.active = true;
      foundBases.save();
      res.send('This Base has been made active');
    }
  });
}