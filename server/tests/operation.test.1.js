const controller = require('../controllers/parameter_controllers/operation.controller');
const db = require('../models/db.model');
const mongoose = require("mongoose");
const Operation = db.operation;

describe('operation', () => {
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
    db.mongoose.connection.dropCollection('operations')
  })
  
  test('post operation', async () => {
    const req = { body: { name:"Op 1"}}
    await controller.addOperation(req)
  });
  
  test('get operation', async () => {
    await controller.findOperations()
  });

  test('update operations', async () => {
    const req = {params: { id: '5fbd79269effdb369e102634'},
                 body: { name : "Op 2" } }
    await controller.updateOperation(req)
  });

  test('deactivate operation', async () => {
    const req = {params: { deactivate: '5fbd79269effdb369e102634'}}
    await controller.deactivateOperation(req)
  });
});