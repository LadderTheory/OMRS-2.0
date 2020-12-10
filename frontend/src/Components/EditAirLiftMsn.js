import React, { useState, useEffect, useRef } from 'react';
import ParameterService from '../services/Parameter.service';
import MissionDataService from "../services/missions.service";
import { useParams, Link } from "react-router-dom";
import EditAirLiftLeg from "./EditAirLiftLeg";
import DeleteConfirmation from './Alerts/Confirmation';

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
        commType: false,
        operation: '',
        legs: []
    }
    const form = useRef();
    const [currentAirliftMsn, setCurrentAirliftMsn] = useState(initialAirliftMsn);
    const [legCounter, setLegCounter] = useState();
    const [aircrafts, setAircrafts] = useState([]);
    const [squadrons, setSquadrons] = useState([]);
    const [msnTypes, setMsnTypes] = useState([]);
    const [channels, setChannels] = useState([]);
    const [bases, setBases] = useState([]);
    const [operations, setOperations] = useState([]);
    const [submitSuccess, setSubmitSuccess] = useState({ submitted: false, message: '' });
    const { id } = useParams();
    const [alert, setAlert] = useState();
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
    }, []);
    //function to handle onChange events for inputs on the parent component
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentAirliftMsn({ ...currentAirliftMsn, [name]: value })
    }
    const handleCheckChange = (e) => {
        const { name, checked } = e.target;
        setCurrentAirliftMsn({ ...currentAirliftMsn, [name]: checked })
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
            const airliftMsn = {
                ...prevState, legs: [...prevState.legs,
                {
                    legNumber: legArrayLength + 1,
                    scheduledTakeOff: '',
                    actualTakeOff: '',
                    scheduledLand: '',
                    actualLand: '',
                    duration: '',
                    passengerOn: 0,
                    passengerOff: 0,
                    passengerThru: 0,
                    cargoOn: 0,
                    cargoOff: 0,
                    cargoThru: 0,
                    palletOn: 0,
                    palletOff: 0,
                    palletThru: 0,
                    ICAOSource: '',
                    ICAODest: '',
                    remarks: ''
                }]
            }
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
    const updateMission = async (e) => {
        e.preventDefault()
        try {
            const { data } = await MissionDataService.updateAirliftMsn(id, currentAirliftMsn);
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
                            <h2 name="successMsg">{submitSuccess.message}</h2>
                        </div>
                        <div className="form-row d-flex justify-content-center">
                            <Link to={"/missionlist"} className="btn btn-lg" name="returnToMsnListButton" id="redButton">Return to Mission List</Link>
                        </div>
                    </div>
                ) : (
                        <div>
                            <form ref={form} onSubmit={updateMission}>
                                <div className="container rounded" data-test="InputMissionForm" id="edit-Airlift-Mission">
                                <Link
                                    to={"/missionlist"}
                                    className="btn btn-lg btn-danger justify-content-start mt-2" >
                                    Back
                                </Link>
                                    {/* A New Row */}
                                    <div className="row">
                                        <div className="col">
                                            <label htmlFor="date">Mission Date</label>
                                            <input
                                                type="date"
                                                className="form-control"
                                                id="date"
                                                value={currentAirliftMsn.date.substr(0, 10)}
                                                onChange={handleInputChange} name="date"
                                            />
                                        </div>
                                        <div className="col">
                                            <label htmlFor="msnNumber">Mission #</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="msnNumber"
                                                value={currentAirliftMsn.msnNumber}
                                                onChange={handleInputChange}
                                                placeholder="Mission #"
                                                name="msnNumber"
                                                autofill="off"
                                                autoComplete="off"
                                                required
                                                pattern="[A-Z0-9]{1,12}" title="This field number should be between 1 and 12 chracters and contain only uppercase letters and numbers"
                                            />
                                        </div>
                                    </div>
                                    {/* A New Row */}
                                    <div className="row">
                                        <div className="col">
                                            <label htmlFor="callSign">Callsign</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="callSign"
                                                value={currentAirliftMsn.callSign}
                                                onChange={handleInputChange}
                                                placeholder="Call Sign"
                                                name="callSign"
                                                pattern="[A-Z]{1,25}"
                                                title="This field should contain only uppercase letters"
                                                required
                                                autoComplete="off"
                                            />
                                        </div>
                                        <div className="col">
                                            <label htmlFor="commander">Commander</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="commander"
                                                value={currentAirliftMsn.commander}
                                                onChange={handleInputChange}
                                                placeholder="Commander"
                                                name="commander"
                                                pattern="[A-Za-z ]{1,50}"
                                                title="This field should contain only upper and lower case letters"
                                                autoComplete="off"
                                            />
                                        </div>
                                    </div>
                                    {/* A New Row */}
                                    <div className="row">
                                        <div className="col">
                                            <label htmlFor="squadron">Squadron</label>
                                            <select value={currentAirliftMsn.squadron._id} onChange={handleInputChange} className="form-control" id="squadron" placeholder="Squadron" name="squadron" required>
                                                <option value="">Squadron</option>
                                                {squadrons.filter(filterSquadron => filterSquadron.active === true).map((squadron) => (<option key={squadron._id} value={squadron._id}>{squadron.name}</option>))}
                                            </select>
                                        </div>
                                        <div className="col">
                                            <label htmlFor="aircraft">Aircraft</label>
                                            <select value={currentAirliftMsn.aircraft._id} onChange={handleInputChange} className="form-control" id="aircraft" placeholder="Aircraft Type" name="aircraft" required>
                                                <option value="">Aircraft Type</option>
                                                {aircrafts.filter(filterAircraft => filterAircraft.active === true).map((aircraft) => (<option key={aircraft._id} value={aircraft._id}>{aircraft.name}</option>))}
                                            </select>
                                        </div>
                                    </div>
                                    {/* A New Row */}
                                    <div className="row">
                                        <div className="col">
                                            <label htmlFor="operation">Operation</label>
                                            <select value={currentAirliftMsn.operation._id} onChange={handleInputChange} className="form-control" id="operation" placeholder="Operation" name="operation" required>
                                                <option value="">Operation</option>
                                                {operations.filter(filterOperation => filterOperation.active === true).map((operation) => (<option key={operation._id} value={operation._id}>{operation.name}</option>))}
                                            </select>
                                        </div>
                                        <div className="col">
                                            <label htmlFor="base">Base</label>
                                            <select value={currentAirliftMsn.base._id} onChange={handleInputChange} className="form-control" id="base" placeholder="Base" name="base" required>
                                                <option value="">Base</option>
                                                {bases.filter(filterBase => filterBase.active === true).map((base) => (<option key={base._id} value={base._id}>{base.name}</option>))}
                                            </select>
                                        </div>
                                    </div>
                                    {/* A New Row */}
                                    <div className="row">
                                        <div className="col">
                                            <label htmlFor="msnType">Mission Type</label>
                                            <select value={currentAirliftMsn.msnType._id} onChange={handleInputChange} className="form-control" id="msnType" placeholder="Mission Type" name="msnType" required>
                                                <option value="">Mission Type</option>
                                                {msnTypes.filter(filterMissionType => filterMissionType.active === true).map((msnType) => (<option key={msnType._id} value={msnType._id}>{msnType.name}</option>))}
                                            </select>
                                        </div>
                                        <div className="col">
                                            <label htmlFor="channel">Channel Name</label>
                                            <select value={currentAirliftMsn.channel._id} onChange={handleInputChange} className="form-control" id="channel" placeholder="Channel" name="channel">
                                                <option value="">Channel</option>
                                                {channels.filter(filterChannel => filterChannel.active === true).map((channel) => (<option key={channel._id} value={channel._id}>{channel.name}</option>))}
                                            </select>
                                        </div>
                                    </div>
                                    {/* A New Row */}
                                    <div className="row">
                                        <div className="col">
                                            <div className="form-check mt-4">
                                                <input type="checkbox" className="form-check-input" id="commType" onChange={handleCheckChange} name="commType" value={currentAirliftMsn.commType} checked={currentAirliftMsn.commType} />
                                                <label htmlFor="commType" className="form-check-label" id="commType">Commercial Type</label>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <label htmlFor="remarks">Remarks</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="remarks"
                                                value={currentAirliftMsn.remarks}
                                                onChange={handleInputChange}
                                                placeholder="Remarks"
                                                name="remarks"
                                                pattern="[A-Za-z0-9,. ]{1,}"
                                                title="This field should contain only uppercase letters, lowercase letter, spaces, periods, commas, and numbers"
                                                autoComplete="off"
                                            />
                                        </div>
                                    </div>
                                    <div className="row  pb-2">
                                        <div className="col d-flex justify-content-center">
                                            <button type="button" id="redButton" onClick={addLeg} className="btn btn-lg mr-1">New Leg</button>
                                            <button name="saveMsn" id="redButton" className="btn btn-lg">Save Mission</button>
                                            <button type="button" id="redButton" onClick={reorderLegs} className="btn btn-lg ml-1">Re-Order Legs</button>
                                            <button name="deleteMsn" data-toggle="modal"  data-target="#MissionDeletion" type="button" id="redButton"  className="btn btn-lg ml-1">Delete Mission</button>
                                        </div>
                                    </div>
                                    <div className="modal fade" id="MissionDeletion" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                        <DeleteConfirmation 
                                        id={id} 
                                        handleFunction={delMission} 
                                        HeaderContent='Mission Deletion Confirmation' 
                                        BodyContent='Are you sure that you want to delete this mission?'
                                        SubmitLabel='Delete'
                                        />
                                    </div>
                                </div>
                                <div className="container">
                                    <div className="row">
                                        <div className="span9">
                                            {currentAirliftMsn.legs.map(leg => (
                                                <div>
                                                    <EditAirLiftLeg
                                                        legNumber={leg.legNumber}
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
                                                        ICAOSource={leg.ICAOSource}
                                                        ICAODest={leg.ICAODest}
                                                        legRemarks={leg.remarks}
                                                    />
                                                    <button className="btn btn-danger" type="button" onClick={() => removeLeg(leg.legNumber)}>Remove{" Leg " + leg.legNumber}</button>
                                                    
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    )}
            </div>
        </div>
    );
}

export default EditAirLiftMsn;