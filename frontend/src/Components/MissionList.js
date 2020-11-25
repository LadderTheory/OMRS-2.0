import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MissionsService from '../services/missions.service';
import ParametersService from '../services/Parameter.service';


//Function for the mission list component
function MissionList() {
    const [missions, setMissions] = useState([]);
    const [currentMsn, setCurrentMission] = useState();
    const [selectedListItemIndex, setSelectedListItemIndex] = useState(-1);
    const [filter, setFilter] = useState({start: '', end:''});

    

    //Gets a list of air lift missions and squadrons when the component loads
    useEffect(() => {
        const today = new Date();
        const twoDaysAgo = today.setDate(today.getDate() - 2);
        const initialFilter  = { start: new Date(twoDaysAgo).toISOString().split('T')[0] , end: new Date().toISOString().split('T')[0] };
        initialSearch(initialFilter);
    }, []);

    //Retrieves all of the data in the missions collection in the database
    const getAirLiftMsns = async () => {
            const { data } = await MissionsService.getAirLiftMsns();
            setMissions(data);
    };
    //Sets a filter's value based on the name and new value of the item that triggered the function
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilter({ ...filter, [name]: value })
    }
    const handleStartChange = (e) =>{
        const { value } = e.target;
        setFilter({...filter, start: value, end: value});
    }
    const initialSearch = async (initialFilter) =>{
        const { data } = await MissionsService.findByFilter(initialFilter);
        setMissions(data);
    }
    //Queries the database based on the parameters set in the filter array
    const handleSearch = async () => {
        console.log('Test');
        const { data } = await MissionsService.findByFilter(filter);
        setMissions(data);
        
    }
    //Grabs the corresponding mission from the list when it is clicked
    const setActiveMission = (mission, index) => {
        setCurrentMission(mission);
        setSelectedListItemIndex(index);
    }

    //Clears the currently active filters
    const clearFilters = () => {
        getAirLiftMsns()
        document.getElementById("dateStart").value = "";
        document.getElementById("dateEnd").value = "";
        document.getElementById("msnNumber").value = "";
        setFilter({});
    }

    return (
        <div className="container" data-test="component-MissionList">
            <div className="row">


                <div className="col">
                    <div className="form-groups d-flex justify-content-center">

                        <input type="date" className="form-control mb-1" id="dateStart" onChange={handleStartChange} name="start"></input>
                        <input type="date" className="form-control mb-1" id="dateEnd" onChange={handleFilterChange} name="end" value={filter.end}></input>
                    </div>
                    <div className="form-group">
                        <input className='form-control mb-1' onChange={handleFilterChange} placeholder='Mission Number' name='msnNumber' id='msnNumber' data-testid="msnNumber"  autofill="off" 
              autocomplete="off"></input>
                        <button className="form-control btn" id="redButton" type="button" onClick={handleSearch} data-testid="search">Search</button>
                    </div>
                    
                    <h4>Missions List: </h4>
                    <p>All data is test data only</p>
                    <ul className="list-group">
                        <button className="btn btn-dark" type="button" onClick={clearFilters} data-testid="clear">Clear Filters</button>
                        {missions && missions.map((mission, index) => (
                            <li
                                id="listItem"
                                className={"list-group-item " + (index === selectedListItemIndex ? "active" : "") }
                                onClick={() => setActiveMission(mission, index)}
                                key={index}
                                data-testid="mission-listitem"
                            >
                                {mission.callSign}
                                {"  "}   
                                {mission.msnNumber}
                                {"  "}   
                                {mission.aircraft.name} 

                                
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="col">
                    {currentMsn ? (
                         <div className="card p-0 mt-0 ml-1" id="msnListCard">
                            <div className="card-header" id="cardHeader">
                                <h4>Mission</h4>
                            </div>
                            <div className="card-body" id="cardBody">
                                <div>
                                    <label>
                                        <strong>Mission #:</strong>
                                    </label>{" "}
                                    {currentMsn.msnNumber}
                                </div>
                                <div>
                                    <label>
                                        <strong>Mission Date:</strong>
                                    </label>{" "}
                                    {currentMsn.date.substr(0, 10)}
                                </div>
                                <div>
                                    <label>
                                        <strong>Commander:</strong>
                                    </label>{" "}
                                    {currentMsn.commander}
                                </div>
                                <div>
                                    <label>
                                        <strong>CallSign:</strong>
                                    </label>{" "}
                                    {currentMsn.callSign}
                                </div>
                                <div>
                                    <label>
                                        <strong>Squadron:</strong>
                                    </label>{" "}
                                    {currentMsn.squadron.name}
                                </div>
                                <div>
                                    <label>
                                        <strong>Aircraft:</strong>
                                    </label>{" "}
                                    {currentMsn.aircraft.name}
                                </div>
                                <div>
                                    <label>
                                        <strong>Mission Type:</strong>
                                    </label>{" "}
                                    {currentMsn.msnType.name}
                                </div>
                                <div>
                                    <label>
                                        <strong>Commercial Type:</strong>
                                    </label>{" "}
                                    {currentMsn.commType ? 'Yes' : 'No'}
                                </div>
                                <div>
                                    <label>
                                        <strong>Channel:</strong>
                                    </label>{" "}
                                    {currentMsn.channel.name}
                                </div>
                                <div>
                                    <label>
                                        <strong>Base:</strong>
                                    </label>{" "}
                                    {currentMsn.base.name}
                                </div>
                                <div>
                                    <label>
                                        <strong>Operation:</strong>
                                    </label>{" "}
                                    {currentMsn.operation.name}
                                </div>

                                <Link
                                    to={"editairliftmsn/" + currentMsn._id}
                                    className="badge badge-warning">
                                    Edit
                                </Link>
                            </div>
                        </div> 
                    ) : (
                            <div>
                                <br />
                                <p>Click on a mission number to display it's details.</p>
                            </div>
                        )}
                </div>
            </div>
        </div>
    );
}

export default MissionList;