import React, { useState, useEffect } from "react";
import feedbackService from "../services/feedback.service";
import ViewFeedbackChildComponent from './ViewFeedbackChildComponent';

//Page for viewing all user's of the application
function ViewFeedback(props) {
    const [feedback, setFeedback] = useState([]);
    const [selectedFeedback, setSelectedFeedback] = useState('');
    const [selectedListItemIndex, setSelectedListItemIndex] = useState(-1);

    //Retrieves a list of feedbacks when the component loads
    useEffect(() => {
        retrieveFeedback();
    }, []);
    //Sets the state of a selected Feedback when a user clicks on a specific feedback
    const clickedListItem = (feedback, index) => {
        setSelectedFeedback(feedback);
        setSelectedListItemIndex(index);
    }
    //Retrieves a list of feedbacks from the database
    const retrieveFeedback = async () => {
        try {
            const { data } = await feedbackService.getFeedback();
            setFeedback(data);
        } catch (err) {
            console.log(err);
        }
    }
    //Removes a feedback based on a passed in id
    const removeFeedback = async (id) => {
        try{
            await feedbackService.deleteFeedback(id);
            setSelectedFeedback(null);
            retrieveFeedback(); 
        } catch(err){
            console.log(err);
        }
    }

    return (
        <div className="container" >
        <div className="row">
            <div className="col-sm-4 mt-1">
                <h4>Feedback List</h4>
                <ul className="list-group">
                    {feedback.map((feedback, index) => (
                        <li
                            id="listItem"
                            name={feedback.firstName + " " + feedback.lastName + " " + feedback.feedbackType + " " + feedback.urgency}
                            className={"list-group-item " + (index === selectedListItemIndex ? "active" : "")}
                            onClick={() => clickedListItem(feedback, index)}
                            key={index}
                        >
                        <ViewFeedbackChildComponent username={feedback.lastName + ", " + feedback.firstName} type={feedback.feedbackType} urgency={feedback.urgency} />                            
                        </li>
                    ))}
                </ul>
            </div>

            <div className="col">
                {selectedFeedback ? (
                    <div className="card p-0 mt-4 ml-1" id="profileCard">
                        <div className="card-header" id="cardHeader">
                            <h4>Feedback: </h4>
                        </div>
                        <div className="card-body" id="cardBody">
                            <div>
                                <label>
                                    <strong>Feedback Type:</strong>
                                </label>{" "}
                                <div name="selectedFeedbackType">
                                {selectedFeedback.feedbackType}
                                </div>
                            </div>
                            <div>
                            <label>
                                    <strong>Urgency:</strong>
                                </label>{" "}
                                <div name="selectedFeedbackUrgency">
                                {selectedFeedback.urgency}
                                </div>
                            </div>
                            <div>
                            <label>
                                    <strong>User:</strong>
                                </label>{" "}
                                <div name="selectedFeedbackName">
                                {selectedFeedback.firstName + " " + selectedFeedback.lastName}
                                </div>
                            </div>
                            <div>
                            <label>
                                    <strong>Squadron:</strong>
                                </label>{" "}
                                <div name="selectedFeedbackSquadron">
                                {selectedFeedback.squadron}
                                </div>
                            </div>
                            <div>
                                <label>
                                    <strong>Phone Number:</strong>
                                </label>{" "}
                                <div name="selectedFeedbackPhone">
                                {selectedFeedback.phone}
                                </div>
                            </div>
                            <div>
                                <label>
                                    <strong>email:</strong>
                                </label>{" "}
                                <div name="selectedFeedbackEmail">
                                {selectedFeedback.email}
                                </div>
                            </div>
                            <div>
                                <label>
                                    <strong>Feedback:</strong>
                                </label>{" "}
                                <div name="selectedFeedbackFeedback">
                                {selectedFeedback.feedback}
                                </div>
                            </div>
                            <button id='deleteFeedbackButton' 
                                onClick={() => removeFeedback(selectedFeedback._id)}
                                className='btn btn-lg btn-block'
                            >
                                Delete
                </button>
                        </div>
                    </div>
                ) : (
                        <div>
                            <br />
                            <p>Select a feedback to view</p>
                        </div>
                    )}
            </div>
            </div>
        </div>
    );
}

export default ViewFeedback;