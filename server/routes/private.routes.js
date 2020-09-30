const { authJwt } = require("../middlewares/");
const missionsController = require("../controllers/missions.controller");
const parametersController = require("../controllers/parameters.controller");
const userController = require("../controllers/user.controller");
const AirliftMsnController = require("../controllers/AirliftMission.controller");

//Controller imports for data management
const squadronController = require("../controllers/parameter_controlllers/squadron.controller");
const operationController = require("../controllers/parameter_controlllers/operation.controller");
const msnTypeController = require("../controllers/parameter_controlllers/msnType.controller");
const legTypeController = require("../controllers/parameter_controlllers/legType.controller");
const icaoController = require("../controllers/parameter_controlllers/icao.controller");
const commTypeController = require("../controllers/parameter_controlllers/commType.controller");
const channelController = require("../controllers/parameter_controlllers/channel.controller");
const baseController = require("../controllers/parameter_controlllers/base.controller");
const aircraftController = require("../controllers/parameter_controlllers/aircraft.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  //Private Mission Routes
  app.get("/private/missions", [authJwt.verifyToken], missionsController.missionsBoard);

  app.get("/private/missions/:id", [authJwt.verifyToken], missionsController.missionByID);

  app.patch("/private/missions/:id", [authJwt.verifyToken], missionsController.updateMission);

  app.post("/private/missions", [authJwt.verifyToken], missionsController.addMission);

  app.delete("/private/missions/:id", [authJwt.verifyToken], missionsController.deleteMission);


  //Private Parameters Routes
  app.get('/private/parameters', [authJwt.verifyToken], parametersController.findParameters );

  // Add a new parameter
  app.post('/private/parameters', [authJwt.verifyToken], parametersController.postEndpoint);

  //deletes a squadron
  app.delete('/private/parameters/squadron/:squadron', [authJwt.verifyToken], parametersController.deleteSquadron);

  //deletes an airframe
  app.delete('/private/parameters/airframe/:airframe', [authJwt.verifyToken], parametersController.deleteAirframe);

  //deletes a location
  app.delete('/private/parameters/location/:location', [authJwt.verifyToken], parametersController.deleteLocation);

  //Delete all mission endpoints
  app.delete('/private/parameters', [authJwt.verifyToken], parametersController.deleteMissionEndpoints);

  //Get a specific mission endpoint
  app.get('/private/parameters/findBy/:id', [authJwt.verifyToken], parametersController.getMissionEndpoint);

  //Get all of type squadron
  app.get('/private/parameters/squadron', [authJwt.verifyToken], parametersController.getSquadrons)

   //get all of type airframe
  app.get('/private/parameters/airframe', [authJwt.verifyToken], parametersController.getAirframes)

  //get all of type location
  app.get('/private/parameters/location', [authJwt.verifyToken], parametersController.getLocations);

  //This section routes the data for updating Squadrons
  app.patch('/private/parameters/squadron/:squadron', [authJwt.verifyToken], parametersController.updateSquadron);

  //This section routes the data for updating Airframes
  app.patch('/private/parameters/airframe/:airframe', [authJwt.verifyToken], parametersController.updateAirframe);

  //This section routes the data for updating Locations
  app.patch('/private/parameters/location/:location', [authJwt.verifyToken], parametersController.updateLocation);


  //Private User Routes
  app.get("/private/users", [authJwt.verifyToken], [authJwt.isAdmin], userController.UserList);

  app.get("/private/users/:id", [authJwt.verifyToken], userController.findUserByID);

  app.patch("/private/users/:id", [authJwt.verifyToken], userController.updateUser);

  app.delete("/private/users/:id", [authJwt.verifyToken], userController.deleteUser);

  app.get("/private/users/admin/:id", [authJwt.verifyToken], [authJwt.isAdmin], userController.makeAdmin);


  //Private AirLiftMsn Routes
  app.get("/private/airliftmsn", [authJwt.verifyToken], AirliftMsnController.airliftMission);

  app.get("/private/airliftmsn/:id", [authJwt.verifyToken], AirliftMsnController.airliftMsnByID);

  app.patch("/private/airliftmsn/:id", [authJwt.verifyToken], AirliftMsnController.updateAirliftMission);

  app.post("/private/airliftmsn", [authJwt.verifyToken], AirliftMsnController.addAirliftMission);

  app.delete("/private/airliftmsn/:id", [authJwt.verifyToken], AirliftMsnController.deleteAirliftMission);

  //New Data Management Routes
  //Squadron Routes
  app.get("/private/datamg/squadrons", [authJwt.verifyToken], squadronController.findSquadrons);

  app.post("/private/datamg/squadrons", [authJwt.verifyToken], squadronController.addSquadron);
  
  

  //Operation Routes
  app.get("/private/datamg/operations", [authJwt.verifyToken], operationController.findOperations);

  app.post("/private/datamg/operations", [authJwt.verifyToken], operationController.addOperation);

  app.patch("private/datamg/operations/:id", [authJwt.verifyToken], operationController.updateOperation);

  app.delete("/private/datamg/operations/:id", [authJwt.verifyToken], operationController.deleteOperation);

  //Mission Types Routes
  app.get("/private/datamg/msntypes", [authJwt.verifyToken], msnTypeController.findMsnTypes);

  app.post("/private/datamg/msntypes", [authJwt.verifyToken], msnTypeController.addMsnType);

  app.patch("private/datamg/msntypes/:id", [authJwt.verifyToken], msnTypeController.updateMsnType);

  app.delete("/private/datamg/msntypes/:id", [authJwt.verifyToken], msnTypeController.deleteMsnType);

  //Leg Types Routes
  app.get("/private/datamg/legtypes", [authJwt.verifyToken], legTypeController.findLegTypes);

  app.post("/private/datamg/legtypes", [authJwt.verifyToken], legTypeController.addLegType);

  app.patch("private/datamg/legtypes/:id", [authJwt.verifyToken], legTypeController.updateLegType);

  app.delete("/private/datamg/legtypes/:id", [authJwt.verifyToken], legTypeController.deleteLegType);

  //ICAO Routes
  app.get("/private/datamg/icao", [authJwt.verifyToken], icaoController.findICAO);

  app.post("/private/datamg/icao", [authJwt.verifyToken], icaoController.addICAO);

  app.patch("private/datamg/icao/:id", [authJwt.verifyToken], icaoController.updateICAO);

  app.delete("/private/datamg/icao/:id", [authJwt.verifyToken], icaoController.deleteICAO);

  //Commercial Types Routes
  app.get("/private/datamg/commtypes", [authJwt.verifyToken], commTypeController.findCommTypes);

  app.post("/private/datamg/commtypes", [authJwt.verifyToken], commTypeController.addCommType);

  app.patch("private/datamg/commtypes/:id", [authJwt.verifyToken], commTypeController.updateCommType);

  app.delete("/private/datamg/commtypes/:id", [authJwt.verifyToken], commTypeController.deleteCommType);
  
  //Channel Routes
  app.get("/private/datamg/channels", [authJwt.verifyToken], channelController.findChannels);

  app.post("/private/datamg/channels", [authJwt.verifyToken], channelController.addChannel);

  app.patch("private/datamg/channels/:id", [authJwt.verifyToken], channelController.updateChannel);

  app.delete("/private/datamg/channels/:id", [authJwt.verifyToken], channelController.deleteChannel);

  //Base Routes
  app.get("/private/datamg/bases", [authJwt.verifyToken], baseController.findBases);

  app.post("/private/datamg/bases", [authJwt.verifyToken], baseController.addBase);

  app.patch("private/datamg/bases/:id", [authJwt.verifyToken], baseController.updateBase);

  app.delete("/private/datamg/bases/:id", [authJwt.verifyToken], operationController.deleteOperation);

  //Aircraft Routes
  app.get("/private/datamg/aircraft", [authJwt.verifyToken], aircraftController.findAircraft);

  app.post("/private/datamg/aircraft", [authJwt.verifyToken], aircraftController.addAircraft);

  app.patch("private/datamg/aircraft/:id", [authJwt.verifyToken], aircraftController.updateAircraft);

  app.delete("/private/datamg/aircraft/:id", [authJwt.verifyToken], aircraftController.deleteAircraft);
  
};
