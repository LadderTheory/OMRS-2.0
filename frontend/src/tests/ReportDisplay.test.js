import React from 'react';
import { render, fireEvent, screen, wait } from '@testing-library/react';
import MissionService from '../services/missions.service'
import { BrowserRouter } from 'react-router-dom'
import ReportDisplay from '../Components/ReportDisplay';

jest.mock('../services/missions.service');
describe("Report Display", () => {
    beforeEach(() => {
       
        MissionService.findByParameters.mockImplementationOnce(() =>
        Promise.resolve({
            data: [
                {_id:"5fbeaa499e35854c5802de8e",
                msnNumber:"1001A",
                callSign:"RED",
                commander:"",
                squadron:{_id:"5fb6869ec42e6d7281524eab",name:"BLUE",active:true,__v:0},
                aircraft:{_id:"5fb686d9c42e6d7281524eb5",name:"X-Wing",active:true,__v:0},
                base:{_id:"5fb686bcc42e6d7281524eb0","name":"Base 1","active":true,"__v":0},
                date:"2020-11-25T00:00:00.000Z",
                remarks:"May the force be with you",
                msnType:{_id:"5fb6873dc42e6d7281524ebb",name:"Mission Type 1",active:true,__v:0},
                channel:{_id:"5fb68761c42e6d7281524ec1",name:"Channel 2",active:true,__v:0},
                commType:true,
                operation:{_id:"5fb6879cc42e6d7281524ec6",name:"Op Destroy Deathstar",active:true,__v:0},
                legs:{
                    _id:"5fbeaa499e35854c5802de8f",
                    legNumber:1,
                    scheduledTakeOff:null,
                    actualTakeOff:1100,
                    scheduledLand:null,
                    actualLand:1200,
                    duration:1,
                    passengerOn:30,
                    passengerOff:10,
                    passengerThru:20,
                    cargoOn:30,
                    cargoOff:20,
                    cargoThru:10,
                    palletOn:100,
                    palletOff:50,
                    palletThru:50,
                    ICAOSource:{_id:"5fb688fec42e6d7281524eca",name:"AAA",active:true,__v:0},
                    ICAODest:{_id:"5fb68907c42e6d7281524ecb",name:"BBB",active:true,__v:0},
                    remarks:""},
                    __v:0},
                {_id:"5fbeaa499e35854c5802de8e",
                msnNumber:"102",
                callSign:"BLUE",
                commander:"",
                squadron:{_id:"5fb6869ec42e6d7281524eab",name:"TEAL",active:true,__v:0},
                aircraft:{_id:"5fb686d9c42e6d7281524eb5",name:"Change",active:true,__v:0},
                base:{_id:"5fb686bcc42e6d7281524eb0","name":"Shaw","active":true,"__v":0},
                date:"2020-11-25T00:00:00.000Z",
                remarks:"May the force be with you",
                msnType:{_id:"5fb6873dc42e6d7281524ebb",name:"Mission Type 1",active:true,__v:0},
                channel:{_id:"5fb68761c42e6d7281524ec1",name:"Channel 2",active:true,__v:0},
                commType:true,
                operation:{_id:"5fb6879cc42e6d7281524ec6",name:"Op Destroy Deathstar",active:true,__v:0},
                legs:{
                    _id:"5fbeaa499e35854c5802de8f",
                    legNumber:1,
                    scheduledTakeOff:null,
                    actualTakeOff:1100,
                    scheduledLand:null,
                    actualLand:1200,
                    duration:1,
                    passengerOn:30,
                    passengerOff:10,
                    passengerThru:20,
                    cargoOn:30,
                    cargoOff:20,
                    cargoThru:10,
                    palletOn:100,
                    palletOff:50,
                    palletThru:50,
                    ICAOSource:{_id:"5fb688fec42e6d7281524eca",name:"AAA",active:true,__v:0},
                    ICAODest:{_id:"5fb68907c42e6d7281524ecb",name:"BBB",active:true,__v:0},
                    remarks:""},
                    __v:0}
            ]
        })
    
        )
    })
    test("Report Display", async () => {
        const location = {pathname:"/reportdisplay",search:"",hash:"",state:{dateStart:"2020-11-01",dateEnd:"2021-01-30"},key:"3j9n3s"}
        render(
        <BrowserRouter>
            <ReportDisplay location={location} />
        </BrowserRouter>);
        //checks that the missions were retrieved
       await wait(() => expect(MissionService.findByParameters).toHaveBeenCalledTimes(1))
       expect(screen.getByText(/X-Wing/i)).toBeInTheDocument();
       expect(screen.getByText(/Change/i)).toBeInTheDocument();
       fireEvent.click(screen.getByText('Export'));
       
        
    });
}); 