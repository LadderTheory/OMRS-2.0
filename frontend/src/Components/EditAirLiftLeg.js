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
        //pass the values in the child component back to the parent component through props
        props.handleChange(name, value, id);
    }
    //function to calculate the leg duration by subtracting actual take off from actual land
    const calcDuration = () => {
        //get the actual take off and land value from the DOM
        const actualto = document.getElementById("actualto" + props.legNumber).value;
        const actualland = document.getElementById("actualland" + props.legNumber).value;
        //extract the hrs and min values from the take off and land values
        const actualto_hr = Number(actualto.substr(0, 2));
        const actualto_min = Number(actualto.substr(2, 2));
        const actualland_hr = Number(actualland.substr(0, 2));
        const actualland_min = Number(actualland.substr(2, 2));
        //determine if the land time rolled over onto the next day and if so add 24 hrs to the land time
        let end_hr;        
        if (actualland_hr < actualto_hr) {
            end_hr = actualland_hr + 24
        } else {
            end_hr = actualland_hr
        }
        //convert the landing time hours to minutes
        const end_hr_to_min = (end_hr * 60)
        //convert the take off time hours to minutes
        const start_hr_to_min = (actualto_hr * 60)
        //get the total minutes of the flight
        const total_end_min = (end_hr_to_min + actualland_min);
        const total_start_min = (start_hr_to_min + actualto_min);
        //get the difference in minutes
        const min_diff = (total_end_min - total_start_min)
        //convert minutes to decimal hours with two decimal places
        const dec_hr = (min_diff / 60).toFixed(2);
        //set the duration box value equal to the calculated decimal hours
        document.getElementById("duration" + props.legNumber).value = dec_hr;
        //pass the calculation back to the parent component state through props
        const name = "duration";
        const value = dec_hr;
        const id = props.legNumber;
        props.handleChange(name, value, id);
    }
    //Forces the decimal place for the cargo fields to 2 decimal places
    const fixDecimal = (e) => {
        const name = e.target.name;
        const value = Number(e.target.value);
        //tofixed sets the decimal places to 2
        const newValue = value.toFixed(2);
        const id = props.legNumber;
        //pass the values in the child component back to the parent component through props
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
        <div class="accordion" id="legaccordion">
            <div className="container rounded" id="edit-Airlift-Mission">
                <div class="card-header" id="headingOne">
                    <h2 class="mb-0">
                        <button id="legbtn" name={"Leg" + props.legNumber} className="btn btn-primary btn-large span9" type="button" data-toggle="collapse" data-target={"#Leg" + props.legNumber} aria-expanded="true" aria-controls="collapseOne">
                            Leg {props.legNumber}
                        </button>
                    </h2>
                </div>
                <div id={"Leg" + props.legNumber} class="collapse" aria-labelledby="headingOne" data-parent="#legaccordion">
                    <div className="container rounded" id="edit-Airlift-Mission">
                        <div className="submit-form" data-test="component-newLeg">
                            {/* A New Row */}
                            <div className="row">
                                <div className="col">
                                    <div className="row">
                                        <label>Take Off Times</label>
                                    </div>
                                    <div className="row">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id={"schedto" + props.legNumber}
                                            value={props.schedTO}
                                            onChange={inputChange}
                                            name="scheduledTakeOff"
                                            placeholder="Scheduled Take Off"
                                            pattern="[0-9]{4}"
                                            title="This field should contain exactly 4 numbers corresponding to 24hr time i.e 1300 is 1:00 PM"
                                            autoComplete="off"
                                        />
                                        <input
                                            type="text"
                                            className="form-control"
                                            id={"actualto" + props.legNumber}
                                            value={props.actualTO}
                                            onChange={inputChange}
                                            name="actualTakeOff"
                                            placeholder="Actual Take Off"
                                            required
                                            pattern="[0-9]{4}"
                                            title="This field should contain exactly 4 numbers corresponding to 24hr time i.e 1300 is 1:00 PM"
                                            autoComplete="off"
                                        />
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="row">
                                        <label>Landing Times</label>
                                    </div>
                                    <div className="row">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id={"schedland" + props.legNumber}
                                            value={props.schedLand}
                                            onChange={inputChange}
                                            name="scheduledLand"
                                            placeholder="Scheduled Land"
                                            pattern="[0-9]{4}"
                                            title="This field should contain exactly 4 numbers corresponding to 24hr time i.e 1300 is 1:00 PM"
                                            autoComplete="off"
                                        />
                                        <input
                                            type="text"
                                            className="form-control"
                                            id={"actualland" + props.legNumber}
                                            value={props.actualLand}
                                            onChange={inputChange}
                                            name="actualLand"
                                            placeholder="Actual Land"
                                            required
                                            pattern="[0-9]{4}"
                                            title="This field should contain exactly 4 numbers corresponding to 24hr time i.e 1300 is 1:00 PM"
                                            autoComplete="off"
                                        />
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="row">
                                        <label>Duration</label>
                                    </div>
                                    <div className="row">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id={"duration" + props.legNumber}
                                            value={props.duration}
                                            onChange={inputChange}
                                            onFocus={calcDuration}
                                            name="duration"
                                            placeholder="Duration"
                                            required
                                            pattern="[0-9.]{1,}"
                                            title="This field should contain only whole or decimal numbers"
                                        />
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
                                        <input
                                            type="text"
                                            className="form-control"
                                            id={"passon" + props.legNumber}
                                            value={props.passOn}
                                            onChange={inputChange}
                                            name="passengerOn"
                                            placeholder="Passengers On"
                                            required
                                            pattern="[0-9]{1,}"
                                            title="This field should contain only positive whole numbers"
                                        />
                                        <input
                                            type="text"
                                            className="form-control"
                                            id={"passoff" + props.legNumber}
                                            value={props.passOff}
                                            onChange={inputChange}
                                            name="passengerOff"
                                            placeholder="Passengers Off"
                                            required
                                            pattern="[0-9]{1,}"
                                            title="This field should contain only positive whole numbers"
                                        />
                                        <input
                                            type="text"
                                            className="form-control"
                                            id={"passthru" + props.legNumber}
                                            placeholder="Passengers Through"
                                            name="passengerThru"
                                            value={props.passThru}
                                            onChange={inputChange}
                                            onFocus={calcPassThru}
                                            required
                                            pattern="[0-9]{1,}"
                                            title="This field should contain only positive whole numbers"
                                        />
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="row">
                                        <label>Cargo</label>
                                    </div>
                                    <div className="row">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id={"cargoon" + props.legNumber}
                                            value={props.cargoOn}
                                            onChange={inputChange}
                                            onBlur={fixDecimal}
                                            name="cargoOn"
                                            placeholder="Cargo On"
                                            required
                                            pattern="[0-9.]{1,}"
                                            title="This field should contain only positive whole or decimal numbers"
                                        />
                                        <input
                                            type="text"
                                            className="form-control"
                                            id={"cargooff" + props.legNumber}
                                            value={props.cargoOff}
                                            onChange={inputChange}
                                            onBlur={fixDecimal}
                                            name="cargoOff"
                                            placeholder="Cargo Off"
                                            required
                                            pattern="[0-9.]{1,}"
                                            title="This field should contain only positive whole or decimal numbers"
                                        />
                                        <input
                                            type="text"
                                            className="form-control"
                                            id={"cargothru" + props.legNumber}
                                            name="cargoThru"
                                            placeholder="Cargo Through"
                                            value={props.cargoThru}
                                            onChange={inputChange}
                                            onFocus={calcCargoThru}
                                            required
                                            pattern="[0-9.]{1,}"
                                            title="This field should contain only postive whole or decimal numbers"
                                        />
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="row">
                                        <label>Pallets</label>
                                    </div>
                                    <div className="row">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id={"palleton" + props.legNumber}
                                            value={props.palletOn}
                                            onChange={inputChange}
                                            name="palletOn"
                                            placeholder="Pallet On"
                                            required
                                            pattern="[0-9]{1,}"
                                            title="This field should contain only positive whole numbers"
                                        />
                                        <input
                                            type="text"
                                            className="form-control"
                                            id={"palletoff" + props.legNumber}
                                            value={props.palletOff}
                                            onChange={inputChange}
                                            name="palletOff"
                                            placeholder="Pallet Off"
                                            required
                                            pattern="[0-9]{1,}"
                                            title="This field should contain only positive whole numbers"
                                        />
                                        <input
                                            type="text"
                                            className="form-control"
                                            id={"palletthru" + props.legNumber}
                                            name="palletThru"
                                            placeholder="Pallets Through"
                                            value={props.palletThru}
                                            onChange={inputChange}
                                            onFocus={calcPalletThru}
                                            required
                                            pattern="[0-9]{1,}"
                                            title="This field should contain only positive whole numbers"
                                        />
                                    </div>
                                </div>
                            </div>
                            {/* A New Row */}
                            <div className="row">
                                <div className="col">
                                    <label htmlFor={"icaosource" + props.legNumber}>ICAO Source</label>
                                    <select value={props.ICAOSource} onChange={inputChange} data-testid="icaosrc" class="form-control" id={"icaosource" + props.legNumber} name="ICAOSource" required>
                                        <option value="">Operation</option>
                                        {icaos.filter(filterICAO => filterICAO.active === true).map((icao) => (<option key={icao._id} value={icao._id}>{icao.name}</option>))}
                                    </select>
                                </div>
                                <div className="col">
                                    <label htmlFor={"icaodest" + props.legNumber}>ICAO Destination</label>
                                    <select value={props.ICAODest} onChange={inputChange} data-testid="icaodest" class="form-control" id={"icaodest" + props.legNumber} name="ICAODest" required>
                                        <option value="">Destination</option>
                                        {icaos.filter(filterICAO => filterICAO.active === true).map((icao) => (<option key={icao._id} value={icao._id}>{icao.name}</option>))}
                                    </select>
                                </div>
                            </div>
                            {/* A New Row */}
                            <div className="row">
                                <div className="col">
                                    <label>Remarks</label>
                                    <input
                                        type="text"
                                        className="form-control mb-2"
                                        id={"remarks" + props.legNumber}
                                        value={props.legRemarks}
                                        onChange={inputChange}
                                        name="remarks"
                                        placeholder="Remarks"
                                        pattern="[A-Za-z0-9,. ]{1,}"
                                        title="This field should contain only uppercase letters, lowercase letter, spaces, periods, commas, and numbers"
                                        autoComplete="off"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditAirLiftLeg;
