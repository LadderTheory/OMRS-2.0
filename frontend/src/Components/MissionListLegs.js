import React, { useState, useEffect } from 'react';
import ParameterService from '../services/Parameter.service';

function MissionListLegs(props) {

    const [icaos, setICAOs] = useState([]);

    //useEffect specifies function to be run when the component initally loads
    useEffect(() => {
        //Call all the functions that will retrieve data to populate the select boxes
        retrieveICAOs();
    }, []);
    //function to handle input changes from form elements. These changes are passed to the parent component through the prop handleChange. The legNumber of the leg being changed is also passed back to the parent so the parent knows which array index to update
    const inputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value
        const id = props.legNumber
        props.handleChange(name, value, id);
    }
    //function to calculate the leg duration by subtracting actual take off from actual land
    const calcDuration = () => {
        const actualto = document.getElementById("actualto" + props.legNumber).value;
        const actualland = document.getElementById("actualland" + props.legNumber).value;
        const actualto_hr = Number(actualto.substr(0, 2));

        const actualto_min = Number(actualto.substr(2, 2));


        const actualland_hr = Number(actualland.substr(0, 2));

        const actualland_min = Number(actualland.substr(2, 2));

        let end_hr;

        if (actualland_hr < actualto_hr) {
            end_hr = actualland_hr + 24
        } else {
            end_hr = actualland_hr
        }

        const end_hr_to_min = (end_hr * 60)
        const start_hr_to_min = (actualto_hr * 60)

        const total_end_min = (end_hr_to_min + actualland_min);
        const total_start_min = (start_hr_to_min + actualto_min);

        const min_diff = (total_end_min - total_start_min)

        const dec_hr = (min_diff / 60).toFixed(2);

        document.getElementById("duration" + props.legNumber).value = dec_hr;
        const name = "duration";
        const value = dec_hr;
        const id = props.legNumber;
        props.handleChange(name, value, id);
    }
    //Forces the decimal place for the cargo fields to 2 decimal places
    const fixDecimal = (e) => {
        const name = e.target.name;
        const value = Number(e.target.value);
        const newValue = value.toFixed(2);
        const id = props.legNumber;
        props.handleChange(name, newValue, id);
    }
    //funciton to calculate passengers through by subtracting passengers off from passengers on
    const calcPassThru = () => {
        const passon = document.getElementById("passon" + props.legNumber).value;
        const passoff = document.getElementById("passoff" + props.legNumber).value;
        const passthru = (passon - passoff);
        document.getElementById("passthru" + props.legNumber).value = passthru;
        const name = "passengerThru";
        const value = passthru;
        const id = props.legNumber
        props.handleChange(name, value, id);
    }
    //function to calculate cargo through by subtracting cargo off from cargo on
    const calcCargoThru = () => {
        const cargoon = document.getElementById("cargoon" + props.legNumber).value;
        const cargooff = document.getElementById("cargooff" + props.legNumber).value;
        const cargothru = (cargoon - cargooff).toFixed(2);
        document.getElementById("cargothru" + props.legNumber).value = cargothru;
        const name = "cargoThru";
        const value = cargothru;
        const id = props.legNumber
        props.handleChange(name, value, id);
    }
    //function to calculate pallets through by subtracting pallet off from pallet on
    const calcPalletThru = () => {
        const palleton = document.getElementById("palleton" + props.legNumber).value;
        const palletoff = document.getElementById("palletoff" + props.legNumber).value;
        const palletthru = (palleton - palletoff);
        document.getElementById("palletthru" + props.legNumber).value = palletthru;
        const name = "palletThru";
        const value = palletthru;
        const id = props.legNumber
        props.handleChange(name, value, id);
    }
    //retrieves the ICAO values from the database to populate the drop down menu
    const retrieveICAOs = async () => {
        try {
            const { data } = await ParameterService.retrieveICAOs();
            setICAOs(data);
        } catch (err) {
            console.log(err);
        }
    };
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
