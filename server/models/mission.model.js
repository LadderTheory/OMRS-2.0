const mongoose = require('mongoose');

//create mission Schema
const missionSchema = mongoose.Schema;

const Mission = new missionSchema({
    msnNumber : String,
    callSign : String,
    squadron : String,
    airframe : String,
    source : String,
    destination : String,
    msnDate : Date
});

module.exports = mongoose.model("Mission", Mission);