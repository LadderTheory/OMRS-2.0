import React from 'react';
import { render, fireEvent, screen, wait } from '@testing-library/react';
import UserManagement from '../Components/UserManagement'
import { BrowserRouter } from 'react-router-dom'
import UserService from "../services/users.service";

jest.mock('../services/users.service');

describe("User Management", () => {

    beforeEach(() => {
        UserService.getUsersList.mockImplementationOnce(() =>
            Promise.resolve({
                data: [
                    {roles:[{_id:"5f68f299cd7761287a0945aa",name:"user"},{_id:"5f68f299cd7761287a0945ac",name:"admin"}],_id:"5fbbba837ac63d28906f22ee",username:"sst10",email:"sst10@sst.com",firstName:"sst",lastName:"sst",phone:"111-111-1111",squadron:{_id:"5fb6869ec42e6d7281524eab",name:"RED",active:true},active:true},
                    {roles:[{_id:"5f68f299cd7761287a0945aa",name:"user"},{_id:"5f68f299cd7761287a0945ac",name:"admin"}],_id:"5fbbbad97ac63d28906f22f0",username:"sst9",email:"sst@sst.com",firstName:"sst",lastName:"sst",phone:"111-111-1111",squadron:{_id:"5fb686a4c42e6d7281524eac",name:"Blue",active:true},active:true}
                ]
            })
        );
    })

    test("View Feedback", async () => {
        //renders the component
        render(
            <BrowserRouter>
                <UserManagement />
            </BrowserRouter>);
        //checks to see if the axios requst happened on component render (useEffect)
        expect(UserService.getUsersList).toHaveBeenCalledTimes(1)
        await wait(() => expect(screen.getByText(/sst10/i)).toBeInTheDocument());
        await wait(() => expect(screen.getByText(/sst9/i)).toBeInTheDocument());
        fireEvent.click(screen.queryByText('sst10'));
        fireEvent.click(screen.queryByText('Edit'));
    });
});