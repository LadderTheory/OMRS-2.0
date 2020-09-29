const mongoose = require("mongoose");

const AirliftMission = mongoose.model(
  "AirliftMission",
  new mongoose.Schema({
    msnNumber:String,
    commander:String,
    callSign: String,
    remarks: String,
    date: Date,
    squadron: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "squadron"
        }
    ],
    base: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "base"
        }
    ],
    aircraft: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "aircraft"
        }
    ],
    msnType: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "msnType"
        }
    ],
    channel: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "aircraft"
        }
    ],
    commercialType: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "commercialType"
        }
    ],
    operation: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "operation"
        }
    ],
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
            sourceBase: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref:"sourceBase"
                }
            ],
            destBase: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref:"destBase"
                }
            ],
            ICAOSource:[
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref:"ICAOSource"
                }
            ],
            ICAODest:[
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref:"ICAODest"
                }
            ],
            LegType:[
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref:"LegType"
                }
            ]

        }
    ]
    
  })
);

module.exports = AirliftMission;