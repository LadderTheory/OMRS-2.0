import React, { useState, useEffect } from "react";
import MissionsService from "../services/missions.service";
import { CSVLink } from "react-csv";



function ReportDisplay(props) {
    //Setup state to hold retrieved missions
    const [missions, setMissions] = useState([]);

    //useEffect is the react hook that triggers when the component loads
    useEffect(() => {
        //The filters from the Mission Report component are passed as state and referenced with props.location.state
        retrieveMissions(props.location.state);
    }, []);

    //Queryies the database based on the filters that were configured on the Mission Report component, then sets the above declared mission state based on the data that comes back from the database
    const retrieveMissions = async (filter) => {
        const { data } = await MissionsService.findByParameters(filter);
        setMissions(data);
    }

    //declare a new const called date and set it equal to the current date time
    const date = new Date();
    //convert the date to display just year-mon-day format
    let convertDate = date.toISOString().substr(0, 10);

    //setup the headers for the csv export. Each key referes to a key value pair in the missions state.
    const headers = [
        { label: 'Mission Date', key: 'date' },
        { label: 'Mission Number', key: 'msnNumber' },
        { label: 'Callsign', key: 'callSign' },
        { label: 'Squadron', key: 'squadron.name' },
        { label: 'Mission Type', key: 'msnType.name' },
        { label: 'Channel', key: 'channel.name' },
        { label: 'Operation', key: 'operation.name' },
        { label: 'Aircraft', key: 'aircraft.name' },
        { label: 'Leg Number', key: 'legs.legNumber' },
        { label: 'Duration', key: 'legs.duration' },
        { label: 'ICAO Source', key: 'legs.ICAOSource.name' },
        { label: 'ICAO Destination', key: 'legs.ICAODest.name' },
        { label: 'Passengers On', key: 'legs.passengerOn' },
        { label: 'Passengers Through', key: 'legs.passengerThru' },
        { label: 'Passengers Off', key: 'legs.passengerOff' },
        { label: 'Cargo On', key: 'legs.cargoOn' },
        { label: 'Cargo Through', key: 'legs.cargoThru' },
        { label: 'Cargo Off', key: 'legs.cargoOff' },
        { label: 'Pallets On', key: 'legs.palletOn' },
        { label: 'Pallets Through', key: 'legs.palletThru' },
        { label: 'Pallets Off', key: 'legs.palletOff' },
        { label: 'Remarks', key: 'remarks' },
    ];

    return (
        <div>
            <div className="card p-0 mt-3 " id="reportdisplaycard">
                <div className="card-header" id="reportdisplayheader">
                    <h4>Airlift Mission Report</h4>
                </div>
                <div className="card-body" id="cardBody">
                    <div>
                        <div className="container horizontal-scrollable">
                            <div className="row text-center">
                                <table className="table table-striped" id="missionreport">
                                    <thead>
                                        <th>Mission Number</th>
                                        <th>LegNumber</th>
                                        <th>Callsign</th>
                                        <th>Commander</th>
                                        <th>Squadron</th>
                                        <th>Aircraft</th>
                                        <th>Base</th>
                                        <th>Mission Date</th>
                                        <th>Mission Type</th>
                                        <th>Channel</th>
                                        <th>Commercial Type</th>
                                        <th>Operation</th>
                                        <th>Remarks</th>
                                        <th>Scheduled Take Off</th>
                                        <th>Scheduled Land</th>
                                        <th>Actual Take Off</th>
                                        <th>Actual Land</th>
                                        <th>Duration</th>
                                        <th>Passengers On</th>
                                        <th>Passengers Off</th>
                                        <th>Passengers Through</th>
                                        <th>Cargo On</th>
                                        <th>Cargo Off</th>
                                        <th>Cargo Through</th>
                                        <th>Pallet On</th>
                                        <th>Pallet Off</th>
                                        <th>Pallet Through</th>
                                        <th>Max ACL</th>
                                        <th>ICAO Source</th>
                                        <th>ICAO Destination</th>
                                        <th>Leg Remarks</th>
                                    </thead>
                                    <tbody>
                                        {missions.map((mission) =>
                                            <tr>
                                                <td>{mission.msnNumber}</td>
                                                <td>{mission.legs.legNumber}</td>
                                                <td>{mission.callSign}</td>
                                                <td>{mission.commander}</td>
                                                <td>{mission.squadron.name}</td>
                                                <td>{mission.aircraft.name}</td>
                                                <td>{mission.base.name}</td>
                                                <td>{mission.date.substr(0, 10)}</td>
                                                <td>{mission.msnType.name}</td>
                                                <td>{mission.channel.name}</td>
                                                <td>{mission.commType.name}</td>
                                                <td>{mission.operation.name}</td>
                                                <td>{mission.remarks}</td>
                                                <td>{mission.legs.scheduledTakeOff}</td>
                                                <td>{mission.legs.scheduledLand}</td>
                                                <td>{mission.legs.actualTakeOff}</td>
                                                <td>{mission.legs.actualLand}</td>
                                                <td>{mission.legs.duration}</td>
                                                <td>{mission.legs.passengerOn}</td>
                                                <td>{mission.legs.passengerOff}</td>
                                                <td>{mission.legs.passengerThru}</td>
                                                <td>{mission.legs.cargoOn}</td>
                                                <td>{mission.legs.cargoOff}</td>
                                                <td>{mission.legs.cargoThru}</td>
                                                <td>{mission.legs.palletOn}</td>
                                                <td>{mission.legs.palletOff}</td>
                                                <td>{mission.legs.palletThru}</td>
                                                <td>{mission.legs.maxACL}</td>
                                                <td>{mission.legs.ICAOSource.name}</td>
                                                <td>{mission.legs.ICAODest.name}</td>
                                                <td>{mission.legs.remarks}</td>

                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='d-flex justify-content-center'>
                <CSVLink data={missions} headers={headers} filename={convertDate +".csv"} className="btn btn-lg " id="redButton">Export</CSVLink>
            </div>
        </div>
    )

}
export default ReportDisplay;