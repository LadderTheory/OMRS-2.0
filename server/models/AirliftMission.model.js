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
    commercialType: 
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "CommercialType"
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
                    ref:"SourceBase"
                }
            ,
            destBase: 
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref:"DestBase"
                }
            ,
            ICAOSource:
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref:"ICAOSource"
                }
            ,
            ICAODest:
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref:"ICAODest"
                }
            ,
            LegType:
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref:"LegType"
                }
            

        }
    ]
  })
);

module.exports = AirliftMission;