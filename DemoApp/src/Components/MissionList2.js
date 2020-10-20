import React, { useState, useEffect } from "react";
import MissionsService from "../services/missions.service";
import AuthService from "../services/auth.service";
import { Redirect, Link } from "react-router-dom";

function MissionList2() {

    const [missions, setMissions] = useState([]);
    const [searchedMissions, setSearchedMissions] = useState([]);
    const [currentMsn, setCurrentMission] = useState();
    const [currentIndex, setCurrentIndex] = useState(-1);

    useEffect(() => {
        getAirLiftMsns();
    }, []);

    //Retrieves all of the data in the missions collection in the database
    const getAirLiftMsns = async () => {
        const { data } = await MissionsService.getAirLiftMsns();
        setMissions(data);
    };


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSearchedMissions({ ...searchedMissions, [name]: value });
    }

    const handleSearch = async () => {
        const { data } = await MissionsService.findByMsnNum(searchedMissions.msnNumber);
        console.log(data);
        setMissions(data);
    }

    const clearFilters = () => {
        getAirLiftMsns()
    }

    return (
        <div className="list row d-flex justify-content-start" id="missionList" data-test="component-MissionList">
            <div className="col-md-3">

            </div>


            <div className="col-sm-3">

                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by Msn Number"
                        name="msnNumber"
                        value={searchedMissions.msnNumber}
                        onChange={handleInputChange}
                    />
                    <div className="input-group-append">

                        <button
                            className="btn btn-dark"
                            type="button"
                            onClick={handleSearch}
                        >
                        Search
                        </button>
                    </div>
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
                            {mission.msnNumber}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="col-md-6">
                {currentMsn ? (
                    <div>
                        <h4>Mission</h4>
                        <p><br></br></p>
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
                ) : (
                        <div>
                            <br />
                            <p>Click on a mission number to display it's details.</p>
                        </div>
                    )}
            </div>
        </div>
    );
}

export default MissionList2;