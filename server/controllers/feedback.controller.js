const db = require("../models/db.model");
const Feedback = db.feedback;
const mongoose = require("mongoose");

//finds all feedbacks in the database
exports.feedbackList = async (req, res) => {
    try {
        const data = await Feedback.find().exec();
        res.send(data);
    } catch (err) {
        console.log(err);
    }
};

//saves a new feedback in the database
exports.addFeedback = async (req, res) => {
    let feedback = new Feedback(req.body)
    try {
        await feedback.save();
        res.send("Feedback Submitted");
    } catch (err) {
        console.log(err);
    }
};

//deletes a specific feedback from the database
exports.deleteFeedback = async (req, res) => {
    try {
        await Feedback.deleteOne({ _id: req.params.id }).exec();
        res.send("Feedback Deleted")
    } catch (err) {
        console.log(err);
    }
}



