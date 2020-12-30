const controller = require('../controllers/parameter_controllers//operation.controller');
const db = require('../models/db.model');
const httpMocks = require("node-mocks-http");
require('dotenv').config();

describe('Data Management - Operation integration tests', () => {
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
    db.mongoose.connection.dropCollection('operations')
  })
  test('POST Operation', done => {
    const req = httpMocks.createRequest({
      method: "POST",
      url: "/private/datamg/operations",
      headers: {},
      body: { name: "Operation 1"}});
    const res = httpMocks.createResponse({ eventEmitter: require('events').EventEmitter });

    expect(res.statusCode).toBe(200)
    res.on('send', async () => {
      let data = {}
      data = res._getData()
      postedID = data.id
      await expect(data.message).toBe("Operation Added")
      done()
    });
    controller.addOperation(req, res);
  });
  test('GET Operations', done => {
    const req = httpMocks.createRequest({
      method: "GET",
      url: "/private/datamg/operations",
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
    controller.findOperations(req, res);
  });
  test("Update Operation", done => {
    const req = httpMocks.createRequest({
      method: "PATCH",
      url: "/private/datamg/operations/:id",
      headers: {},
      body: { name: "Operation 2" },
      params: { id: postedID }
    });
    const res = httpMocks.createResponse({ eventEmitter: require('events').EventEmitter });
    expect(res.statusCode).toBe(200)
    res.on('send', async () => {
      await expect(res._getData()).toBe("Operation Updated")
      done()
    });
    controller.updateOperation(req, res);
  })
  test("Deactive Operation", done => {
    const req = httpMocks.createRequest({
      method: "PATCH",
      url: "/private/datamg/operations/status/:id",
      headers: {},
      body: {},
      params: { id: postedID }
    });
    const res = httpMocks.createResponse({ eventEmitter: require('events').EventEmitter });
    expect(res.statusCode).toBe(200)
    res.on('send', async () => {
      await expect(res._getData()).toBe("This Operation has been made inactive")
      done()
    });
    controller.deactivateOperation(req, res);
  })
  test("Activate Operation", done => {
    const req = httpMocks.createRequest({
      method: "PATCH",
      url: "/private/datamg/operations/status/:id",
      headers: {},
      body: {},
      params: { id: postedID }
    });
    const res = httpMocks.createResponse({ eventEmitter: require('events').EventEmitter });
    expect(res.statusCode).toBe(200)
    res.on('send', async () => {
      await expect(res._getData()).toBe("This Operation has been made active")
      done()
    });
    controller.deactivateOperation(req, res);
  })
});