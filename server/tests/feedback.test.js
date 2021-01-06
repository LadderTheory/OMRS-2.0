//see the comments in mission.test.js file for a detailed explanation of the testing methodology for the middleware controllers
const unitUnderTest = require("../controllers/feedback.controller");
const httpMocks = require("node-mocks-http");
const db = require('../models/db.model');
require('dotenv').config();

describe('feedback', () => {
    beforeAll(() => {
        const dbconn = process.env.DB_CONN_TEST
        db.mongoose
            .connect(dbconn, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false,
                retryWrites: false
            })
    })
    afterAll(() => {
        db.mongoose.connection.dropCollection('feedbacks')
    })

    test("Post Feedback", done => {
        const req = httpMocks.createRequest({
            method: "POST",
            url: "/private/feedback",
            headers: {},
            body: { firstName: "sst", lastName: "sst", squadron: "sst", phone: "1111111111", email: "sst@sst.com", feedbackType: "error", urgency: "medium", feedback: "This came from a jest test" }
        });
        const res = httpMocks.createResponse({ eventEmitter: require('events').EventEmitter });

        expect(res.statusCode).toBe(200)
        res.on('end', () => {
            expect(res._getData()).toBe("Feedback Submitted")
            done();
        });
        res.on('send', () => {
            expect(res._getData()).toBe("Feedback Submitted")
            done()
        });
        unitUnderTest.addFeedback(req, res);
    });

    test("Get feedback", async done => {
        const req = httpMocks.createRequest({
            method: "GET",
            url: "/private/feedback",
            headers: {
            },
            body: {}
        });
        const res = httpMocks.createResponse({ eventEmitter: require('events').EventEmitter });
        expect(res.statusCode).toBe(200)
        res.on('end', async () => {
            done();
        });
        res.on('send', async () => {
            done()
        });
        unitUnderTest.feedbackList(req, res);
    })
    test("Delete feedback", async done => {
        const req = httpMocks.createRequest({
            method: "DELETE",
            url: "/private/feedback/123456789012345678901234",
            headers: {
            },
            body: {},
            params: { id: '123456789012345678901234' }
        });
        const res = httpMocks.createResponse({ eventEmitter: require('events').EventEmitter });
        expect(res.statusCode).toBe(200)
        res.on('end', async () => {
            expect(res._getData()).toBe("Feedback Deleted")
            done();
        });
        res.on('send', async () => {
            expect(res._getData()).toBe("Feedback Deleted")
            done()
        });
        unitUnderTest.deleteFeedback(req, res);
    })
})