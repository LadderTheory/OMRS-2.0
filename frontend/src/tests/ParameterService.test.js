import axios from 'axios';
import ParameterService from '../services/Parameter.service';

jest.mock('axios');

test('Get Squadrons', () => {
    const squadrons = [
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
    ];

    const resp = { data: squadrons };

    axios.get.mockImplementation(() => Promise.resolve(resp.data))

    return ParameterService.retrieveSquadrons().then(data => expect(data).toEqual(squadrons));
});

test('Get Mission Types', () => {
    const msnTypes = [
        {
            _id: '1',
            name: 'Mission Type 1',
            active: true
        },
        {
            _id: '2',
            name: 'Mission Type 2',
            active: true
        }
    ]

    const resp = { data: msnTypes };

    axios.get.mockImplementation(() => Promise.resolve(resp.data))

    return ParameterService.retrieveMsnTypes().then(data => expect(data).toEqual(msnTypes));
});

test('Get Operations', () => {
    const operations = [
        {
            _id: '1',
            name: 'Operation 1',
            active: true
        },
        {
            _id: '2',
            name: 'Operation 2',
            active: true
        }
    ]

    const resp = { data: operations };

    axios.get.mockImplementation(() => Promise.resolve(resp.data))

    return ParameterService.retrieveOperations().then(data => expect(data).toEqual(operations));
});

test('Get Channels', () => {
    const channels = [
        {
            _id: '1',
            name: 'Channel 1',
            active: true
        },
        {
            _id: '2',
            name: 'Channel 2',
            active: true
        }
    ]

    const resp = { data: channels };

    axios.get.mockImplementation(() => Promise.resolve(resp.data))

    return ParameterService.retrieveChannels().then(data => expect(data).toEqual(channels));
});

test('Get Bases', () => {
    const bases = [
        {
            _id: '1',
            name: 'Hoth',
            active: true
        },
        {
            _id: '2',
            name: 'Endor',
            active: true
        }
    ]

    const resp = { data: bases };

    axios.get.mockImplementation(() => Promise.resolve(resp.data))

    return ParameterService.retrieveBases().then(data => expect(data).toEqual(bases));
});

test('Get Aircraft', () => {
    const aircraft = [
        {
            _id: '1',
            name: 'X-Wing',
            active: true
        },
        {
            _id: '2',
            name: 'Y-Wing',
            active: true
        }
    ]

    const resp = { data: aircraft };

    axios.get.mockImplementation(() => Promise.resolve(resp.data))

    return ParameterService.retrieveAircraft().then(data => expect(data).toEqual(aircraft));
});

test('Get ICAOs', () => {
    const icaos = [
        {
            _id: '1',
            name: 'AAAA',
            active: true
        },
        {
            _id: '2',
            name: 'BBBB',
            active: true
        }
    ]

    const resp = { data: icaos };

    axios.get.mockImplementation(() => Promise.resolve(resp.data))

    return ParameterService.retrieveICAOs().then(data => expect(data).toEqual(icaos));
});

test('Update Squadrons', () => {
    const message = 'Update Successful'

    const resp = { data: message };

    axios.patch.mockImplementation(() => Promise.resolve(resp.data))

    return ParameterService.updateSquadrons().then(data => expect(data).toEqual(message));
});

test('Update Mission Types', () => {
    const message = 'Update Successful'

    const resp = { data: message };

    axios.patch.mockImplementation(() => Promise.resolve(resp.data))

    return ParameterService.updateMsnTypes().then(data => expect(data).toEqual(message));
});

test('Update Operations', () => {
    const message = 'Update Successful'

    const resp = { data: message };

    axios.patch.mockImplementation(() => Promise.resolve(resp.data))

    return ParameterService.updateOperations().then(data => expect(data).toEqual(message));
});

test('Update Channels', () => {
    const message = 'Update Successful'

    const resp = { data: message };

    axios.patch.mockImplementation(() => Promise.resolve(resp.data))

    return ParameterService.updateChannels().then(data => expect(data).toEqual(message));
});

test('Update Bases', () => {
    const message = 'Update Successful'

    const resp = { data: message };

    axios.patch.mockImplementation(() => Promise.resolve(resp.data))

    return ParameterService.updateBases().then(data => expect(data).toEqual(message));
});

test('Update Aircraft', () => {
    const message = 'Update Successful'

    const resp = { data: message };

    axios.patch.mockImplementation(() => Promise.resolve(resp.data))

    return ParameterService.updateAircraft().then(data => expect(data).toEqual(message));
});

test('Update ICAOs', () => {
    const message = 'Update Successful'

    const resp = { data: message };

    axios.patch.mockImplementation(() => Promise.resolve(resp.data))

    return ParameterService.updateICAO().then(data => expect(data).toEqual(message));
});

test('Delete Squadrons', () => {
    const message = 'Delete Successful'

    const resp = { data: message };

    axios.delete.mockImplementation(() => Promise.resolve(resp.data))

    return ParameterService.deleteSquadrons().then(data => expect(data).toEqual(message));
});

