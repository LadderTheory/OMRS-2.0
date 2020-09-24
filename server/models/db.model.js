const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.mission = require("./mission.model");
db.parameters = require("./parameter.model");


db.ROLES = ["user", "admin"];

module.exports = db;