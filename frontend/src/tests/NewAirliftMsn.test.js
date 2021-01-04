import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import MissionService from '../services/missions.service'
import NewAirliftMsn from '../Components/NewAirLiftMsn'
import { BrowserRouter } from 'react-router-dom'
import ParameterService from '../services/Parameter.service';

jest.mock('../services/missions.service');
jest.mock('../services/Parameter.service');

describe("New Mission", () => {
    beforeEach(() => {
        ParameterService.retrieveSquadrons.mockImplementationOnce(() =>
            Promise.resolve({
                data: [
                    {
                        _id: 1,
                        name: 'Havoc',
                        active: true
                    },
                    {
                        _id: 2,
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
                        _id: 1,
                        name: 'X-Wing',
                        active: true
                    },
                    {
                        _id: 2,
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
    })

    test("New Mission Form", async () => {
        //renders the component
        render(
            <BrowserRouter>
                <NewAirliftMsn />
            </BrowserRouter>);
        //Checks that the data management types were retrieved
        expect(ParameterService.retrieveSquadrons).toHaveBeenCalledTimes(1)
        expect(ParameterService.retrieveAircraft).toHaveBeenCalledTimes(1)
        expect(ParameterService.retrieveBases).toHaveBeenCalledTimes(1)
        expect(ParameterService.retrieveMsnTypes).toHaveBeenCalledTimes(1)
        expect(ParameterService.retrieveOperations).toHaveBeenCalledTimes(1)
        expect(ParameterService.retrieveChannels).toHaveBeenCalledTimes(1)
        //finds the input
        const date = await screen.queryByLabelText('Mission Date')
        //simulate changing the value of the input
        fireEvent.change(date, { target: { value: '2020-11-30' } })
        //check to see that the value of the input was actually changed
        expect(date.value).toBe('2020-11-30');
        //finds the input
        const msnNum = await screen.queryByLabelText('Mission #')
        //simulate changing the value of the input
        fireEvent.change(msnNum, { target: { value: '1001' } })
        //check to see that the value of the input was actually changed
        expect(msnNum.value).toBe('1001');
        //finds the input
        const callSign = await screen.queryByLabelText('Callsign')
        //simulate changing the value of the input
        fireEvent.change(callSign, { target: { value: 'RED' } })
        //check to see that the value of the input was actually changed
        expect(callSign.value).toBe('RED');
        //finds the input
        const squadron = await screen.queryByLabelText('Squadron')
        //simulate changing the value of the input
        fireEvent.change(squadron, { target: { value: '1' } })
        //check to see that the value of the input was actually changed
        expect(squadron.value).toBe('1');
        //finds the input
        const aircraft = await screen.queryByLabelText('Aircraft')
        //simulate changing the value of the input
        fireEvent.change(aircraft, { target: { value: '1' } })
        //check to see that the value of the input was actually changed
        expect(aircraft.value).toBe('1');
        //finds the input
        const operation = await screen.queryByLabelText('Operation')
        //simulate changing the value of the input
        fireEvent.change(operation, { target: { value: '1' } })
        //check to see that the value of the input was actually changed
        expect(operation.value).toBe('1');
        //finds the input
        const base = await screen.queryByLabelText('Base')
        //simulate changing the value of the input
        fireEvent.change(base, { target: { value: '1' } })
        //check to see that the value of the input was actually changed
        expect(base.value).toBe('1');
        //finds the input
        const msnType = await screen.queryByLabelText('Mission Type')
        //simulate changing the value of the input
        fireEvent.change(msnType, { target: { value: '1' } })
        //check to see that the value of the input was actually changed
        expect(msnType.value).toBe('1');
        //finds the input
        const channel = await screen.queryByLabelText('Channel Name')
        //simulate changing the value of the input
        fireEvent.change(channel, { target: { value: '1' } })
        //check to see that the value of the input was actually changed
        expect(channel.value).toBe('1');
        //finds the input
        const commType = await screen.queryByLabelText('Commercial Type')
        //simulate changing the value of the input
        fireEvent.change(commType, { target: { checked: true } })
        //check to see that the value of the input was actually changed
        expect(commType.checked).toBe(true);
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
        //simulate clicking the new leg button three times 
        fireEvent.click(screen.queryByText('New Leg'));
        fireEvent.click(screen.queryByText('New Leg'));
        fireEvent.click(screen.queryByText('New Leg'));
        //since there are three legs the ICAO parameters service should be called three times
        expect(ParameterService.retrieveICAOs).toHaveBeenCalledTimes(3)
        //Check to see that three leg components were rendered by looking for the leg 3 collapsable div text
        expect(screen.getByText('Leg 3')).toBeInTheDocument();
        //Simulate clicking the button to remove leg 2
        fireEvent.click(screen.queryByText('Remove Leg 2'));
        //Check that the leg 2 component was removed by checking to see that the text for the leg collapsable div is no longer on the page
        expect(screen.queryByText('Leg 2')).not.toBeInTheDocument();
        //simulate clicking the button to re-order the leg numbers
        fireEvent.click(screen.queryByText('Re-Order Legs'));
        //check that the legs were reordered properly by checking that leg 3 is no longer in the documents and leg 2 is now in the document
        expect(screen.queryByText('Leg 3')).not.toBeInTheDocument();
        expect(screen.getByText('Leg 2')).toBeInTheDocument();
        //remove the second leg to prevent duplicates in the below leg tests
        fireEvent.click(screen.queryByText('Remove Leg 2'));
        //finds the input
        const actualTO = await screen.queryByPlaceholderText('Actual Take Off')
        //simulate changing the value of the input
        fireEvent.change(actualTO, { target: { value: '1000' } })
        //check to see that the value of the input was actually changed
        expect(actualTO.value).toBe('1000');
        //finds the input
        const actualLand = await screen.queryByPlaceholderText('Actual Land')
        //simulate changing the value of the input
        fireEvent.change(actualLand, { target: { value: '1100' } })
        //check to see that the value of the input was actually changed
        expect(actualLand.value).toBe('1100');
        //finds the input
        const duration = await screen.queryByPlaceholderText('Duration')
        //simulate the onFocus event of the input
        fireEvent.focus(duration)
        //check to see that the value of the input was actually changed
        expect(duration.value).toBe('1.00');
        //finds the input
        const passOn = await screen.queryByPlaceholderText('Passengers On')
        //simulate changing the value of the input
        fireEvent.change(passOn, { target: { value: '10' } })
        //check to see that the value of the input was actually changed
        expect(passOn.value).toBe('10');
        //finds the input
        const passOff = await screen.queryByPlaceholderText('Passengers Off')
        //simulate changing the value of the input
        fireEvent.change(passOff, { target: { value: '5' } })
        //check to see that the value of the input was actually changed
        expect(passOff.value).toBe('5');
        //finds the input
        const passThru = await screen.queryByPlaceholderText('Passengers Through')
        //simulate the onFocus event of the input
        fireEvent.focus(passThru)
        //check to see that the value of the input was actually changed
        expect(passThru.value).toBe('5');
        //finds the input
        const cargoOn = await screen.queryByPlaceholderText('Cargo On')
        //simulate changing the value of the input
        fireEvent.change(cargoOn, { target: { value: '10.501' } })
        fireEvent.blur(cargoOn)
        //check to see that the value of the input was actually changed
        expect(cargoOn.value).toBe('10.50');
        //finds the input
        const cargoOff = await screen.queryByPlaceholderText('Cargo Off')
        //simulate changing the value of the input
        fireEvent.change(cargoOff, { target: { value: '5.251' } })
        fireEvent.blur(cargoOff)
        //check to see that the value of the input was actually changed
        expect(cargoOff.value).toBe('5.25');
        //finds the input
        const cargoThru = await screen.queryByPlaceholderText('Cargo Through')
        //simulate the onFocus event of the input
        fireEvent.focus(cargoThru)
        //check to see that the value of the input was actually changed
        expect(cargoThru.value).toBe('5.25');
        //finds the input
        const palletOn = await screen.queryByPlaceholderText('Pallet On')
        //simulate changing the value of the input
        fireEvent.change(palletOn, { target: { value: '100' } })
        //check to see that the value of the input was actually changed
        expect(palletOn.value).toBe('100');
        //finds the input
        const palletOff = await screen.queryByPlaceholderText('Pallet Off')
        //simulate changing the value of the input
        fireEvent.change(palletOff, { target: { value: '25' } })
        //check to see that the value of the input was actually changed
        expect(palletOff.value).toBe('25');
        //finds the input
        const palletThru = await screen.queryByPlaceholderText('Pallets Through')
        //simulate the onFocus event of the input
        fireEvent.focus(palletThru)
        //check to see that the value of the input was actually changed
        expect(palletThru.value).toBe('75');
        //finds the input
        const ICAOsrc = await screen.queryByLabelText('ICAO Source')
        //simulate changing the value of the input
        fireEvent.change(ICAOsrc, { target: { value: '1' } })
        //check to see that the value of the input was actually changed
        expect(ICAOsrc.value).toBe('1');
        //finds the input
        const ICAOdest = await screen.queryByLabelText('ICAO Destination')
        //simulate changing the value of the input
        fireEvent.change(ICAOdest, { target: { value: '2' } })
        //check to see that the value of the input was actually changed
        expect(ICAOdest.value).toBe('2');
        MissionService.addAirLiftMsn.mockImplementationOnce(() =>
            Promise.resolve({
                data: { message: 'Submit Successful' }
            })
        );
        //simulate clicking the Save Mission Button
        fireEvent.click(screen.queryByText('Save Mission'));
        //check that the axios request for submitting a mission was called
        expect(MissionService.addAirLiftMsn).toHaveBeenCalledTimes(1)
        //check that the submit successful confirmation messsage and rest form appear
        const resetButton = await expect(screen.queryByText('Add another New Mission'))
        expect(screen.getByText(/Submit Successful/i)).toBeInTheDocument();
        //simulate clicking the rest form button
        fireEvent.click(screen.queryByText('Add another New Mission'));
        //check that a new blank form has appeared
        expect(screen.getByText(/Mission Date/i)).toBeInTheDocument();
        //finds an input on the form and verifies that it has a blank value
        const date2 = await screen.queryByLabelText('Mission Date')
        expect(date2.value).toBe('');
    });
});