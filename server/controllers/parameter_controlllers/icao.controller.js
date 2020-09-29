const db = require("../../models/db.model");
const ICAO = db.icao;

  //Adds a new ICAO
  exports.addICAO = (req, res) => {
    let icao = new ICAO(req.body);
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