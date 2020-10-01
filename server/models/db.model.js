const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.mission = require("./mission.model");
db.parameters = require("./parameter.model");
db.AirliftMission = require("./AirliftMission.model");

//Parameter model imports
db.squadron = require("./SubModels/squadron.model");
db.operation = require("./SubModels/operation.model");
db.msnType = require("./SubModels/msnType.model");
db.legType = require("./SubModels/legType.model");
db.icao = require("./SubModels/icao.model");
db.commType = require("./SubModels/commercialType.model");
db.channel = require("./SubModels/channel.model");
db.base = require("./SubModels/base.model");
db.aircraft = require("./SubModels/aircraft.model");

db.ROLES = ["user", "admin"];

module.exports = db;