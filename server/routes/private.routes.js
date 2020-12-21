//Import Keycloak - Keycloak is the authentication framework and management
const keycloak = require('../config/keycloak.config').getKeycloak();

//Import Controllers - Controllers handle the logic for database retrieval 
const AirliftMsnController = require("../controllers/AirliftMission.controller");
const feedbackController = require("../controllers/feedback.controller");
//Controller imports for data management
const squadronController = require("../controllers/parameter_controllers/squadron.controller");
const operationController = require("../controllers/parameter_controllers/operation.controller");
const msnTypeController = require("../controllers/parameter_controllers/msnType.controller");
const icaoController = require("../controllers/parameter_controllers/icao.controller");
const channelController = require("../controllers/parameter_controllers/channel.controller");
const baseController = require("../controllers/parameter_controllers/base.controller");
const aircraftController = require("../controllers/parameter_controllers/aircraft.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  //API Endpoints - The below routes represent the API endpoints for the backend.
  //Feedback Routes
  app.get("/private/feedback", keycloak.protect('admin'), feedbackController.feedbackList);

  app.post("/private/feedback", keycloak.protect(['user', 'admin']), feedbackController.addFeedback);

  app.delete("/private/feedback/:id", keycloak.protect('admin'), feedbackController.deleteFeedback);

  //AirLiftMsn Routes
  app.get("/private/airliftmsn", keycloak.protect(['user', 'admin']), AirliftMsnController.airliftMission);

  app.post("/private/airliftmsn/msnfilter", keycloak.protect(['user', 'admin']), AirliftMsnController.airliftMsnFilter);

  app.get("/private/airliftmsn/byID/:id", keycloak.protect(['user', 'admin']), AirliftMsnController.airliftMsnByID);

  // app.get("/private/airliftmsn/distinctcallsign", keycloak.protect(['user', 'admin']), AirliftMsnController.distinctCallSign);

  // app.get("/private/airliftmsn/latestbycallsign/:callsign", keycloak.protect(['user', 'admin']), AirliftMsnController.lastestByCallsign);

  app.post("/private/airliftmsn/msnreports", keycloak.protect(['user', 'admin']), AirliftMsnController.missionReport);

  app.patch("/private/airliftmsn/update/:id", keycloak.protect(['user', 'admin']), AirliftMsnController.updateAirliftMission);

  app.post("/private/airliftmsn", keycloak.protect(['user', 'admin']), AirliftMsnController.addAirliftMission);

  app.delete("/private/airliftmsn/delete/:id", keycloak.protect(['user', 'admin']), AirliftMsnController.deleteAirliftMission);


  //Data Management Routes
  //Squadron Routes
  app.get("/private/datamg/squadrons", keycloak.protect(['user', 'admin']), squadronController.findSquadrons);

  app.post("/private/datamg/squadrons", keycloak.protect('admin'), squadronController.addSquadron);

  app.patch("/private/datamg/squadrons/:id", keycloak.protect('admin'), squadronController.updateSquadrons);

  app.patch("/private/datamg/squadrons/status/:id", keycloak.protect('admin'), squadronController.deactivateSquadron);

  //Operation Routes
  app.get("/private/datamg/operations", keycloak.protect(['user', 'admin']), operationController.findOperations);

  app.post("/private/datamg/operations", keycloak.protect('admin'), operationController.addOperation);

  app.patch("/private/datamg/operations/:id", keycloak.protect('admin'), operationController.updateOperation);

  app.patch("/private/datamg/operations/status/:id", keycloak.protect('admin'), operationController.deactivateOperation);

  //Mission Types Routes
  app.get("/private/datamg/msntypes", keycloak.protect(['user', 'admin']), msnTypeController.findMsnTypes);

  app.post("/private/datamg/msntypes", keycloak.protect('admin'), msnTypeController.addMsnType);

  app.patch("/private/datamg/msntypes/:id", keycloak.protect('admin'), msnTypeController.updateMsnType);

  app.patch("/private/datamg/msntypes/status/:id", keycloak.protect('admin'), msnTypeController.deactivateMsnType);

  //ICAO Routes
  app.get("/private/datamg/icao", keycloak.protect(['user', 'admin']), icaoController.findICAO);

  app.post("/private/datamg/icao", keycloak.protect('admin'), icaoController.addICAO);

  app.patch("/private/datamg/icao/:id", keycloak.protect('admin'), icaoController.updateICAO);

  app.patch("/private/datamg/icao/status/:id", keycloak.protect('admin'), icaoController.deactivateICAO);

  //Channel Routes
  app.get("/private/datamg/channels", keycloak.protect(['user', 'admin']), channelController.findChannels);

  app.post("/private/datamg/channels", keycloak.protect('admin'), channelController.addChannel);

  app.patch("/private/datamg/channels/:id", keycloak.protect('admin'), channelController.updateChannel);

  app.patch("/private/datamg/channels/status/:id", keycloak.protect('admin'), channelController.deactivateChannel);

  //Base Routes
  app.get("/private/datamg/bases", keycloak.protect(['user', 'admin']), baseController.findBases);

  app.post("/private/datamg/bases", keycloak.protect('admin'), baseController.addBase);

  app.patch("/private/datamg/bases/:id", keycloak.protect('admin'), baseController.updateBase);

  app.patch("/private/datamg/bases/status/:id", keycloak.protect('admin'), baseController.deactivateBases);

  //Aircraft Routes
  app.get("/private/datamg/aircraft", keycloak.protect(['user', 'admin']), aircraftController.findAircraft);

  app.post("/private/datamg/aircraft", keycloak.protect('admin'), aircraftController.addAircraft);

  app.patch("/private/datamg/aircraft/:id", keycloak.protect('admin'), aircraftController.updateAircraft);

  app.patch("/private/datamg/aircraft/status/:id", keycloak.protect('admin'), aircraftController.deactivateAircraft);
};
