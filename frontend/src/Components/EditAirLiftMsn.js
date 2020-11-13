import React, { useState, useEffect } from 'react';
import ParameterService from '../services/Parameter.service';
import MissionDataService from "../services/missions.service";
import { useParams, Link } from "react-router-dom";
import EditAirLiftLeg from "./EditAirLiftLeg";

//Edit Airlift Mission Component
function EditAirLiftMsn() {

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

    const [currentAirliftMsn, setCurrentAirliftMsn] = useState(initialAirliftMsn);
    const [legCounter, setLegCounter] = useState();
    const [aircrafts, setAircrafts] = useState([]);
    const [squadrons, setSquadrons] = useState([]);
    const [msnTypes, setMsnTypes] = useState([]);
    const [channels, setChannels] = useState([]);
    const [bases, setBases] = useState([]);
    const [commTypes, setCommTypes] = useState([]);
    const [operations, setOperations] = useState([]);
    const [submitSuccess, setSubmitSuccess] = useState({ submitted: false, message: '' });

    const { id } = useParams();

    //useEffect specifies function to be run when the component initally loads
    useEffect(() => {
        //Call all the functions that will retrieve data to populate the select boxes
        retrieveAirliftMsn(id);
        retrieveAircrafts();
        retrieveChannels();
        retrieveSquadrons();
        retrieveOperations();
        retrieveBases();
        retrieveMsnTypes();
        retrieveCommTypes();
    }, []);

    //function to handle onChange events for inputs on the parent component
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentAirliftMsn({ ...currentAirliftMsn, [name]: value })
    }

    //function to recieve and process the incoming onChange events from the legs child component
    const handleLegChange = (name, value, id) => {
        //search through the legs array and find the leg with a legNumber matching the value that is coming from the child component.
        const foundIndex = currentAirliftMsn.legs.findIndex(leg => leg.legNumber === id);
        //copy the current legs array in a new object called newlegs
        let newlegs = currentAirliftMsn.legs
        //update the newlegs array at the index which matches the legNumber of the legs being updated with input values coming form the child component
        newlegs[foundIndex] = { ...newlegs[foundIndex], [name]: value }
        //set the state of currentAirliftMission to include the changes to the legs array
        setCurrentAirliftMsn(prevState => {
            const airliftMsn = { ...prevState, legs: newlegs }
            return airliftMsn;
        })
    }

    //function to add a leg to the newAirliftMission state. This will also render a new leg component
    const addLeg = () => {
        //Get the current length of the legs array so if new legs are added they will be tracking the correct leg number
        const legArrayLength = currentAirliftMsn.legs.length;

        //add a new leg to the newAirliftMission state with a legNumber set equal to the current value of legCounter
        setCurrentAirliftMsn(prevState => {
            const airliftMsn = { ...prevState, legs: [...prevState.legs, 
                { legNumber: legArrayLength + 1,
                    scheduledTakeOff: '',
                    actualTakeOff: '',
                    scheduledLand: '',
                    actualLand: '',
                    duration: '',
                    passengerOn: '',
                    passengerOff: '',
                    passengerThru: '',
                    cargoOn: '',
                    cargoOff: '',
                    cargoThru: '',
                    palletOn: '',
                    palletOff: '',
                    palletThru: '',
                    maxACL: '',
                    ICAOSource: '',
                    ICAODest: '',
                    remarks: '' }] }
            return airliftMsn;
        });

        setLegCounter(legArrayLength + 1);
    }

    //Function to remove a leg from the currentAirliftMission state. This will also remove the leg component from being rendered
    const removeLeg = id => {
        //Get the current length of the legs array so if new legs are added they will be tracking the correct leg number
        const legArrayLength = currentAirliftMsn.legs.length;

        //The filter function will return all legs in the array that dont match the id of the one that should be removed. These remaining legs will copied into a new array called newlegs. This effectly removes the leg since it is not copied into the new array
        let newlegs = currentAirliftMsn.legs.filter(leg => leg.legNumber !== id)
        //The new version of the legs array without the removed leg is passed back to the newAirliftMsn state
        setCurrentAirliftMsn(prevState => {
            const airliftMsn = { ...prevState, legs: newlegs }
            return airliftMsn;
        });

        setLegCounter(legArrayLength - 1);

        //reorderLegs();
    }

    //function to reassign the ordering of leg numbers if a user need to remove a leg from the middle of the array.
    const reorderLegs = () => {
        currentAirliftMsn.legs.map((leg, index) => {

            let newlegs = currentAirliftMsn.legs
            //update the newlegs array at the index which matches the legNumber of the legs being updated with input values coming form the child component
            newlegs[index] = { ...newlegs[index], legNumber: index + 1 }
            //set the state of currentAirliftMission to include the changes to the legs array
            setCurrentAirliftMsn(prevState => {
                const airliftMsn = { ...prevState, legs: newlegs }
                return airliftMsn;
            })
        })

    }

    //function to handle passing the currentAirliftMsn state data to be saved in the database
    const updateMission = async (id) => {
        try {
            const { data } = await MissionDataService.deleteMsn(id, currentAirliftMsn);
            //once the data is inserted diplay the success message
            setSubmitSuccess({ submitted: true, message: data })
        } catch (err) {
            console.log(err);
        }
    }

    //deletes the mission from the database
    const delMission = async (id) => {
        try {
            const { data } = await MissionDataService.deleteMsn(id);
            //once the mission is deleted diplay the success message
            setSubmitSuccess({ submitted: true, message: data })
        } catch (err) {
            console.log(err);
        }
    }

    //Gets the selected airlift msn to edit based on the mission id passed as a parameter in the url
    const retrieveAirliftMsn = async (id) => {
        try {
            const { data } = await MissionDataService.getAirLiftMsnByID(id);
            setCurrentAirliftMsn(data);
        } catch (err) {
            console.log(err);
        }
    }

    //The below functions retrive the parameter data from the database to populate the select inputs
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
                <div className="submit-form" data-test="component-UpdateMission">
                {submitSuccess.submitted ? (
                    <div>
                            <div className="form-row d-flex justify-content-center">
                                <h2>{submitSuccess.message}</h2>
                            </div>
                            <div className="form-row d-flex justify-content-center">
                            <Link to={"/missionlist"} className="btn btn-lg" id="redButton">Return to Mission List</Link>
                            </div>
                        </div>
                ) : (
                    <div>
                        <div className="container rounded " data-test="InputMissionForm" id="edit-Airlift-Mission">
                            <form>
                                {/* A New Row */}

                                <div className="row">

                                    <div className="col">
                                        <label>Mission Date</label>
                                        <input type="date" className="form-control" id="date" data-test="date" value={currentAirliftMsn.date.substr(0, 10)} onChange={handleInputChange} name="date"></input>
                                    </div>



                                    <div className="col">
                                        <label>Mission #</label>
                                        <input type="text" className="form-control" id="msnNumber" data-test="msnNumber" value={currentAirliftMsn.msnNumber} onChange={handleInputChange} placeholder="Mission #" name="msnNumber"></input>
                                    </div>

                                </div>


                                {/* A New Row */}

                                <div className="row">

                                    <div className="col">
                                        <label>CallSign</label>
                                        <input type="text" className="form-control" id="callSign" data-test="callSign" value={currentAirliftMsn.callSign} onChange={handleInputChange} placeholder="Call Sign" name="callSign"></input>
                                    </div>



                                    <div className="col">
                                        <label>Commander</label>
                                        <input type="text" className="form-control" id="commander" data-test="commander" value={currentAirliftMsn.commander} onChange={handleInputChange} placeholder="Commander" name="commander" />
                                    </div>
                                </div>



                                {/* A New Row */}


                                <div className="row">


                                    <div className="col">
                                        <label>Squadron</label>
                                        <select value={currentAirliftMsn.squadron._id} onChange={handleInputChange} data-test="squadron" class="form-control" id="squadron" placeholder="Squadron" name="squadron">
                                            <option>Squadron</option>
                                            {squadrons.filter(filterSquadron => filterSquadron.active === true).map((squadron) => (<option value={squadron._id}>{squadron.name}</option>))}
                                        </select>
                                    </div>

                                    <div className="col">
                                        <label>Airframe</label>
                                        <select value={currentAirliftMsn.aircraft._id} onChange={handleInputChange} data-test="aircraft" class="form-control" id="aircraft" placeholder="Aircraft Type" name="aircraft">
                                            <option>Aircraft Type</option>
                                            {aircrafts.filter(filterAircraft => filterAircraft.active === true).map((aircraft) => (<option value={aircraft._id}>{aircraft.name}</option>))}
                                        </select>
                                    </div>


                                </div>



                                {/* A New Row */}

                                <div className="row">

                                    <div className="col">
                                        <label>Operation</label>
                                        <select value={currentAirliftMsn.operation._id} onChange={handleInputChange} data-test="operation" class="form-control" id="operation" placeholder="Operation" name="operation">
                                            <option>Operation</option>
                                            {operations.filter(filterOperation => filterOperation.active === true).map((operation) => (<option value={operation._id}>{operation.name}</option>))}
                                        </select>
                                    </div>




                                    <div className="col">
                                        <label>Base</label>
                                        <select value={currentAirliftMsn.base._id} onChange={handleInputChange} data-test="base" class="form-control" id="base" placeholder="Base" name="base">
                                            <option>Base</option>
                                            {bases.filter(filterBase => filterBase.active === true).map((base) => (<option value={base._id}>{base.name}</option>))}
                                        </select>
                                    </div>

                                </div>


                                {/* A New Row */}

                                <div className="row">

                                    <div className="col">
                                        <label>Mission Type</label>
                                        <select value={currentAirliftMsn.msnType._id} onChange={handleInputChange} data-test="msnType" class="form-control" id="msnType" placeholder="Mission Type" name="msnType">
                                            <option>Mission Type</option>
                                            {msnTypes.filter(filterMissionType => filterMissionType.active === true).map((msnType) => (<option value={msnType._id}>{msnType.name}</option>))}
                                        </select>
                                    </div>



                                    <div className="col">
                                        <label>Commercial Type</label>
                                        <select value={currentAirliftMsn.commType._id} onChange={handleInputChange} data-test="commType" class="form-control" id="commType" placeholder="Commercial Type" name="commType">
                                            <option>Commercial Type</option>
                                            {commTypes.filter(filterCommType => filterCommType.active === true).map((commType) => (<option value={commType._id}>{commType.name}</option>))}
                                        </select>
                                    </div>

                                </div>


                                {/* A New Row */}
                                <div className="row">
                                    <div className="col">
                                        <label>Channel Name</label>
                                        <select value={currentAirliftMsn.channel._id} onChange={handleInputChange} data-test="channel" class="form-control" id="channel" placeholder="Channel" name="channel">
                                            <option>Channel</option>
                                            {channels.filter(filterChannel => filterChannel.active === true).map((channel) => (<option value={channel._id}>{channel.name}</option>))}
                                        </select>
                                    </div>

                                    <div className="col"></div>
                                </div>




                                <div className="row">
                                    <div class="col">
                                        <label>Remarks</label>
                                        <input type="text" className="form-control" id="remarks" data-test="remarks" value={currentAirliftMsn.remarks} onChange={handleInputChange} placeholder="Remarks" name="remarks"></input>
                                    </div>
                                </div>



                                <div className="row d-flex justify-content-center">
                                    <div classname="col">
                                        <button type="button" id="redButton" onClick={addLeg} className="btn btn-lg mr-1">New Leg</button>
                                        <button type="button" id="redButton" onClick={() => updateMission(id)} className="btn btn-lg">Save Mission</button>
                                        <button type="button" id="redButton" onClick={reorderLegs} className="btn btn-lg ml-1">Re-Order Legs</button>
                                        <button type="button" id="redButton" onClick={() => delMission(id)} className="btn btn-lg ml-1">Delete Mission</button>
                                    </div>
                                </div>
                                <br></br>
                            </form>

                        </div>
                        <div className="container">
                            <div className="row">
                                <div className="span9">
                                    {currentAirliftMsn.legs.map(leg => (
                                        <>
                                            <EditAirLiftLeg legNumber={leg.legNumber}
                                                handleChange={handleLegChange}
                                                key={leg.legNumber}
                                                schedTO={leg.scheduledTakeOff}
                                                actualTO={leg.actualTakeOff}
                                                schedLand={leg.scheduledLand}
                                                actualLand={leg.actualLand}
                                                duration={leg.duration}
                                                passOn={leg.passengerOn}
                                                passOff={leg.passengerOff}
                                                passThru={leg.passengerThru}
                                                cargoOn={leg.cargoOn}
                                                cargoOff={leg.cargoOff}
                                                cargoThru={leg.cargoThru}
                                                palletOn={leg.palletOn}
                                                palletOff={leg.palletOff}
                                                palletThru={leg.palletThru}
                                                acl={leg.maxACL}
                                                ICAOSource={leg.ICAOSource}
                                                ICAODest={leg.ICAODest}
                                                legRemarks={leg.remarks}
                                            />
                                            <button className="btn btn-danger" type="button"
                                                onClick={() => removeLeg(leg.legNumber)}
                                            >
                                                Remove
                                            </button>
                                        </>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>

                )}
                </div>
        </div>
    );
}

export default EditAirLiftMsn;