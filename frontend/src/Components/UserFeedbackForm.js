import React, { useState } from 'react';
import FeedbackService from '../services/feedback.service';
import AuthService from '../services/auth.service';


function UserFeedbackForm (props) {

    const currentUser = AuthService.getCurrentUser();
    const initialInput = {
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        squadron: currentUser.squadron,
        phone: currentUser.phone,
        email: currentUser.email}
    const [input, setInput] = useState(initialInput);
    const [message, setMessage] = useState('');
   

    const addFeedback = async () =>{
        try {
            const {data} = await FeedbackService.addFeedback(input);
            setMessage(data);
        } catch (err) {
            console.log(err);
        }
    }

    const changeInput = (e) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });
    }



    return(
    
            <div className="container">            
                <div className="card p-0">
                    <div className="card-header" id="cardHeader">
                        <h3>User Feedback</h3>
                    </div>          
                    <div className="card-body" id="cardBody">
                        <div classname="row">          
                        <div className="col">
                            <label>Type of Feedback</label>
                            <select className="form-control" name="feedbackType" id="feedbackType" onChange={changeInput}>
                              <option value="">Select Type</option>
                              <option value="comment">Comment</option>
                              <option value="error">Error Report</option>
                              <option value="suggestion">Suggestion</option>
                              <option value="help">Help</option>                              
                            </select>
                        </div>
                        <div className="col">
                            <label>Urgency</label>
                            <select className="form-control" id="urgency" name="urgency" onChange={changeInput}>
                              <option value="">Select Urgency</option>
                              <option value="low">Mild/Not Urgent</option>
                              <option value="medium">Medium</option>
                              <option value="high">High</option>
                              <option value="critical">Critical/Work Stoppage</option>                              
                            </select>
                        </div>
                        </div>
                        <div className="row">         
                        <div className="col">
                            <label >First Name</label>
                            <input className="form-control" id="firstName" value={currentUser.firstName} name="firstName"></input>
                        </div>
                        <div className="col">
                            <label >Last Name</label>
                            <input className="form-control" id="lastName" value={currentUser.lastName} name="lastName"></input>
                        </div>
                        </div>
                        <div className="form-group">
                            <label >Squadron</label>
                            <input className="form-control" id="squadron" value={currentUser.squadron} name="squadron"></input>
                        </div>
                        <div className="row">
                        <div className="col">
                            <label>Office Phone Number</label>
                            <input className="form-control" id="phone" value={currentUser.phone} name="phone"></input>
                        </div>
                        <div className="col">
                            <label>Email Address</label>
                            <input className="form-control" id="email" value={currentUser.email} name="email"></input>
                        </div>
                        </div>     
                    <div className="form-group">
                            <label>Comments</label>
                            <textarea className="form-control" id="feedback" rows="5" name="feedback" placeholder="Enter your comments here. If reporting a bug, please be as detailed as possible." onChange={changeInput}></textarea>
                    </div>
                    <div classname="col justify-content-center">                
                        <button className="btn btn-danger btn-block btn-lg" onClick={addFeedback}>Submit Feedback</button>
                    </div>
                    </div>

            {message}
            </div>

            </div>            
    )
}

export default UserFeedbackForm;