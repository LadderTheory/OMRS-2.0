import React, { useState, useEffect } from 'react';
import ParameterService from '../services/Parameter.service';
import MissionDataService from "../services/missions.service";
import AuthService from "../services/auth.service";
import { Redirect } from "react-router-dom";
import NewAirLiftLeg from "./NewAirLiftLeg";

function NewAirLiftMsn() {
    const initialAirliftMsn = {
        msnNumber: '',
        callSign: '',
        commander: '',
        squadron: '',
        aircraft: '',
        base: '',
        date: '',
        remarks: '',
        msnType: '',
        channel: '',
        commType: '',
        operation: '',
        legs: []
    }

 
    const [newAirLiftMsn, setNewAirliftMsn] = useState(initialAirliftMsn);
    const [legs, setLegs] = useState([]);
    const [legCounter, setLegCounter] = useState(1);
    const [aircrafts, setAircrafts] = useState([]);
    const [squadrons, setSquadrons] = useState([]);
    const [msnTypes, setMsnTypes] = useState([]);
    const [channels, setChannels] = useState([]);
    const [bases, setBases] = useState([]);
    const [commTypes, setCommTypes] = useState([]);
    const [operations, setOperations] = useState([]);

    useEffect(() => {
        retrieveAircrafts();
        retrieveChannels();
        retrieveSquadrons();
        retrieveOperations();
        retrieveBases();
        retrieveMsnTypes();
        retrieveCommTypes();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewAirliftMsn({ ...newAirLiftMsn, [name]: value })
    } 

    const handleLegChange = (name, value, id) => {
        const foundIndex  = legs.findIndex(leg => leg.id === id);
        
        setLegs(prevState => { 
            const legs = [...prevState]
            legs[foundIndex] = {...legs[foundIndex], [name]: value};
            return legs;
        })

    }

    const addLeg = () => {
        setLegs(prevState => {
            const newleg = [...prevState, { id: legCounter}]
            return newleg ;
        })
        setLegCounter(legCounter + 1);
    }

    const removeLeg = id => {
        setLegs(prevState => {
            const newlegs = prevState.filter(leg => leg.id !== id);
            return newlegs;
          });
        setLegCounter(legCounter - 1);
    }

    const saveLeg = () => {
           setNewAirliftMsn({...newAirLiftMsn, legs: legs});
    }

    const saveMission = async () => {
        try {
            await MissionDataService.addAirLiftMsn(newAirLiftMsn)
        } catch (err) {
            console.log(err);
        }
    }

    const retrieveAircrafts = async () => {
        try {
            const { data } = await ParameterService.retrieveAircraft();
            setAircrafts(data);
        } catch (err) {
            console.log(err);
        }
    };

    const retrieveMsnTypes = async () => {
        try {
            const { data } = await ParameterService.retrieveMsnTypes();
            setMsnTypes(data);
        } catch (err) {
            console.log(err);
        }
    };

    const retrieveSquadrons = async () => {
        try {
            const { data } = await ParameterService.retrieveSquadrons();
            setSquadrons(data);
        } catch (err) {
            console.log(err);
        }
    };
    
    const retrieveChannels = async () => {
        try {
            const { data } = await ParameterService.retrieveChannels();
            setChannels(data);
        } catch (err) {
            console.log(err);
        }
    };

    const retrieveBases = async () => {
        try {
            const { data } = await ParameterService.retrieveBases();
            setBases(data);
        } catch (err) {
            console.log(err);
        }
    };

    const retrieveCommTypes = async () => {
        try {
            const { data } = await ParameterService.retrieveCommTypes();
            setCommTypes(data);
        } catch (err) {
            console.log(err);
        }
    };

    const retrieveOperations = async () => {
        try {
            const { data } = await ParameterService.retrieveOperations();
            setOperations(data);
        } catch (err) {
            console.log(err);
        }
    };


    return (
        <div>
                        {/* <div className="submit-form" data-test="component-InputMission">
                {this.state.submitted ? (
                    <form>
                        <div className="form-row d-flex justify-content-center">
                            <h2>You submitted successfully</h2>
                        </div>
                        <div className="form-row d-flex justify-content-center">
                            <button data-test="button-add" className="btn btn-dark btn-lg" onClick={this.newMission}>Add a New Mission</button>
                        </div>
                    </form>
                ) : ( */}
                      <div>
                        <div className="container rounded " data-test="InputMissionForm" id="Airlift-Mission-Form">
                            <form>
                                {/* A New Row */}

                                <div className="row">

                                    <div className="col">
                                        <label for="date">Mission Date</label>
                                        <input type="date" className="form-control" id="date" data-test="date"  onChange={handleInputChange} name="date"></input>
                                    </div>



                                    <div className="col">
                                        <label for="msnNumber">Mission #</label>
                                        <input type="text" className="form-control" id="msnNumber" data-test="msnNumber" onChange={handleInputChange} placeholder="Mission #" name="msnNumber"></input>
                                    </div>

                                </div>


                                {/* A New Row */}

                                <div className="row">

                                    <div className="col">
                                        <label for="callSign">CallSign</label>
                                        <input type="text" className="form-control" id="callSign" data-test="callSign"  onChange={handleInputChange} placeholder="Call Sign" name="callSign"></input>
                                    </div>



                                    <div className="col">
                                        <label for="commander">Commander</label>
                                        <input type="text" className="form-control" id="commander" data-test="commander"  onChange={handleInputChange} placeholder="Commander" name="commander"/>
                                    </div>
                                </div>



                                {/* A New Row */}


                                <div className="row">


                                    <div className="col">
                                        <label for="squadron">Squadron</label>
                                        <select onChange={handleInputChange} data-test="squadron" class="form-control" id="squadron" placeholder="Squadron" name="squadron">
                                            <option>Squadron</option>
                                            {squadrons.map((squadron) => (<option value={squadron._id}>{squadron.name}</option>))}
                                        </select>
                                    </div>

                                    <div className="col">
                                        <label for="aircraft">Airframe</label>
                                        <select onChange={handleInputChange}  data-test="aircraft" class="form-control" id="aircraft" placeholder="Aircraft Type" name="aircraft">
                                            <option>Aircraft Type</option>
                                            {aircrafts.map((aircraft) => (<option value={aircraft._id}>{aircraft.name}</option>))}
                                        </select>
                                    </div>


                                </div>



                                {/* A New Row */}

                                <div className="row">

                                    <div className="col">
                                        <label for="operation">Operation</label>
                                        <select onChange={handleInputChange}  data-test="operation" class="form-control" id="operattion" placeholder="Operation" name="operation">
                                            <option>Operation</option>
                                            {operations.map((operation) => (<option value={operation._id}>{operation.name}</option>))}
                                        </select>
                                    </div>




                                    <div className="col">
                                        <label for="base">Base</label>
                                        <select onChange={handleInputChange}  data-test="base" class="form-control" id="base" placeholder="Base" name="base">
                                            <option>Base</option>
                                            {bases.map((base) => (<option value={base._id}>{base.name}</option>))}
                                        </select>
                                    </div>

                                </div>


                                {/* A New Row */}

                                <div className="row">

                                    <div className="col">
                                        <label for="msnType">Mission Type</label>
                                        <select onChange={handleInputChange}  data-test="msnType" class="form-control" id="msnType" placeholder="Mission Type" name="msnType">
                                            <option>Mission Type</option>
                                            {msnTypes.map((msnType) => (<option value={msnType._id}>{msnType.name}</option>))}
                                        </select>
                                    </div>



                                    <div className="col">
                                        <label for="commType">Commercial Type</label>
                                        <select onChange={handleInputChange}  data-test="commType" class="form-control" id="commType" placeholder="Commercial Type" name="commType">
                                            <option>Commercial Type</option>
                                            {commTypes.map((commType) => (<option value={commType._id}>{commType.name}</option>))}
                                        </select>
                                    </div>

                                </div>


                                {/* A New Row */}
                                <div className="row">
                                    <div className="col">
                                        <label for="channel">Channel Name</label>
                                        <select onChange={handleInputChange}  data-test="channel" class="form-control" id="channel" placeholder="Channel" name="channel">
                                            <option>Channel</option>
                                            {channels.map((channel) => (<option value={channel._id}>{channel.name}</option>))}
                                        </select>
                                    </div>

                                    <div className="col"></div>
                                </div>




                                <div className="row">
                                    <div class="col">
                                        <label for="remarks">Remarks</label>
                                        <input type="text" className="form-control" id="remarks" data-test="remarks"  onChange={handleInputChange} placeholder="Remarks" name="remarks"></input>
                                    </div>
                                </div>



                                <div className="row d-flex justify-content-center">
                                 
                                        <button type="button" id="edit-new" onClick={addLeg} className="btn  btn-lg">New Leg</button>
                                        <button type="button" id="edit-save" onClick={saveMission} className="btn btn-lg">Save Mission</button>
                                </div>
                                <br></br>
                            </form>

                        </div>
                        <div className="container">
                            <div className="row">
                                <div className="span9">
                                {legs.map(leg => (
                                <>
                                <NewAirLiftLeg id={leg.id}
                                                handleChange={handleLegChange}
                                                key={leg.id}
                                                />
                                            <button type="button" onClick={() => removeLeg(leg.id)}>
                                            Remove
                                            </button>
                                            <button type="button" onClick={saveLeg} >
                                            Save Leg 
                                            </button>
                                </>
                                ))}
                                </div>
                            </div>                            
                        </div>


                    </div>
        </div>
    );
}

export default NewAirLiftMsn;