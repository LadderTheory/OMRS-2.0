import React, { useState, useEffect } from 'react';
import ParameterService from '../services/Parameter.service';
import AuthService from "../services/auth.service";
import { duration } from 'moment';

function NewAirliftLeg(props) {
    
    const [input, setInput] = useState();
    const [icaos, setICAOs] = useState([]);

        //useEffect specifies function to be run when the component initally loads
        useEffect(() => {
            //Call all the functions that will retrieve data to populate the select boxes
            retrieveICAOs();
        }, []);
    
    const inputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value
        const id = props.legNumber
        props.handleChange(name, value, id);
    } 

    const calcDuration = () => {
        const actualto = document.getElementById("actualto").value;
        const actualland = document.getElementById("actualland").value;
        const duration = (actualland - actualto);
        document.getElementById("duration").value = duration;
        const name = "duration";
        const value = duration;
        const id = props.legNumber;
        props.handleChange(name, value, id);
    }

    const calcPassThru = () => {
        const passon = document.getElementById("passon").value;
        const passoff = document.getElementById("passoff").value;
        const passthru = (passon - passoff);
        document.getElementById("passthru").value = passthru;
        const name = "passengerThru";
        const value = passthru;
        const id = props.legNumber
        props.handleChange(name, value, id);
    }

    const calcCargoThru = () => {
        const cargoon = document.getElementById("cargoon").value;
        const cargooff = document.getElementById("cargooff").value;
        const cargothru = (cargoon - cargooff).toFixed(2);
        document.getElementById("cargothru").value = cargothru;
        const name = "cargoThru";
        const value = cargothru;
        const id = props.legNumber
        props.handleChange(name, value, id);
    }

    const calcPalletThru = () => {
        const palleton = document.getElementById("palleton").value;
        const palletoff = document.getElementById("palletoff").value;
        const palletthru = (palleton - palletoff);
        document.getElementById("palletthru").value = palletthru;
        const name = "palletThru";
        const value = palletthru;
        const id = props.legNumber
        props.handleChange(name, value, id);
    }

    const retrieveICAOs = async () => {
        try {
            const { data } = await ParameterService.retrieveICAOs();
            setICAOs(data);
        } catch (err) {
            console.log(err);
        }
    };

    const setDecimalCargoOn = () => {
        const cargoon = document.getElementById("cargoon").value
        const adjustedCargoOn = cargoon.toFixed(2);
        document.getElementById("cargoon").value = adjustedCargoOn;
        
    }

    const setDecimalCargoOff = () => {
        const cargooff = document.getElementById("cargooff").value;
        const adjustedCargoOff = cargooff.toFixed(2);
        document.getElementById("cargooff").value = adjustedCargoOff;
    }
    
    return(
        <div className="accordion" id="accordionExample">
        <div className="container rounded" id="edit-Airlift-Mission">
            <div className="card-header" id="headingOne">
                <h2 class="mb-0">
                    <button id="legbtn" class="btn btn-large span9" type="button" data-toggle="collapse" data-target={"#Leg" + props.legNumber} aria-expanded="true" aria-controls="collapseOne">
                      Leg {props.legNumber} 
                    </button>
                </h2>
            </div>

            <div id={"Leg" + props.legNumber} class="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
                <div className="container rounded" id="edit-Airlift-Mission">

                    <div className="submit-form" data-test="component-newLeg" id="leg-body">
                        <br></br>
                            <form>
                                {/* A New Row */}

                                <div className="row">

                                    <div className="col">
                                        <div className="row">
                                            <label>Take Off Times</label>
                                        </div>
                                        <div className="row">
                                            <input type="text" className="form-control" id="schedto" data-test="schedto" onChange={inputChange} name="scheduledTakeOff" placeholder="Scheduled Take Off"></input>
                                            <input type="text" className="form-control" id="actualto" data-test="actualto" onChange={inputChange} name="actualTakeOff" placeholder="Actual Take Off"></input>
                                        </div>
                                    </div>

                                    <div className="col">
                                        <div className="row">
                                            <label>Landing Times</label>
                                        </div>
                                        <div className="row">
                                            <input type="text" className="form-control" id="schedland" data-test="schedland" onChange={inputChange} name="scheduledLand" placeholder="Scheduled Land"></input>
                                            <input type="text" className="form-control" id="actualland" data-test="actualland" onChange={inputChange} name="actualLand" placeholder="Actual Land"></input>
                                        </div>
                                    </div>

                                    <div className="col">
                                        <div className="row">
                                            <label>Duration</label>
                                        </div>
                                        <div className="row">
                                            <input type="text" className="form-control" id="duration" data-test="schedland" onFocus={calcDuration} onChange={inputChange} name="duration" placeholder="Duration"></input>
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
                                            <input type="text" className="form-control" id="passon" data-test="passon"  onChange={inputChange} name="passengerOn" placeholder="Passengers On"></input>
                                            <input type="text" className="form-control" id="passoff" data-test="passoff" onChange={inputChange} name="passengerOff" placeholder="Passengers Off"></input>
                                            <input type="text" className="form-control" id="passthru" data-test="passthru" onFocus={calcPassThru} onChange={inputChange} name="passengerThru"></input>
                                        </div>
                                    </div>

                                    <div className="col">
                                        <div className="row">
                                            <label>Cargo</label>
                                        </div>
                                        <div className="row">
                                            <input type="text" className="form-control" id="cargoon" data-test="cargoon" onBlur={setDecimalCargoOn} onChange={inputChange} name="cargoOn" placeholder="Cargo On"></input>
                                            <input type="text" className="form-control" id="cargooff" data-test="cargooff" onBlur={setDecimalCargoOn} onChange={inputChange} name="cargoOff" placeholder="Cargo Off"></input>
                                            <input type="text" className="form-control" id="cargothru" data-test="cargothru" onFocus={calcCargoThru }onChange={inputChange} name="cargoThru"></input>
                                        </div>
                                    </div>

                                    <div className="col">
                                        <div className="row">
                                            <label>Pallets</label>
                                        </div>
                                        <div className="row">
                                            <input type="text" className="form-control" id="palleton" data-test="palleton" onChange={inputChange} name="palletOn" placeholder="Pallet On"></input>
                                            <input type="text" className="form-control" id="palletoff" data-test="palletoff" onChange={inputChange} name="palletOff" placeholder="Pallet Off"></input>
                                            <input type="text" className="form-control" id="palletthru" data-test="palletthru" onFocus={calcPalletThru} onChange={inputChange} name="palletThru"></input>
                                        </div>
                                    </div>

                                </div>



                                {/* A New Row */}


                                <div className="row">


                                    <div className="col">
                                        <label>ACL</label>
                                        <input type="text" className="form-control" id="acl" data-test="acl" onChange={inputChange} name="maxACL" placeholder="ACL"></input>
                                    </div>

                                </div>



                                {/* A New Row */}

                                <div className="row">

                                    <div className="col">
                                        <label>ICAO Source</label>
                                        <select onChange={inputChange} data-test="icaosource" class="form-control" id="icaosource" name="ICAOSource">
                                            <option>Operation</option>
                                            {icaos.map((icao) => (<option value={icao._id}>{icao.name}</option>))}
                                        </select>
                                    </div>


                                    <div className="col">
                                        <label>ICAO Destination</label>
                                        <select onChange={inputChange} data-test="icaodest" class="form-control" id="icaodest" name="ICAODest">
                                            <option>Destination</option>
                                            {icaos.map((icao) => (<option value={icao._id}>{icao.name}</option>))}
                                        </select>
                                    </div>

                                </div>


                                {/* A New Row */}

                                <div className="row">
                                    <div className="col">
                                        <label>Remarks</label>
                                        <input type="text" className="form-control" id="remarks" data-test="remarks" onChange={inputChange} name="remarks" placeholder="remarks"></input>
                                    </div>

                                </div>
                            </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}   

export default NewAirliftLeg;