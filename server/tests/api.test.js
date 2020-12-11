const controller = require('../controllers/feedback.controller');

describe('feedback', () => {
  test('get feedback', async () => {
    const feedback = { id: '1', username: 'sst' };
    const req = {}
    const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
    await controller.feedbackList(req, res)
    expect(res.status).toBeCalledWith(200);
  });
});