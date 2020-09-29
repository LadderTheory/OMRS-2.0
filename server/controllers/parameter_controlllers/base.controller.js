const db = require("../../models/db.model");
const Base = db.base;

  //Adds a new base
  exports.addBase = (req, res) => {
    let base = new Base(req.body);
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