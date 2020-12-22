const controller = require('../controllers/parameter_controllers/msnType.controller');
const db = require('../models/db.model');
const httpMocks = require("node-mocks-http");
require('dotenv').config();

describe('Data Management - MsnType integration tests', () => {
  let postedID
  beforeAll(async () => {
    const dbconn = process.env.DB_CONN_TEST
    db.mongoose
    .connect(dbconn, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    })
  })

  afterAll(async () => {
    db.mongoose.connection.dropCollection('msntypes')
  })
  test('POST MsnType', done => {
    const req = httpMocks.createRequest({
      method: "POST",
      url: "/private/datamg/msntypes",
      headers: {},
      body: { name: "Mission Type 1"}});
    const res = httpMocks.createResponse({ eventEmitter: require('events').EventEmitter });

    expect(res.statusCode).toBe(200)
    res.on('send', async () => {
      let data = {}
      data = res._getData()
      postedID = data.id
      await expect(data.message).toBe("Mission Type Added")
      done()
    });
    controller.addMsnType(req, res);
  });
  test('GET MsnTypes', done => {
    const req = httpMocks.createRequest({
      method: "GET",
      url: "/private/datamg/msntypes",
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
    controller.findMsnTypes(req, res);
  });
  test("Update Msntype", done => {
    const req = httpMocks.createRequest({
      method: "PATCH",
      url: "/private/datamg/msntypes/:id",
      headers: {},
      body: { name: "Mission Type 2" },
      params: { id: postedID }
    });
    const res = httpMocks.createResponse({ eventEmitter: require('events').EventEmitter });
    expect(res.statusCode).toBe(200)
    res.on('send', async () => {
      await expect(res._getData()).toBe("Mission Type Updated")
      done()
    });
    controller.updateMsnType(req, res);
  })
  test("Deactive Mission Type", done => {
    const req = httpMocks.createRequest({
      method: "PATCH",
      url: "/private/datamg/msntypes/status/:id",
      headers: {},
      body: {},
      params: { id: postedID }
    });
    const res = httpMocks.createResponse({ eventEmitter: require('events').EventEmitter });
    expect(res.statusCode).toBe(200)
    res.on('send', async () => {
      await expect(res._getData()).toBe("This Mission Type has been made inactive")
      done()
    });
    controller.deactivateMsnType(req, res);
  })
  test("Activate Mission Type", done => {
    const req = httpMocks.createRequest({
      method: "PATCH",
      url: "/private/datamg/msntypes/status/:id",
      headers: {},
      body: {},
      params: { id: postedID }
    });
    const res = httpMocks.createResponse({ eventEmitter: require('events').EventEmitter });
    expect(res.statusCode).toBe(200)
    res.on('send', async () => {
      await expect(res._getData()).toBe("This Mission Type has been made active")
      done()
    });
    controller.deactivateMsnType(req, res);
  })
});