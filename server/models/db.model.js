const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.AirliftMission = require("./AirliftMission.model");

//Parameter model imports
db.squadron = require("./SubModels/squadron.model");
db.operation = require("./SubModels/operation.model");
db.msnType = require("./SubModels/msnType.model");
db.legType = require("./SubModels/legType.model");
db.icao = require("./SubModels/icao.model");
db.channel = require("./SubModels/channel.model");
db.base = require("./SubModels/base.model");
db.aircraft = require("./SubModels/aircraft.model");
db.feedback = require("./feedback.model");

db.ROLES = ["user", "admin"];

module.exports = db;