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

  app.get("/api/test/all", userController.allAccess);

  app.get("/private/missions", [authJwt.verifyToken], missionsController.missionsBoard);

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    userController.adminBoard
  );
};