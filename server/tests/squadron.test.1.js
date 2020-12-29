const controller = require('../controllers/parameter_controllers/squadron.controller');
const db = require('../models/db.model');
const mongoose = require("mongoose");
const Squadron = db.squadron;

describe('squadron', () => {
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
    db.mongoose.connection.dropCollection('squadrons')
  })
  
  test('post squadron', async () => {
    const req = { body: { name:"RED"}}
    await controller.addSquadron(req)
  });
  
  test('get squadron', async () => {
    await controller.findSquadrons()
  });

  test('update squadron', async () => {
    const req = {params: { id: '5fbd79269effdb369e102634'},
                 body: { name : "BLUE" } }
    await controller.updateSquadrons(req)
  });

  test('deactivate squadron', async () => {
    const req = {params: { deactivate: '5fbd79269effdb369e102634'}}
    await controller.deactivateSquadron(req)
  });
});