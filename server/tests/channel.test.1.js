const controller = require('../controllers/parameter_controllers/channel.controller');
const db = require('../models/db.model');
const mongoose = require("mongoose");
const Channel = db.channel;

describe('channel', () => {
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
    db.mongoose.connection.dropCollection('channels')
  })
  
  test('post channel', async () => {
    const req = { body: { name:"Channel 1"}}
    await controller.addChannel(req)
  });
  
  test('get channels', async () => {
    await controller.findChannels()
  });

  test('update base', async () => {
    const req = {params: { id: '5fbd79269effdb369e102634'},
                 body: { name : "Channel 2" } }
    await controller.updateChannel(req)
  });

  test('deactivate base', async () => {
    const req = {params: { deactivate: '5fbd79269effdb369e102634'}}
    await controller.deactivateChannel(req)
  });
});