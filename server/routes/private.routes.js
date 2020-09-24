const { authJwt } = require("../middlewares/");
const missionsController = require("../controllers/missions.controller");
const userController = require("../controllers/user.controller")

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

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    userController.adminBoard
  );
};