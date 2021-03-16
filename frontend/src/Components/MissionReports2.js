import React, { useState, useRef } from 'react';
import ParametersService from '../services/Parameter.service';
import DataManagementFilterType from '../Components/ReportFilterTypes/DataManagementType';
import TextFilterType from '../Components/ReportFilterTypes/TextType';
import DateFilterType from '../Components/ReportFilterTypes/DateType';
import { get } from 'mongoose';
//Function for the Mission Reports Component
function MissionReports2(props) {
    const form = useRef();
    const [ActiveComponents, setActiveComponents] = useState([]);
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

            DataFilterType('squadron', data, 'Squadron');
        }
        else if (e.target.checked === false) {
            FilterInactive('squadron');
        }
    }
    /* When the click event is triggered if the check status is found true then the database is 
    queried for a list of Aircraft and then the data returned from the database is
    passed into a child component drop down list which allows the user select from a list of Aircraft.
    When the button is re-clicked the component disappears.*/
    const getAirframes = async (e) => {
        if (e.target.checked === true) {
            const { data } = await ParametersService.retrieveAircraft();
            DataFilterType('aircraft', data, 'Aircraft');
        }
        else if (e.target.checked === false) {
            FilterInactive('aircraft');
        }
    }
    /* When the click event is triggered if the check status is found true then the database is 
    queried for a list of bases and then the data returned from the database is
    passed into a child component drop down list which allows the user select from a list of bases.
    When the button is re-clicked the component disappears.*/
    const getBases = async (e) => {
        if (e.target.checked === true) {
            const { data } = await ParametersService.retrieveBases();
            DataFilterType('base', data, 'Base');
        }
        else if (e.target.checked === false) {
            FilterInactive('base');
        }
    }
    /* When the click event is triggered if the check status is found true then the database is 
    queried for a list of channels and then the data returned from the database is
    passed into a child component drop down list which allows the user select from a list of channels.
    When the button is re-clicked the component disappears.*/
    const getChannels = async (e) => {
        if (e.target.checked === true) {
            const { data } = await ParametersService.retrieveChannels();
            DataFilterType('channel', data, 'Channel');
        }
        else if (e.target.checked === false) {
            FilterInactive('channel');
        }
    }
    
    /* When the click event is triggered if the check status is found true then the database is 
    queried for a list of mission types and then the data returned from the database is
    passed into a child component drop down list which allows the user select from a list of mission types.
    When the button is re-clicked the component disappears.*/
    const getMsnTypes = async (e) => {
        if (e.target.checked === true) {
            const { data } = await ParametersService.retrieveMsnTypes();
            DataFilterType('msnType', data, 'Mission Type');
        }
        else if (e.target.checked === false) {
            FilterInactive('msnType');
        }
    }
    /* When the click event is triggered if the check status is found true then the database is 
    queried for a list of operations and then the data returned from the database is
    passed into a child component drop down list which allows the user select from a list of operations.
    When the button is re-clicked the component disappears.*/
    const getOperations = async (e) => {
        if (e.target.checked === true) {
            const { data } = await ParametersService.retrieveOperations();
            DataFilterType('operation', data, 'Operation');
        }
        else if (e.target.checked === false) {
            FilterInactive('operation');
        }
    }
    /* When the click event is triggered if the check status is found true then 
    a child text input component is spawned for a user to enter in a CallSign.
    When the button is re-clicked the component disappears.*/
    const getCallsign = async (e) => {
        if (e.target.checked === true) {
            TextType('callSign', 'CallSign');
        }
        else if (e.target.checked === false) {
            FilterInactive('callSign');
        }
    }
    /* When the click event is triggered if the check status is found true 
    then a child text input component is spawned for a user to enter in a Mission Number.
    When the button is re-clicked the component disappears.*/
    const getMissionNumber = async (e) => {
        if (e.target.checked === true) {
            TextType('msnNumber', 'Mission Number');
        }
        else if (e.target.checked === false) {
            FilterInactive('msnNumber');
        }
    }
    /* When the click event is triggered if the check status is found true then a child text input component 
    is spawned for a user to enter in a Commander.
    When the button is re-clicked the component disappears.*/
    const getCommander = async (e) => {
        if (e.target.checked === true) {
            TextType('commander', 'Commander');
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

    //when the click event is triggered, if the check status is found to be true, then a child input component is spawned for a user to enter in the selected report filter. When the button is de-selected, the component disappears.
    const getAll = async (e) => {
        e.persist();

        //template json for dataFitlerType
        const dft_template = (id, name, label, dataFunction) => {
            return {
                id: id,
                name: name,
                label: label,
                dataFunction: dataFunction,
            }
        }

        //template json for textTypes
        const tt_template = (id, name, label) => {
            return {
                id: id,
                name: name,
                label: label,
            }
        }

        //json for every dataFilterType button
        let dataFilterTypes = [
            dft_template("Squadron", "squadron", "Squadron", ParametersService.retrieveSquadrons),
            dft_template("Airframe", "aircraft", "Aircraft", ParametersService.retrieveAircraft),
            dft_template("Base", "base", "Base", ParametersService.retrieveBases),
            dft_template("Channel", "channel", "Channel", ParametersService.retrieveChannels),
            dft_template("MissionType", "msnType", "Mission Type", ParametersService.retrieveMsnTypes),
            dft_template("Operation", "operation", "Operation", ParametersService.retrieveOperations),
        ]

        //json for every TextType button
        let textTypes = [
            tt_template("CallSign", "callSign", "CallSign"),
            tt_template("MissionNum", "msnNumber", "Mission Number"),
            tt_template("Commander", "commander", "Commander")
        ]

        //json for Date button
        let dateType = {
            id: "MissionDate",
            name: "date",
            label: "Mission Date"
        }

        //checks whether the id from the template is equal to the id from the target
        const idCheck = (element) => {
            let eid = element.id;
            let etid = e.target.id;
            return eid === etid;
        }

        if (e.target.checked === true) {
            let found = false;
            for (let i = 0; i < dataFilterTypes.length && !found; i += 1) {
                let x = dataFilterTypes[i];
                if (idCheck(x)) {
                    const { data } = await x.dataFunction();
                    DataFilterType(x.name, data, x.label);
                    found = true;
                }
            }
            for (let i = 0; i < textTypes.length && !found; i += 1) {
                let x = textTypes[i];
                if (idCheck(x)) {
                    TextType(x.name, x.label)
                    found = true;
                }
            }
            if (idCheck(dateType)) {
                DateType();
            }
        }
        else if (e.target.checked === false) {
            FilterInactive(e.target.name);
        }
    }//end getAll()

    //Spawns a Data Managment Filter Type component based on the name passed in
    const DataFilterType = (name, data, label) => {
        setActiveComponents([...ActiveComponents, <DataManagementFilterType key={name} selectedFilter={name} data={data} handleChange={handleFilterChange} label= {label}/>])
    }
    //Spawns a Text Filter Type component based on the name passed in
    const TextType = (name, label) => {
        setActiveComponents([...ActiveComponents, <TextFilterType key={name} selectedFilter={name} handleChange={handleFilterChange} label={label}/>])
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

    const handleSubmit = (e) => {
        e.preventDefault();
        props.history.push({ pathname: '/reportdisplay', state: filter });
    }

    const filter_template = (id, name, label) => {
        return {
            id: id, 
            name: name, 
            label: label
        }
    }

    let filters = [
        filter_template("MissionDate", "date", "Mission Date"),
        filter_template("MissionNum", "msnNumber", "Mission Number"),
        filter_template("CallSign", "callSign", "CallSign"),
        filter_template("Commander", "commander", "Commander"),
        filter_template("Squadron", "squadron", "Squadron"),
        filter_template("Airframe", "aircraft", "Aircraft"),
        filter_template("Operation", "operation", "Operation"),
        filter_template("Base", "base", "Base"),
        filter_template("MissionType", "msnType", "Mission Type"),
        filter_template("Channel", "channel", "Channel"),
    ];

    let oldnav = (
        <nav className="navbar navbar-expand navbar-dark justify-content-center mt-2" id="data-Management-Component">
            <ul className="nav navbar-nav navbar-dark justify-content-center">
                <li><input type="checkbox" className="hidden " onClick={getAll} id="MissionDate" name="date"/><label id='MissionReportButtons' htmlFor="MissionDate">Mission Date</label></li>
                <li><input type="checkbox" className="hidden " onClick={getAll} id="MissionNum" name="msnNumber"/><label id='MissionReportButtons' htmlFor="MissionNum">Mission Number</label></li>
                <li><input type="checkbox" className="hidden " onClick={getAll} id="CallSign" name="callSign"/><label id='MissionReportButtons' htmlFor="CallSign">CallSign </label></li>
                <li><input type="checkbox" className="hidden " onClick={getAll} id="Commander" name="commander"/><label id='MissionReportButtons' htmlFor="Commander">Commander </label></li>
                <li><input type="checkbox" className="hidden " onClick={getAll} id="Squadron" name="squadron"/><label id='MissionReportButtons' htmlFor="Squadron">Squadron </label></li>
                <li><input type="checkbox" className="hidden " onClick={getAll} id="Airframe" name="aircraft"/><label id='MissionReportButtons' htmlFor="Airframe">Airframe </label></li>
                <li><input type="checkbox" className="hidden " onClick={getAll} id="Operation" name="operation"/><label id='MissionReportButtons' htmlFor="Operation">Operation </label></li>
                <li><input type="checkbox" className="hidden " onClick={getAll} id="Base" name="base"/><label id='MissionReportButtons' htmlFor="Base">Base </label></li>
                <li><input type="checkbox" className="hidden " onClick={getAll} id="MissionType" name="msnType"/><label id='MissionReportButtons' htmlFor="MissionType">Mission Type </label></li>
                <li><input type="checkbox" className="hidden " onClick={getAll} id="Channel" name="channel"/><label id='MissionReportButtons' htmlFor="Channel">Channel </label></li>
            </ul>
        </nav>
    );

    let newnav = (
        <table 
            style={{
                //display:'inline-block',
                //width:"100%",
                //backgroundColor:'#303841',
                tableLayout:'fixed',
            }}
        >
            {(() => {
                let mapped = filters.map(
                    x => (<>
                        <input 
                            type="checkbox" 
                            onClick={getAll} 
                            id={x.id} 
                            name={x.name}
                            style={{
                                display:'none',
                            }}
                        />
                        <label 
                            id="MissionReportButtons" 
                            htmlFor={x.id}
                            width='100%'
                        >
                            {x.label}
                        </label>
                    </>)
                )

                let table = [];
                let row = [];

                mapped.forEach((x) => {
                    row.push(x);
                    if (row.length == 4) {
                        table.push(row);
                        row = [];
                    }
                })

                if (row.length != 0) {
                    table.push(row);
                }

                let table_style = {
                    //width:'100%',
                    //float:'right',
                    //border:'solid',
                }

                let cell_style = {
                    'text-align':'center',
                    border:'solid',
                    "border-color":'#253336',
                }

                return (table.map((y) => {
                    return (
                        <tr>
                            {y.map((x) => (<td style={cell_style}>{x}</td>))}
                        </tr>
                    )
                }));
            })()}
        </table>
    );

    return (
        <div>
            {/*oldnav*/}
            <div className="card p-0 mt-5 overflow" id="reportdisplaycard">
                <div className="card-header" id="reportdisplayheader">
                    <h4>Selected Filters</h4>
                    {newnav}
                </div>
                <div className="card-body" id="cardBody">
                    <form ref={form} onSubmit={handleSubmit}>
                        {ActiveComponents.length === 0 ? "Select filter(s) from the bar above" : ActiveComponents}
                        <div className="d-flex justify-content-end">
                            <button className="btn btn-lg" id="redButton">Next</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default MissionReports2;