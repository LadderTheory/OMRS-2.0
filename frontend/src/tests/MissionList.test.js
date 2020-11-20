import React from 'react';
import { render, fireEvent, screen, findByText, rerender } from '@testing-library/react';
import axios from 'axios';
import MissionService from '../services/missions.service'
import MissionList from '../Components/MissionList'
import { BrowserRouter } from 'react-router-dom'

jest.mock('../services/missions.service');

describe("Mission List", () => {

    beforeEach(() => {
        MissionService.getAirLiftMsns.mockImplementationOnce(() =>
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
                        operation: {name: 'Type 1'}
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
                        operation: {name: 'Type 1'}
                    }
                ]
            })
        );
    })

    afterEach(() => {
        jest.clearAllMocks()
    })


    test("missions list gets populated on page render", async () => {
        render(<MissionList />);
        expect(MissionService.getAirLiftMsns).toHaveBeenCalledTimes(1)

        const missions = await screen.findAllByRole('listitem');
        expect(missions).toHaveLength(2);
        expect(screen.getByText(/Red Leader/i)).toBeInTheDocument()
        expect(screen.getByText(/Blue Leader/i)).toBeInTheDocument()
    });

    test("mission filter works", async () => {
        render(<MissionList />);
        
        const msnNum = await screen.findByTestId('msnNumber')

        fireEvent.change(msnNum, { target: { value: '1' } })

        expect(msnNum.value).toBe('1')

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
                        operation: {name: 'Type 1'}
                    }
                ]
            })
        );
        
        fireEvent.click(screen.getByTestId('search'));

        expect(MissionService.findByFilter).toHaveBeenCalledTimes(1)
        expect(screen.getByText(/Red Leader/i)).toBeInTheDocument()
        //expect(screen.getByText(/Blue Leader/i)).not.toBeInTheDocument()
    });

    test("clear filters works", async () => {
        render(<MissionList />);

        MissionService.getAirLiftMsns.mockImplementationOnce(() =>
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
                        operation: {name: 'Type 1'}
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
                        operation: {name: 'Type 1'}
                    }
                ]
            })
        );

        fireEvent.click(screen.getByTestId('clear'));

        expect(MissionService.getAirLiftMsns).toHaveBeenCalledTimes(2)
    });

    test("set active mission", async () => {
        render(
        <BrowserRouter>
            <MissionList />
        </BrowserRouter>
        );

        const missions = await screen.findAllByTestId('mission-listitem');

        fireEvent.click(screen.getByText(/Red Leader/i));
    });
});

