const mongoose = require("mongoose");

const AirliftMission = mongoose.model(
  "AirliftMission",
  new mongoose.Schema({
    msnNumber:String,
    commander:String,
    callSign: String,
    remarks: String,
    date: Date,
    squadron: 
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Squadron"
        }
    ,
    base: 
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Base"
        }
    ,
    aircraft: 
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Aircraft"
        }
    ,
    msnType: 
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "MsnType"
        }
    ,
    channel: 
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Aircraft"
        }
    ,
    commType: 
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "CommType"
        }
    ,
    operation: 
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Operation"
        }
    ,
    legs: [
        {
            scheduledTakeOff:Date,
            scheduledLand:Date,
            actualTakeOff:Date,
            actualLand: Date,
            duration: Number,
            passengerOn: Number,
            passengerOff: Number,
            passengerThru: Number,
            cargoOn: Number,
            cargoOff: Number,
            cargoThru: Number,
            palletOn: Number,
            palletOff: Number,
            palletThru: Number,
            remarks: String,
            maxACL: Number,
            initials: String,
            legNumber: Number,
            palletEmpty: Number,
            sourceBase: 
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref:"Base"
                }
            ,
            destBase: 
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref:"Base"
                }
            ,
            ICAOSource:
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref:"ICAO"
                }
            ,
            ICAODest:
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref:"ICAO"
                }
            ,
            legType:
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref:"LegType"
                }
        }
    ]
  })
);

module.exports = AirliftMission;