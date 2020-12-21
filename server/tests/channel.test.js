const controller = require('../controllers/parameter_controllers/channel.controller');
const db = require('../models/db.model');
const httpMocks = require("node-mocks-http");

describe('Data Management - Channel integration tests', () => {
  let postedID
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
  
  test('POST Channel', done => {
    const req = httpMocks.createRequest({
      method: "POST",
      url: "/private/datamg/channels",
      headers: {},
      body: { name: "Channel 1"}});
    const res = httpMocks.createResponse({ eventEmitter: require('events').EventEmitter });

    expect(res.statusCode).toBe(200)
    res.on('end', () => {
      let data = {}
      data = res._getData()
      postedID = data.id
      expect(data.message).toBe("Channel Added")
      done();
    });
    res.on('send', () => {
      done()
    });
    controller.addChannel(req, res);
  });
  
  test('GET Channels', done => {
    const req = httpMocks.createRequest({
      method: "GET",
      url: "/private/datamg/channels",
      headers: {},
      body: {}
    });
    const res = httpMocks.createResponse({ eventEmitter: require('events').EventEmitter });
    expect(res.statusCode).toBe(200)
    res.on('end', async () => {
      let data = {}
      data = res._getData()
      expect(JSON.stringify(data[0].id)).toEqual(JSON.stringify(postedID))
      done();
    });
    res.on('send', async () => {
      done()
    });
    controller.findChannels(req, res);
  });

  test("Update Channel", done => {
    const req = httpMocks.createRequest({
      method: "PATCH",
      url: "/private/datamg/channels/:id",
      headers: {},
      body: { name: "Channel 2" },
      params: { id: postedID }
    });
    const res = httpMocks.createResponse({ eventEmitter: require('events').EventEmitter });
    expect(res.statusCode).toBe(200)
    res.on('end', async () => {
      expect(res._getData()).toBe("Channel Updated")
      done();
    });
    res.on('send', async () => {
      expect(res._getData()).toBe("Channel Updated")
      done()
    });
    controller.updateChannel(req, res);
  })

  test("Deactive Channel", done => {
    const req = httpMocks.createRequest({
      method: "PATCH",
      url: "/private/datamg/channels/status/:id",
      headers: {},
      body: {},
      params: { id: postedID }
    });
    const res = httpMocks.createResponse({ eventEmitter: require('events').EventEmitter });
    expect(res.statusCode).toBe(200)
    res.on('end', async () => {
      expect(res._getData()).toBe("This Channel has been made inactive")
      done();
    });
    res.on('send', async () => {
      expect(res._getData()).toBe("This Channel has been made inactive")
      done()
    });
    controller.deactivateChannel(req, res);
  })

  test("Activate Channel", done => {
    const req = httpMocks.createRequest({
      method: "PATCH",
      url: "/private/datamg/channels/status/:id",
      headers: {},
      body: {},
      params: { id: postedID }
    });
    const res = httpMocks.createResponse({ eventEmitter: require('events').EventEmitter });
    expect(res.statusCode).toBe(200)
    res.on('end', async () => {
      expect(res._getData()).toBe("This Channel has been made active")
      done();
    });
    res.on('send', async () => {
      expect(res._getData()).toBe("This Channel has been made active")
      done()
    });
    controller.deactivateChannel(req, res);
  })
});