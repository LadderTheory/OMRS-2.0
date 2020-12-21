const controller = require('../controllers/parameter_controllers/aircraft.controller');
const db = require('../models/db.model');
const httpMocks = require("node-mocks-http");

describe('Data Management - Aircraft integration tests', () => {
  let postedID
  beforeAll(async () => {
    const dbconn = 'mongodb://sst-test:sst-test@192.168.1.78:32017/sstDB_test'
    db.mongoose
    .connect(dbconn, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    })
  })
  afterAll(async () => {
    db.mongoose.connection.dropCollection('aircrafts')
  })
  test('POST Aircraft', done => {
    const req = httpMocks.createRequest({
      method: "POST",
      url: "/private/datamg/aircraft",
      headers: {},
      body: { name: "X-Wing"}});
    const res = httpMocks.createResponse({ eventEmitter: require('events').EventEmitter });

    expect(res.statusCode).toBe(200)
    res.on('send', () => {
      let data = {}
      data = res._getData()
      postedID = data.id
      expect(data.message).toBe("Aircraft Added")
      done()
    });
    controller.addAircraft(req, res);
  });
  test('GET Aircraft', done => {
    const req = httpMocks.createRequest({
      method: "GET",
      url: "/private/datamg/aircraft",
      headers: {},
      body: {}
    });
    const res = httpMocks.createResponse({ eventEmitter: require('events').EventEmitter });
    expect(res.statusCode).toBe(200)
    res.on('send', async () => {
      let data = {}
      data = res._getData()
      expect(JSON.stringify(data[0].id)).toEqual(JSON.stringify(postedID))
      done()
    });
    controller.findAircraft(req, res);
  });
  test("Update Aircraft", done => {
    const req = httpMocks.createRequest({
      method: "PATCH",
      url: "/private/datamg/aircraft/:id",
      headers: {},
      body: { name: "Y-Wing" },
      params: { id: postedID }
    });
    const res = httpMocks.createResponse({ eventEmitter: require('events').EventEmitter });
    expect(res.statusCode).toBe(200)
    res.on('send', async () => {
      await expect(res._getData()).toBe("Aircraft Updated")
      done()
    });
    controller.updateAircraft(req, res);
  })
  test("Deactive Aircraft", done => {
    const req = httpMocks.createRequest({
      method: "PATCH",
      url: "/private/datamg/aircraft/status/:id",
      headers: {},
      body: {},
      params: { id: postedID }
    });
    const res = httpMocks.createResponse({ eventEmitter: require('events').EventEmitter });
    expect(res.statusCode).toBe(200)
    res.on('send', async () => {
      await expect(res._getData()).toBe("This Aircraft has been made inactive")
      done()
    });
    controller.deactivateAircraft(req, res);
  })
  test("Activate Aircraft", done => {
    const req = httpMocks.createRequest({
      method: "PATCH",
      url: "/private/datamg/aircraft/status/:id",
      headers: {},
      body: {},
      params: { id: postedID }
    });
    const res = httpMocks.createResponse({ eventEmitter: require('events').EventEmitter });
    expect(res.statusCode).toBe(200)
    res.on('send', async () => {
      await expect(res._getData()).toBe("This Aircraft has been made active")
      done()
    });
    controller.deactivateAircraft(req, res);
  })
});