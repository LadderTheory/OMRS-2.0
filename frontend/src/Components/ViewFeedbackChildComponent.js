import React from 'react';


function ViewFeedbackChildComponent(props) {
    return(
    <div >
            <div className="row mt-0 pt-0">
                <div className="col-sm d-flex justify-content-start">
                    {props.username}
                </div>
                <div className="col-sm d-flex justify-content-center">
                    {props.type}
                </div>
                <div className="col-sm d-flex justify-content-end">
                    {props.urgency}
                </div>
                
            </div>
        </div>
    );
}
export default ViewFeedbackChildComponent;