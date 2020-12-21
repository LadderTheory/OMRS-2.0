const controller = require('../controllers/parameter_controllers/base.controller');
const db = require('../models/db.model');
const httpMocks = require("node-mocks-http");

describe('Data Management - Base integration tests', () => {
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
    db.mongoose.connection.dropCollection('bases')
  })
  
  test('POST Base', done => {
    const req = httpMocks.createRequest({
      method: "POST",
      url: "/private/datamg/bases",
      headers: {},
      body: { name: "Yavin IV"}});
    const res = httpMocks.createResponse({ eventEmitter: require('events').EventEmitter });

    expect(res.statusCode).toBe(200)
    res.on('end', () => {
      let data = {}
      data = res._getData()
      postedID = data.id
      expect(data.message).toBe("Base Added")
      done();
    });
    res.on('send', () => {
      done()
    });
    controller.addBase(req, res);
  });
  
  test('GET Bases', done => {
    const req = httpMocks.createRequest({
      method: "GET",
      url: "/private/datamg/bases",
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
    controller.findBases(req, res);
  });

  test("Update Base", done => {
    const req = httpMocks.createRequest({
      method: "PATCH",
      url: "/private/datamg/bases/:id",
      headers: {},
      body: { name: "Coruscant" },
      params: { id: postedID }
    });
    const res = httpMocks.createResponse({ eventEmitter: require('events').EventEmitter });
    expect(res.statusCode).toBe(200)
    res.on('end', async () => {
      expect(res._getData()).toBe("Base Updated")
      done();
    });
    res.on('send', async () => {
      expect(res._getData()).toBe("Base Updated")
      done()
    });
    controller.updateBase(req, res);
  })

  test("Deactive Base", done => {
    const req = httpMocks.createRequest({
      method: "PATCH",
      url: "/private/datamg/bases/status/:id",
      headers: {},
      body: {},
      params: { id: postedID }
    });
    const res = httpMocks.createResponse({ eventEmitter: require('events').EventEmitter });
    expect(res.statusCode).toBe(200)
    res.on('end', async () => {
      expect(res._getData()).toBe("This Base has been made inactive")
      done();
    });
    res.on('send', async () => {
      expect(res._getData()).toBe("This Base has been made inactive")
      done()
    });
    controller.deactivateBases(req, res);
  })

  test("Activate Aircraft", done => {
    const req = httpMocks.createRequest({
      method: "PATCH",
      url: "/private/datamg/bases/status/:id",
      headers: {},
      body: {},
      params: { id: postedID }
    });
    const res = httpMocks.createResponse({ eventEmitter: require('events').EventEmitter });
    expect(res.statusCode).toBe(200)
    res.on('end', async () => {
      expect(res._getData()).toBe("This Base has been made active")
      done();
    });
    res.on('send', async () => {
      expect(res._getData()).toBe("This Base has been made active")
      done()
    });
    controller.deactivateBases(req, res);
  })
});