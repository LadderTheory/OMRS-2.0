import React from 'react';
import { render, fireEvent, screen, wait } from '@testing-library/react';
import EditUser from '../Components/EditUser'
import { BrowserRouter } from 'react-router-dom'
import UserService from "../services/users.service";
import ParameterService from "../services/Parameter.service"

jest.mock('../services/users.service');
jest.mock('../services/Parameter.service')

describe("Edit User", () => {

    beforeEach(() => {
        UserService.getUserByID.mockImplementationOnce(() =>
            Promise.resolve({
                data: {
                    roles: [{ _id: "5f68f299cd7761287a0945aa", name: "user" }, { _id: "5f68f299cd7761287a0945ac", name: "admin" }],
                    _id: "5fbbba837ac63d28906f22ee",
                    username: "sst10",
                    email: "sst10@sst.com",
                    firstName: "sst",
                    lastName: "sst",
                    phone: "111-111-1111",
                    squadron: { _id: "5fb6869ec42e6d7281524eab", name: "RED", active: true },
                    active: true
                }
            })
        );
        ParameterService.retrieveSquadrons.mockImplementationOnce(() =>
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

    test("Edit User", async () => {
        //renders the component
        render(
            <BrowserRouter>
                <EditUser />
            </BrowserRouter>);
        //checks to see if the axios requst happened on component render (useEffect)
        await wait(() => expect(UserService.getUserByID).toHaveBeenCalledTimes(1))
        await wait(() => expect(ParameterService.retrieveSquadrons).toHaveBeenCalledTimes(1))
        //finds the input
        const username = screen.queryByLabelText('Username:')
        //check that the proper value was loaded from the axios call
        expect(username.value).toBe('sst10');
        //finds the input
        const firstname = screen.queryByLabelText('First Name:')
        //check that the proper value was loaded from the axios call
        expect(firstname.value).toBe('sst');
        //simulate changing the value of the input
        fireEvent.change(firstname, { target: { value: 'Luke' } })
        //check to see that the value of the input was actually changed
        expect(firstname.value).toBe('Luke');
        //finds the input
        const lastname = screen.queryByLabelText('Last Name:')
        //check that the proper value was loaded from the axios call
        expect(lastname.value).toBe('sst');
        //simulate changing the value of the input
        fireEvent.change(lastname, { target: { value: 'Skywalker' } })
        //check to see that the value of the input was actually changed
        expect(lastname.value).toBe('Skywalker');
        //finds the input
        const email = screen.queryByLabelText('Email:')
        //check that the proper value was loaded from the axios call
        expect(email.value).toBe('sst10@sst.com');
        //simulate changing the value of the input
        fireEvent.change(email, { target: { value: 'luke.skywalker@sst.com' } })
        //check to see that the value of the input was actually changed
        expect(email.value).toBe('luke.skywalker@sst.com');
        //finds the input
        const phone = screen.queryByLabelText('Phone:')
        //check that the proper value was loaded from the axios call
        expect(phone.value).toBe('111-111-1111');
        //simulate changing the value of the input
        fireEvent.change(phone, { target: { value: '222-222-2222' } })
        //check to see that the value of the input was actually changed
        expect(phone.value).toBe('222-222-2222');
        //finds the input
        const squadron = screen.queryByLabelText('Squadron:')
        //check that the proper value was loaded from the axios call
        //expect(squadron.value).toBe('5fb6869ec42e6d7281524eab');
        //simulate changing the value of the input
        //fireEvent.change(squadron, { target: { value: '5fb686a4c42e6d7281524eac' } })
        //check to see that the value of the input was actually changed
        //expect(squadron.value).toBe('5fb686a4c42e6d7281524eac');
        //finds the input
        const password = screen.queryByLabelText('Password:')
        //check that the proper value was loaded from the axios call
        expect(password.value).toBe('');
        //simulate changing the value of the input
        fireEvent.change(password, { target: { value: 'newpass' } })
        //check to see that the value of the input was actually changed
        expect(password.value).toBe('newpass');
        UserService.makeActive.mockImplementationOnce(() =>
            Promise.resolve({
                data: 'User active status toggled'
            })
        )
        fireEvent.click(screen.queryByText('Toggle Active'));
        //check that the axios request was called
        expect(UserService.makeActive).toHaveBeenCalledTimes(1)
        await wait(() => expect(screen.getByText(/User active status toggled/i)).toBeInTheDocument());
        UserService.makeAdmin.mockImplementationOnce(() =>
            Promise.resolve({
                data: 'User admin status toggled'
            })
        )
        fireEvent.click(screen.queryByText('Toggle Admin'));
        //check that the axios request was called
        expect(UserService.makeAdmin).toHaveBeenCalledTimes(1)
        await wait(() => expect(screen.getByText(/User admin status toggled/i)).toBeInTheDocument());
        UserService.updateUserInfo.mockImplementationOnce(() =>
            Promise.resolve({
                data: 'User info updated'
            })
        )
        fireEvent.click(screen.queryByText('Update'));
        //check that the axios request was called
        expect(UserService.updateUserInfo).toHaveBeenCalledTimes(1)
        await wait(() => expect(screen.getByText(/User info updated/i)).toBeInTheDocument());
    });

    test('Delete User', async () => {
        render(
            <BrowserRouter>
                <EditUser />
            </BrowserRouter>);
        UserService.deleteUser.mockImplementationOnce(() =>
            Promise.resolve({
                data: 'User deleted'
            })
        )
        fireEvent.click(screen.queryByText('Delete'));
        expect(UserService.deleteUser).toHaveBeenCalledTimes(1)
    });
});