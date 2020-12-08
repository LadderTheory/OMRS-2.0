import React, { useState, useRef, useEffect } from 'react';
import FeedbackService from '../services/feedback.service';

function UserFeedbackForm(props) {
    const initialInput = {
        firstName: "",
        lastName: "",
        squadron: "",
        phone: "",
        email: ""
    }
    //This is where the current user information is set into the form. This isnformation is automatically pulled from the user profile.
    const form = useRef();
    const [input, setInput] = useState(initialInput);
    const [message, setMessage] = useState('');

    useEffect(() => {
        // const currentUser = AuthService.getCurrentUser();
        // setInput({
        //     firstName: currentUser.firstName,
        //     lastName: currentUser.lastName,
        //     squadron: currentUser.squadron,
        //     phone: currentUser.phone,
        //     email: currentUser.email
        // })
    }, []);

    //This function allows the user to submit feedback that will be stored in the database
    const addFeedback = async (e) => {
        e.preventDefault();
        try {
            const { data } = await FeedbackService.addFeedback(input);
            setMessage(data);
        } catch (err) {
            console.log(err);
        }
    }

    //this function changes the value of input to whatever text is being input in the active field.
    const changeInput = (e) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });
    }

    //this code returns the rendered component to the page
    return (
        <div className="container">
            <form ref={form} onSubmit={addFeedback}>
                <div className="card p-0">
                    <div className="card-header" id="cardHeader">
                        <h3>User Feedback</h3>
                    </div>
                    <div className="card-body align-items-center" id="cardBody">
                        <div className="row">
                            <div className="col">
                                <label htmlFor="feedbackType">Type of Feedback</label>
                                <select className="form-control" name="feedbackType" id="feedbackType" onChange={changeInput} required>
                                    <option value="">Select Type</option>
                                    <option value="comment">Comment</option>
                                    <option value="error">Error Report</option>
                                    <option value="suggestion">Suggestion</option>
                                    <option value="help">Help</option>
                                </select>
                            </div>
                            <div className="col">
                                <label>Urgency</label>
                                <select className="form-control" id="urgency" name="urgency" onChange={changeInput} required>
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
                                <label htmlFor="firstName">First Name</label>
                                <input autofill="off" autoComplete="off" type="text" className="form-control" id="firstName" value={input.firstName} name="firstName" onChange={changeInput} required pattern="[A-Za-z]{1,}" title="This field should contain only upper and lowercase letters"/>
                            </div>
                            <div className="col">
                                <label htmlFor="lastName">Last Name</label>
                                <input autofill="off" autoComplete="off" type="text" className="form-control" id="lastName" value={input.lastName} name="lastName" onChange={changeInput} required pattern="[A-Za-z]{1,}" title="This field should contain only upper and lowercase letters" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="squadron">Squadron</label>
                            <input autofill="off" autoComplete="off" type="text" className="form-control" id="squadron" value={input.squadron.name} name="squadron" onChange={changeInput} required pattern="[A-Za-z]{1,}" title="This field should contain only upper and lowercase letters" />
                        </div>
                        <div className="row">
                            <div className="col">
                                <label htmlFor="phone">Office Phone Number</label>
                                <input autofill="off" autoComplete="off" type="tel" className="form-control" id="phone" value={input.phone} name="phone" onChange={changeInput} pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" title="This field should contain only whole numbers and dashes in the format of 111-111-1111" />
                            </div>
                            <div className="col">
                                <label htmlFor="email">Email Address</label>
                                <input autofill="off" autoComplete="off" type="email" className="form-control" id="email" value={input.email} name="email" onChange={changeInput} required />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="feedback">Comments</label>
                            <textarea autofill="off" autoComplete="off" className="form-control" id="feedback" rows="5" name="feedback" placeholder="Enter your comments here. If reporting a bug, please be as detailed as possible." onChange={changeInput} required pattern="[A-Za-z0-9]{1,}" title="This field should contain only uppercase letters, lowercase letter, spaces, periods, commas, and numbers"></textarea>
                        </div>
                        <div className="col justify-content-center">
                            <button className="btn btn-danger btn-block btn-lg">Submit Feedback</button>
                        </div>
                        <div className="card-block text-center" id="feedbackMessageDiv">
                            <h2 id="feedbackMessage">{message}</h2>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default UserFeedbackForm;