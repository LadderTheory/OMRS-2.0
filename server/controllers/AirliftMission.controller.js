const db = require("../models/db.model");
const AirliftMission = db.AirliftMission;

exports.airliftMission = (req, res) => {
  AirliftMission.find()
    .populate('squadron')
    .populate('aircraft')
    .populate('base')
    .populate('channel')
    .populate('commType')
    .populate('legType')
    .populate('msnType')
    .populate('operation')
    .populate('sourceBase')
    .populate('destBase')
    .populate('ICAOSource')
    .populate('ICAODest')
    .exec((err, foundAirLiftMissions) => {
      if (foundAirLiftMissions) {
        res.send(foundAirLiftMissions);
      } else {
        res.send(err);
      }
    });
};

//Gets an airlift mission with associated document references
exports.airliftMsnByID = (req, res) => {
  AirliftMission.findById(req.params.id)
    .populate('squadron')
    .populate('aircraft')
    .populate('base')
    .populate('channel')
    .populate('commType')
    .populate('legType')
    .populate('msnType')
    .populate('operation')
    .populate('sourceBase')
    .populate('destBase')
    .populate('ICAOSource')
    .populate('ICAODest')
    .exec((err, foundAirLiftMission) => {
      if (foundAirLiftMission) {
        res.send(foundAirLiftMission);
      } else {
        res.send("No missions matching that mission id were found");
      }
    });
};

exports.updateAirliftMission = (req, res) => {
  AirliftMission.update(
    { _id: req.params.id },
    { $set: req.body },
    function (err) {
      if (!err) {
        res.send("Successfully updated mission.");
      } else {
        res.send(err);
      }
    }
  );
};

exports.airliftMissionByID = (req, res) => {
  console.log(req.params.id);
  AirliftMission.findById(req.params.id, function (err, foundAirliftMissions) {
    if (foundAirliftMissions) {
      res.send(foundAirliftMissions);
    } else {
      res.send("No missions matching that mission number were found");
    }
  });
};

exports.addAirliftMission = (req, res) => {
  let airliftMission = new AirliftMission(req.body);
  airliftMission.save(function (err) {
    if (!err) {
      res.send("Successfully added a new mission");
    } else {
      res.send(err);
    }
  });
};

exports.deleteAirliftMission = (req, res) => {
  AirliftMission.deleteOne({ _id: req.params.id }, function (err) {
    if (!err) {
      res.send("Successfully deleted Missions Number " + req.params.id);
    } else {
      res.send(err);
    }
  });
}

//Gets an airlift mission with associated document references
exports.airliftMsnFilter = (req, res) => {
  const { start, end, squadron } = req.body;
  const query = {};
  if (start, end) {
    query.date = { $gte: start, $lte: end };
  }
  if (squadron) {
    query.squadron = squadron;
  }
  AirliftMission.find(query)
    .populate('squadron')
    .populate('aircraft')
    .populate('base')
    .populate('channel')
    .populate('commType')
    .populate('legType')
    .populate('msnType')
    .populate('operation')
    .populate('sourceBase')
    .populate('destBase')
    .populate('ICAOSource')
    .populate('ICAODest')
    .exec((err, foundAirLiftMission) => {
      if (foundAirLiftMission) {
        res.send(foundAirLiftMission);
      } else {
        res.send("No missions matching that mission number were found");
      }
    });
};

//Gets an airlift mission with associated document references
exports.distinctCallSign = async (req, res) => {
    try{ 
    const data = await AirliftMission.distinct('callSign').exec()
    res.send(data);
    } catch (err) {
      console.log(err);
    }
};

exports.missionReport = (req, res) => {
  const { dateStart, dateEnd, msnNumber, callSign, aircraft, squadron, commander, operation, base, msnType, commType, channel } = req.body;
  const query = {};
  if (dateStart, dateEnd) {
    query.date = { $gte: dateStart, $lte: dateEnd };
  }
  if (msnNumber) {
    query.msnNumber = msnNumber;
  }
  if (callSign) {
    query.callSign = callSign;
  }
  if (aircraft) {
    query.aircraft = aircraft;
  }
  if (squadron) {
    query.squadron = squadron;
  }
  if (commander) {
    query.commander = commander;
  }
  if (operation) {
    query.operation = operation;
  }
  if (base) {
    query.base = base;
  }
  if (msnType) {
    query.msnType = msnType;
  }
  if (commType) {
    query.commType = commType;
  }
  if (channel) {
    query.channel = channel;
  }

  AirliftMission.aggregate(
    [
      {$match : query },
      {$unwind: "$legs"}
    ], (err, result) => {
        console.log(result);
        res.send(result);
  }); 
  // AirliftMission.find(query)
  //   .populate('squadron')
  //   .populate('aircraft')
  //   .populate('base')
  //   .populate('channel')
  //   .populate('commType')
  //   .populate('legType')
  //   .populate('msnType')
  //   .populate('operation')
  //   .populate('sourceBase')
  //   .populate('destBase')
  //   .populate('ICAOSource')
  //   .populate('ICAODest')
  //   .exec((err, foundAirLiftMission) => {
  //     if (foundAirLiftMission) {
  //       res.send(foundAirLiftMission);
  //     } else {
  //       res.send("No missions matching that mission number were found");
  //     }
  //   });
};

