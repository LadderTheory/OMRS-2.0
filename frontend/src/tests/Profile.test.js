import React from 'react';
import { render, fireEvent, screen, wait } from '@testing-library/react';
import Profile from '../Components/Profile'
import { BrowserRouter } from 'react-router-dom'
import AuthService from "../services/auth.service";

jest.mock('../services/auth.service');

const currentUser = {            
    email: "sst@sst.com",
    firstName: "sst",
    lastName: "sst",
    roles: ["USER", "ADMIN"],
    username: "sst"               
}

describe("Mission List", () => {
    beforeEach(() => {
        AuthService.getCurrentUser.mockImplementationOnce(() => currentUser )
    })

    test("Profile", async () => {
        //renders the component
        render(
        <BrowserRouter>
            <Profile />
        </BrowserRouter>);
    });
});