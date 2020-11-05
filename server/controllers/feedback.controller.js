const { response } = require("express");
const { feedback } = require("../models/db.model");
const db = require("../models/db.model");
const Feedback = db.feedback;

exports.feedbackList = async (req, res) => {
    try{
  const data = await Feedback.find().exec();
  res.send(data);
    }catch(err)
    {
        console.log(err);
    }
};

exports.addFeedback = async (req, res) => {
    let feedback = new Feedback(req.body) 
    try{
        await feedback.save();
        res.send("Feedback Submitted")
    }catch(err){
        console.log(err);
    }
  };

exports.deleteFeedback = async (req, res) => {
    try{
        await Feedback.deleteOne({_id: req.params.id}).exec();
        res.send("Feedback Deleted")
    }catch(err){
    console.log(err);
    }
}



