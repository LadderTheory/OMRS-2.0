import axios from 'axios';
import FeedbackService from '../services/feedback.service';

jest.mock('axios');

test('Get Missions', () => {
    const feedback = [
        {_id:"5fbeaa499e35854c5802de8e"},
        {_id:"5fbeaa499e35854c5802de8e"}
    ]

    const resp = { data: feedback};

    axios.get.mockImplementation(() => Promise.resolve(resp.data))

    return FeedbackService.getFeedback().then(data => expect(data).toEqual(feedback));
});

test('Create Feedback', () => {
    const message = 'Create Successful'

    const resp = { data: message };

    axios.post.mockImplementation(() => Promise.resolve(resp.data))

    return FeedbackService.addFeedback().then(data => expect(data).toEqual(message));
});

test('Delete Feedback', () => {
    const message = 'Delete Successful'

    const resp = { data: message };

    axios.delete.mockImplementation(() => Promise.resolve(resp.data))

    return FeedbackService.deleteFeedback().then(data => expect(data).toEqual(message));
});
