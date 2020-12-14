const controller = require('../controllers/parameter_controllers/msnType.controller');
const db = require('../models/db.model');
const mongoose = require("mongoose");
const MsnType = db.msnType;

describe('msnType', () => {
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
    db.mongoose.connection.dropCollection('msntypes')
  })
  
  test('post msnType', async () => {
    const req = { body: { name:"Type 1"}}
    await controller.addMsnType(req)
  });
  
  test('get msnTypes', async () => {
    await controller.findMsnTypes()
  });

  test('update msntype', async () => {
    const req = {params: { id: '5fbd79269effdb369e102634'},
                 body: { name : "Type 2" } }
    await controller.updateMsnType(req)
  });

  test('deactivate msntype', async () => {
    const req = {params: { deactivate: '5fbd79269effdb369e102634'}}
    await controller.deactivateMsnType(req)
  });
});