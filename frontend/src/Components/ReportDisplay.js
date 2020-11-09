import React, { useState, useEffect } from "react";
import MissionsService from "../services/missions.service";



function ReportDisplay(props) {
    //Array to hold retrieved missions
    const [missions, setMissions] = useState([]);

    useEffect(() => {
        retrieveMissions(props.location.state);
        
    }, []);

    //passes the data query to the database
    const retrieveMissions = async (filter) => {
        const { data } = await MissionsService.findByParameters(filter);
        setMissions(data);
    }

    
    return(
        <div>
        <div className="card p-0 mt-3 " id="reportdisplaycard">
                            <div className="card-header" id="reportdisplayheader">
                                <h4>Airlift Mission Report</h4>
                            </div>
                <div className="card-body" id="cardBody">
                <div>
                <div className="container horizontal-scrollable"> 
                <div className="row text-center"> 
                                <table className="table table-striped">
                <thead>
                    
                        <th>Mission Number</th>
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
                        <th>LegNumber</th>
                        <th>Scheduled Take Off</th>
                        <th>Scheduled Land</th>
                        <th>Actual Take Off</th>
                        <th>Actual Land</th>
                        <th>Duration</th>
                        <th>Passenger On</th>
                        <th>Passenger Off</th>
                        <th>Passenger Through</th>
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
                       <td>{mission.callSign}</td>
                       <td>{mission.commander}</td>
                       <td>{mission.squadron}</td>
                       <td>{mission.aircraft}</td>
                       <td>{mission.base}</td>
                       <td>{mission.date}</td>
                       <td>{mission.msnType}</td>
                       <td>{mission.channel}</td>
                       <td>{mission.commType}</td>
                       <td>{mission.operation}</td>
                       <td>{mission.remarks}</td>
                       <td>{mission.legs.legNumber}</td>
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
                       <td>{mission.legs.ICAOSource}</td>
                       <td>{mission.legs.ICAODest}</td>
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
                <button type='button' id='Exportbutton' className='btn btn-lg '>Export to CSV</button> 
                </div>
        </div>
    )

}
export default ReportDisplay;