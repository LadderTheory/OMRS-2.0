const controller = require('../controllers/parameter_controllers/icao.controller');
const db = require('../models/db.model');
const httpMocks = require("node-mocks-http");
require('dotenv').config();

describe('Data Management - ICAO integration tests', () => {
  let postedID
  beforeAll(async () => {
    const dbconn = process.env.DB_CONN_TEST
    db.mongoose
    .connect(dbconn, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      retryWrites: false
    })
  })
  afterAll(async () => {
    db.mongoose.connection.dropCollection('icaos')
  })
  
  test('POST ICAO', done => {
    const req = httpMocks.createRequest({
      method: "POST",
      url: "/private/datamg/icao",
      headers: {},
      body: { name: "AAAA"}});
    const res = httpMocks.createResponse({ eventEmitter: require('events').EventEmitter });

    expect(res.statusCode).toBe(200)
    res.on('send', async () => {
      let data = {}
      data = res._getData()
      postedID = data.id
      await expect(data.message).toBe("ICAO Added")
      done()
    });
    controller.addICAO(req, res);
  });
  test('GET ICAO', done => {
    const req = httpMocks.createRequest({
      method: "GET",
      url: "/private/datamg/icao",
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
    controller.findICAO(req, res);
  });
  test("Update ICAO", done => {
    const req = httpMocks.createRequest({
      method: "PATCH",
      url: "/private/datamg/icao/:id",
      headers: {},
      body: { name: "BBBB" },
      params: { id: postedID }
    });
    const res = httpMocks.createResponse({ eventEmitter: require('events').EventEmitter });
    expect(res.statusCode).toBe(200)
    res.on('send', async () => {
      await expect(res._getData()).toBe("ICAO Updated")
      done()
    });
    controller.updateICAO(req, res);
  })
  test("Deactive ICAO", done => {
    const req = httpMocks.createRequest({
      method: "PATCH",
      url: "/private/datamg/icao/status/:id",
      headers: {},
      body: {},
      params: { id: postedID }
    });
    const res = httpMocks.createResponse({ eventEmitter: require('events').EventEmitter });
    expect(res.statusCode).toBe(200)
    res.on('send', async () => {
      await expect(res._getData()).toBe("This ICAO has been made inactive")
      done()
    });
    controller.deactivateICAO(req, res);
  })
  test("Activate ICAO", done => {
    const req = httpMocks.createRequest({
      method: "PATCH",
      url: "/private/datamg/icao/status/:id",
      headers: {},
      body: {},
      params: { id: postedID }
    });
    const res = httpMocks.createResponse({ eventEmitter: require('events').EventEmitter });
    expect(res.statusCode).toBe(200)
    res.on('send', async () => {
      await expect(res._getData()).toBe("This ICAO has been made active")
      done()
    });
    controller.deactivateICAO(req, res);
  })
});