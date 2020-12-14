const db = require("../../models/db.model");
const ICAO = db.icao;

  //Adds a new ICAO
  exports.addICAO = (req, res) => {
    let icao = new ICAO({
      name: req.body.name,
      active: true});
    icao.save(function(err){
      if (!err) {
        res.send("Successfully added a new ICAO");
      } else {
        res.send(err);
      }
    });
}

//Find all ICAO
exports.findICAO = (req, res) => {
    ICAO.find(function(err, foundICAO){
        if (!err) {
          res.send(foundICAO);
        } else {
          res.send(err);
        }   
      });
};
//Updates an ICAO
 exports.updateICAO = (req, res) => {
  ICAO.update(
    {_id: req.params.id}, 
    {$set: req.body},
     function(err){
       if (!err) {
         res.send("Successfully updated ICAO information.");
       } else {
         res.send(err);
       }
     }
    );
};
  exports.deactivateICAO = (req, res) => {
  ICAO.findById(req.params.deactivate)
  .exec((err, foundICAO) => {
    if(foundICAO.active === true)
    {
      foundICAO.active =false;
      foundICAO.save();
      res.send('This ICAO has been made inactive');
    }
    else if(foundICAO.active === false)
    {
      foundICAO.active = true;
      foundICAO.save();
      res.send('This ICAO has been made active');
    }
  });
}