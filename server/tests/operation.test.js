const controller = require('../controllers/parameter_controllers//operation.controller');
const db = require('../models/db.model');
const httpMocks = require("node-mocks-http");

describe('Data Management - Operation integration tests', () => {
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
    res.on('end', () => {
      let data = {}
      data = res._getData()
      postedID = data.id
      expect(data.message).toBe("Operation Added")
      done();
    });
    res.on('send', () => {
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
    res.on('end', async () => {
      let data = {}
      data = res._getData()
      expect(JSON.stringify(data[0].id)).toEqual(JSON.stringify(postedID))
      done();
    });
    res.on('send', async () => {
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
    res.on('end', async () => {
      expect(res._getData()).toBe("Operation Updated")
      done();
    });
    res.on('send', async () => {
      expect(res._getData()).toBe("Operation Updated")
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
    res.on('end', async () => {
      expect(res._getData()).toBe("This Operation has been made inactive")
      done();
    });
    res.on('send', async () => {
      expect(res._getData()).toBe("This Operation has been made inactive")
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
    res.on('end', async () => {
      expect(res._getData()).toBe("This Operation has been made active")
      done();
    });
    res.on('send', async () => {
      expect(res._getData()).toBe("This Operation has been made active")
      done()
    });
    controller.deactivateOperation(req, res);
  })
});