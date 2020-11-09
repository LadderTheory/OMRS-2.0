import React, { useState, useEffect } from 'react';
import ParameterService from '../services/Parameter.service';

function EditAirLiftLeg(props) {

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
        const duration = (actualland - actualto);
        document.getElementById("duration" + props.legNumber).value = duration;
        const name = "duration";
        const value = duration;
        const id = props.legNumber;
        props.handleChange(name, value, id);
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

        <div class="accordion" id="legaccordion">
            <div className="container rounded" id="edit-Airlift-Mission">
                <div class="card-header" id="headingOne">
                    <h2 class="mb-0">
                        <button id="legbtn" class="btn btn-primary btn-large span9" type="button" data-toggle="collapse" data-target={"#Leg" + props.legNumber} aria-expanded="true" aria-controls="collapseOne">
                            Leg {props.legNumber}
                        </button>
                    </h2>
                </div>

                <div id={"Leg" + props.legNumber} class="collapse" aria-labelledby="headingOne" data-parent="#legaccordion">
                    <div className="container rounded" id="edit-Airlift-Mission">

                        <div className="submit-form" data-test="component-newLeg">

                            <form>
                                {/* A New Row */}

                                <div className="row">

                                    <div className="col">
                                        <div className="row">
                                            <label>Take Off Times</label>
                                        </div>
                                        <div className="row">
                                            <input type="text" className="form-control" id={"schedto" + props.legNumber} data-test="schedto" value={props.schedTO} onChange={inputChange} name="scheduledTakeOff" placeholder="Scheduled Take Off"></input>
                                            <input type="text" className="form-control" id={"actualto" + props.legNumber} data-test="actualto" value={props.actualTO} onChange={inputChange} name="actualTakeOff" placeholder="Actual Take Off"></input>
                                        </div>
                                    </div>

                                    <div className="col">
                                        <div className="row">
                                            <label>Landing Times</label>
                                        </div>
                                        <div className="row">
                                            <input type="text" className="form-control" id={"schedland" + props.legNumber} data-test="schedland" value={props.schedLand} onChange={inputChange} name="scheduledLand" placeholder="Scheduled Land"></input>
                                            <input type="text" className="form-control" id={"actualland" + props.legNumber} data-test="actualland" value={props.actualLand} onChange={inputChange} name="actualLand" placeholder="Actual Land"></input>
                                        </div>
                                    </div>

                                    <div className="col">
                                        <div className="row">
                                            <label>Duration</label>
                                        </div>
                                        <div className="row">
                                            <input type="text" className="form-control" id={"duration" + props.legNumber} data-test="schedland" value={props.duration} onChange={inputChange} onFocus={calcDuration} name="duration" placeholder="Duration"></input>
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
                                            <input type="text" className="form-control" id={"passon" + props.legNumber} data-test="passon" value={props.passOn} onChange={inputChange} name="passengerOn" placeholder="Passengers On"></input>
                                            <input type="text" className="form-control" id={"passoff" + props.legNumber} data-test="passoff" value={props.passOff} onChange={inputChange} name="passengerOff" placeholder="Passengers Off"></input>
                                            <input type="text" className="form-control" id={"passthru" + props.legNumber} data-test="passthru" name="passengerThru" value={props.passThru} onChange={inputChange} onFocus={calcPassThru}></input>
                                        </div>
                                    </div>

                                    <div className="col">
                                        <div className="row">
                                            <label>Cargo</label>
                                        </div>
                                        <div className="row">
                                            <input type="text" className="form-control" id={"cargoon" + props.legNumber} data-test="cargoon" value={props.cargoOn} onChange={inputChange} name="cargoOn" placeholder="Cargo On"></input>
                                            <input type="text" className="form-control" id={"cargooff" + props.legNumber} data-test="cargooff" value={props.cargoOff} onChange={inputChange} name="cargoOff" placeholder="Cargo Off"></input>
                                            <input type="text" className="form-control" id={"cargothru" + props.legNumber} data-test="cargothru" name="cargoThru" value={props.cargoThru} onChange={inputChange} onFocus={calcCargoThru}></input>
                                        </div>
                                    </div>

                                    <div className="col">
                                        <div className="row">
                                            <label>Pallets</label>
                                        </div>
                                        <div className="row">
                                            <input type="text" className="form-control" id={"palleton" + props.legNumber} data-test="palleton" value={props.palletOn} onChange={inputChange} name="palletOn" placeholder="Pallet On"></input>
                                            <input type="text" className="form-control" id={"palletoff" + props.legNumber} data-test="palletoff" value={props.palletOff} onChange={inputChange} name="palletOff" placeholder="Pallet Off"></input>
                                            <input type="text" className="form-control" id={"palletthru" + props.legNumber} data-test="palletthru" name="palletThru" value={props.palletThru} onChange={inputChange} onFocus={calcPalletThru}></input>
                                        </div>
                                    </div>

                                </div>



                                {/* A New Row */}


                                <div className="row">


                                    <div className="col">
                                        <label>ACL</label>
                                        <input type="text" className="form-control" id={"acl" + props.legNumber} data-test="acl" value={props.acl} onChange={inputChange} name="maxACL" placeholder="ACL"></input>
                                    </div>

                                </div>



                                {/* A New Row */}

                                <div className="row">

                                    <div className="col">
                                        <label>ICAO Source</label>
                                        <select value={props.ICAOSource} onChange={inputChange} data-test="icaosource" class="form-control" id={"icaosource" + props.legNumber} name="ICAOSource">
                                            <option>Operation</option>
                                            {icaos.map((icao) => (<option value={icao._id}>{icao.name}</option>))}
                                        </select>
                                    </div>




                                    <div className="col">
                                        <label>ICAO Destination</label>
                                        <select value={props.ICAODest} onChange={inputChange} data-test="icaodest" class="form-control" id={"icaodest" + props.legNumber} name="ICAODest">
                                            <option>Destination</option>
                                            {icaos.map((icao) => (<option value={icao._id}>{icao.name}</option>))}
                                        </select>
                                    </div>

                                </div>


                                {/* A New Row */}

                                <div className="row">

                                    <div className="col">
                                        <label>Remarks</label>
                                        <input type="text" className="form-control" id={"remarks" + props.legNumber} data-test="remarks" value={props.legRemarks} onChange={inputChange} name="remarks" placeholder="Remarks"></input>
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

export default EditAirLiftLeg;