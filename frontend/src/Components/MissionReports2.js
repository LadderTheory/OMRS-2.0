import React, { useState, useEffect, useRef } from 'react';
import MissionsService from '../services/missions.service';
import AuthService from '../services/auth.service';
import { Redirect, Link, useHistory, useParams} from 'react-router-dom';
import ParametersService from '../services/Parameter.service';
import DataManagementFilterType from '../Components/ReportFilterTypes/DataManagementType';
import TextFilterType from '../Components/ReportFilterTypes/TextType';
import DateFilterType from '../Components/ReportFilterTypes/DateType';



function MissionReports2(){
   
    const [checked, setChecked] = useState(false);
    const [ActiveComponents, setActiveComponents] = useState('');
    const [filter, setFilter] = useState({});
    const [missions, setMissions] = useState([]);



    useEffect(() => {
       
    }, []);

    const handleFilterChange = (name, value) => {
        setFilter(prevState => {
            const newFilter = {...prevState, [name]: value}
            return newFilter;
        })
    }

    //method for spawning a squadron filter
    const getSquadrons = async (e) => {
            if(e.target.checked === true){
            const { name } = e.target;
            const { data } = await ParametersService.retrieveSquadrons();
            DataFilterType('squadron', data);
            }
            else if(e.target.checked === false){
                const{ name } = e.target;
                FilterInactive('squadron');
            }
        }
    //method for spawning an aircraft filter
    const getAirframes = async (e) => {
        if(e.target.checked === true){
            const { name } = e.target;
            const { data } = await ParametersService.retrieveAircraft();
            DataFilterType('aircraft', data);
            }
        else if(e.target.checked === false){
                const{ name } = e.target;
                FilterInactive('aircraft');
            }
        }
    //method for spawning a base filter
    const getBases = async (e) => {
        if(e.target.checked === true){
            const { name } = e.target;
            const { data } = await ParametersService.retrieveBases();
            DataFilterType('base', data);
            }
        else if(e.target.checked === false){
                const{ name } = e.target;
                FilterInactive('base');
            }
        }
    //method for spawning a channel filter
    const getChannels = async (e) => {
        if(e.target.checked === true){
            const { name } = e.target;
            const { data } = await ParametersService.retrieveChannels();
            DataFilterType('channel', data);
            }
        else if(e.target.checked === false){
                const{ name } = e.target;
                FilterInactive('channel');
            }
        }
    //method for spawning a commercialType filter
    const getCommTypes = async (e) => {
        if(e.target.checked === true){
            const { name } = e.target;
            const { data } = await ParametersService.retrieveCommTypes();
            DataFilterType('commType', data);
            }
        else if(e.target.checked === false){
                const{ name } = e.target;
                FilterInactive('commType');
            }
        }
    //method for spawning a missionType filter
    const getMsnTypes = async (e) => {
        if(e.target.checked === true){
            const { name } = e.target;
            const { data } = await ParametersService.retrieveMsnTypes();
            DataFilterType('msnType', data);
            }
        else if(e.target.checked === false){
                const{ name } = e.target;
                FilterInactive('msnType');
            }
        }
    //method for spawning an Operation filter
    const getOperations = async (e) => {
        if(e.target.checked === true){
            const { name } = e.target;
            const { data } = await ParametersService.retrieveOperations();
            DataFilterType('operation', data);
            }
        else if(e.target.checked === false){
                const{ name } = e.target;
                FilterInactive('operation');
            }
        }
    //method for spawning a CallSign filter
    const getCallsign = async (e) => {
        if(e.target.checked === true){
            const { name } = e.target;
            TextType('callSign');
            }
        else if(e.target.checked === false){
                const{ name } = e.target;
                FilterInactive('callSign');
            }
        }
    //method for spawning a Mission Number filter
    const getMissionNumber = async (e) => {
        if(e.target.checked === true){
            const { name } = e.target;
            TextType('msnNumber');
            }
        else if(e.target.checked === false){
                const{ name } = e.target;
                FilterInactive('msnNumber');
            }
        }
    //method for spawning a Commander filter
    const getCommander = async (e) => {
        if(e.target.checked === true){
            const { name } = e.target;
            TextType('commander');
            }
        else if(e.target.checked === false){
                const{ name } = e.target;
                FilterInactive('commander');
            }
        }
    //method for spawning a Date filter
    const getDate = async (e) => {
        if(e.target.checked === true){
            const { name } = e.target;
            DateType();
            }
        else if(e.target.checked === false){
                const{ name } = e.target;
                FilterInactive('date');
            }
        }
    //Spawns a Data Managment Filter Type component based on the name passed in
    const DataFilterType = (name, data) => {
            setActiveComponents([...ActiveComponents, <DataManagementFilterType key={name} selectedFilter={name} data={data} handleChange={handleFilterChange} />])
            console.log(ActiveComponents);                   
    }
    //Spawns a Text Filter Type component based on the name passed in
    const TextType = (name) => {
        setActiveComponents([...ActiveComponents, <TextFilterType key={name}  selectedFilter={name} handleChange={handleFilterChange}/>])
        console.log(ActiveComponents);
    }
    //Spawns a Date Filter Type
    const DateType = () =>{
        setActiveComponents([...ActiveComponents, <DateFilterType key='date'  handleChangeDateStart={handleFilterChange} handleChangeDateEnd={handleFilterChange}/>])
    }
    //Removes a Filter Type from the shown Active Components
    const FilterInactive = (name) => {
        delete filter[name];
        if(name === 'date')
        {
            delete filter.dateStart;
            delete filter.dateEnd;
        }
        setActiveComponents(ActiveComponents.filter(object => object.key !== name));
    
    }
    const handleSearch = async () => {
        const { data } = await MissionsService.findByParameters(filter);
        setMissions(data);
    }

 
    

 




    return(
        <div>
        <div className=' d-flex justify-content-center' id='MRParameters'>
        <table className='overflow-hidden p-3 mb-3 mb-md-0 mr-md-3 bg-light'>
            <tr>
            <input type="checkbox" className="hidden btn btn-lg btn-light" onClick={getDate} name="missiondate" id="MissionDate"/><label for="MissionDate">Mission Date</label>
            <input type="checkbox" className="hidden btn btn-lg btn-light" onClick={getMissionNumber} name="missionnum" id="MissionNum"/><label for="MissionNum">Mission Number</label>
            <input type="checkbox" className="hidden btn btn-lg btn-light" onClick={getCallsign} name="callsign" id="CallSign"/><label for="CallSign">CallSign </label>
            </tr>
            <tr>
            <input type="checkbox" className="hidden btn btn-lg btn-light"onClick={getCommander} name="commander" id="Commander"/><label for="Commander">Commander </label>
            <input type="checkbox" onClick={getSquadrons} className="hidden btn btn-lg btn-light" name="squadron" id="Squadron"/><label for="Squadron">Squadron </label>
            <input type="checkbox" onClick={getAirframes} className="hidden btn btn-lg btn-light" name="airframe" id="Airframe"/><label for="Airframe">Airframe </label>
            </tr>
            <tr>
            <input type="checkbox" onClick={getOperations} className="hidden btn btn-lg btn-light" name="operation" id="Operation"/><label for="Operation">Operation </label>
            <input type="checkbox" onClick={getBases} className="hidden btn btn-lg btn-light" name="base" id="Base"/><label for="Base">Base </label>
            <input type="checkbox" onClick={getMsnTypes} className="hidden btn btn-lg btn-light" name="missiontype" id="MissionType"/><label for="MissionType">Mission Type </label>
            </tr>
            <tr>
            <input type="checkbox" onClick={getCommTypes} className="hidden btn btn-lg btn-light" name="commercialtype" id="CommercialType"/><label for="CommercialType">Commercial Type </label>
            <input type="checkbox" onClick={getChannels} className="hidden btn btn-lg btn-light" name="channel" id="Channel"/><label for="Channel">Channel </label>
            </tr>
        </table>
            
        </div>
        <div className="card p-1 mt-5 overflow" id="filterdisplaycard">
                            <div className="card-header" id="msnlistheader">
                                <h4>Selected Filters</h4>
                            </div>
                            <div className="card-body" id="msnlistbody">
                            <div className="d-flex justify-content-center ">
            <table className="table table-striped">
                
                <tbody>
               {ActiveComponents}
                </tbody>
            </table>
            
        </div>
                                </div>
                                </div>
       
        
        <div className="d-flex justify-content-end">
        <Link to={{pathname:'/missionreports/reportdisplay/', state:{filter: true}}}><button className='btn btn-lg btn-light'>Next</button></Link>
        </div>
        </div>


    );
}

export default MissionReports2;