const { authJwt } = require("../middlewares/");
//const missionsController = require("../controllers/missions.controller");
//const parametersController = require("../controllers/parameters.controller");
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
const feedbackController = require("../controllers/feedback.controller");



module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

 



  //Feedback Routes

  app.get("/private/feedback", [authJwt.verifyToken], [authJwt.isAdmin], feedbackController.feedbackList);

  app.post("/private/feedback", [authJwt.verifyToken], feedbackController.addFeedback);

  app.delete("/private/feedback/:id", [authJwt.verifyToken], [authJwt.isAdmin], feedbackController.deleteFeedback);

  //Private User Routes
  app.get("/private/users", [authJwt.verifyToken], [authJwt.isAdmin], userController.UserList);

  app.get("/private/users/:id", [authJwt.verifyToken], [authJwt.isAdmin], userController.findUserByID);

  app.patch("/private/users/:id", [authJwt.verifyToken], [authJwt.isAdmin], userController.updateUser);

  app.delete("/private/users/:id", [authJwt.verifyToken], [authJwt.isAdmin], userController.deleteUser);

  app.get("/private/users/admin/:id", [authJwt.verifyToken], [authJwt.isAdmin], userController.makeAdmin);

  app.get("/private/users/activate/:id", [authJwt.verifyToken], [authJwt.isAdmin], userController.makeActive);
  

  //Private AirLiftMsn Routes
  app.get("/private/airliftmsn", [authJwt.verifyToken], AirliftMsnController.airliftMission);

  app.post("/private/airliftmsn/bydate", [authJwt.verifyToken], AirliftMsnController.airliftMsnFilter);

  app.get("/private/airliftmsn/byID/:id", [authJwt.verifyToken], AirliftMsnController.airliftMsnByID);

  app.get("/private/airliftmsn/distinctCallSign", [authJwt.verifyToken], AirliftMsnController.distinctCallSign);

  app.post("/private/airliftmsn/msnreports", [authJwt.verifyToken], AirliftMsnController.missionReport);

  app.patch("/private/airliftmsn/update/:id", [authJwt.verifyToken], AirliftMsnController.updateAirliftMission);

  app.post("/private/airliftmsn", [authJwt.verifyToken], AirliftMsnController.addAirliftMission);

  app.delete("/private/airliftmsn/:id", [authJwt.verifyToken], AirliftMsnController.deleteAirliftMission);

  
  //New Data Management Routes
  //Squadron Routes
  app.get("/private/datamg/squadrons", [authJwt.verifyToken], squadronController.findSquadrons);

  app.post("/private/datamg/squadrons", [authJwt.verifyToken], squadronController.addSquadron);

  app.patch("/private/datamg/squadrons/:id", [authJwt.verifyToken], squadronController.updateSquadrons);
  
  app.delete("/private/datamg/squadrons/:id", [authJwt.verifyToken], squadronController.deleteSquadron);
  
  app.patch("/private/datamg/squadrons/status/:deactivate", [authJwt.verifyToken], squadronController.deactivateSquadron);
  
  

  //Operation Routes
  app.get("/private/datamg/operations", [authJwt.verifyToken], operationController.findOperations);

  app.post("/private/datamg/operations", [authJwt.verifyToken], operationController.addOperation);

  app.patch("/private/datamg/operations/:id", [authJwt.verifyToken], operationController.updateOperation);

  app.delete("/private/datamg/operations/:id", [authJwt.verifyToken], operationController.deleteOperation);

  app.patch("/private/datamg/operations/status/:deactivate", [authJwt.verifyToken], operationController.deactivateOperation);

  //Mission Types Routes
  app.get("/private/datamg/msntypes", [authJwt.verifyToken], msnTypeController.findMsnTypes);

  app.post("/private/datamg/msntypes", [authJwt.verifyToken], msnTypeController.addMsnType);

  app.patch("/private/datamg/msntypes/:id", [authJwt.verifyToken], msnTypeController.updateMsnType);

  app.delete("/private/datamg/msntypes/:id", [authJwt.verifyToken], msnTypeController.deleteMsnType);

  app.patch("/private/datamg/msntypes/status/:deactivate", [authJwt.verifyToken], msnTypeController.deactivateMsnType);

  //Leg Types Routes
  app.get("/private/datamg/legtypes", [authJwt.verifyToken], legTypeController.findLegTypes);

  app.post("/private/datamg/legtypes", [authJwt.verifyToken], legTypeController.addLegType);

  app.patch("/private/datamg/legtypes/:id", [authJwt.verifyToken], legTypeController.updateLegType);

  app.delete("/private/datamg/legtypes/:id", [authJwt.verifyToken], legTypeController.deleteLegType);

  app.patch("/private/datamg/legtypes/status/:deactivate", [authJwt.verifyToken], legTypeController.deactivateLegType);

  //ICAO Routes
  app.get("/private/datamg/icao", [authJwt.verifyToken], icaoController.findICAO);

  app.post("/private/datamg/icao", [authJwt.verifyToken], icaoController.addICAO);

  app.patch("/private/datamg/icao/:id", [authJwt.verifyToken], icaoController.updateICAO);

  app.delete("/private/datamg/icao/:id", [authJwt.verifyToken], icaoController.deleteICAO);

  app.patch("/private/datamg/icao/status/:deactivate", [authJwt.verifyToken], icaoController.deactivateICAO);

  //Commercial Types Routes
  app.get("/private/datamg/commtypes", [authJwt.verifyToken], commTypeController.findCommTypes);

  app.post("/private/datamg/commtypes", [authJwt.verifyToken], commTypeController.addCommType);

  app.patch("/private/datamg/commtypes/:id", [authJwt.verifyToken], commTypeController.updateCommType);

  app.delete("/private/datamg/commtypes/:id", [authJwt.verifyToken], commTypeController.deleteCommType);

  app.patch("/private/datamg/commtypes/status/:deactivate", [authJwt.verifyToken], commTypeController.deactivateCommType);
  
  //Channel Routes
  app.get("/private/datamg/channels", [authJwt.verifyToken], channelController.findChannels);

  app.post("/private/datamg/channels", [authJwt.verifyToken], channelController.addChannel);

  app.patch("/private/datamg/channels/:id", [authJwt.verifyToken], channelController.updateChannel);

  app.delete("/private/datamg/channels/:id", [authJwt.verifyToken], channelController.deleteChannel);

  app.patch("/private/datamg/channels/status/:deactivate", [authJwt.verifyToken], channelController.deactivateChannel);

  //Base Routes
  app.get("/private/datamg/bases", [authJwt.verifyToken], baseController.findBases);

  app.post("/private/datamg/bases", [authJwt.verifyToken], baseController.addBase);

  app.patch("/private/datamg/bases/:id", [authJwt.verifyToken], baseController.updateBase);

  app.delete("/private/datamg/bases/:id", [authJwt.verifyToken], baseController.deleteBase);

  app.patch("/private/datamg/bases/status/:deactivate", [authJwt.verifyToken], baseController.deactivateBases);

  //Aircraft Routes
  app.get("/private/datamg/aircraft", [authJwt.verifyToken], aircraftController.findAircraft);

  app.post("/private/datamg/aircraft", [authJwt.verifyToken], aircraftController.addAircraft);

  app.patch("/private/datamg/aircraft/:id", [authJwt.verifyToken], aircraftController.updateAircraft);

  app.delete("/private/datamg/aircraft/:id", [authJwt.verifyToken], aircraftController.deleteAircraft);

  app.patch("/private/datamg/aircraft/status/:deactivate", [authJwt.verifyToken], aircraftController.deactivateAircraft);
  
};
