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

    /* When the click event is triggered if the check status is found true then the database is 
    queried for a list of squadrons and then the data returned from the database is
    passed into a child component drop down list which allows the user select from a list of squadrons.
    When the button is re-clicked the component disappears.*/
    const getSquadrons = async (e) => {
        if (e.target.checked === true) {
            const { data } = await ParametersService.retrieveSquadrons();

            DataFilterType('Squadron', data);
        }
        else if (e.target.checked === false) {
            FilterInactive('Squadron');
        }
    }
    /* When the click event is triggered if the check status is found true then the database is 
    queried for a list of Aircraft and then the data returned from the database is
    passed into a child component drop down list which allows the user select from a list of Aircraft.
    When the button is re-clicked the component disappears.*/
    const getAirframes = async (e) => {
        if (e.target.checked === true) {
            const { data } = await ParametersService.retrieveAircraft();
            DataFilterType('Aircraft', data);
        }
        else if (e.target.checked === false) {
            FilterInactive('Aircraft');
        }
    }
    /* When the click event is triggered if the check status is found true then the database is 
    queried for a list of bases and then the data returned from the database is
    passed into a child component drop down list which allows the user select from a list of bases.
    When the button is re-clicked the component disappears.*/
    const getBases = async (e) => {
        if (e.target.checked === true) {
            const { data } = await ParametersService.retrieveBases();
            DataFilterType('Base', data);
        }
        else if (e.target.checked === false) {
            FilterInactive('Base');
        }
    }
    /* When the click event is triggered if the check status is found true then the database is 
    queried for a list of channels and then the data returned from the database is
    passed into a child component drop down list which allows the user select from a list of channels.
    When the button is re-clicked the component disappears.*/
    const getChannels = async (e) => {
        if (e.target.checked === true) {
            const { data } = await ParametersService.retrieveChannels();
            DataFilterType('Channel', data);
        }
        else if (e.target.checked === false) {
            const { name } = e.target;
            FilterInactive('Channel');
        }
    }
    
    /* When the click event is triggered if the check status is found true then the database is 
    queried for a list of mission types and then the data returned from the database is
    passed into a child component drop down list which allows the user select from a list of mission types.
    When the button is re-clicked the component disappears.*/
    const getMsnTypes = async (e) => {
        if (e.target.checked === true) {
            const { data } = await ParametersService.retrieveMsnTypes();
            DataFilterType('MsnType', data);
        }
        else if (e.target.checked === false) {
            FilterInactive('MsnType');
        }
    }
    /* When the click event is triggered if the check status is found true then the database is 
    queried for a list of operations and then the data returned from the database is
    passed into a child component drop down list which allows the user select from a list of operations.
    When the button is re-clicked the component disappears.*/
    const getOperations = async (e) => {
        if (e.target.checked === true) {
            const { data } = await ParametersService.retrieveOperations();
            DataFilterType('Operation', data);
        }
        else if (e.target.checked === false) {
            FilterInactive('Operation');
        }
    }
    /* When the click event is triggered if the check status is found true then 
    a child text input component is spawned for a user to enter in a CallSign.
    When the button is re-clicked the component disappears.*/
    const getCallsign = async (e) => {
        if (e.target.checked === true) {
            TextType('CallSign');
        }
        else if (e.target.checked === false) {
            FilterInactive('CallSign');
        }
    }
    /* When the click event is triggered if the check status is found true 
    then a child text input component is spawned for a user to enter in a Mission Number.
    When the button is re-clicked the component disappears.*/
    const getMissionNumber = async (e) => {
        if (e.target.checked === true) {
            TextType('MsnNumber');
        }
        else if (e.target.checked === false) {
            FilterInactive('MsnNumber');
        }
    }
    /* When the click event is triggered if the check status is found true then a child text input component 
    is spawned for a user to enter in a Commander.
    When the button is re-clicked the component disappears.*/
    const getCommander = async (e) => {
        if (e.target.checked === true) {
            TextType('commander');
        }
        else if (e.target.checked === false) {
            FilterInactive('commander');
        }
    }
    /* When the click event is triggered if the check status is found true then 
    a child text input component is spawned for a user to enter in a start date and end date.
    When the button is re-clicked the component disappears.*/
    const getDate = async (e) => {
        if (e.target.checked === true) {
            DateType();
        }
        else if (e.target.checked === false) {
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
            <li><input type="checkbox" className="hidden " onClick={getDate}     id="MissionDate"/><label id='MissionReportButtons' for="MissionDate">Mission Date</label></li> 
            <li><input type="checkbox" className="hidden " onClick={getMissionNumber}  id="MissionNum"/><label id='MissionReportButtons' for="MissionNum">Mission Number</label></li>
            <li><input type="checkbox" className="hidden " onClick={getCallsign}  id="CallSign"/><label id='MissionReportButtons' for="CallSign">CallSign </label></li>
            <li><input type="checkbox" className="hidden " onClick={getCommander}  id="Commander"/><label id='MissionReportButtons' for="Commander">Commander </label></li>
            <li><input type="checkbox" onClick={getSquadrons} className="hidden "  id="Squadron"/><label id='MissionReportButtons' for="Squadron">Squadron </label></li>
            <li><input type="checkbox" onClick={getAirframes} className="hidden "  id="Airframe"/><label id='MissionReportButtons' for="Airframe">Airframe </label></li>
            <li><input type="checkbox" onClick={getOperations} className="hidden "  id="Operation"/><label id='MissionReportButtons' for="Operation">Operation </label></li>
            <li><input type="checkbox" onClick={getBases} className="hidden "      id="Base"/><label id='MissionReportButtons' for="Base">Base </label></li>
            <li><input type="checkbox" onClick={getMsnTypes} className="hidden "  id="MissionType"/><label id='MissionReportButtons' for="MissionType">Mission Type </label></li>
            <li><input type="checkbox" onClick={getChannels} className="hidden "  id="Channel"/><label id='MissionReportButtons' for="Channel">Channel </label></li>
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