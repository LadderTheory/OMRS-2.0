import React, { useState, useEffect } from "react";
import MissionsService from "../services/missions.service";
import AuthService from "../services/auth.service";
import { Redirect, Link } from "react-router-dom";
import ParametersService from "../services/Parameter.service";

function ReportDisplay(props) {
    const [missions, setMissions] = useState([]);

    useEffect(() => {
        retrieveMissions(props.location.state);
    }, []);

    const retrieveMissions = async (filter) => {
        const { data } = await MissionsService.findByParameters(filter);
        setMissions(data);
    }

    return(
        <div className="card p-1 mt-0" id="msnlistcard">
                            <div className="card-header" id="msnlistheader">
                                <h4>Airlift Mission Report</h4>
                            </div>
                            <div className="card-body" id="msnlistbody">
                                <div>
                                    </div>
                                </div>
                                </div>
    )

}
export default ReportDisplay;