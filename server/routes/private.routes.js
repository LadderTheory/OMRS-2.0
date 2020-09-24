
const { authJwt } = require("../middlewares/");
const missionsController = require("../controllers/missions.controller");
const parametersController = require("../controllers/parameters.controller");
const userController = require("../controllers/user.controller")

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", userController.allAccess);

  app.get("/private/missions", [authJwt.verifyToken], missionsController.missionsBoard);

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    userController.adminBoard
  );

  //parameters routes
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

};
