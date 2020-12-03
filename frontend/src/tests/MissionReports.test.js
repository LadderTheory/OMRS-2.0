import React from 'react';
import { render, fireEvent, screen, wait } from '@testing-library/react';
import MissionReports from '../Components/MissionReports2';
import ParameterService from '../services/Parameter.service';
import { BrowserRouter } from 'react-router-dom';



jest.mock('../services/Parameter.service');

describe("Mission Reports", () => {

    test("Mission Report Form", async () => {
        //renders the component
        render(
            <BrowserRouter>
                <MissionReports/>
            </BrowserRouter>
        );
        //Checked that the DOM elements were present, confirms the page rendered
        expect(screen.getByText(/Mission Type/i)).toBeInTheDocument();
        //simulate clicking the Mission Date button
        fireEvent.click(screen.queryByLabelText('Mission Date'));
        expect(screen.getByText(/Starting Date:/i)).toBeInTheDocument();
        expect(screen.getByText(/Ending Date:/i)).toBeInTheDocument();
        //Finding the date inputs
        const startDate = await screen.queryByLabelText('Starting Date:')
        //simulate changing the value of the input
        fireEvent.change(startDate, { target: { value: '2020-11-28' }})
        //check to see that the value of the input was actually changed
        expect(startDate.value).toBe('2020-11-28');
        //Finding the end date input
        const endDate = await screen.queryByLabelText('Ending Date:')
        //simulate changing the value of the input
        fireEvent.change(endDate, { target: { value: '2020-11-30' }})
        //check to see that the value of the input was actually changed
        expect(endDate.value).toBe('2020-11-30');
        //Removing the child component by clicking the mission date button again
        fireEvent.click(screen.queryByLabelText('Mission Date'));
        //confirming that the mission date component is removed by checking that the label text is not present
        expect(screen.queryByText(/Starting Date:/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/Ending Date:/i)).not.toBeInTheDocument();
        //simulate clicking the Mission Number button
        fireEvent.click(screen.queryByLabelText('Mission Number'));
        expect(screen.getByText(/Mission Number:/i)).toBeInTheDocument();
        //Finding the mission number input
        const msnNum = await screen.queryByLabelText('Mission Number:')
        //simulate changing the value of the input
        fireEvent.change(msnNum, { target: { value: 'msnNum' }})
        //check to see that the value of the input was actually changed
        expect(msnNum.value).toBe('msnNum');
        //Removing the child component by clicking the mission date button again
        fireEvent.click(screen.queryByLabelText('Mission Number'));
        //confirming that the mission date component is removed by checking that the label text is not present
        expect(screen.queryByText(/Mission Number:/i)).not.toBeInTheDocument();
        //simulate clicking the CallSign button
        fireEvent.click(screen.queryByLabelText('CallSign'));
        expect(screen.getByText(/CallSign:/i)).toBeInTheDocument();
        //Finding the mission number input
        const callSign = await screen.queryByLabelText('CallSign:')
        //simulate changing the value of the input
        fireEvent.change(callSign, { target: { value: 'cs' }})
        //check to see that the value of the input was actually changed
        expect(callSign.value).toBe('cs');
        //Removing the child component by clicking the mission date button again
        fireEvent.click(screen.queryByLabelText('CallSign'));
        //confirming that the mission date component is removed by checking that the label text is not present
        expect(screen.queryByText(/CallSign:/i)).not.toBeInTheDocument();
        //simulate clicking the Commander button
        fireEvent.click(screen.queryByLabelText('Commander'));
        expect(screen.getByText(/Commander:/i)).toBeInTheDocument();
        //Finding the mission number input
        const commander = await screen.queryByLabelText('Commander:')
        //simulate changing the value of the input
        fireEvent.change(commander, { target: { value: 'cc' }})
        //check to see that the value of the input was actually changed
        expect(commander.value).toBe('cc');
        //Removing the child component by clicking the mission date button again
        fireEvent.click(screen.queryByLabelText('Commander'));
        //confirming that the mission date component is removed by checking that the label text is not present
        expect(screen.queryByText(/Commander:/i)).not.toBeInTheDocument();
        //Mocking the axios request for retrieving squadrons from the database
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
                        active: false
                    }
                ]
            })
        );
        //simulate clicking the Squadron button
        fireEvent.click(screen.queryByLabelText('Squadron'));
        //checking to see if the axios mock was called
        expect(ParameterService.retrieveSquadrons).toHaveBeenCalledTimes(1)
        await wait(() => expect(screen.getByText('Squadron:')).toBeInTheDocument());
        //Checking to see if the document was populated with the new values from the axios mock
        expect(screen.getByText(/Havoc/i)).toBeInTheDocument();
        //Checking to see that by setting the active attribute to false that the 2nd mock item does not appear in the document
        expect(screen.queryByText(/Vengeance/i)).not.toBeInTheDocument();
        const squadron = await screen.getByTestId('dmSelect')
        fireEvent.change(squadron, {target: { value: '1'}})
        expect(squadron.value).toBe('1');
        fireEvent.click(screen.queryByLabelText('Squadron'));
        await wait(() => expect(screen.queryByText('Squadron:')).not.toBeInTheDocument());
        //Mocking the axios request for retrieving aircraft from the database
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
                        active: false
                    }
                ]
            })
        );
        //simulate clicking the Airframe button
        fireEvent.click(screen.queryByLabelText('Airframe'));
        //checking to see if the axios mock was called
        expect(ParameterService.retrieveAircraft).toHaveBeenCalledTimes(1)
        await wait(() => expect(screen.getByText('Aircraft:')).toBeInTheDocument());
        //Checking to see if the document was populated with the new values from the axios mock
        expect(screen.getByText(/X-Wing/i)).toBeInTheDocument();
        //Checking to see that by setting the active attribute to false that the 2nd mock item does not appear in the document
        expect(screen.queryByText(/Tie Fighter/i)).not.toBeInTheDocument();
        const alpha = await screen.getByTestId('dmSelect')
        fireEvent.change(alpha, {target: { value: '1'}})
        expect(alpha.value).toBe('1');
        fireEvent.click(screen.queryByLabelText('Airframe'));
        await wait(() => expect(screen.queryByText('Aircraft:')).not.toBeInTheDocument());
        //Mocking the axios request for retrieving operations from the database
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
                        active: false
                    }
                ]
            })
        );
         //simulate clicking the Operation button
         fireEvent.click(screen.queryByLabelText('Operation'));
         //checking to see if the axios mock was called
         expect(ParameterService.retrieveOperations).toHaveBeenCalledTimes(1)
         await wait(() => expect(screen.getByText('Operation:')).toBeInTheDocument());
         //Checking to see if the document was populated with the new values from the axios mock
         expect(screen.getByText(/Destroy Deathstar/i)).toBeInTheDocument();
         //Checking to see that by setting the active attribute to false that the 2nd mock item does not appear in the document
         expect(screen.queryByText(/Assault Rebel Base/i)).not.toBeInTheDocument();
         const ops = await screen.getByTestId('dmSelect')
         fireEvent.change(ops, {target: { value: '1'}})
         expect(ops.value).toBe('1');
         fireEvent.click(screen.queryByLabelText('Operation'));
         await wait(() => expect(screen.queryByText('Operation:')).not.toBeInTheDocument());
         //Mocking the axios request for retrieving bases from the database
         ParameterService.retrieveBases.mockImplementationOnce(() =>
            Promise.resolve({
                data: [
                     {
                        _id: 1,
                       name: 'Hoth',
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
         //simulate clicking the Base button
         fireEvent.click(screen.queryByLabelText('Base'));
         //checking to see if the axios mock was called
         expect(ParameterService.retrieveBases).toHaveBeenCalledTimes(1)
         await wait(() => expect(screen.getByText('Base:')).toBeInTheDocument());
         //Checking to see if the document was populated with the new values from the axios mock
         expect(screen.getByText(/Endor/i)).toBeInTheDocument();
         //Checking to see that by setting the active attribute to false that the 2nd mock item does not appear in the document
         expect(screen.queryByText(/Hoth/i)).not.toBeInTheDocument();
         const bases = await screen.getByTestId('dmSelect')
         fireEvent.change(bases, {target: { value: '2'}})
         expect(bases.value).toBe('2');
         fireEvent.click(screen.queryByLabelText('Base'));
         await wait(() => expect(screen.queryByText('Base:')).not.toBeInTheDocument());
        //Mocking the axios request for retrieving mission types from the database
        ParameterService.retrieveMsnTypes.mockImplementationOnce(() =>
            Promise.resolve({
                data: [
                 {
                       _id: 1,
                        name: 'Mission Type 1',
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
        //simulate clicking the Mission Type button
        fireEvent.click(screen.queryByLabelText('Mission Type'));
        //checking to see if the axios mock was called
        expect(ParameterService.retrieveMsnTypes).toHaveBeenCalledTimes(1)
        await wait(() => expect(screen.getByText('Mission Type:')).toBeInTheDocument());
        //Checking to see if the document was populated with the new values from the axios mock
        expect(screen.getByText(/Mission Type 2/i)).toBeInTheDocument();
        //Checking to see that by setting the active attribute to false that the 2nd mock item does not appear in the document
        expect(screen.queryByText(/Mission Type 1/i)).not.toBeInTheDocument();
        const msntype = await screen.getByTestId('dmSelect')
        fireEvent.change(msntype, {target: { value: '2'}})
        expect(msntype.value).toBe('2');
        fireEvent.click(screen.queryByLabelText('Mission Type'));
        await wait(() => expect(screen.queryByText('Mission Type:')).not.toBeInTheDocument());
        //Mocking the axios request for retrieving channels from the database
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
                        active: false
                    }
                ]
            })
        );
        //simulate clicking the Channel button
        fireEvent.click(screen.queryByLabelText('Channel'));
        //checking to see if the axios mock was called
        expect(ParameterService.retrieveChannels).toHaveBeenCalledTimes(1)
        await wait(() => expect(screen.getByText('Channel:')).toBeInTheDocument());
        //Checking to see if the document was populated with the new values from the axios mock
        expect(screen.getByText(/Channel 1/i)).toBeInTheDocument();
        //Checking to see that by setting the active attribute to false that the 2nd mock item does not appear in the document
        expect(screen.queryByText(/Channel 2/i)).not.toBeInTheDocument();
        const channel = await screen.getByTestId('dmSelect')
        fireEvent.change(channel, {target: { value: '1'}})
        expect(channel.value).toBe('1');
        fireEvent.click(screen.queryByLabelText('Channel'));
        await wait(() => expect(screen.queryByText('Channel:')).not.toBeInTheDocument());
        // //Simulate the next button being clicked
        // fireEvent.click(screen.getByText('Next'));
        
       
        
        
        
        


    })
})