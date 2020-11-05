import React, { useState, useEffect } from "react";
import MissionsService from "../services/missions.service";
import AuthService from "../services/auth.service";
import { Redirect, Link } from "react-router-dom";
import ParametersService from "../services/Parameter.service";

function ReportDisplay(props) {
    const [missions, setMissions] = useState([]);

    useEffect(() => {
        const { request } = props.location.state
        console.log(request);
    }, []);

    return(
        <div>
        <div className="card p-1 mt-0 overflow" id="reportdisplaycard">
                            <div className="card-header" id="msnlistheader">
                                <h4>Airlift Mission Report</h4>
                            </div>
                            <div className="card-body" id="msnlistbody">
                            <div className="d-flex justify-content-center ">
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Mission Number</th>
                        <th>callSign</th>
                        <th>Squadron</th>
                        <th>Aircraft</th>
                        <th>Base</th>
                        <th>Mission Type</th>
</tr>
                        <tr>
                        <th>Mission Date</th>
                        <th>Remarks</th>
                        <th>commander</th>
                        <th>Channel</th>
                        <th>Commercial Type</th>
                        <th>Operation</th>
                        </tr>

                        <tr><th>Scheduled Take Off</th>
                        <th>Scheduled Land</th>
                        <th>Actual Take Off</th>
                        <th>Source Base</th>
                        <th>Destination Base</th>
                        <th>Duration</th></tr>
                        
                        <tr> <th>Passenger On</th>
                        <th>Passenger Off</th>
                        <th>Passenger Thru</th>
                        <th>Cargo On</th>
                        <th>Cargo Off</th>
                        <th>Cargo Thru</th></tr>
                       
                       <tr><th>Pallet On</th>
                        <th>Pallet Off</th>
                        <th>Pallet Thru</th>
                        <th>Remarks</th>
</tr>
                        
                    
                </thead>
                <tbody>
               
                </tbody>
            </table>
            
        </div>
                                </div>
                                </div>
                                <div className='d-flex justify-content-center'>
                                <button id='Exportbutton' type='button' className='btn btn-lg  '>Export to CSV</button>
                               </div> 
                               </div>
    )

}
export default ReportDisplay;