import React from 'react';
import { render, fireEvent, screen, wait } from '@testing-library/react';
import Profile from '../Components/Profile'
import { BrowserRouter } from 'react-router-dom'
import AuthService from "../services/auth.service";
import UserService from "../services/users.service";

jest.mock('../services/auth.service');
jest.mock('../services/users.service');

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

describe("Mission List", () => {
    beforeEach(() => {
        AuthService.getCurrentUser.mockImplementationOnce(() => currentUser )
        UserService.getUserByID.mockImplementationOnce(() =>
            Promise.resolve({
                data: {
                    id:"5fbbbad97ac63d28906f22f0",
                    username:"sst2",
                    email:"sst2@sst.com",
                    firstName:"sst2",
                    lastName:"sst2",
                    phone:"1111111111",
                    squadron:{_id:"5fb686a9c42e6d7281524ead",name:"Gold",active:true},
                    roles:[{_id:"5f68f299cd7761287a0945aa",name:"user"}],
                    active:true}                   
            })
        );
    })

    test("Profile", async () => {
        //renders the component
        render(
        <BrowserRouter>
            <Profile />
        </BrowserRouter>);
    });
});