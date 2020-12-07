import axios from 'axios';
import UserService from '../services/users.service';

jest.mock('axios');

test('Get Users', () => {
    const users = [
        {_id:"1", username: 'sst'},
        {_id:"2", username: 'sst2'}
    ]

    const resp = { data: users };

    axios.get.mockImplementation(() => Promise.resolve(resp.data))

    return UserService.getUsersList().then(data => expect(data).toEqual(users));
});

test('Get User by ID', () => {
    const user = {_id:"1", username: 'sst'}   

    const resp = { data: user };

    axios.get.mockImplementation(() => Promise.resolve(resp.data))

    return UserService.getUserByID().then(data => expect(data).toEqual(user));
});

test('Update User', () => {
    const message = 'Update Successful'

    const resp = { data: message };

    axios.patch.mockImplementation(() => Promise.resolve(resp.data))

    return UserService.updateUserInfo().then(data => expect(data).toEqual(message));
});

test('Delete User', () => {
    const message = 'Delete Successful'

    const resp = { data: message };

    axios.delete.mockImplementation(() => Promise.resolve(resp.data))

    return UserService.deleteUser().then(data => expect(data).toEqual(message));
});

test('Make User Admin', () => {
    const message = 'Admin Status Toggled'

    const resp = { data: message };

    axios.get.mockImplementation(() => Promise.resolve(resp.data))

    return UserService.makeAdmin().then(data => expect(data).toEqual(message));
});

test('Make User Active', () => {
    const message = 'Active Status Toggled'

    const resp = { data: message };

    axios.get.mockImplementation(() => Promise.resolve(resp.data))

    return UserService.makeActive().then(data => expect(data).toEqual(message));
});