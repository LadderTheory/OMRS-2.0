import React from 'react';


function MissionListChildComponent(props) {
    return(
    <div >
            <div className="row">
                <div className="col-sm d-flex justify-content-start">
                    {props.callSign}
                </div>
                <div className="col-sm d-flex justify-content-center">
                    {props.msnNumber}
                </div>
                <div className="col-sm d-flex justify-content-end">
                    {props.aircraftName}
                </div>
                
            </div>
        </div>
    );
}
export default MissionListChildComponent;