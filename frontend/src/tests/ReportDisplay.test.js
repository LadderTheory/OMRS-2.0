import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import MissionService from '../services/missions.service'
import { BrowserRouter } from 'react-router-dom'
import ReportDisplay from '../Components/ReportDisplay';

describe("Report Display", () => {
    test("Report Display", async () => {
        const location = {pathname:"/reportdisplay",search:"",hash:"",state:{dateStart:"2020-11-01",dateEnd:"2021-01-30"},key:"3j9n3s"}
        render(
        <BrowserRouter>
            <ReportDisplay location={location} />
        </BrowserRouter>);
    
    });
});
