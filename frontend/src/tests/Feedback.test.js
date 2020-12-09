import React from 'react';
import { render, fireEvent, screen, wait } from '@testing-library/react';
import Feedback from '../Components/UserFeedbackForm'
import { BrowserRouter } from 'react-router-dom'
import AuthService from '../services/auth.service';

jest.mock('../services/auth.service');

const currentUser = {            
    email: "sst@sst.com",
    firstName: "sst",
    lastName: "sst"              
}

describe("About", () => {
    beforeEach(() => {
        AuthService.getCurrentUser.mockImplementationOnce(() => currentUser )
    })

    test("About", async () => {
        //renders the component
        render(
            <BrowserRouter>
                <Feedback />
            </BrowserRouter>);   
            //check that the axios call was made
            await wait(() => expect(AuthService.getCurrentUser).toHaveBeenCalledTimes(1))   
            //check that expected text on the screen is displayed
            expect(screen.getByText('User Feedback')).toBeInTheDocument();
            //find the input associated with the label
            const feedbackType = screen.queryByLabelText('Type of Feedback')
            //change the value of the input
            fireEvent.change(feedbackType, { target: { value: 'comment' } })
            //confirm the input value was changed
            expect(feedbackType.value).toBe('comment');
            //simulte clickinig the submit button
            fireEvent.click(screen.queryByText('Submit Feedback'))
    });
});