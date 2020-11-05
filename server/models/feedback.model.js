const mongoose = require('mongoose');

//create mission Schema
const feedbackSchema = mongoose.Schema;

//Structure for information pertaining to user feedback.
const Feedback = new feedbackSchema({
    feedbackType : String,
    firstName : String,
    lastName : String,
    squadron : String,
    urgency : String,
    phone : String,
    email : String,
    feedback : String
    
});

module.exports = mongoose.model("Feedback", Feedback);