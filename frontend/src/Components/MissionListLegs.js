import React from 'react';


function MissionListLegs(props) {
    return (
        <div className="accordion" id="legaccordion">
            <div className="container rounded" id="missionListLegs">
                
                        <button id="MsnListLegBtn" name={"Leg" + props.legNumber} className="btn btn-primary btn-large " type="button" data-toggle="collapse" data-target={"#Leg" + props.legNumber} aria-expanded="true" aria-controls="collapseOne">
                            Leg {props.legNumber}
                        </button>
                    
                <div id={"Leg" + props.legNumber} className="collapse" aria-labelledby="headingOne" data-parent="#legaccordion">
                    <div className="container rounded" id="missionListLegForm">
                        <div className="submit-form" data-test="component-newLeg" id="msnListLegFormSubmit">
                            {/* A New Row */}
                            <div className="row">
                                <div className="col">
                                    <div className="row">
                                        <label>Take Off Times</label>
                                    </div>
                                    <div className="row">
                                       {props.schedTO}
                                       <br/>
                                      {props.actualTO}
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="row">
                                        <label>Landing Times</label>
                                    </div>
                                    <div className="row">
                                        {props.schedLand}
                                        <br/>
                                        {props.actualLand}
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="row">
                                        <label>Duration</label>
                                    </div>
                                    <div className="row">
                                    <label>{props.duration}</label>
                                    </div>
                                </div>
                            </div>
                            {/* A New Row */}
                            <div className="row">
                                <div className="col">
                                    <div className="row">
                                        <label>Passengers</label>
                                    </div>
                                    <div className="row">
                                    {props.passOn}
                                    <br/>
                                    {props.passOff}
                                    <br/>
                                    {props.passThru}
                                       
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="row">
                                        <label>Cargo</label>
                                    </div>
                                    <div className="row">
                                    {props.cargoOn}
                                    <br/>
                                    {props.cargoOff}
                                    <br/>
                                    {props.cargoThru}
                                         
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="row">
                                        <label>Pallets</label>
                                    </div>
                                    <div className="row">
                                    {props.palletOn}
                                    <br/>
                                    {props.palletOff}
                                    <br/>
                                    {props.palletThru}
                                          
                                    </div>
                                </div>
                            </div>
                            {/* A New Row */}
                            <div className="row">
                                <div className="col">
                                    <label >ICAO Source</label>
                                    <br/>
                                    {props.ICAOSource.name} 
                                </div>
                                <div className="col">
                                    <label >ICAO Destination</label>
                                    <br/>
                                    {props.ICAODest.name}
                                        
                                </div>
                            </div>
                            {/* A New Row */}
                            <div className="row">
                                <div className="col">
                                    <label>Remarks</label>
                                    <br/>
                                    {props.legRemarks}
                                  
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MissionListLegs;
