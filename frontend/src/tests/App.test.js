import React from 'react';
import { render, fireEvent, screen, wait } from '@testing-library/react';
import App from '../App'
import { BrowserRouter } from 'react-router-dom'
import AuthService from '../services/auth.service';

jest.mock('../services/auth.service');

const currentUser = {            
    accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmYmJiYWQ5N2FjNjNkMjg5MDZmMjJmMCIsImlhdCI6MTYwNjczOTQ0NiwiZXhwIjoxNjA2ODI1ODQ2fQ.YOWJRiClPMrrPHZAN0K7UzN8Oo0uBHagKv91xkZA7M0",
    email: "sst@sst.com",
    firstName: "sst",
    id: "5fbbbad97ac63d28906f22f0",
    lastName: "sst",
    phone: "111-111-1111",
    roles: ["USER", "ADMIN"],
    squadron: { _id: "5fb686a4c42e6d7281524eac", name: "Blue", active: true, __v: 0 },
    username: "sst"               
}

describe("App", () => {
    beforeEach(() => {
        AuthService.getCurrentUser.mockImplementationOnce(() => currentUser )
    })

    test("App", async () => {
        //renders the component
        render(
            <BrowserRouter>
                <App />
            </BrowserRouter>);
            await wait(() => expect(AuthService.getCurrentUser).toHaveBeenCalledTimes(1))
            fireEvent.click(screen.queryByText('Missions'))
            fireEvent.click(screen.queryByText('LogOut'))
    });
});