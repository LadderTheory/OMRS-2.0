import React from 'react';


function MissionListChildComponent(props) {
    return(
    <div >
            <div className="row mt-0 pt-0">
                <div name={props.callSign} className="col-sm d-flex justify-content-start">
                    {props.callSign}
                </div>
                <div name={props.msnNumber} className="col-sm d-flex justify-content-center">
                    {props.msnNumber}
                </div>
                <div name={props.aircraftName} className="col-sm d-flex justify-content-end">
                    {props.aircraftName}
                </div>
                
            </div>
        </div>
    );
}
export default MissionListChildComponent;