test('Delete Mission Types', () => {
    const message = 'Delete Successful'

    const resp = { data: message };

    axios.delete.mockImplementation(() => Promise.resolve(resp.data))

    return ParameterService.deleteMsnTypes().then(data => expect(data).toEqual(message));
});

test('Delete Channels', () => {
    const message = 'Delete Successful'

    const resp = { data: message };

    axios.delete.mockImplementation(() => Promise.resolve(resp.data))

    return ParameterService.deleteChannels().then(data => expect(data).toEqual(message));
});

test('Delete Bases', () => {
    const message = 'Delete Successful'

    const resp = { data: message };

    axios.delete.mockImplementation(() => Promise.resolve(resp.data))

    return ParameterService.deleteBases().then(data => expect(data).toEqual(message));
});

test('Delete Operations', () => {
    const message = 'Delete Successful'

    const resp = { data: message };

    axios.delete.mockImplementation(() => Promise.resolve(resp.data))

    return ParameterService.deleteOperations().then(data => expect(data).toEqual(message));
});

test('Delete Aircraft', () => {
    const message = 'Delete Successful'

    const resp = { data: message };

    axios.delete.mockImplementation(() => Promise.resolve(resp.data))

    return ParameterService.deleteAircraft().then(data => expect(data).toEqual(message));
});

test('Delete ICAOs', () => {
    const message = 'Delete Successful'

    const resp = { data: message };

    axios.delete.mockImplementation(() => Promise.resolve(resp.data))

    return ParameterService.deleteICAO().then(data => expect(data).toEqual(message));
});

test('Create Squadron', () => {
    const message = 'Create Successful'

    const resp = { data: message };

    axios.post.mockImplementation(() => Promise.resolve(resp.data))

    return ParameterService.createSquadrons().then(data => expect(data).toEqual(message));
});

test('Create Mission Type', () => {
    const message = 'Create Successful'

    const resp = { data: message };

    axios.post.mockImplementation(() => Promise.resolve(resp.data))

    return ParameterService.createMsnTypes().then(data => expect(data).toEqual(message));
});

test('Create Operation', () => {
    const message = 'Create Successful'

    const resp = { data: message };

    axios.post.mockImplementation(() => Promise.resolve(resp.data))

    return ParameterService.createOperations().then(data => expect(data).toEqual(message));
});

test('Create Base', () => {
    const message = 'Create Successful'

    const resp = { data: message };

    axios.post.mockImplementation(() => Promise.resolve(resp.data))

    return ParameterService.createBases().then(data => expect(data).toEqual(message));
});

test('Create Channel', () => {
    const message = 'Create Successful'

    const resp = { data: message };

    axios.post.mockImplementation(() => Promise.resolve(resp.data))

    return ParameterService.createChannels().then(data => expect(data).toEqual(message));
});

test('Create Aircraft', () => {
    const message = 'Create Successful'

    const resp = { data: message };

    axios.post.mockImplementation(() => Promise.resolve(resp.data))

    return ParameterService.createAircraft().then(data => expect(data).toEqual(message));
});

test('Create ICAO', () => {
    const message = 'Create Successful'

    const resp = { data: message };

    axios.post.mockImplementation(() => Promise.resolve(resp.data))

    return ParameterService.createICAO().then(data => expect(data).toEqual(message));
});

test('Deactivate Squadrons', () => {
    const message = 'Deactivate Successful'

    const resp = { data: message };

    axios.patch.mockImplementation(() => Promise.resolve(resp.data))

    return ParameterService.deactivateSquadrons().then(data => expect(data).toEqual(message));
});

test('Deactivate Mission Types', () => {
    const message = 'Deactivate Successful'

    const resp = { data: message };

    axios.patch.mockImplementation(() => Promise.resolve(resp.data))

    return ParameterService.deactivateMsnTypes().then(data => expect(data).toEqual(message));
});

test('Deactivate Operations', () => {
    const message = 'Deactivate Successful'

    const resp = { data: message };

    axios.patch.mockImplementation(() => Promise.resolve(resp.data))

    return ParameterService.deactivateOperations().then(data => expect(data).toEqual(message));
});

test('Deactivate Channels', () => {
    const message = 'Deactivate Successful'

    const resp = { data: message };

    axios.patch.mockImplementation(() => Promise.resolve(resp.data))

    return ParameterService.deactivateChannels().then(data => expect(data).toEqual(message));
});

test('Deactivate Bases', () => {
    const message = 'Deactivate Successful'

    const resp = { data: message };

    axios.patch.mockImplementation(() => Promise.resolve(resp.data))

    return ParameterService.deactivateBases().then(data => expect(data).toEqual(message));
});

test('Deactivate Aircraft', () => {
    const message = 'Deactivate Successful'

    const resp = { data: message };

    axios.patch.mockImplementation(() => Promise.resolve(resp.data))

    return ParameterService.deactivateAircraft().then(data => expect(data).toEqual(message));
});

test('Deactivate ICAOs', () => {
    const message = 'Deactivate Successful'

    const resp = { data: message };

    axios.patch.mockImplementation(() => Promise.resolve(resp.data))

    return ParameterService.deactivateICAO().then(data => expect(data).toEqual(message));
});