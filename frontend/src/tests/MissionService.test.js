import axios from 'axios';
import MissionService from '../services/missions.service';
import axiosInstance from './auth-header';

jest.mock('./auth-header');

test('Get Missions', () => {
    const missions = [
        {_id:"5fbeaa499e35854c5802de8e"},
        {_id:"5fbeaa499e35854c5802de8e"}
    ]

    const resp = { data: missions };

    axiosInstance.get.mockImplementation(() => Promise.resolve(resp.data))

    return MissionService.getAirLiftMsns().then(data => expect(data).toEqual(missions));
});

test('Get Missions By ID', () => {
    const mission = {_id:"5fbeaa499e35854c5802de8e"}

    const resp = { data: mission };

    axiosInstance.get.mockImplementation(() => Promise.resolve(resp.data))

    return MissionService.getAirLiftMsnByID().then(data => expect(data).toEqual(mission));
});

test('Get Missions By Mission Number', () => {
    const mission = {_id:"5fbeaa499e35854c5802de8e"}

    const resp = { data: mission };

    axiosInstance.get.mockImplementation(() => Promise.resolve(resp.data))

    return MissionService.findByMsnNum().then(data => expect(data).toEqual(mission));
});

test('Get Missions By Squadron', () => {
    const mission = [{_id:"5fbeaa499e35854c5802de8e"}]

    const resp = { data: mission };

    axiosInstance.get.mockImplementation(() => Promise.resolve(resp.data))

    return MissionService.findBySquadron().then(data => expect(data).toEqual(mission));
});

test('Get Missions By Filter', () => {
    const mission = [{_id:"5fbeaa499e35854c5802de8e"}]

    const resp = { data: mission };

    axiosInstance.post.mockImplementation(() => Promise.resolve(resp.data))

    return MissionService.findByFilter().then(data => expect(data).toEqual(mission));
});

test('Get Missions By Parameter', () => {
    const mission = [{_id:"5fbeaa499e35854c5802de8e"}]

    const resp = { data: mission };

    axiosInstance.post.mockImplementation(() => Promise.resolve(resp.data))

    return MissionService.findByParameters().then(data => expect(data).toEqual(mission));
});

test('Update Mission', () => {
    const message = 'Update Successful'

    const resp = { data: message };

    axiosInstance.patch.mockImplementation(() => Promise.resolve(resp.data))

    return MissionService.updateAirliftMsn().then(data => expect(data).toEqual(message));
});

test('Create Mission', () => {
    const message = 'Create Successful'

    const resp = { data: message };

    axiosInstance.post.mockImplementation(() => Promise.resolve(resp.data))

    return MissionService.addAirLiftMsn().then(data => expect(data).toEqual(message));
});

test('Delete Mission', () => {
    const message = 'Delete Successful'

    const resp = { data: message };

    axiosInstance.delete.mockImplementation(() => Promise.resolve(resp.data))

    return MissionService.deleteMsn().then(data => expect(data).toEqual(message));
});
