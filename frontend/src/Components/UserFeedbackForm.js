import React, { useState, useEffect } from 'react';
import ParameterService from '../services/Parameter.service';
import MissionDataService from "../services/missions.service";
import AuthService from "../services/auth.service";
import { Redirect } from "react-router-dom";
import NewAirLiftLeg from "./NewAirLiftLeg";

function UserFeedbackForm (props) {



    const [submitSuccess, setSubmitSuccess] = useState({submitted: false, message: ''});
    const [redirect, setRedirect] = useState(false);
    const currentUser = AuthService.getCurrentUser();



    const resetForm = () => {
        setSubmitSuccess({submitted: false});
    }



    return(
    
            <div>
            <form>
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <label for="exampleFormControlSelect1">Type of Feedback</label>
                            <select class="form-control" id="exampleFormControlSelect1">
                              <option>Select Type</option>
                              <option>Comment</option>
                              <option>Error Report</option>
                              <option>Suggestion</option>
                              <option>Help</option>
                              
                            </select>
                        </div>
                        <div className="col">
                            <label for="date">Name</label>
                            <input type="text" className="form-control" id="date" data-test="date" name="date"></input>
                        </div>
                        <div className="col">
                                <label for="date">Squadron</label>
                                <input type="text" className="form-control" id="date" data-test="date" name="date"></input>
                        </div>
                    </div>
                    <div className="row">
                        <div classname="col">
                            <label for="exampleFormControlSelect1">Urgency</label>
                            <select class="form-control" placeholder="Choose Urgency" id="exampleFormControlSelect1">
                              <option>Select Urgency</option>
                              <option>Mild/Not Urgent</option>
                              <option>Medium</option>
                              <option>High</option>
                              <option>Critical/Work Stoppage</option>                              
                            </select>
                        </div>
                        <div classname="col">
                            <label for="date">Office Phone Number</label>
                            <input type="text" className="form-control" id="date" data-test="date" name="date"></input>
                        </div>
                        <div classname="col">
                            <label for="date">Email Address</label>
                            <input type="text" className="form-control" id="date" data-test="date" name="date"></input>
                        </div>

                    </div>
                    <div classname="row">
                            <label for="date">Comments</label>
                            <textarea class="form-control" id="exampleFormControlTextarea1" rows="5"></textarea>
                    </div>
            </div>
            </form>
            </div>
    )
}

export default UserFeedbackForm;