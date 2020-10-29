import React, { useState, useEffect } from 'react';
import ParameterService from '../services/Parameter.service';
import AuthService from "../services/auth.service";

function NewAirliftLeg(props) {
    
    const [input, setInput] = useState();

    const inputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value
        const id = props.id
        props.handleChange(name, value, id);
    } 
    
    return(
        <div className="accordion" id="accordionExample">
        <div className="container rounded" id="edit-Airlift-Mission">
            <div className="card-header" id="headingOne">
                <h2 class="mb-0">
                    <button id="legbtn" class="btn btn-large span9" type="button" data-toggle="collapse" data-target={"#Leg" + props.id} aria-expanded="true" aria-controls="collapseOne">
                      Leg {props.id} 
                    </button>
                </h2>
            </div>

            <div id={"Leg" + props.id} class="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
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
                                            <input type="time" className="form-control" id="schedto" data-test="schedto" onChange={inputChange} name="schedto" placeholder="Scheduled Take Off"></input>
                                            <input type="text" className="form-control" id="actualto" data-test="actualto" onChange={inputChange} name="actualto" placeholder="Actual Take Off"></input>
                                        </div>
                                    </div>

                                    <div className="col">
                                        <div className="row">
                                            <label>Landing Times</label>
                                        </div>
                                        <div className="row">
                                            <input type="text" className="form-control" id="schedland" data-test="schedland" onChange={inputChange} name="schedland" placeholder="Scheduled Land"></input>
                                            <input type="text" className="form-control" id="actualland" data-test="actualland" onChange={inputChange} name="actualland" placeholder="Actual Land"></input>
                                        </div>
                                    </div>

                                    <div className="col">
                                        <div className="row">
                                            <label>Duration</label>
                                        </div>
                                        <div className="row">
                                            <input type="text" className="form-control" id="duration" data-test="schedland" onChange={inputChange} name="duration" placeholder="Duration"></input>
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
                                            <input type="text" className="form-control" id="passon" data-test="passon"  onChange={inputChange} name="passon" placeholder="Passengers On"></input>
                                            <input type="text" className="form-control" id="passoff" data-test="passoff" onChange={inputChange} name="passoff" placeholder="Passengers Off"></input>
                                            <input type="text" className="form-control" id="passthru" data-test="passthru"  name="passthru"></input>
                                        </div>
                                    </div>

                                    <div className="col">
                                        <div className="row">
                                            <label>Cargo</label>
                                        </div>
                                        <div className="row">
                                            <input type="text" className="form-control" id="cargoon" data-test="cargoon" onChange={inputChange} name="cargoon" placeholder="Cargo On"></input>
                                            <input type="text" className="form-control" id="cargooff" data-test="cargooff" onChange={inputChange} name="cargooff" placeholder="Cargo Off"></input>
                                            <input type="text" className="form-control" id="cargothru" data-test="cargothru" name="cargothru"></input>
                                        </div>
                                    </div>

                                    <div className="col">
                                        <div className="row">
                                            <label>Pallets</label>
                                        </div>
                                        <div className="row">
                                            <input type="text" className="form-control" id="palleton" data-test="palleton" onChange={inputChange} name="palleton" placeholder="Pallet On"></input>
                                            <input type="text" className="form-control" id="palletoff" data-test="palletoff" onChange={inputChange} name="palletoff" placeholder="Pallet Off"></input>
                                            <input type="text" className="form-control" id="palletthru" data-test="palletthru" name="palletthru"></input>
                                        </div>
                                    </div>

                                </div>



                                {/* A New Row */}


                                <div className="row">


                                    <div className="col">
                                        <label>ACL</label>
                                        <input type="text" className="form-control" id="acl" data-test="acl" onChange={inputChange} name="acl" placeholder="ACL"></input>
                                    </div>

                                </div>



                                {/* A New Row */}

                                <div className="row">

                                    <div className="col">
                                        <label>ICAO Source</label>
                                        <select onChange={inputChange} data-test="icaosource" class="form-control" id="icaosource" name="icaosource">
                                            <option>Operation</option>
                                            {/* {icaos.map((icao) => (<option value={icao._id}>{icao.name}</option>))} */}
                                        </select>
                                    </div>


                                    <div className="col">
                                        <label>ICAO Destination</label>
                                        <select onChange={inputChange} data-test="icaodest" class="form-control" id="icaodest" name="icaodest">
                                            <option>Destination</option>
                                            {/* {icaos.map((icao) => (<option value={icao._id}>{icao.name}</option>))} */}
                                        </select>
                                    </div>

                                </div>


                                {/* A New Row */}

                                <div className="row">
                                    <div className="col">
                                        <label>Remarks</label>
                                        <input type="text" className="form-control" id="remarks" data-test="remarks" onChange={inputChange} name="remarks" placeholder="Remarks"></input>
                                    </div>

                                </div>
                                {/* <button type="button" id="del-leg" onClick={removeLeg} className="btn  btn-lg">Remove Leg</button> */}
                            </form>
                        

                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}   

export default NewAirliftLeg;