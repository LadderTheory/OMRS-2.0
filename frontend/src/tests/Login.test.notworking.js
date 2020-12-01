import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import AuthService from "../services/auth.service";
import Login from '../Components/Login';
import { BrowserRouter } from 'react-router-dom'

jest.mock('../services/auth.service');

describe("Mission List", () => {

    afterEach(() => {
        jest.clearAllMocks()
    })

    test("login form posts with proper input", async () => {
        render(<Login />);

        const username = await screen.findByLabelText('Username')

        fireEvent.change(username, { target: { value: 'sst' } })

        expect(username.value).toBe('sst')

        const password = await screen.findByLabelText('Password')

        fireEvent.change(password, { target: { value: 'password' } })

        expect(password.value).toBe('password')

        AuthService.login.mockImplementationOnce(() =>
            Promise.resolve({
                data: {
                    accessToken: "1234",
                    email: "sst@sst.com",
                    firstName: "sst",
                    id: "5fa952fe2b375ee8c5c1bfcd",
                    lastName: "sst",
                    phone: "1111111111",
                    roles: ["USER", "ADMIN"],
                    squadron: "Red",
                    username: "sst",
                }
            })
        );

        
        fireEvent.click(screen.getByTestId('login'));

        expect(AuthService.login).toHaveBeenCalledTimes(1)
    });
});