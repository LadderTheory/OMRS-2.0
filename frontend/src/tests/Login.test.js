import React from 'react';
import { render, fireEvent, screen, wait } from '@testing-library/react';
import AuthService from "../services/auth.service";
import Login from '../Components/Login';
import { BrowserRouter } from 'react-router-dom'

jest.mock('../services/auth.service');

describe("Mission List", () => {

    test("login form posts with proper input", async () => {
       //renders the component
       render(
        <BrowserRouter>
            <Login />
        </BrowserRouter>);

        const username = await screen.findByLabelText('Username')

        fireEvent.change(username, { target: { value: 'sst' } })

        expect(username.value).toBe('sst')

        const password = await screen.findByLabelText('Password')

        fireEvent.change(password, { target: { value: 'password' } })

        expect(password.value).toBe('password')
        AuthService.login.mockImplementationOnce(() =>
            Promise.resolve({
                data: 'User logged in'
            }))
        fireEvent.click(screen.queryByText('Login'));
        await wait(() => expect(AuthService.login).toHaveBeenCalledTimes(1))
    });
});