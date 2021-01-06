//imports required dependencies for the test
const controller = require('../controllers/AirliftMission.controller');
const db = require('../models/db.model');
const httpMocks = require("node-mocks-http");
require('dotenv').config();

describe('feedback', () => {
  //declares a variable to store the mongoID of the mission that will be added to the test database in a below step
  let postedID
  //code in the beforeAll block is executed before all test blocks
  beforeAll(async () => {
    //sets up a connection to the testing database
    const dbconn = process.env.DB_CONN_TEST
    db.mongoose
      .connect(dbconn, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        retryWrites: false
      })
  })
  //code in the afterAll block is executed after all test blocks
  afterAll(async () => {
    //cleans test database after all tests by dropping the colllection
    db.mongoose.connection.dropCollection('airliftmissions')
  })
  //tests posting a new mission
  test("Post Mission", done => {
    //creates a mock request. This simulates information that would be passed to the controller in a request.body
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
    //creates a mock response. This simulates the response that would be returned from the controller
    const res = httpMocks.createResponse({ eventEmitter: require('events').EventEmitter });
    //check that the response status code was 200 (OK)
    expect(res.statusCode).toBe(200)
    res.on('end', () => {
      //creates an empty object to store the data that comes back in the response from the controller
      let data = {}
      //sets the data object equal to the response data
      data = res._getData()
      //sets the postedID equal to the mongoID that came back in the response data
      postedID = data.id
      //checks that the message that came back in the response data was as expected
      expect(data.message).toBe("Successfully added a new mission")
      done();
    });
    res.on('send', () => {
      done()
    });
    //passes the mock request and response to the controller
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
      //checks that when searching for all missions in the test database the mongoID found in the database matches the id of mission that was added in the add mission test
      //since only 1 test mission was inserted we expect that the only mission returned will have a matching id to the one that was insterted above
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
      //checks that when searching for a specific mission in the test database the mongoID found in the database matches the id of the mission that was added in the add mission test
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
      //checks that when searching for a mission by mission number and date in the test database the mongoID found in the database matches the id of the mission that was added in the add mission test
      //since only 1 test mission was inserted we expect that the only mission returned will have a matching id to the one that was insterted above
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
      //uses the id from the added test mission to pass a req.params.id that can be used to find and update the mission
      params: { id: postedID }
    });
    const res = httpMocks.createResponse({ eventEmitter: require('events').EventEmitter });
    expect(res.statusCode).toBe(200)
    res.on('end', async () => {
      //checks that expected message was recieved from the controller after the test mission was updated
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
      //uses the id from the added test mission to pass a req.params.id that can be used to find and delete the mission
      params: { id: postedID }
    });
    const res = httpMocks.createResponse({ eventEmitter: require('events').EventEmitter });
    expect(res.statusCode).toBe(200)
    res.on('end', async () => {
      //checks that expected message was recieved from the controller after the test mission was deleted
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