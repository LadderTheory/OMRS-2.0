import React, { useState, useEffect } from 'react';
import ParameterService from '../services/Parameter.service';

function NewAirliftLeg(props) {
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

    //function to calculate passengers through by subtracting passengers off from passengers on
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

    //Forces the decimal place for the cargo fields to 2 decimal places
    const fixDecimal = (e) => {
        const name = e.target.name;
        const value = Number(e.target.value);
        const newValue = value.toFixed(2);
        const id = props.legNumber;
        props.handleChange(name, newValue, id);
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
            <div className="container rounded" id="edit-Airlift-Mission">
                <div className="card-header" id="headingOne">
                    <h2 className="mb-0">
                        <button id="legbtn" className="btn btn-large span9" name={"legBtn" + props.legNumber} type="button" data-toggle="collapse" data-target={"#Leg" + props.legNumber} aria-expanded="true" aria-controls="collapseOne">
                            Leg {props.legNumber}
                        </button>
                    </h2>
                </div>
                <div id={"Leg" + props.legNumber} className="collapse" aria-labelledby="headingOne" data-parent="#legaccordion">
                    <div className="container rounded" id="edit-Airlift-Mission">
                        <div id="leg-body">
                            {/* A New Row */}
                            <div className="row">
                                <div className="col">
                                    <div className="row">
                                        <label>Take Off Times</label>
                                    </div>
                                    <div className="row">
                                        <input type="text" className="form-control" id={"schedto" + props.legNumber} onChange={inputChange} name="scheduledTakeOff" value={props.schedTO} placeholder="Scheduled Take Off" pattern="[0-9]{4}" title="This field should contain exactly 4 numbers corresponding to 24hr time i.e 1300 is 1:00 PM"  autoComplete="off"/>
                                        <input type="text" className="form-control" id={"actualto" + props.legNumber} onChange={inputChange} name="actualTakeOff" value={props.actualTO} placeholder="Actual Take Off" required pattern="[0-9]{4}" title="This field should contain exactly 4 numbers corresponding to 24hr time i.e 1300 is 1:00 PM" autoComplete="off"/>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="row">
                                        <label>Landing Times</label>
                                    </div>
                                    <div className="row">
                                        <input type="text" className="form-control" id={"schedland" + props.legNumber} onChange={inputChange} name="scheduledLand" value={props.schedLand} placeholder="Scheduled Land" pattern="[0-9]{4}" title="This field should contain exactly 4 numbers corresponding to 24hr time i.e 1300 is 1:00 PM" autoComplete="off"/>
                                        <input type="text" className="form-control" id={"actualland" + props.legNumber} onChange={inputChange} name="actualLand" value={props.actualLand} placeholder="Actual Land" required pattern="[0-9]{4}" title="This field should contain exactly 4 numbers corresponding to 24hr time i.e 1300 is 1:00 PM" autoComplete="off"/>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="row">
                                        <label>Duration</label>
                                    </div>
                                    <div className="row">
                                        <input type="text" className="form-control" id={"duration" + props.legNumber} onFocus={calcDuration} onChange={inputChange} name="duration" placeholder="Duration" value={props.duration} required pattern="[0-9.]{1,}" title="This field should contain only whole or decimal numbers" />
                                    </div>
                                </div>
                            </div>
                            {/* A New Row */}
                            <div className="row">
                                <div className="col">
                                    <div className="row">
                                        <label>Passengers (On/Off/Through)</label>
                                    </div>
                                    <div className="row">
                                        <input type="text" className="form-control" id={"passon" + props.legNumber} onChange={inputChange} name="passengerOn" placeholder="Passengers On" value={props.passOn} required pattern="[0-9]{1,}" title="This field should contain only positive whole numbers" />
                                        <input type="text" className="form-control" id={"passoff" + props.legNumber} onChange={inputChange} name="passengerOff" placeholder="Passengers Off" value={props.passOff} required pattern="[0-9]{1,}" title="This field should contain only positive whole numbers" />
                                        <input type="text" className="form-control" id={"passthru" + props.legNumber} onFocus={calcPassThru} onChange={inputChange} name="passengerThru" placeholder="Passengers Through" value={props.passThru} required pattern="[0-9]{1,}" title="This field should contain only positive whole numbers"/>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="row">
                                        <label>Cargo (On/Off/Through)</label>
                                    </div>
                                    <div className="row">
                                        <input type="text" className="form-control" id={"cargoon" + props.legNumber} onChange={inputChange} onBlur={fixDecimal} name="cargoOn" placeholder="Cargo On" value={props.cargoOn} required pattern="[0-9.]{1,}" title="This field should contain only positive whole or decimal numbers"/>
                                        <input type="text" className="form-control" id={"cargooff" + props.legNumber} onChange={inputChange} onBlur={fixDecimal} name="cargoOff" placeholder="Cargo Off" value={props.cargoOff} required pattern="[0-9.]{1,}" title="This field should contain only positive whole or decimal numbers"/>
                                        <input type="text" className="form-control" id={"cargothru" + props.legNumber} onFocus={calcCargoThru} onChange={inputChange} name="cargoThru" value={props.cargoThru} placeholder="Cargo Through" required pattern="[0-9.]{1,}" title="This field should contain only postive whole or decimal numbers"/>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="row">
                                        <label>Pallets (On/Off/Through)</label>
                                    </div>
                                    <div className="row">
                                        <input type="text" className="form-control" id={"palleton" + props.legNumber} onChange={inputChange} name="palletOn" placeholder="Pallet On" value={props.palletOn} required pattern="[0-9]{1,}" title="This field should contain only positive whole numbers"/>
                                        <input type="text" className="form-control" id={"palletoff" + props.legNumber} onChange={inputChange} name="palletOff" placeholder="Pallet Off" value={props.palletOff} required pattern="[0-9]{1,}" title="This field should contain only positive whole numbers"/>
                                        <input type="text" className="form-control" id={"palletthru" + props.legNumber} onFocus={calcPalletThru} onChange={inputChange} name="palletThru" placeholder="Pallets Through" value={props.palletThru} required pattern="[0-9]{1,}" title="This field should contain only positive whole numbers"/>
                                    </div>
                                </div>
                            </div>
                            {/* A New Row */}
                            <div className="row">
                                <div className="col">
                                    <label>ICAO Source</label>
                                    <select onChange={inputChange} className="form-control" id={"icaosource" + props.legNumber} name="ICAOSource" value={props.ICAOSource} required>
                                        <option value="">Source</option>
                                        {icaos.filter(filterICAO => filterICAO.active === true).map((icao) => (<option key={icao._id} value={icao._id}>{icao.name}</option>))}
                                    </select>
                                </div>
                                <div className="col">
                                    <label>ICAO Destination</label>
                                    <select onChange={inputChange} className="form-control" id={"icaodest" + props.legNumber} name="ICAODest" value={props.ICAODest} required>
                                        <option value="">Destination</option>
                                        {icaos.filter(filterICAO => filterICAO.active === true).map((icao) => (<option key={icao._id} value={icao._id}>{icao.name}</option>))}
                                    </select>
                                </div>
                            </div>
                            {/* A New Row */}
                            <div className="row">
                                <div className="col">
                                    <label>Remarks</label>
                                    <input type="text" className="form-control" id={"remarks" + props.legNumber} onChange={inputChange} name="remarks" value={props.legRemarks} pattern="[A-Za-z0-9,. ]{1,}" title="This field should contain only uppercase letters, lowercase letter, spaces, periods, commas, and numbers" autoComplete="off" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewAirliftLeg;