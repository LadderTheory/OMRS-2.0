const controller = require('../controllers/AirliftMission.controller');
const db = require('../models/db.model');
const AirliftMission = db.AirliftMission;
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
    db.mongoose.connection.dropCollection('airliftmissions')
  })
  
  test('post mission', async () => {
    const req = { body: { 
        msnNumber : "1001A",
        callSign : "RED",
        commander : "test",
        squadron : "5fb6869ec42e6d7281524eab",
        aircraft : "5fb686d9c42e6d7281524eb5",
        base : "5fb686bcc42e6d7281524eb0",
        date : "2020-11-25T00:00:00.000Z",
        remarks : "May the force be with you",
        msnType : "5fb6873dc42e6d7281524ebb",
        channel : "5fb68761c42e6d7281524ec1",
        commType : true,
        operation : "5fb6879cc42e6d7281524ec6",
        legs : [ 
            {
                legNumber : 1,
                scheduledTakeOff : 1000,
                actualTakeOff : 1100,
                scheduledLand : 1100,
                actualLand : 1200,
                duration : 1,
                passengerOn : 30,
                passengerOff : 10,
                passengerThru : 20,
                cargoOn : 30,
                cargoOff : 20,
                cargoThru : 10,
                palletOn : 100,
                palletOff : 50,
                palletThru : 50,
                ICAOSource : "5fb688fec42e6d7281524eca",
                ICAODest : "5fb68907c42e6d7281524ecb",
                remarks : "test"
            }
        ],
    } }
    await controller.addAirliftMission(req)
  });
  
  test('get missions', async () => {
    await controller.airliftMission()
  });

  test('get mission by id', async () => {
    const req = {params: { id: '5fbd79269effdb369e102634'}}
    await controller.airliftMsnByID(req)
  });

  test('get mission by filter', async () => {
    const req = { body: { msnNumber : "1001A" } }
    await controller.airliftMsnFilter(req)
  });

//   test('get distinct callsigns', async () => {
//     await controller.distinctCallSign()
//   });

//   test('get latest mission of a callsign', async () => {
//     await controller.lastestByCallsign()
//   });

  test('get mission report', async () => {
    const req = { body: { msnNumber : "1001A" } }
    await controller.missionReport(req)
  });

  test('delete mission', async () => {
    const req = {params: { id: '5fbd79269effdb369e102634'}}
    await controller.deleteAirliftMission(req)
  });

  test('update mission', async () => {
    const req = {params: { id: '5fbd79269effdb369e102634'},
                 body: { msnNumber : "1001A" } }
    await controller.updateAirliftMission(req)
  });

});