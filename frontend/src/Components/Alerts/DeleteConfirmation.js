import React from 'react';


function DeleteConfirmation(props) {
    
    return (
        
        <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">{props.HeaderContent}</h5>
                <button id='CloseButton' type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body">
                {props.BodyContent}
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                <button name={"btn" + props.SubmitLabel} className="deleteMissionBtn" id="deleteMission" type="button" className="btn btn-danger" data-dismiss="modal" onClick={() =>props.handleFunction(props.id)}>{props.SubmitLabel}</button>
            </div>
        </div>
    </div>
       
      );
}

export default DeleteConfirmation;
