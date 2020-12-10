process.env.NODE_ENV = "test";
const request = require("supertest");
const app = require("../../server");
const db = require("../models/db.model");
const AirliftMission = db.AirliftMission;
const mongoose = require("mongoose");

describe("GET / ", () => {
    test("It should post a new feedback", async () => {
        const response = await request(app).post("/private/feedback")
        .send({
            feedbackType : "comment"
            firstName : "sstfirst"
            lastName : "sstlast"
            squadron : "sst"
            urgency : "critical"
            phone : "111-111-1111"
            email : "sst@sst.com"
            feedback : "I really like your app"
        });

    });
});