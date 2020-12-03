import React from 'react';
import { render, fireEvent, screen, wait } from '@testing-library/react';
import About from '../Components/About'
import { BrowserRouter } from 'react-router-dom'

describe("About", () => {

    test("About", async () => {
        //renders the component
        render(
            <BrowserRouter>
                <About />
            </BrowserRouter>);
        //simulates clicking on each About section button and then checking to see that the expected text was displayed.
        fireEvent.click(screen.queryByText('Creating Missions'))
        expect(screen.getByText(/This file will explain the process to create and save a mission/i)).toBeInTheDocument();
        fireEvent.click(screen.queryByText('Viewing Missions'))
        expect(screen.getByText(/This file will explain how to view and edit a created mission/i)).toBeInTheDocument();
        fireEvent.click(screen.queryByText('Mission Reports'))
        expect(screen.getByText(/This file will explain how to create and view mission reports/i)).toBeInTheDocument();
        fireEvent.click(screen.queryByText('Data Management'))
        expect(screen.getByText(/This file will explain the functions within Data Management. This function is restricted to Admins only/i)).toBeInTheDocument();
        fireEvent.click(screen.queryByText('User Management'))
        expect(screen.getByText(/This file will explain the functions within User Management. This function is restricted to Admins only/i)).toBeInTheDocument();
        fireEvent.click(screen.queryByText('View Feedback'))
        expect(screen.getByText(/This file will explain the process and functions to view user feedback. This function is restricted to Admins only/i)).toBeInTheDocument();
    });
});