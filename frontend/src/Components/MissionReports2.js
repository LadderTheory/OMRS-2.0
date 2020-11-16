import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ParametersService from '../services/Parameter.service';
import DataManagementFilterType from '../Components/ReportFilterTypes/DataManagementType';
import TextFilterType from '../Components/ReportFilterTypes/TextType';
import DateFilterType from '../Components/ReportFilterTypes/DateType';
//Function for the Mission Reports Component
function MissionReports2() {
    const [ActiveComponents, setActiveComponents] = useState('');
    const [filter, setFilter] = useState({});

    //Sets a new items into a parameter list based on the name and new value of the filter that triggers the event
    const handleFilterChange = (name, value) => {
        setFilter(prevState => {
            const newFilter = { ...prevState, [name]: value }
            return newFilter;
        })
    }

    //function for spawning a squadron filter
    const getSquadrons = async (e) => {
        if (e.target.checked === true) {
            const { name } = e.target;
            const { data } = await ParametersService.retrieveSquadrons();
            DataFilterType('squadron', data);
        }
        else if (e.target.checked === false) {
            const { name } = e.target;
            FilterInactive('squadron');
        }
    }
    //function for spawning an aircraft filter
    const getAirframes = async (e) => {
        if (e.target.checked === true) {
            const { name } = e.target;
            const { data } = await ParametersService.retrieveAircraft();
            DataFilterType('aircraft', data);
        }
        else if (e.target.checked === false) {
            const { name } = e.target;
            FilterInactive('aircraft');
        }
    }
    //function for spawning a base filter
    const getBases = async (e) => {
        if (e.target.checked === true) {
            const { name } = e.target;
            const { data } = await ParametersService.retrieveBases();
            DataFilterType('base', data);
        }
        else if (e.target.checked === false) {
            const { name } = e.target;
            FilterInactive('base');
        }
    }
    //method for spawning a channel filter
    const getChannels = async (e) => {
        if (e.target.checked === true) {
            const { name } = e.target;
            const { data } = await ParametersService.retrieveChannels();
            DataFilterType('channel', data);
        }
        else if (e.target.checked === false) {
            const { name } = e.target;
            FilterInactive('channel');
        }
    }
    //method for spawning a commercialType filter
    const getCommTypes = async (e) => {
        if (e.target.checked === true) {
            const { name } = e.target;
            const { data } = await ParametersService.retrieveCommTypes();
            DataFilterType('commType', data);
        }
        else if (e.target.checked === false) {
            const { name } = e.target;
            FilterInactive('commType');
        }
    }
    //method for spawning a missionType filter
    const getMsnTypes = async (e) => {
        if (e.target.checked === true) {
            const { name } = e.target;
            const { data } = await ParametersService.retrieveMsnTypes();
            DataFilterType('msnType', data);
        }
        else if (e.target.checked === false) {
            const { name } = e.target;
            FilterInactive('msnType');
        }
    }
    //method for spawning an Operation filter
    const getOperations = async (e) => {
        if (e.target.checked === true) {
            const { name } = e.target;
            const { data } = await ParametersService.retrieveOperations();
            DataFilterType('operation', data);
        }
        else if (e.target.checked === false) {
            const { name } = e.target;
            FilterInactive('operation');
        }
    }
    //method for spawning a CallSign filter
    const getCallsign = async (e) => {
        if (e.target.checked === true) {
            const { name } = e.target;
            TextType('callSign');
        }
        else if (e.target.checked === false) {
            const { name } = e.target;
            FilterInactive('callSign');
        }
    }
    //method for spawning a Mission Number filter
    const getMissionNumber = async (e) => {
        if (e.target.checked === true) {
            const { name } = e.target;
            TextType('msnNumber');
        }
        else if (e.target.checked === false) {
            const { name } = e.target;
            FilterInactive('msnNumber');
        }
    }
    //method for spawning a Commander filter
    const getCommander = async (e) => {
        if (e.target.checked === true) {
            const { name } = e.target;
            TextType('commander');
        }
        else if (e.target.checked === false) {
            const { name } = e.target;
            FilterInactive('commander');
        }
    }
    //method for spawning a Date filter
    const getDate = async (e) => {
        if (e.target.checked === true) {
            const { name } = e.target;
            DateType();
        }
        else if (e.target.checked === false) {
            const { name } = e.target;
            FilterInactive('date');
        }
    }
    //Spawns a Data Managment Filter Type component based on the name passed in
    const DataFilterType = (name, data) => {
        setActiveComponents([...ActiveComponents, <DataManagementFilterType key={name} selectedFilter={name} data={data} handleChange={handleFilterChange} />])
    }
    //Spawns a Text Filter Type component based on the name passed in
    const TextType = (name) => {
        setActiveComponents([...ActiveComponents, <TextFilterType key={name} selectedFilter={name} handleChange={handleFilterChange} />])
    }
    //Spawns a Date Filter Type
    const DateType = () => {
        setActiveComponents([...ActiveComponents, <DateFilterType key='date' handleChangeDateStart={handleFilterChange} handleChangeDateEnd={handleFilterChange} />])
    }
    //Removes a Filter Type from the shown Active Components
    const FilterInactive = (name) => {
        delete filter[name];
        if (name === 'date') {
            delete filter.dateStart;
            delete filter.dateEnd;
        }
        setActiveComponents(ActiveComponents.filter(object => object.key !== name));
    }

    return (
        <div>
        
        <nav className="navbar navbar-expand navbar-dark justify-content-center mt-2" id="data-Management-Component">
      <ul className="nav navbar-nav navbar-dark justify-content-center">
            <li><input type="checkbox" className="hidden " onClick={getDate} name="missiondate" id="MissionDate"/><label id='MissionReportButtons' for="MissionDate">Mission Date</label></li> 
            <li><input type="checkbox" className="hidden " onClick={getMissionNumber} name="missionnum" id="MissionNum"/><label id='MissionReportButtons' for="MissionNum">Mission Number</label></li>
            <li><input type="checkbox" className="hidden " onClick={getCallsign} name="callsign" id="CallSign"/><label id='MissionReportButtons' for="CallSign">CallSign </label></li>
            <li><input type="checkbox" className="hidden " onClick={getCommander} name="commander" id="Commander"/><label id='MissionReportButtons' for="Commander">Commander </label></li>
            <li><input type="checkbox" onClick={getSquadrons} className="hidden " name="squadron" id="Squadron"/><label id='MissionReportButtons' for="Squadron">Squadron </label></li>
            <li><input type="checkbox" onClick={getAirframes} className="hidden " name="airframe" id="Airframe"/><label id='MissionReportButtons' for="Airframe">Airframe </label></li>
            <li><input type="checkbox" onClick={getOperations} className="hidden " name="operation" id="Operation"/><label id='MissionReportButtons' for="Operation">Operation </label></li>
            <li><input type="checkbox" onClick={getBases} className="hidden " name="base" id="Base"/><label id='MissionReportButtons' for="Base">Base </label></li>
            <li><input type="checkbox" onClick={getMsnTypes} className="hidden " name="missiontype" id="MissionType"/><label id='MissionReportButtons' for="MissionType">Mission Type </label></li>
            <li><input type="checkbox" onClick={getCommTypes} className="hidden " name="commercialtype" id="CommercialType"/><label id='MissionReportButtons' for="CommercialType">Commercial Type </label></li>
            <li><input type="checkbox" onClick={getChannels} className="hidden " name="channel" id="Channel"/><label id='MissionReportButtons' for="Channel">Channel </label></li>
       </ul>
       </nav>
        
       
        <div className="card p-0 mt-5 overflow" id="reportdisplaycard">
                            <div className="card-header" id="reportdisplayheader">
                                <h4>Selected Filters</h4>
                            </div>
                            <div className="card-body" id="cardBody">
                                {ActiveComponents}
                                </div>
                                </div>
                                <div className="d-flex justify-content-center mt-2">
        <Link id='FilterReportbutton' to={{
                    pathname: '/reportdisplay',
                    state: filter
                }} className='btn btn-lg'>Next</Link>
        </div>
        </div>
    );
}

export default MissionReports2;