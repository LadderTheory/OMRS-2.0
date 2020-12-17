const controller = require('../controllers/parameter_controllers/aircraft.controller');
const db = require('../models/db.model');
const Aircraft = db.aircraft;
const mongoose = require("mongoose");

describe('aircraft', () => {
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
    db.mongoose.connection.dropCollection('aircrafts')
  })
  
  test('post aircraft', async () => {
    const req = { body: { name:"X-Wing"}}
    await controller.addAircraft(req)
  });
  
  test('get aircraft', async () => {
    await controller.findAircraft()
  });

  test('update aircraft', async () => {
    const req = {params: { id: '5fbd79269effdb369e102634'},
                 body: { name : "Y-Wing" } }
    await controller.updateAircraft(req)
  });

  test('deactivate aircraft', async () => {
    const req = {params: { deactivate: '5fbd79269effdb369e102634'}}
    await controller.deactivateAircraft(req)
  });
});