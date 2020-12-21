const db = require("../models/db.model");
const AirliftMission = db.AirliftMission;
const mongoose = require("mongoose");

//Find all missions with foreign document references (populate)
exports.airliftMission = async (req, res) => {
  try {
    const data = await AirliftMission.find()
      .populate('squadron')
      .populate('aircraft')
      .populate('base')
      .populate('channel')
      .populate('msnType')
      .populate('operation')
      .populate('sourceBase')
      .populate('destBase')
      .populate('ICAOSource')
      .populate('ICAODest')
      .exec()
    res.send(data)
  } catch (err) {
    console.log(err)
  }
};

//Gets a specific airlift mission from its id with foreign document references (populate)
exports.airliftMsnByID = async (req, res) => {
  try {
    const data = await AirliftMission.findById(req.params.id)
      .populate('squadron')
      .populate('aircraft')
      .populate('base')
      .populate('channel')
      .populate('msnType')
      .populate('operation')
      .populate('sourceBase')
      .populate('destBase')
      .populate('ICAOSource')
      .populate('ICAODest')
      .exec();
      res.send(data)
  } catch (err) {
    console.log(err)
  }
};

//update a specific mission
exports.updateAirliftMission = async (req, res) => {
  try {
    await AirliftMission.updateOne(
      { _id: req.params.id },
      { $set: req.body }).exec()
    res.send("Mission Updated")
  } catch (err) {
    console.log(err)
  }
};

//Add a new mission
exports.addAirliftMission = async (req, res) => {
  let airliftMission = new AirliftMission(req.body);
  try {
    await airliftMission.save()
    res.send({id: airliftMission._id, message: "Successfully added a new mission"});
  } catch (err) {
    console.log(err)
  }
};

//delete a specific mission
exports.deleteAirliftMission = async (req, res) => {
  try {
    await AirliftMission.deleteOne({ _id: req.params.id }).exec()
    res.send("Mission Deleted")
  } catch (err) {
    console.log(err)
  }
}

//Gets airlift missions filered by date range or squadron or both with foreign document references
exports.airliftMsnFilter = async (req, res) => {
  try {
    const { start, end, msnNumber } = req.body;
    const query = {};
    if (start, end) {
      query.date = { $gte: start, $lte: end };
    }
    if (msnNumber) {
      query.msnNumber = msnNumber;
    }
    const data = await AirliftMission.find(query)
      .populate('squadron')
      .populate('aircraft')
      .populate('base')
      .populate('channel')
      .populate('msnType')
      .populate('operation')
      .populate('sourceBase')
      .populate('destBase')
      .populate('ICAOSource')
      .populate('ICAODest')
      .exec()
    res.send(data)
  } catch (err) {
    console.log(err)
  }
};

//Gets an distinct list of callsigns from previously entered missions
// exports.distinctCallSign = async (req, res) => {
//   try {
//     const data = await AirliftMission.distinct('callSign').exec()
//     res.send(data);
//   } catch (err) {
//     console.log(err);
//   }
// };

//Get the last inserted mission with a certain callsign. Sorting on the _id:-1 gives the lastest insert and limit ensures only one result is returned
// exports.lastestByCallsign = async (req, res) => {
//   try {
//     const data = await AirliftMission.findOne({ callSign: req.params.callsign }).sort({ _id: -1 }).limit(1);
//     res.send(data);
//   } catch (err) {
//     console.log(err);
//   }
// }

//Database query for the mission reports. Builds a custom query based on the selected filters that come through in the request.body then passes that query to the aggregate function. 
//$match in the aggregate function finds the results in the database based on the query, $lookup matches the foreign document references for each parameter. $unwind take the information in a 
//nested object or array and adds it to the results. Aggregate has to be used so that a seperate result is returned for each leg in a mission. i.e if a mission has three legs then 
//this query returns 3 results with the parent mission information repeated 3 times and then each leg seperated.
exports.missionReport = async (req, res) => {
  const { dateStart, dateEnd, msnNumber, callSign, aircraft, squadron, commander, operation, base, msnType, channel } = req.body;
  const query = {};
  if (dateStart, dateEnd) {
    query.date = { $gte: new Date(dateStart), $lte: new Date(dateEnd) };
  }
  if (msnNumber) {
    query.msnNumber = msnNumber;
  }
  if (callSign) {
    query.callSign = callSign;
  }
  if (aircraft) {
    query.aircraft = mongoose.Types.ObjectId(aircraft);
  }
  if (squadron) {
    query.squadron = mongoose.Types.ObjectId(squadron);
  }
  if (commander) {
    query.commander = commander;
  }
  if (operation) {
    query.operation = mongoose.Types.ObjectId(operation);
  }
  if (base) {
    query.base = mongoose.Types.ObjectId(base);
  }
  if (msnType) {
    query.msnType = mongoose.Types.ObjectId(msnType);
  }
  if (channel) {
    query.channel = mongoose.Types.ObjectId(channel);
  }
  try {
    const data = await AirliftMission.aggregate([
      { $match: query },
      {
        $lookup: {
          "from": "squadrons",
          "localField": "squadron",
          "foreignField": "_id",
          "as": "squadron"
        }
      },
      {
        $lookup: {
          "from": "aircrafts",
          "localField": "aircraft",
          "foreignField": "_id",
          "as": "aircraft"
        }
      },
      {
        $lookup: {
          "from": "bases",
          "localField": "base",
          "foreignField": "_id",
          "as": "base"
        }
      },
      {
        $lookup: {
          "from": "msntypes",
          "localField": "msnType",
          "foreignField": "_id",
          "as": "msnType"
        }
      },
      {
        $lookup: {
          "from": "channels",
          "localField": "channel",
          "foreignField": "_id",
          "as": "channel"
        }
      },
      {
        $lookup: {
          "from": "operations",
          "localField": "operation",
          "foreignField": "_id",
          "as": "operation"
        }
      },
      { $unwind: "$squadron" },
      { $unwind: "$aircraft" },
      { $unwind: "$base" },
      { $unwind: "$msnType" },
      { $unwind: "$channel" },
      { $unwind: "$operation" },
      { $unwind: "$legs" },
      {
        $lookup: {
          "from": "icaos",
          "localField": "legs.ICAOSource",
          "foreignField": "_id",
          "as": "legs.ICAOSource"
        }
      },
      {
        $lookup: {
          "from": "icaos",
          "localField": "legs.ICAODest",
          "foreignField": "_id",
          "as": "legs.ICAODest"
        }
      },
      { $unwind: "$legs.ICAOSource" },
      { $unwind: "$legs.ICAODest" }
    ])
    res.send(data);
  } catch (err) {
    console.log(err)
  }
};

