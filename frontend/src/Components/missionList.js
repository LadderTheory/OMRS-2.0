import React, { useState, useEffect } from "react";
import MissionsService from "../services/missions.service";
import AuthService from "../services/auth.service";
import { Redirect, Link } from "react-router-dom";
import ParametersService from "../services/Parameter.service";

function MissionList() {

    const [missions, setMissions] = useState([]);
    const [currentMsn, setCurrentMission] = useState();
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [filter, setFilter] = useState();
    const [squadrons, setSquadrons] = useState([]);

    useEffect(() => {
        getAirLiftMsns();
        getSquadrons();
    }, []);

    //Retrieves all of the data in the missions collection in the database
    const getAirLiftMsns = async () => {
        const { data } = await MissionsService.getAirLiftMsns();
        setMissions(data);
    };

    const getSquadrons = async () => {
        const { data } = await ParametersService.retrieveSquadrons();
        setSquadrons(data);
    }

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilter({ ...filter, [name]: value })
    }

    const handleSearch = async () => {
        const { data } = await MissionsService.findByDateRange(filter);
        setMissions(data);
    }

    const clearFilters = () => {
        getAirLiftMsns()
        document.getElementById("dateStart").value = null;
        document.getElementById("dateEnd").value = null;
        document.getElementById("squadron").value = "";
        setFilter();
    }

    return (
        <div className="container" data-test="component-MissionList">
            <div className="row">


                <div className="col">
                    <div className="form-groups d-flex justify-content-center">

                        <input type="date" className="form-control mb-1" id="dateStart" onChange={handleFilterChange} name="start"></input>
                        <input type="date" className="form-control mb-1" id="dateEnd" onChange={handleFilterChange} name="end"></input>
                    </div>
                    <div className="form-group">
                        <select  className="form-control mb-1" onChange={handleFilterChange} name="squadron">
                            <option value=''>Squadron</option>
                            {squadrons.map((squadron) => (<option value={squadron._id}>{squadron.name}</option>))}
                        </select>
                        <button className="form-control btn" id="searchmsn" type="button" onClick={handleSearch}>Search</button>
                    </div>
                    
                    <h4>Missions List: </h4>
                    <p>All data is test data only</p>
                    <ul className="list-group">
                        <button className="btn btn-dark" type="button" onClick={clearFilters}>Clear Filters</button>
                        {missions.map((mission, index) => (
                            <li
                                className={
                                    "list-group-item " +
                                    (index === currentIndex ? "active" : "")
                                }
                                onClick={() => setCurrentMission(mission, index)}
                                key={index}
                            >
                                {mission.callSign}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="col">
                    {currentMsn ? (
                        <div className="card p-1 mt-0" id="msnlistcard">
                            <div className="card-header" id="msnlistheader">
                                <h4>Mission</h4>
                            </div>
                            <div className="card-body" id="msnlistbody">
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
                                    {currentMsn.date}
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
                                    {currentMsn.commType.name}
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
                                    to={"missionList/update/" + currentMsn._id}
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