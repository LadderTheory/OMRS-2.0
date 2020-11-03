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
        document.getElementById("passthru" +props.legNumber).value = passthru;
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


    
    return(
        <div className="accordion" id="legaccordion">
        <div className="container rounded" id="edit-Airlift-Mission">
            <div className="card-header" id="headingOne">
                <h2 className="mb-0">
                    <button id="legbtn" className="btn btn-large span9" type="button" data-toggle="collapse" data-target={"#Leg" + props.legNumber} aria-expanded="true" aria-controls="collapseOne">
                      Leg {props.legNumber} 
                    </button>
                </h2>
            </div>

            <div id={"Leg" + props.legNumber} className="collapse" aria-labelledby="headingOne" data-parent="#legaccordion">
                <div className="container rounded" id="edit-Airlift-Mission">

                    <div className="submit-form" data-test="component-newLeg" id="leg-body">
    
                                {/* A New Row */}

                                <div className="row">

                                    <div className="col">
                                        <div className="row">
                                            <label>Take Off Times</label>
                                        </div>
                                        <div className="row">
                                            <input type="text" className="form-control" id={"schedto" + props.legNumber} data-test="schedto" onChange={inputChange} name="scheduledTakeOff" value={props.schedTO} placeholder="Scheduled Take Off"></input>
                                            <input type="text" className="form-control" id={"actualto" + props.legNumber} data-test="actualto" onChange={inputChange} name="actualTakeOff"  value={props.actualTO} placeholder="Actual Take Off"></input>
                                        </div>
                                    </div>

                                    <div className="col">
                                        <div className="row">
                                            <label>Landing Times</label>
                                        </div>
                                        <div className="row">
                                            <input type="text" className="form-control" id={"schedland" + props.legNumber} data-test="schedland" onChange={inputChange} name="scheduledLand" value={props.schedLand} placeholder="Scheduled Land"></input>
                                            <input type="text" className="form-control" id={"actualland"+ props.legNumber} data-test="actualland" onChange={inputChange} name="actualLand"  value={props.actualLand} placeholder="Actual Land"></input>
                                        </div>
                                    </div>

                                    <div className="col">
                                        <div className="row">
                                            <label>Duration</label>
                                        </div>
                                        <div className="row">
                                            <input type="text" className="form-control" id={"duration" + props.legNumber} data-test="schedland" onFocus={calcDuration} onChange={inputChange} name="duration" placeholder="Duration" value={props.duration}></input>
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
                                            <input type="text" className="form-control" id={"passon" + props.legNumber} data-test="passon"  onChange={inputChange} name="passengerOn" placeholder="Passengers On" value={props.passOn}></input>
                                            <input type="text" className="form-control" id={"passoff" + props.legNumber} data-test="passoff" onChange={inputChange} name="passengerOff" placeholder="Passengers Off" value={props.passOff}></input>
                                            <input type="text" className="form-control" id={"passthru" + props.legNumber} data-test="passthru" onFocus={calcPassThru} onChange={inputChange} name="passengerThru" placeholder="Passengers Through" value={props.passThru}></input>
                                        </div>
                                    </div>

                                    <div className="col">
                                        <div className="row">
                                            <label>Cargo (On/Off/Through)</label>
                                        </div>
                                        <div className="row">
                                            <input type="text" className="form-control" id={"cargoon" + props.legNumber} data-test="cargoon"  onChange={inputChange} name="cargoOn" placeholder="Cargo On"  value={props.cargoOn}></input>
                                            <input type="text" className="form-control" id={"cargooff" + props.legNumber} data-test="cargooff"  onChange={inputChange} name="cargoOff" placeholder="Cargo Off" value={props.cargoOff}></input>
                                            <input type="text" className="form-control" id={"cargothru" + props.legNumber} data-test="cargothru" onFocus={calcCargoThru } onChange={inputChange} name="cargoThru" value={props.cargoThru} placeholder="Cargo Through"></input>
                                        </div>
                                    </div>

                                    <div className="col">
                                        <div className="row">
                                            <label>Pallets (On/Off/Through)</label>
                                        </div>
                                        <div className="row">
                                            <input type="text" className="form-control" id={"palleton" + props.legNumber} data-test="palleton" onChange={inputChange} name="palletOn" placeholder="Pallet On"  value={props.palletOn}></input>
                                            <input type="text" className="form-control" id={"palletoff" + props.legNumber} data-test="palletoff" onChange={inputChange} name="palletOff" placeholder="Pallet Off"  value={props.palletOff}></input>
                                            <input type="text" className="form-control" id={"palletthru" + props.legNumber} data-test="palletthru" onFocus={calcPalletThru} onChange={inputChange} name="palletThru" placeholder="Pallets Through" value={props.palletThru}></input>
                                        </div>
                                    </div>

                                </div>



                                {/* A New Row */}


                                <div className="row">


                                    <div className="col">
                                        <label>ACL</label>
                                        <input type="text" className="form-control" id={"acl" + props.legNumber} data-test="acl" onChange={inputChange} name="maxACL" placeholder="ACL" value={props.acl}></input>
                                    </div>

                                </div>



                                {/* A New Row */}

                                <div className="row">

                                    <div className="col">
                                        <label>ICAO Source</label>
                                        <select onChange={inputChange} data-test="icaosource" className="form-control" id={"icaosource" + props.legNumber} name="ICAOSource" value={props.ICAOSource}>
                                            <option>Operation</option>
                                            {icaos.map((icao) => (<option key={icao._id} value={icao._id}>{icao.name}</option>))}
                                        </select>
                                    </div>


                                    <div className="col">
                                        <label>ICAO Destination</label>
                                        <select onChange={inputChange} data-test="icaodest" className="form-control" id={"icaodest" + props.legNumber} name="ICAODest" value={props.ICAODest}>
                                            <option>Destination</option>
                                            {icaos.map((icao) => (<option key={icao._id} value={icao._id}>{icao.name}</option>))}
                                        </select>
                                    </div>

                                </div>


                                {/* A New Row */}

                                <div className="row">
                                    <div className="col">
                                        <label>Remarks</label>
                                        <input type="text" className="form-control" id={"remarks" + props.legNumber} data-test="remarks" onChange={inputChange} name="remarks" value={props.legRemarks}></input>
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