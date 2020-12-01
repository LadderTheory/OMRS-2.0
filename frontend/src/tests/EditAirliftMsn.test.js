import React from 'react';
import { render, fireEvent, screen, wait } from '@testing-library/react';
import MissionService from '../services/missions.service';
import EditAirliftMsn from '../Components/EditAirLiftMsn'
import { BrowserRouter } from 'react-router-dom'
import ParameterService from '../services/Parameter.service';

jest.mock('../services/missions.service');
jest.mock('../services/Parameter.service');

describe("Edit Mission", () => {
    beforeEach(() => {
        MissionService.getAirLiftMsnByID.mockImplementationOnce(() =>
            Promise.resolve({
                data: {
                    _id: '1',
                    msnNumber: '1001',
                    callSign: 'RED',
                    commander: 'Luke Skywalker',
                    squadron: { _id: '2', name: 'Havoc', active: true },
                    aircraft: { _id: '1' },
                    base: { _id: '1' },
                    date: '2020-11-09T00:00:00.000Z',
                    remarks: 'May the force be with you',
                    msnType: { _id: '1' },
                    channel: { _id: '1' },
                    commType: true,
                    operation: { _id: '1' },
                    legs: [
                        {
                            _id: '1',
                            legNumber: '1',
                            scheduledTakeOff: '1000',
                            actualTakeOff: '1000',
                            scheduledLand: '1100',
                            actualLand: '1100',
                            duration: '1',
                            passengerOn: '0',
                            passengerOff: '0',
                            passengerThru: '0',
                            cargoOn: '0',
                            cargoOff: '0',
                            cargoThru: '0',
                            palletOn: '0',
                            palletOff: '0',
                            palletThru: '0',
                            ICAOSource: '1',
                            ICAODest: '2',
                            remarks: 'Leg 1'
                        }, {
                            _id: '2',
                            legNumber: '2',
                            scheduledTakeOff: '1200',
                            actualTakeOff: '1200',
                            scheduledLand: '1300',
                            actualLand: '1300',
                            duration: '1',
                            passengerOn: '10',
                            passengerOff: '5',
                            passengerThru: '5',
                            cargoOn: '10',
                            cargoOff: '5',
                            cargoThru: '5',
                            palletOn: '10',
                            palletOff: '5',
                            palletThru: '5',
                            ICAOSource: '2',
                            ICAODest: '1',
                            remarks: 'Leg 2'
                        }
                    ]
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
                        name: 'Tie Fighter',
                        active: true
                    }
                ]
            })
        );
        ParameterService.retrieveOperations.mockImplementationOnce(() =>
            Promise.resolve({
                data: [
                    {
                        _id: 1,
                        name: 'Destroy Deathstar',
                        active: true
                    },
                    {
                        _id: 2,
                        name: 'Assault Rebel Base',
                        active: true
                    }
                ]
            })
        );
        ParameterService.retrieveBases.mockImplementationOnce(() =>
            Promise.resolve({
                data: [
                    {
                        _id: 1,
                        name: 'Hoth',
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
        ParameterService.retrieveMsnTypes.mockImplementationOnce(() =>
            Promise.resolve({
                data: [
                    {
                        _id: 1,
                        name: 'Mission Type 1',
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
        ParameterService.retrieveChannels.mockImplementationOnce(() =>
            Promise.resolve({
                data: [
                    {
                        _id: 1,
                        name: 'Channel 1',
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
    })

    test("Edit Mission", async () => {
        //renders the component
        render(
            <BrowserRouter>
                <EditAirliftMsn />
            </BrowserRouter>);
        //Checks that the data management types were retrieved
        expect(MissionService.getAirLiftMsnByID).toHaveBeenCalledTimes(1)
        expect(ParameterService.retrieveSquadrons).toHaveBeenCalledTimes(1)
        expect(ParameterService.retrieveAircraft).toHaveBeenCalledTimes(1)
        expect(ParameterService.retrieveBases).toHaveBeenCalledTimes(1)
        expect(ParameterService.retrieveMsnTypes).toHaveBeenCalledTimes(1)
        expect(ParameterService.retrieveOperations).toHaveBeenCalledTimes(1)
        expect(ParameterService.retrieveChannels).toHaveBeenCalledTimes(1)
        await wait(() => expect(ParameterService.retrieveICAOs).toHaveBeenCalledTimes(2))
        //finds the input
        const date = await screen.queryByLabelText('Mission Date')
        //check that the proper value was loaded from the axios call
        expect(date.value).toBe('2020-11-09');
        //simulate changing the value of the input
        fireEvent.change(date, { target: { value: '2020-11-30' } })
        //check to see that the value of the input was actually changed
        expect(date.value).toBe('2020-11-30');
        //finds the input
        const msnNum = await screen.queryByLabelText('Mission #')
        //check that the proper value was loaded from the axios call
        expect(msnNum.value).toBe('1001');
        //simulate changing the value of the input
        fireEvent.change(msnNum, { target: { value: '1002' } })
        //check to see that the value of the input was actually changed
        expect(msnNum.value).toBe('1002');
        //finds the input
        const callSign = await screen.queryByLabelText('Callsign')
        //check that the proper value was loaded from the axios call
        expect(callSign.value).toBe('RED');
        //simulate changing the value of the input
        fireEvent.change(callSign, { target: { value: 'GOLD' } })
        //check to see that the value of the input was actually changed
        expect(callSign.value).toBe('GOLD');
        //finds the input
        const squadron = await screen.queryByLabelText('Squadron')
        //check that the proper value was loaded from the axios call
        expect(squadron.value).toBe('2');
        //simulate changing the value of the input
        fireEvent.change(squadron, { target: { value: '1' } })
        //check to see that the value of the input was actually changed
        //expect(squadron.value).toBe('1');
        //finds the input
        const aircraft = await screen.queryByLabelText('Aircraft')
        //check that the proper value was loaded from the axios call
        expect(aircraft.value).toBe('1');
        //simulate changing the value of the input
        fireEvent.change(aircraft, { target: { value: '2' } })
        //check to see that the value of the input was actually changed
        //expect(aircraft.value).toBe('2');
        //finds the input
        const operation = await screen.queryByLabelText('Operation')
        //check that the proper value was loaded from the axios call
        expect(operation.value).toBe('1');
        //simulate changing the value of the input
        fireEvent.change(operation, { target: { value: '2' } })
        //check to see that the value of the input was actually changed
        //expect(operation.value).toBe('2');
        //finds the input
        const base = await screen.queryByLabelText('Base')
        //check that the proper value was loaded from the axios call
        expect(base.value).toBe('1');
        //simulate changing the value of the input
        fireEvent.change(base, { target: { value: '2' } })
        //check to see that the value of the input was actually changed
        //expect(base.value).toBe('2');
        //finds the input
        const msnType = await screen.queryByLabelText('Mission Type')
        //check that the proper value was loaded from the axios call
        expect(msnType.value).toBe('1');
        //simulate changing the value of the input
        fireEvent.change(msnType, { target: { value: '2' } })
        //check to see that the value of the input was actually changed
        //expect(msnType.value).toBe('2');
        //finds the input
        const channel = await screen.queryByLabelText('Channel Name')
        //check that the proper value was loaded from the axios call
        expect(channel.value).toBe('1');
        //simulate changing the value of the input
        fireEvent.change(channel, { target: { value: '2' } })
        //check to see that the value of the input was actually changed
        //expect(channel.value).toBe('2');
        //finds the input
        const commType = await screen.queryByLabelText('Commercial Type')
        //check that the proper value was loaded from the axios call
        expect(commType.checked).toBe(true);
        //simulate changing the value of the input
        fireEvent.change(commType, { target: { checked: false } })
        //check to see that the value of the input was actually changed
        expect(commType.checked).toBe(false);
        //simulate clicking on the New Leg button
        ParameterService.retrieveICAOs.mockImplementationOnce(() =>
            Promise.resolve({
                data: [
                    {
                        _id: 1,
                        name: 'AAAA',
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
        //simulate clicking the new leg button
        fireEvent.click(screen.queryByText('New Leg'));
        //since there are now three legs the ICAO parameters service should be called three times
        await wait(() => expect(ParameterService.retrieveICAOs).toHaveBeenCalledTimes(3))
        //Check to see that three leg components were rendered by looking for the leg 3 collapsable div text
        expect(screen.getByText('Leg 3')).toBeInTheDocument();
        //Simulate clicking the button to remove leg 2
        fireEvent.click(screen.queryByText('Remove Leg 2'));
        //Check that the leg 2 component was removed by checking to see that the text for the leg collapsable div is no longer on the page
        expect(screen.queryByText('Leg 2')).not.toBeInTheDocument();
        //simulate clicking the button to re-order the leg numbers
        fireEvent.click(screen.queryByText('Re-Order Legs'));
        //check that the legs were reordered properly by checking that leg 3 is no longer in the documents and leg 2 is now in the document
        await wait(() => expect(screen.queryByText('Leg 3')).not.toBeInTheDocument());
        expect(screen.getByText('Leg 2')).toBeInTheDocument();
        //remove the second leg to prevent duplicates in the below leg tests
        fireEvent.click(screen.queryByText('Remove Leg 2'));
        //finds the input
        const actualTO = await screen.queryByPlaceholderText('Actual Take Off')
        //check that the proper value was loaded from the axios call
        expect(actualTO.value).toBe('1000');
        //simulate changing the value of the input
        fireEvent.change(actualTO, { target: { value: '1001' } })
        //check to see that the value of the input was actually changed
        expect(actualTO.value).toBe('1001');
        //finds the input
        const actualLand = await screen.queryByPlaceholderText('Actual Land')
        //check that the proper value was loaded from the axios call
        expect(actualLand.value).toBe('1100');
        //simulate changing the value of the input
        fireEvent.change(actualLand, { target: { value: '1101' } })
        //check to see that the value of the input was actually changed
        expect(actualLand.value).toBe('1101');
        //finds the input
        const duration = await screen.queryByPlaceholderText('Duration')
        //check that the proper value was loaded from the axios call
        expect(duration.value).toBe('1');
        //simulate the onFocus event of the input
        fireEvent.focus(duration)
        //check to see that the value of the input was actually changed
        expect(duration.value).toBe('1.00');
        //finds the input
        const passOn = await screen.queryByPlaceholderText('Passengers On')
        //check that the proper value was loaded from the axios call
        expect(passOn.value).toBe('0');
        //simulate changing the value of the input
        fireEvent.change(passOn, { target: { value: '10' } })
        //check to see that the value of the input was actually changed
        expect(passOn.value).toBe('10');
        //finds the input
        const passOff = await screen.queryByPlaceholderText('Passengers Off')
        //check that the proper value was loaded from the axios call
        expect(passOff.value).toBe('0');
        //simulate changing the value of the input
        fireEvent.change(passOff, { target: { value: '5' } })
        //check to see that the value of the input was actually changed
        expect(passOff.value).toBe('5');
        //finds the input
        const passThru = await screen.queryByPlaceholderText('Passengers Through')
        //check that the proper value was loaded from the axios call
        expect(passThru.value).toBe('0');
        //simulate the onFocus event of the input
        fireEvent.focus(passThru)
        //check to see that the value of the input was actually changed
        expect(passThru.value).toBe('5');
        //finds the input
        const cargoOn = await screen.queryByPlaceholderText('Cargo On')
        //check that the proper value was loaded from the axios call
        expect(cargoOn.value).toBe('0');
        //simulate changing the value of the input
        fireEvent.change(cargoOn, { target: { value: '10.501' } })
        fireEvent.blur(cargoOn)
        //check to see that the value of the input was actually changed
        expect(cargoOn.value).toBe('10.50');
        //finds the input
        const cargoOff = await screen.queryByPlaceholderText('Cargo Off')
        //check that the proper value was loaded from the axios call
        expect(cargoOff.value).toBe('0');
        //simulate changing the value of the input
        fireEvent.change(cargoOff, { target: { value: '5.251' } })
        fireEvent.blur(cargoOff)
        //check to see that the value of the input was actually changed
        expect(cargoOff.value).toBe('5.25');
        //finds the input
        const cargoThru = await screen.queryByPlaceholderText('Cargo Through')
        //check that the proper value was loaded from the axios call
        expect(cargoThru.value).toBe('0');
        //simulate the onFocus event of the input
        fireEvent.focus(cargoThru)
        //check to see that the value of the input was actually changed
        expect(cargoThru.value).toBe('5.25');
        //finds the input
        const palletOn = await screen.queryByPlaceholderText('Pallet On')
        //check that the proper value was loaded from the axios call
        expect(palletOn.value).toBe('0');
        //simulate changing the value of the input
        fireEvent.change(palletOn, { target: { value: '100' } })
        //check to see that the value of the input was actually changed
        expect(palletOn.value).toBe('100');
        //finds the input
        const palletOff = await screen.queryByPlaceholderText('Pallet Off')
        //check that the proper value was loaded from the axios call
        expect(palletOff.value).toBe('0');
        //simulate changing the value of the input
        fireEvent.change(palletOff, { target: { value: '25' } })
        //check to see that the value of the input was actually changed
        expect(palletOff.value).toBe('25');
        //finds the input
        const palletThru = await screen.queryByPlaceholderText('Pallets Through')
        //check that the proper value was loaded from the axios call
        expect(palletThru.value).toBe('0');
        //simulate the onFocus event of the input
        fireEvent.focus(palletThru)
        //check to see that the value of the input was actually changed
        expect(palletThru.value).toBe('75');
        //finds the input
        const ICAOsrc = await screen.queryByLabelText('ICAO Source')
        //check that the proper value was loaded from the axios call
        expect(ICAOsrc.value).toBe('1');
        //simulate changing the value of the input
        fireEvent.change(ICAOsrc, { target: { value: '2' } })
        //check to see that the value of the input was actually changed
        expect(ICAOsrc.value).toBe('2');
        //finds the input
        const ICAOdest = await screen.queryByLabelText('ICAO Destination')
        //check that the proper value was loaded from the axios call
        expect(ICAOdest.value).toBe('2');
        //simulate changing the value of the input
        fireEvent.change(ICAOdest, { target: { value: '1' } })
        //check to see that the value of the input was actually changed
        expect(ICAOdest.value).toBe('1');
        MissionService.updateAirliftMsn.mockImplementationOnce(() =>
            Promise.resolve({
                data: 'Save Successful'
            })
        );
        //simulate clicking the Save Mission Button
        fireEvent.click(screen.queryByText('Save Mission'));
        //check that the axios request for submitting a mission was called
        expect(MissionService.updateAirliftMsn).toHaveBeenCalledTimes(1)
        //check that the submit successful confirmation messsage and return to mission list button appear
        const returntButton = await expect(screen.queryByText('Return to Mission List'))
        expect(screen.getByText(/Save Successful/i)).toBeInTheDocument();
        //simulate clicking the return to mission list button
        fireEvent.click(screen.queryByText('Return to Mission List'));
    });

    test("Delete Mission", async () => {
        //renders the component
        render(
            <BrowserRouter>
                <EditAirliftMsn />
            </BrowserRouter>);
        //mock an axios call for delete mission
        MissionService.deleteMsn.mockImplementationOnce(() =>
            Promise.resolve({
                data: 'Delete Successful'
            })
        );
        //simulate clicking the delete button
        fireEvent.click(screen.queryByText('Delete Mission'));
        //check to see that the axios call for delete mission was called
        expect(MissionService.deleteMsn).toHaveBeenCalledTimes(1)
        //check that the delete successful confirmation messsage and return to mission list button appear
        const returntButton = await expect(screen.queryByText('Return to Mission List'))
        expect(screen.getByText(/Delete Successful/i)).toBeInTheDocument();
        //simulate clicking the return to mission list button
        fireEvent.click(screen.queryByText('Return to Mission List'));
    })
});