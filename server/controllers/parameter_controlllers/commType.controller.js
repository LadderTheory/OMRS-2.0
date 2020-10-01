const db = require("../../models/db.model");
const CommType = db.commType;

  //Adds a new commercial type
  exports.addCommType = (req, res) => {
    let commType = new CommType(req.body);
    commType.save(function(err){
      if (!err) {
        res.send("Successfully added a new commercial type");
      } else {
        res.send(err);
      }
    });
}

//Find all commercial types
 exports.findCommTypes = (req, res) => {
    CommType.find(function(err, foundCommTypes){
        if (!err) {
          res.send(foundCommTypes);
        } else {
          res.send(err);
        }   
      });
};

//Updates a CommType
 exports.updateCommType = (req, res) => {
  CommType.update(
    {_id: req.params.id}, 
    {$set: { name: req.body.name}},
     function(err){
       if (!err) {
         res.send("Successfully updated CommType information.");
       } else {
         res.send(err);
       }
     }
    );
};
 //Deletes a CommType
 exports.deleteCommType = (req, res) => {
  CommType.deleteOne({_id: req.params.id}, function(err){
    if(!err) {
      res.send("Successfully deleted CommType");
    } else {
      res.send(err);
    }
  })
};