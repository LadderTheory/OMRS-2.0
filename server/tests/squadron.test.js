const controller = require('../controllers/parameter_controllers/squadron.controller');
const db = require('../models/db.model');
const httpMocks = require("node-mocks-http");
require('dotenv').config();

describe('Data Management - Aircraft integration tests', () => {
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
    db.mongoose.connection.dropCollection('squadrons')
  })
  test('POST Squadron', done => {
    const req = httpMocks.createRequest({
      method: "POST",
      url: "/private/datamg/squadrons",
      headers: {},
      body: { name: "RED"}});
    const res = httpMocks.createResponse({ eventEmitter: require('events').EventEmitter });

    expect(res.statusCode).toBe(200)
    res.on('send', async () => {
      let data = {}
      data = res._getData()
      postedID = data.id
      await expect(data.message).toBe("Squadron Added")
      done()
    });
    controller.addSquadron(req, res);
  });
  test('GET Squadrons', done => {
    const req = httpMocks.createRequest({
      method: "GET",
      url: "/private/datamg/squadrons",
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
    controller.findSquadrons(req, res);
  });
  test("Update Squadron", done => {
    const req = httpMocks.createRequest({
      method: "PATCH",
      url: "/private/datamg/squadrons/:id",
      headers: {},
      body: { name: "BLUE" },
      params: { id: postedID }
    });
    const res = httpMocks.createResponse({ eventEmitter: require('events').EventEmitter });
    expect(res.statusCode).toBe(200)
    res.on('send', async () => {
      await expect(res._getData()).toBe("Squadron Updated")
      done()
    });
    controller.updateSquadrons(req, res);
  })
  test("Deactive Squadron", done => {
    const req = httpMocks.createRequest({
      method: "PATCH",
      url: "/private/datamg/squadrons/status/:id",
      headers: {},
      body: {},
      params: { id: postedID }
    });
    const res = httpMocks.createResponse({ eventEmitter: require('events').EventEmitter });
    expect(res.statusCode).toBe(200)
    res.on('send', async () => {
      await expect(res._getData()).toBe("This Squadron has been made inactive")
      done()
    });
    controller.deactivateSquadron(req, res);
  })
  test("Activate Squadron", done => {
    const req = httpMocks.createRequest({
      method: "PATCH",
      url: "/private/datamg/squadrons/status/:id",
      headers: {},
      body: {},
      params: { id: postedID }
    });
    const res = httpMocks.createResponse({ eventEmitter: require('events').EventEmitter });
    expect(res.statusCode).toBe(200)
    res.on('send', async () => {
      await expect(res._getData()).toBe("This Squadron has been made active")
      done()
    });
    controller.deactivateSquadron(req, res);
  })
});