const controller = require('../controllers/AirliftMission.controller');
const db = require('../models/db.model');
const httpMocks = require("node-mocks-http");
require('dotenv').config();

describe('feedback', () => {
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
    db.mongoose.connection.dropCollection('airliftmissions')
  })

  test("Post Mission", done => {
    const req = httpMocks.createRequest({
      method: "POST",
      url: "/private/airliftmsn",
      headers: {},
      body: {
        msnNumber: "1001A",
        callSign: "RED",
        commander: "test",
        squadron: "5fb6869ec42e6d7281524eab",
        aircraft: "5fb686d9c42e6d7281524eb5",
        base: "5fb686bcc42e6d7281524eb0",
        date: "2020-11-25T00:00:00.000Z",
        remarks: "May the force be with you",
        msnType: "5fb6873dc42e6d7281524ebb",
        channel: "5fb68761c42e6d7281524ec1",
        commType: true,
        operation: "5fb6879cc42e6d7281524ec6",
        legs: [
          {
            legNumber: 1,
            scheduledTakeOff: 1000,
            actualTakeOff: 1100,
            scheduledLand: 1100,
            actualLand: 1200,
            duration: 1,
            passengerOn: 30,
            passengerOff: 10,
            passengerThru: 20,
            cargoOn: 30,
            cargoOff: 20,
            cargoThru: 10,
            palletOn: 100,
            palletOff: 50,
            palletThru: 50,
            ICAOSource: "5fb688fec42e6d7281524eca",
            ICAODest: "5fb68907c42e6d7281524ecb",
            remarks: "test"
          }
        ],
      }
    });
    const res = httpMocks.createResponse({ eventEmitter: require('events').EventEmitter });

    expect(res.statusCode).toBe(200)
    res.on('end', () => {
      let data = {}
      data = res._getData()
      postedID = data.id
      expect(data.message).toBe("Successfully added a new mission")
      done();
    });
    res.on('send', () => {
      done()
    });
    controller.addAirliftMission(req, res);
  });

  test("Get missions", done => {
    const req = httpMocks.createRequest({
      method: "GET",
      url: "/private/airliftmsn",
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
    controller.airliftMission(req, res);
  })

  test("Mission by ID", done => {
    const req = httpMocks.createRequest({
      method: "GET",
      url: "/private/airliftmsn/byID/:id",
      headers: {
      },
      body: {},
      params: { id: postedID }
    });
    const res = httpMocks.createResponse({ eventEmitter: require('events').EventEmitter });
    expect(res.statusCode).toBe(200)
    res.on('end', async () => {
      let data = {}
      data = res._getData()
      expect(JSON.stringify(data.id)).toEqual(JSON.stringify(postedID))
      done();
    });
    res.on('send', async () => {
      done()
    });
    controller.airliftMsnByID(req, res);
  })

  test("Get missions by filter", done => {
    const req = httpMocks.createRequest({
      method: "POST",
      url: "/private/airliftmsn/msnfilter",
      headers: {},
      body: { msnNumber: "1001A",
              start: "2020-11-24",
              end: "2020-11-25"}
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
    controller.airliftMsnFilter(req, res);
  })

  //Having trouble asserting on the response of this test because it seems that the aggregate function wont
  //return a result if it does not have a valid id to perform a lookup on. Since there are no datamanagement
  //items in the test databse it cannot perform a lookup. Currently this test only asserts that a response
  //code of 200 was recieved.
  test("Get mission report", done => {
    const req = httpMocks.createRequest({
      method: "POST",
      url: "/private/airliftmsn/msnreports",
      headers: {},
      body: {
        msnNumber: "1001A",
        callSign: "RED",
        commander: "test",
        squadron: "5fb6869ec42e6d7281524eab",
        aircraft: "5fb686d9c42e6d7281524eb5",
        base: "5fb686bcc42e6d7281524eb0",
        date: "2020-11-25T00:00:00.000Z",
        msnType: "5fb6873dc42e6d7281524ebb",
        channel: "5fb68761c42e6d7281524ec1",
        operation: "5fb6879cc42e6d7281524ec6",
        dateStart: "2020-11-24",
        dateEnd: "2020-11-25"
      }
    });
    const res = httpMocks.createResponse({ eventEmitter: require('events').EventEmitter });
    expect(res.statusCode).toBe(200)
    res.on('end', async () => {
      done();
    });
    res.on('send', async () => {
      done()
    });
    controller.missionReport(req, res);
  })

  test("Update Mission", done => {
    const req = httpMocks.createRequest({
      method: "PATCH",
      url: "/private/airliftmsn/update/:id",
      headers: {
      },
      body: { remarks: "I was changed in test" },
      params: { id: postedID }
    });
    const res = httpMocks.createResponse({ eventEmitter: require('events').EventEmitter });
    expect(res.statusCode).toBe(200)
    res.on('end', async () => {
      expect(res._getData()).toBe("Mission Updated")
      done();
    });
    res.on('send', async () => {
      expect(res._getData()).toBe("Mission Updated")
      done()
    });
    controller.updateAirliftMission(req, res);
  })

  test("Delete Mission", done => {
    const req = httpMocks.createRequest({
      method: "DELETE",
      url: "/private/airliftmsn/delete/:id",
      headers: {
      },
      body: {},
      params: { id: postedID }
    });
    const res = httpMocks.createResponse({ eventEmitter: require('events').EventEmitter });
    expect(res.statusCode).toBe(200)
    res.on('end', async () => {
      expect(res._getData()).toBe("Mission Deleted")
      done();
    });
    res.on('send', async () => {
      expect(res._getData()).toBe("Mission Deleted")
      done()
    });
    controller.deleteAirliftMission(req, res);
  })
});