import React from 'react';
import { render, fireEvent, screen, wait } from '@testing-library/react';
import ViewFeedback from '../Components/ViewFeedback'
import { BrowserRouter } from 'react-router-dom'
import feedbackService from '../services/feedback.service'

jest.mock('../services/feedback.service');

describe("View Feedback", () => {

    beforeEach(() => {
        feedbackService.getFeedback.mockImplementationOnce(() =>
            Promise.resolve({
                data: [
                    { _id: "5fa5518cc542ae113a3259d8", firstName: "Luke", lastName: "Skywalker", squadron: "sst", phone: "1111111111", email: "sst@sst.com", feedbackType: "comment", urgency: "high", feedback: "this is a test comment" },
                    { _id: "5fa551adc542ae113a3259d9", firstName: "sst", lastName: "sst", squadron: "sst", phone: "1111111111", email: "sst@sst.com", feedbackType: "error", urgency: "low", feedback: "This is a test error" }
                ]
            })
        );
    })

    test("View Feedback", async () => {
        //renders the component
        render(
            <BrowserRouter>
                <ViewFeedback />
            </BrowserRouter>);
        //checks to see if the axios requst happened on component render (useEffect)
        expect(feedbackService.getFeedback).toHaveBeenCalledTimes(1)
        //check that the two expected items rendered in the feedback list
        const feedbacklist = await screen.findAllByRole('listitem');
        expect(feedbacklist).toHaveLength(2);
        //simulate clicking on one of the list items
        fireEvent.click(screen.queryByText('Skywalker, Luke'))
        //check that the feedback detail view rendered by looking for expected text
        const feedbacklabel = await expect(screen.getByText(/Feedback Type:/i)).toBeInTheDocument()
        const feedbacktext = await expect(screen.getByText(/this is a test comment/i)).toBeInTheDocument()
        //simulate clicking the delete button
        fireEvent.click(screen.queryByText('Delete'))
    });
});