const controller = require('../controllers/parameter_controllers/squadron.controller');
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
    .then(() => {
      console.log("Successfully connect to MongoDB Test.");
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
    res.on('end', () => {
      let data = {}
      data = res._getData()
      postedID = data.id
      expect(data.message).toBe("Squadron Added")
      done();
    });
    res.on('send', () => {
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
    res.on('end', async () => {
      let data = {}
      data = res._getData()
      expect(JSON.stringify(data[0].id)).toEqual(JSON.stringify(postedID))
      done();
    });
    res.on('send', async () => {
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
    res.on('end', async () => {
      expect(res._getData()).toBe("Squadron Updated")
      done();
    });
    res.on('send', async () => {
      expect(res._getData()).toBe("Squadron Updated")
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
    res.on('end', async () => {
      expect(res._getData()).toBe("This Squadron has been made inactive")
      done();
    });
    res.on('send', async () => {
      expect(res._getData()).toBe("This Squadron has been made inactive")
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
    res.on('end', async () => {
      expect(res._getData()).toBe("This Squadron has been made active")
      done();
    });
    res.on('send', async () => {
      expect(res._getData()).toBe("This Squadron has been made active")
      done()
    });
    controller.deactivateSquadron(req, res);
  })
});