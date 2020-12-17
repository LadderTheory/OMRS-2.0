const controller = require('../controllers/parameter_controllers/icao.controller');
const db = require('../models/db.model');
const mongoose = require("mongoose");
const ICAO = db.icao;

describe('icao', () => {
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
    db.mongoose.connection.dropCollection('icaos')
  })
  
  test('post icao', async () => {
    const req = { body: { name:"AAAA"}}
    await controller.addICAO(req)
  });
  
  test('get icaos', async () => {
    await controller.findICAO()
  });

  test('update icao', async () => {
    const req = {params: { id: '5fbd79269effdb369e102634'},
                 body: { name : "BBBB" } }
    await controller.updateICAO(req)
  });

  test('deactivate icao', async () => {
    const req = {params: { deactivate: '5fbd79269effdb369e102634'}}
    await controller.deactivateICAO(req)
  });
});