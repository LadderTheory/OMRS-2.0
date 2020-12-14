const controller = require('../controllers/parameter_controllers/base.controller');
const db = require('../models/db.model');
const Base = db.base;
const mongoose = require("mongoose");

describe('base', () => {
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
    db.mongoose.connection.dropCollection('bases')
  })
  
  test('post base', async () => {
    const req = { body: { name:"Baes 1"}}
    await controller.addBase(req)
  });
  
  test('get bases', async () => {
    await controller.findBases()
  });

  test('update base', async () => {
    const req = {params: { id: '5fbd79269effdb369e102634'},
                 body: { name : "Base 2" } }
    await controller.updateBase(req)
  });

  test('deactivate base', async () => {
    const req = {params: { deactivate: '5fbd79269effdb369e102634'}}
    await controller.deactivateBases(req)
  });
});