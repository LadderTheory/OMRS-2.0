import React, { useState, useEffect } from "react";
import MissionsService from "../services/missions.service";
import { CSVLink } from "react-csv";

function ReportDisplay(props) {
    //Setup state to hold retrieved missions
    const [missions, setMissions] = useState([]);
    const [csvExportMessage, setCsvExportMessage] = useState("");

    //useEffect is the react hook that triggers when the component loads
    useEffect(() => {
        //The filters from the Mission Report component are passed as state and referenced with props.location.state
        console.log(props.location.state)
        retrieveMissions(props.location.state);
    }, []);

    //Queryies the database based on the filters that were configured on the Mission Report component, then sets the above declared mission state based on the data that comes back from the database
    const retrieveMissions = async (filter) => {
        const { data } = await MissionsService.findByParameters(filter);
        setMissions(data);
    }

    const setMessage = () => {
        setCsvExportMessage("The CSV has successfully been generated");
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
                                        <tr>
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
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {missions.map((mission) =>
                                            <tr>
                                                <td name={mission.msnNumber}>{mission.msnNumber}</td>
                                                <td name={mission.legs.legNumber}>{mission.legs.legNumber}</td>
                                                <td name={mission.callSign}>{mission.callSign}</td>
                                                <td name={mission.commander}>{mission.commander}</td>
                                                <td name={mission.squadron.name}>{mission.squadron.name}</td>
                                                <td name={mission.aircraft.name}>{mission.aircraft.name}</td>
                                                <td name={mission.base.name}>{mission.base.name}</td>
                                                <td name={mission.date.substr(0, 10)}>{mission.date.substr(0, 10)}</td>
                                                <td name={mission.msnType.name}>{mission.msnType.name}</td>
                                                <td name={mission.channel.name}>{mission.channel.name}</td>
                                                <td name={mission.commType ? 'Yes' : 'No'}>{mission.commType ? 'Yes' : 'No'}</td>
                                                <td name={mission.operation.name}>{mission.operation.name}</td>
                                                <td name={mission.remarks}>{mission.remarks}</td>
                                                <td name={mission.legs.scheduledTakeOff}>{mission.legs.scheduledTakeOff}</td>
                                                <td name={mission.legs.scheduledLand}>{mission.legs.scheduledLand}</td>
                                                <td name={mission.legs.actualTakeOff}>{mission.legs.actualTakeOff}</td>
                                                <td name={mission.legs.actualLand}>{mission.legs.actualLand}</td>
                                                <td name={mission.legs.duration}>{mission.legs.duration}</td>
                                                <td name={mission.legs.passengerOn}>{mission.legs.passengerOn}</td>
                                                <td name={mission.legs.passengerOff}>{mission.legs.passengerOff}</td>
                                                <td name={mission.legs.passengerThru}>{mission.legs.passengerThru}</td>
                                                <td name={mission.legs.cargoOn}>{mission.legs.cargoOn}</td>
                                                <td name={mission.legs.cargoOff}>{mission.legs.cargoOff}</td>
                                                <td name={mission.legs.cargoThru}>{mission.legs.cargoThru}</td>
                                                <td name={mission.legs.palletOn}>{mission.legs.palletOn}</td>
                                                <td name={mission.legs.palletOff}>{mission.legs.palletOff}</td>
                                                <td name={mission.legs.palletThru}>{mission.legs.palletThru}</td>
                                                <td name={mission.legs.maxACL}>{mission.legs.maxACL}</td>
                                                <td name={mission.legs.ICAOSource.name}>{mission.legs.ICAOSource.name}</td>
                                                <td name={mission.legs.ICAODest.name}>{mission.legs.ICAODest.name}</td>
                                                <td name={mission.legs.remarks}>{mission.legs.remarks}</td>

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
                <CSVLink data={missions} headers={headers} filename={convertDate +".csv"} className="btn btn-lg " onClick={setMessage} id="redButton">Export</CSVLink>
                {csvExportMessage}
            </div>
        </div>
    )

}
export default ReportDisplay;