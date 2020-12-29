const controller = require('../controllers/feedback.controller');
const db = require('../models/db.model');
const Feedback = db.feedback;
const mongoose = require("mongoose");

describe('feedback', () => {
  beforeAll(async () => {
    const dbconn = 'mongodb://sst-test:sst-test@192.168.1.78:32017/sstDB_test'
    db.mongoose
    .connect(dbconn, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    })
    .then(() => {
      console.log("Successfully connect to MongoDB Test.");
    })
  })

  afterAll(async () => {
    db.mongoose.connection.dropCollection('feedbacks')
  })
  
  test('post feedback', async () => {
    const req = { body: { firstName:"sst",lastName:"sst",squadron:"sst",phone:"1111111111",email:"sst@sst.com",feedbackType:"error",urgency:"medium",feedback:"This came from a jest test"}}
    await controller.addFeedback(req)
  });
  
  test('get feedback', async () => {
    await controller.feedbackList()
  });

  test('delete feedback', async () => {
    const req = {params: { id: '5fbd79269effdb369e102634'}}
    await controller.deleteFeedback(req)
  });
});