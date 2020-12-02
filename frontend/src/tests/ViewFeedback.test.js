import React from 'react';
import { render, fireEvent, screen, wait } from '@testing-library/react';
import ViewFeedback from '../Components/ViewFeedback'
import { BrowserRouter } from 'react-router-dom'
import feedbackService from '../services/feedback.service'

jest.mock('../services/feedback.service');


describe("View Feedback", () => {

    test("View Feedback", async () => {
        //renders the component
        render(
            <BrowserRouter>
                <ViewFeedback />
            </BrowserRouter>);   
    });
});