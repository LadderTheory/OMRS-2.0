import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import MissionService from '../services/missions.service'
import MissionList from '../Components/MissionList'
import { BrowserRouter } from 'react-router-dom'

jest.mock('../services/missions.service');

describe("Mission List", () => {
    beforeEach(() => {
        MissionService.findByFilter.mockImplementationOnce(() =>
            Promise.resolve({
                data: [
                    {
                        msnNumber: '1',
                        callSign: 'Red Leader',
                        commander: 'Luke Skywalker',
                        squadron: 'Red',
                        aircraft: { name: 'X-Wing'},
                        base: { name: 'Yavin IV'},
                        date: '"2020-11-09T00:00:00.000Z"',
                        remarks: 'May the force be with you',
                        msnType: {name: 'Type 1'},
                        channel: {name: 'Type 1'},
                        commType: {name: 'Type 1'},
                        operation: {name: 'Blow up Deathstar'},
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
                                ICAODest: '1',
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
                                ICAOSource: '1',
                                ICAODest: '1',
                                remarks: 'Leg 2'
                            }
                        ]
                    },
                    {
                        msnNumber: '2',
                        callSign: 'Blue Leader',
                        commander: 'Luke Skywalker',
                        squadron: 'Blue',
                        aircraft: { name: 'X-Wing'},
                        base: { name: 'Yavin IV'},
                        date: '"2020-11-09T00:00:00.000Z"',
                        remarks: 'May the force be with you',
                        msnType: {name: 'Type 1'},
                        channel: {name: 'Type 1'},
                        commType: {name: 'Type 1'},
                        operation: {name: 'Assult Endor Shield Bunker'},
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
                                ICAODest: '1',
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
                                ICAOSource: '1',
                                ICAODest: '1',
                                remarks: 'Leg 2'
                            }
                        ]
                    }
                ]
            })
        );
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    test("Mission List - initial load, filter, clear filter, select a single mission and render details", async () => {
        //renders the component
        render(
        <BrowserRouter>
            <MissionList />
        </BrowserRouter>);
        //checks to see if the axios requst happened on component render (useEffect)
        expect(MissionService.findByFilter).toHaveBeenCalledTimes(1)
        //Checks to see if the expected number of items rendered into the mission list prior to filter 
        const missionsbeforefilter = await screen.findAllByRole('listitem');
        expect(missionsbeforefilter).toHaveLength(2);
        //Checks to see if the expected mission list items are visible on the page
        expect(screen.getByText(/Red Leader/i)).toBeInTheDocument()
        expect(screen.getByText(/Blue Leader/i)).toBeInTheDocument()
        //finds the msnNumber filter input box
        const msnNum = await screen.findByTestId('msnNumber')
        //similute entering a value into the textbox of 1
        fireEvent.change(msnNum, { target: { value: '1' } })
        //check to see that the value of the msnNumber textbox was actually changed to 1
        expect(msnNum.value).toBe('1')
        //Simulate that the axios request for a filtered result returned 1 mission instead of the original 2
        MissionService.findByFilter.mockImplementationOnce(() =>
            Promise.resolve({
                data: [
                    {
                        msnNumber: '1',
                        callSign: 'Red Leader',
                        commander: 'Luke Skywalker',
                        squadron: 'Red',
                        aircraft: { name: 'X-Wing'},
                        base: { name: 'Yavin IV'},
                        date: '"2020-11-09T00:00:00.000Z"',
                        remarks: 'May the force be with you',
                        msnType: {name: 'Type 1'},
                        channel: {name: 'Type 1'},
                        commType: {name: 'Type 1'},
                        operation: {name: 'Blow up Deathstar'},
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
                                ICAODest: '1',
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
                                ICAOSource: '1',
                                ICAODest: '1',
                                remarks: 'Leg 2'
                            }
                        ]
                    }
                ]
            })
        );
        //simulate clicking on the search button
        fireEvent.click(screen.getByTestId('search'));
        //find the elements on the page that are list items and check to see that only one of the items is now showing up
        const missionsafterfilter = await screen.findAllByRole('listitem'); 
        expect(screen.getByText(/Red Leader/i)).toBeInTheDocument()
        expect(screen.queryByText(/Blue Leader/i)).not.toBeInTheDocument()
        //check to see that the filter axios request was made once
        expect(MissionService.findByFilter).toHaveBeenCalledTimes(2)
        //simulate that the axios request now returns two results again as if the filter was cleared
        MissionService.findByFilter.mockImplementationOnce(() =>
            Promise.resolve({
                data: [
                    {
                        msnNumber: '1',
                        callSign: 'Red Leader',
                        commander: 'Luke Skywalker',
                        squadron: 'Red',
                        aircraft: { name: 'X-Wing'},
                        base: { name: 'Yavin IV'},
                        date: '"2020-11-09T00:00:00.000Z"',
                        remarks: 'May the force be with you',
                        msnType: {name: 'Type 1'},
                        channel: {name: 'Type 1'},
                        commType: {name: 'Type 1'},
                        operation: {name: 'Blow up Deathstar'},
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
                                ICAODest: '1',
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
                                ICAOSource: '1',
                                ICAODest: '1',
                                remarks: 'Leg 2'
                            }
                        ]
                    },
                    {
                        msnNumber: '2',
                        callSign: 'Blue Leader',
                        commander: 'Luke Skywalker',
                        squadron: 'Blue',
                        aircraft: { name: 'X-Wing'},
                        base: { name: 'Yavin IV'},
                        date: '"2020-11-09T00:00:00.000Z"',
                        remarks: 'May the force be with you',
                        msnType: {name: 'Type 1'},
                        channel: {name: 'Type 1'},
                        commType: {name: 'Type 1'},
                        operation: {name: 'Assult Endor Shield Bunker'},
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
                                ICAODest: '1',
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
                                ICAOSource: '1',
                                ICAODest: '1',
                                remarks: 'Leg 2'
                            }
                        ]
                    }
                ]
            })
        );
        //simulate clicking on the clear filter button
        fireEvent.click(screen.getByTestId('clear'));
        //check to see that there are now two list items showing up again 
        const missionsafterclear = await screen.findAllByRole('listitem');
        expect(screen.getByText(/Red Leader/i)).toBeInTheDocument();
        expect(screen.getByText(/Blue Leader/i)).toBeInTheDocument();
        //check to see that the axios request for getting all missions was fired a second time when the clear button was clicked
        expect(MissionService.findByFilter).toHaveBeenCalledTimes(3)
        //simulate clicking on an a mission in the mission list
        fireEvent.click(screen.getByText(/Red Leader/i));
        //check to see that the mission detail view rendered by checking to see that specific text from the http request is visible.
        const msnlabel = await expect(screen.getByText(/Operation:/i)).toBeInTheDocument()
        const msntext = await expect(screen.getByText(/Blow up Deathstar/i)).toBeInTheDocument()
    });
});

