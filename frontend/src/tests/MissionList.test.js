import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import axios from 'axios';
import MissionService from '../services/missions.service'
import MissionList from '../Components/MissionList'
import ParametersService from "../services/Parameter.service";
import { BrowserRouter } from 'react-router-dom'

jest.mock('../services/missions.service');
jest.mock('../services/Parameter.service');

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
                        _id: 2,
                        callSign: 'Blue Leader',
                    }
                ]
            })
        );
        ParametersService.retrieveSquadrons.mockImplementationOnce(() =>
            Promise.resolve({
                data: [
                    {
                        _id: 1,
                        name: 'Red',
                        active: true
                    },
                    {
                        _id: 2,
                        name: 'Blue',
                        active: true
                    }
                ]
            })
        )
    })

    afterEach(() => {
        jest.clearAllMocks()
    })


    test("missions list gets populated on page render", async () => {
        render(<MissionList />);
        expect(MissionService.getAirLiftMsns).toHaveBeenCalledTimes(1)
        expect(ParametersService.retrieveSquadrons).toHaveBeenCalledTimes(1)

        const missions = await screen.findAllByRole('listitem');
        expect(missions).toHaveLength(2);
    });

    test("mission filter works", async () => {
        render(<MissionList />);

        const squadrons = await screen.findAllByTestId('squadron-option')
        expect(squadrons).toHaveLength(2);

        const squadronDropDown = screen.getByTestId('squadron')

        fireEvent.change(squadronDropDown, { target: { value: '1' } })

        expect(squadronDropDown.value).toBe('1')

        MissionService.findByFilter.mockImplementationOnce(() =>
            Promise.resolve({
                data: [
                    {
                        _id: 1,
                        callSign: 'Red Leader',
                    }
                ]
            })
        );

        fireEvent.click(screen.getByText(/Search/i));
    });

    test("clear filters works", async () => {
        render(<MissionList />);

        MissionService.getAirLiftMsns.mockImplementationOnce(() =>
            Promise.resolve({
                data: [
                    {
                        _id: 1,
                        callSign: 'Red Leader',
                    },
                    {
                        _id: 2,
                        callSign: 'Blue Leader',
                    }
                ]
            })
        );

        fireEvent.click(screen.getByText(/Clear Filters/i));
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

