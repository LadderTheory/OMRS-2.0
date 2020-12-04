import React from 'react';
import { render, fireEvent, screen, wait } from '@testing-library/react';
import Register from '../Components/Register'
import { BrowserRouter } from 'react-router-dom'
import AuthService from "../services/auth.service";
import authService from '../services/auth.service';

jest.mock('../services/auth.service')

describe("Register", () => {

    beforeEach(() => {
        AuthService.getSquadrons.mockImplementationOnce(() =>
            Promise.resolve({
                data: [
                    {
                        _id: '1',
                        name: 'Havoc',
                        active: true
                    },
                    {
                        _id: '2',
                        name: 'Vengeance',
                        active: true
                    }
                ]
            })
        );
    })

    test("Register", async () => {
        //renders the component
        render(
            <BrowserRouter>
                <Register />
            </BrowserRouter>);
        await wait(() => expect(AuthService.getSquadrons).toHaveBeenCalledTimes(1))
        //finds the input
        const username = screen.queryByTestId('username')
        //simulate changing the value of the input
        fireEvent.change(username, { target: { value: 'sst' } })
        //check to see that the value of the input was actually changed
        expect(username.value).toBe('sst');
        authService.register.mockImplementationOnce(() =>
            Promise.resolve({
                data: 'User registered'
            })        )
        fireEvent.click(screen.queryByText('Register'));
        await wait(() => expect(AuthService.register).toHaveBeenCalledTimes(1))
    });
});