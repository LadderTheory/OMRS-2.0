import React from 'react';
import { render, fireEvent, screen, wait } from '@testing-library/react';
import DataManagement from '../Components/DataManagement2'
import { BrowserRouter } from 'react-router-dom'
import ParameterService from "../services/Parameter.service";

jest.mock('../services/Parameter.service');

describe("Data Management", () => {
    test("Data Management - Squadron", async () => {
        //renders the component
        render(
            <BrowserRouter>
                <DataManagement />
            </BrowserRouter>);
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
        fireEvent.click(screen.queryByText('Squadron'))
        //checks to see if the axios requst happened on button click (useEffect)
        expect(ParameterService.retrieveSquadrons).toHaveBeenCalledTimes(1)
        //check that the two expected items rendered in the feedback list
        await wait(() => expect(screen.getByText(/Havoc/i)).toBeInTheDocument())
        await wait(() => expect(screen.getByText(/Vengeance/i)).toBeInTheDocument())
        fireEvent.click(screen.queryByText('Havoc'))
        //finds the input
        const editsquadron = await screen.queryByLabelText('New Parameter Name:')
        //simulate changing the value of the input
        fireEvent.change(editsquadron, { target: { value: 'Vortex' } })
        //check to see that the value of the input was actually changed
        expect(editsquadron.value).toBe('Vortex');
        ParameterService.updateSquadrons.mockImplementationOnce(() =>
            Promise.resolve({
                data: 'Save Successful'
            })
        );
        //simulate clicking the edit Button
        fireEvent.click(screen.queryByText('Edit'))
        expect(ParameterService.updateSquadrons).toHaveBeenCalledTimes(1)
        await wait(() => expect(screen.getByText(/Item Successfully Edited/i)).toBeInTheDocument())
        ParameterService.retrieveSquadrons.mockImplementationOnce(() =>
            Promise.resolve({
                data: [
                    {
                        _id: '1',
                        name: 'Vortex',
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
        fireEvent.click(screen.queryByText('Squadron'))
        await wait(() => expect(ParameterService.retrieveSquadrons).toHaveBeenCalledTimes(2))
        fireEvent.click(screen.queryByText('Vortex'))
        ParameterService.deactivateSquadrons.mockImplementationOnce(() =>
            Promise.resolve({
                data: 'Deactivate Successful'
            })
        );
        fireEvent.click(screen.queryByText('Toggle Active Parameter'))
        expect(ParameterService.deactivateSquadrons).toHaveBeenCalledTimes(1)
        await wait(() => expect(screen.getByText(/Item Successfully Edited/i)).toBeInTheDocument())
        ParameterService.retrieveSquadrons.mockImplementationOnce(() =>
            Promise.resolve({
                data: [
                    {
                        _id: '1',
                        name: 'Vortex',
                        active: false
                    },
                    {
                        _id: '2',
                        name: 'Vengeance',
                        active: true
                    }
                ]
            })
        );
        fireEvent.click(screen.queryByText('Squadron'))
        await wait(() => expect(ParameterService.retrieveSquadrons).toHaveBeenCalledTimes(3))
        fireEvent.click(screen.queryByText(/Vortex/))
        fireEvent.click(screen.queryByText('Cancel'))
    });

    test("Data Management - Base", async () => {
        //renders the component
        render(
            <BrowserRouter>
                <DataManagement />
            </BrowserRouter>);
        ParameterService.retrieveBases.mockImplementationOnce(() =>
            Promise.resolve({
                data: [
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
            })
        );
        fireEvent.click(screen.queryByText('Base'))
        //checks to see if the axios requst happened on button click (useEffect)
        expect(ParameterService.retrieveBases).toHaveBeenCalledTimes(1)
        //check that the two expected items rendered in the feedback list
        await wait(() => expect(screen.getByText(/Hoth/i)).toBeInTheDocument())
        await wait(() => expect(screen.getByText(/Endor/i)).toBeInTheDocument())
        fireEvent.click(screen.queryByText('Hoth'))
        //finds the input
        const editbase = await screen.queryByLabelText('New Parameter Name:')
        //simulate changing the value of the input
        fireEvent.change(editbase, { target: { value: 'Yavin IV' } })
        //check to see that the value of the input was actually changed
        expect(editbase.value).toBe('Yavin IV');
        ParameterService.updateBases.mockImplementationOnce(() =>
            Promise.resolve({
                data: 'Save Successful'
            })
        );
        //simulate clicking the edit Button
        fireEvent.click(screen.queryByText('Edit'))
        expect(ParameterService.updateBases).toHaveBeenCalledTimes(1)
        await wait(() => expect(screen.getByText(/Item Successfully Edited/i)).toBeInTheDocument())
        ParameterService.retrieveBases.mockImplementationOnce(() =>
            Promise.resolve({
                data: [
                    {
                        _id: 1,
                        name: 'Yavin IV',
                        active: true
                    },
                    {
                        _id: 2,
                        name: 'Endor',
                        active: true
                    }
                ]
            })
        );
        fireEvent.click(screen.queryByText('Base'))
        await wait(() => expect(ParameterService.retrieveBases).toHaveBeenCalledTimes(2))
        fireEvent.click(screen.queryByText('Yavin IV'))
        ParameterService.deactivateBases.mockImplementationOnce(() =>
            Promise.resolve({
                data: 'Deactivate Successful'
            })
        );
        fireEvent.click(screen.queryByText('Toggle Active Parameter'))
        expect(ParameterService.deactivateBases).toHaveBeenCalledTimes(1)
        await wait(() => expect(screen.getByText(/Item Successfully Edited/i)).toBeInTheDocument())
        ParameterService.retrieveBases.mockImplementationOnce(() =>
            Promise.resolve({
                data: [
                    {
                        _id: 1,
                        name: 'Yavin IV',
                        active: false
                    },
                    {
                        _id: 2,
                        name: 'Endor',
                        active: true
                    }
                ]
            })
        );
        fireEvent.click(screen.queryByText('Base'))
        await wait(() => expect(ParameterService.retrieveBases).toHaveBeenCalledTimes(3))
        fireEvent.click(screen.queryByText(/Yavin IV/))
        fireEvent.click(screen.queryByText('Cancel'))
    });

    test("Data Management - Aircraft", async () => {
        //renders the component
        render(
            <BrowserRouter>
                <DataManagement />
            </BrowserRouter>);
        ParameterService.retrieveAircraft.mockImplementationOnce(() =>
            Promise.resolve({
                data: [
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
            })
        );
        fireEvent.click(screen.queryByText('Aircraft'))
        //checks to see if the axios requst happened on button click (useEffect)
        expect(ParameterService.retrieveAircraft).toHaveBeenCalledTimes(1)
        //check that the two expected items rendered in the feedback list
        await wait(() => expect(screen.getByText(/X-Wing/i)).toBeInTheDocument())
        await wait(() => expect(screen.getByText(/Y-Wing/i)).toBeInTheDocument())
        fireEvent.click(screen.queryByText('X-Wing'))
        //finds the input
        const editaircraft = await screen.queryByLabelText('New Parameter Name:')
        //simulate changing the value of the input
        fireEvent.change(editaircraft, { target: { value: 'B-Wing' } })
        //check to see that the value of the input was actually changed
        expect(editaircraft.value).toBe('B-Wing');
        ParameterService.updateAircraft.mockImplementationOnce(() =>
            Promise.resolve({
                data: 'Save Successful'
            })
        );
        //simulate clicking the edit Button
        fireEvent.click(screen.queryByText('Edit'))
        expect(ParameterService.updateAircraft).toHaveBeenCalledTimes(1)
        await wait(() => expect(screen.getByText(/Item Successfully Edited/i)).toBeInTheDocument())
        ParameterService.retrieveAircraft.mockImplementationOnce(() =>
            Promise.resolve({
                data: [
                    {
                        _id: 1,
                        name: 'B-Wing',
                        active: true
                    },
                    {
                        _id: 2,
                        name: 'Y-Wing',
                        active: true
                    }
                ]
            })
        );
        fireEvent.click(screen.queryByText('Aircraft'))
        await wait(() => expect(ParameterService.retrieveAircraft).toHaveBeenCalledTimes(2))
        fireEvent.click(screen.queryByText('B-Wing'))
        ParameterService.deactivateAircraft.mockImplementationOnce(() =>
            Promise.resolve({
                data: 'Deactivate Successful'
            })
        );
        fireEvent.click(screen.queryByText('Toggle Active Parameter'))
        expect(ParameterService.deactivateAircraft).toHaveBeenCalledTimes(1)
        await wait(() => expect(screen.getByText(/Item Successfully Edited/i)).toBeInTheDocument())
        ParameterService.retrieveAircraft.mockImplementationOnce(() =>
            Promise.resolve({
                data: [
                    {
                        _id: 1,
                        name: 'B-Wing',
                        active: false
                    },
                    {
                        _id: 2,
                        name: 'Y-Wing',
                        active: true
                    }
                ]
            })
        );
        fireEvent.click(screen.queryByText('Aircraft'))
        await wait(() => expect(ParameterService.retrieveAircraft).toHaveBeenCalledTimes(3))
        fireEvent.click(screen.queryByText(/B-Wing/))
        fireEvent.click(screen.queryByText('Cancel'))
    });

    test("Data Management - Mission Type", async () => {
        //renders the component
        render(
            <BrowserRouter>
                <DataManagement />
            </BrowserRouter>);
        ParameterService.retrieveMsnTypes.mockImplementationOnce(() =>
            Promise.resolve({
                data: [
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
            })
        );
        fireEvent.click(screen.queryByText('Mission Type'))
        //checks to see if the axios requst happened on button click (useEffect)
        expect(ParameterService.retrieveMsnTypes).toHaveBeenCalledTimes(1)
        //check that the two expected items rendered in the feedback list
        await wait(() => expect(screen.getByText(/Mission Type 1/i)).toBeInTheDocument())
        await wait(() => expect(screen.getByText(/Mission Type 2/i)).toBeInTheDocument())
        fireEvent.click(screen.queryByText('Mission Type 1'))
        //finds the input
        const editmsntype = await screen.queryByLabelText('New Parameter Name:')
        //simulate changing the value of the input
        fireEvent.change(editmsntype, { target: { value: 'Intercept' } })
        //check to see that the value of the input was actually changed
        expect(editmsntype.value).toBe('Intercept');
        ParameterService.updateMsnTypes.mockImplementationOnce(() =>
            Promise.resolve({
                data: 'Save Successful'
            })
        );
        //simulate clicking the edit Button
        fireEvent.click(screen.queryByText('Edit'))
        expect(ParameterService.updateMsnTypes).toHaveBeenCalledTimes(1)
        await wait(() => expect(screen.getByText(/Item Successfully Edited/i)).toBeInTheDocument())
        ParameterService.retrieveMsnTypes.mockImplementationOnce(() =>
            Promise.resolve({
                data: [
                    {
                        _id: 1,
                        name: 'Intercept',
                        active: true
                    },
                    {
                        _id: 2,
                        name: 'Mission Type 2',
                        active: true
                    }
                ]
            })
        );
        fireEvent.click(screen.queryByText('Mission Type'))
        await wait(() => expect(ParameterService.retrieveMsnTypes).toHaveBeenCalledTimes(2))
        fireEvent.click(screen.queryByText('Intercept'))
        ParameterService.deactivateMsnTypes.mockImplementationOnce(() =>
            Promise.resolve({
                data: 'Deactivate Successful'
            })
        );
        fireEvent.click(screen.queryByText('Toggle Active Parameter'))
        expect(ParameterService.deactivateMsnTypes).toHaveBeenCalledTimes(1)
        await wait(() => expect(screen.getByText(/Item Successfully Edited/i)).toBeInTheDocument())
        ParameterService.retrieveMsnTypes.mockImplementationOnce(() =>
            Promise.resolve({
                data: [
                    {
                        _id: 1,
                        name: 'Intercept',
                        active: false
                    },
                    {
                        _id: 2,
                        name: 'Mission Type 2',
                        active: true
                    }
                ]
            })
        );
        fireEvent.click(screen.queryByText('Mission Type'))
        await wait(() => expect(ParameterService.retrieveMsnTypes).toHaveBeenCalledTimes(3))
        fireEvent.click(screen.queryByText(/Intercept/))
        fireEvent.click(screen.queryByText('Cancel'))
    });

    test("Data Management - Channel", async () => {
        //renders the component
        render(
            <BrowserRouter>
                <DataManagement />
            </BrowserRouter>);
        ParameterService.retrieveChannels.mockImplementationOnce(() =>
            Promise.resolve({
                data: [
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
            })
        );
        fireEvent.click(screen.queryByText('Channel'))
        //checks to see if the axios requst happened on button click (useEffect)
        expect(ParameterService.retrieveChannels).toHaveBeenCalledTimes(1)
        //check that the two expected items rendered in the feedback list
        await wait(() => expect(screen.getByText(/Channel 1/i)).toBeInTheDocument())
        await wait(() => expect(screen.getByText(/Channel 2/i)).toBeInTheDocument())
        fireEvent.click(screen.queryByText('Channel 1'))
        //finds the input
        const editchannel = await screen.queryByLabelText('New Parameter Name:')
        //simulate changing the value of the input
        fireEvent.change(editchannel, { target: { value: 'Kessel Run' } })
        //check to see that the value of the input was actually changed
        expect(editchannel.value).toBe('Kessel Run');
        ParameterService.updateChannels.mockImplementationOnce(() =>
            Promise.resolve({
                data: 'Save Successful'
            })
        );
        //simulate clicking the edit Button
        fireEvent.click(screen.queryByText('Edit'))
        expect(ParameterService.updateChannels).toHaveBeenCalledTimes(1)
        await wait(() => expect(screen.getByText(/Item Successfully Edited/i)).toBeInTheDocument())
        ParameterService.retrieveChannels.mockImplementationOnce(() =>
            Promise.resolve({
                data: [
                    {
                        _id: 1,
                        name: 'Kessel Run',
                        active: true
                    },
                    {
                        _id: 2,
                        name: 'Channel 2',
                        active: true
                    }
                ]
            })
        );
        fireEvent.click(screen.queryByText('Channel'))
        await wait(() => expect(ParameterService.retrieveChannels).toHaveBeenCalledTimes(2))
        fireEvent.click(screen.queryByText('Kessel Run'))
        ParameterService.deactivateChannels.mockImplementationOnce(() =>
            Promise.resolve({
                data: 'Deactivate Successful'
            })
        );
        fireEvent.click(screen.queryByText('Toggle Active Parameter'))
        expect(ParameterService.deactivateChannels).toHaveBeenCalledTimes(1)
        await wait(() => expect(screen.getByText(/Item Successfully Edited/i)).toBeInTheDocument())
        ParameterService.retrieveChannels.mockImplementationOnce(() =>
            Promise.resolve({
                data: [
                    {
                        _id: 1,
                        name: 'Kessel Run',
                        active: false
                    },
                    {
                        _id: 2,
                        name: 'Channel 2',
                        active: true
                    }
                ]
            })
        );
        fireEvent.click(screen.queryByText('Channel'))
        await wait(() => expect(ParameterService.retrieveChannels).toHaveBeenCalledTimes(3))
        fireEvent.click(screen.queryByText(/Kessel Run/))
        fireEvent.click(screen.queryByText('Cancel'))
    });

    test("Data Management - Operation", async () => {
        //renders the component
        render(
            <BrowserRouter>
                <DataManagement />
            </BrowserRouter>);
        ParameterService.retrieveOperations.mockImplementationOnce(() =>
            Promise.resolve({
                data: [
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
            })
        );
        fireEvent.click(screen.queryByText('Operation'))
        //checks to see if the axios requst happened on button click (useEffect)
        expect(ParameterService.retrieveOperations).toHaveBeenCalledTimes(1)
        //check that the two expected items rendered in the feedback list
        await wait(() => expect(screen.getByText(/Operation 1/i)).toBeInTheDocument())
        await wait(() => expect(screen.getByText(/Operation 2/i)).toBeInTheDocument())
        fireEvent.click(screen.queryByText('Operation 1'))
        //finds the input
        const editoperation = await screen.queryByLabelText('New Parameter Name:')
        //simulate changing the value of the input
        fireEvent.change(editoperation, { target: { value: 'Operation 3' } })
        //check to see that the value of the input was actually changed
        expect(editoperation.value).toBe('Operation 3');
        ParameterService.updateOperations.mockImplementationOnce(() =>
            Promise.resolve({
                data: 'Save Successful'
            })
        );
        //simulate clicking the edit Button
        fireEvent.click(screen.queryByText('Edit'))
        expect(ParameterService.updateOperations).toHaveBeenCalledTimes(1)
        await wait(() => expect(screen.getByText(/Item Successfully Edited/i)).toBeInTheDocument())
        ParameterService.retrieveOperations.mockImplementationOnce(() =>
            Promise.resolve({
                data: [
                    {
                        _id: 1,
                        name: 'Operation 3',
                        active: true
                    },
                    {
                        _id: 2,
                        name: 'Operation 2',
                        active: true
                    }
                ]
            })
        );
        fireEvent.click(screen.queryByText('Operation'))
        await wait(() => expect(ParameterService.retrieveOperations).toHaveBeenCalledTimes(2))
        fireEvent.click(screen.queryByText('Operation 3'))
        ParameterService.deactivateOperations.mockImplementationOnce(() =>
            Promise.resolve({
                data: 'Deactivate Successful'
            })
        );
        fireEvent.click(screen.queryByText('Toggle Active Parameter'))
        expect(ParameterService.deactivateOperations).toHaveBeenCalledTimes(1)
        await wait(() => expect(screen.getByText(/Item Successfully Edited/i)).toBeInTheDocument())
        ParameterService.retrieveOperations.mockImplementationOnce(() =>
            Promise.resolve({
                data: [
                    {
                        _id: 1,
                        name: 'Operation 3',
                        active: false
                    },
                    {
                        _id: 2,
                        name: 'Operation 2',
                        active: true
                    }
                ]
            })
        );
        fireEvent.click(screen.queryByText('Operation'))
        await wait(() => expect(ParameterService.retrieveOperations).toHaveBeenCalledTimes(3))
        fireEvent.click(screen.queryByText(/Operation 3/))
        fireEvent.click(screen.queryByText('Cancel'))
    });

    test("Data Management - ICAO", async () => {
        //renders the component
        render(
            <BrowserRouter>
                <DataManagement />
            </BrowserRouter>);
        ParameterService.retrieveICAOs.mockImplementationOnce(() =>
            Promise.resolve({
                data: [
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
            })
        );
        fireEvent.click(screen.queryByText('ICAO Source/Dest'))
        //checks to see if the axios requst happened on button click (useEffect)
        expect(ParameterService.retrieveICAOs).toHaveBeenCalledTimes(1)
        //check that the two expected items rendered in the feedback list
        await wait(() => expect(screen.getByText(/AAAA/i)).toBeInTheDocument())
        await wait(() => expect(screen.getByText(/BBBB/i)).toBeInTheDocument())
        fireEvent.click(screen.queryByText('AAAA'))
        //finds the input
        const editicaos = await screen.queryByLabelText('New Parameter Name:')
        //simulate changing the value of the input
        fireEvent.change(editicaos, { target: { value: 'CCCC' } })
        //check to see that the value of the input was actually changed
        expect(editicaos.value).toBe('CCCC');
        ParameterService.updateICAO.mockImplementationOnce(() =>
            Promise.resolve({
                data: 'Save Successful'
            })
        );
        //simulate clicking the edit Button
        fireEvent.click(screen.queryByText('Edit'))
        expect(ParameterService.updateICAO).toHaveBeenCalledTimes(1)
        await wait(() => expect(screen.getByText(/Item Successfully Edited/i)).toBeInTheDocument())
        ParameterService.retrieveICAOs.mockImplementationOnce(() =>
            Promise.resolve({
                data: [
                    {
                        _id: 1,
                        name: 'CCCC',
                        active: true
                    },
                    {
                        _id: 2,
                        name: 'BBBB',
                        active: true
                    }
                ]
            })
        );
        fireEvent.click(screen.queryByText('ICAO Source/Dest'))
        await wait(() => expect(ParameterService.retrieveICAOs).toHaveBeenCalledTimes(2))
        fireEvent.click(screen.queryByText('CCCC'))
        ParameterService.deactivateICAO.mockImplementationOnce(() =>
            Promise.resolve({
                data: 'Deactivate Successful'
            })
        );
        fireEvent.click(screen.queryByText('Toggle Active Parameter'))
        expect(ParameterService.deactivateOperations).toHaveBeenCalledTimes(1)
        await wait(() => expect(screen.getByText(/Item Successfully Edited/i)).toBeInTheDocument())
        ParameterService.retrieveICAOs.mockImplementationOnce(() =>
            Promise.resolve({
                data: [
                    {
                        _id: 1,
                        name: 'CCCC',
                        active: false
                    },
                    {
                        _id: 2,
                        name: 'BBBB',
                        active: true
                    }
                ]
            })
        );
        fireEvent.click(screen.queryByText('ICAO Source/Dest'))
        await wait(() => expect(ParameterService.retrieveICAOs).toHaveBeenCalledTimes(3))
        fireEvent.click(screen.queryByText(/CCCC/))
        fireEvent.click(screen.queryByText('Cancel'))
    });
})


