import React, { useState, useEffect, useRef } from 'react';
import ParameterService from '../services/Parameter.service';
import MissionDataService from "../services/missions.service";
import NewAirLiftLeg from "./NewAirLiftLeg";

//Function for the New Airlift Mission Component
function NewAirLiftMsn() {
    //declare the initial values that will be passed into the parent newAirliftMsn state
    const initialAirliftMsn = {
        msnNumber: '',
        callSign: '',
        //Customer requested that the default value of the commander field be set to No Pilot, but can be edited if needed
        commander: 'No Pilot',
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
    //declare the different states needed in the component
    const form = useRef();
    const [newAirliftMsn, setNewAirliftMsn] = useState(initialAirliftMsn);
    const [legCounter, setLegCounter] = useState(1);
    const [aircrafts, setAircrafts] = useState([]);
    const [squadrons, setSquadrons] = useState([]);
    const [msnTypes, setMsnTypes] = useState([]);
    const [channels, setChannels] = useState([]);
    const [bases, setBases] = useState([]);
    const [operations, setOperations] = useState([]);
    const [submitSuccess, setSubmitSuccess] = useState({ submitted: false, message: '' });
    //const [callSigns, setCallSigns] = useState([]);
    //useEffect specifies the function to be run when the component initally loads
    useEffect(() => {
        //Call all the functions that will retrieve data to populate the select boxes
        retrieveAircrafts();
        retrieveChannels();
        retrieveSquadrons();
        retrieveOperations();
        retrieveBases();
        retrieveMsnTypes();
        //retrieveCallSigns();
    }, []);
    
    //function to handle the changes in input values on the parent form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewAirliftMsn({ ...newAirliftMsn, [name]: value })
    }
    const handleCheckChange = (e) => {
        const { name, checked } = e.target;
        setNewAirliftMsn({ ...newAirliftMsn, [name]: checked })
    }
    const handleChannelChange = (e) => {
        //When a channel is selected from the channel drop down box, then a mission type of "Channel" will be automatically populated in the
        //mission type drop down box. This is done to ensure data consistency. Per business rules if a mission has a channel then its mission type 
        //must be channel. The below code searches through the items in the mission type dropdown box, finds the one with a text of Channel, gets the 
        //mongoID for that item and then updates the value of the mission type in state to match
        const msnTypeArray = Array.from(document.getElementById("msnType").options).filter(e => e.text === 'Channel').map(e => e.value);
        const msnTypeID = msnTypeArray[0]
        setNewAirliftMsn({ ...newAirliftMsn, msnType: msnTypeID, channel: e.target.value })
    }
    
    //The below two commented out functions allow a user to prepopluate some of the form based on a previously used callsign. The customer requested this feature be disabled for the time being.
    //A seperate input change handler for the callsign dropdown to change the value and also search for previous mission data based on that callsign
    // const handleCallsignChange = (e) => {
    //     const { value } = e.target;
    //     retrieveLatestByCallsign(value)
    // }
    //Get the mission data for the last inserted mission matching the selected callsign and prepopulates other fields based on that last mission
    // const retrieveLatestByCallsign = async (value) => {
    //     try {
    //         const { data } = await MissionDataService.getLatestByCallsign(value);
    //         setNewAirliftMsn({
    //             ...newAirliftMsn,
    //             callSign: value,
    //             aircraft: data.aircraft,
    //             base: data.base,
    //             squadron: data.squadron
    //         })
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }
    // const retrieveCallSigns = async () => {
    //     try {
    //         const { data } = await MissionDataService.getDistinctCallSigns();
    //         setCallSigns(data);
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }

    //function to recieve and process the incoming onChange events from the legs child components
    const handleLegChange = (name, value, id) => {
        //search through the legs array and find the leg with a legNumber matching the value that is coming from the child component. This occurs so that only the correct object in the legs array gets updated with the new typed values
        const foundIndex = newAirliftMsn.legs.findIndex(leg => leg.legNumber === id);
        //copy the current legs array in a new object called newlegs
        let newlegs = newAirliftMsn.legs
        //update the newlegs array at the index which matches the legNumber of the legs being updated with input values coming form the child component
        newlegs[foundIndex] = { ...newlegs[foundIndex], [name]: value }
        //set the state of newAirliftMission to include the changes to the legs array
        setNewAirliftMsn(prevState => {
            const airliftMsn = { ...prevState, legs: newlegs }
            return airliftMsn;
        })
    }
    //function to add a leg to the newAirliftMission state. This will also render a new leg component
    const addLeg = () => {
        //add a new leg to the newAirliftMission state with a legNumber set equal to the current value of legCounter and set the initial blank values of the leg
        setNewAirliftMsn(prevState => {
            const airliftMsn = {
                ...prevState, legs: [...prevState.legs,
                {
                    legNumber: legCounter,
                    scheduledTakeOff: "0000",
                    actualTakeOff: "0000",
                    scheduledLand: "0000",
                    actualLand: "0000",
                    duration: '',
                    passengerOn: 0,
                    passengerOff: 0,
                    passengerThru: 0,
                    cargoOn: 0.00,
                    cargoOff: 0.00,
                    cargoThru: 0.00,
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

        setLegCounter(legCounter + 1);
    }
    //Function to remove a leg from the newAirliftMission state. This will also remove the leg component from being rendered
    const removeLeg = id => {
        //The filter function will return all legs in the array that dont match the id of the one that should be removed. These remaining legs will copied into a new array called newlegs. The effectly removes the leg since it is not copied into the new array
        let newlegs = newAirliftMsn.legs.filter(leg => leg.legNumber !== id)
        //The new version of the legs array without the removed leg is passed back to the newAirliftMsn state
        setNewAirliftMsn(prevState => {
            const airliftMsn = { ...prevState, legs: newlegs }
            return airliftMsn;
        });

        setLegCounter(legCounter - 1);
    }
    //function to reassign the ordering of leg numbers if a user need to remove a leg from the middle of the array.
    const reorderLegs = () => {
        newAirliftMsn.legs.map((leg, index) => {
            let newlegs = newAirliftMsn.legs

            //update the newlegs array at the index which matches the legNumber of the legs being updated with input values coming form the child component
            newlegs[index] = { ...newlegs[index], legNumber: index + 1 }
            //set the state of currentAirliftMission to include the changes to the legs array
            setNewAirliftMsn(prevState => {
                const airliftMsn = { ...prevState, legs: newlegs }
                return airliftMsn;
            })
        })

    }
    //function to handle passing the newAirliftMsn state data to be saved in the database
    const saveMission = async (e) => {
        e.preventDefault()
        try {
            const { data } = await MissionDataService.addAirLiftMsn(newAirliftMsn);
            //once the data is inserted diplay the success message
            setSubmitSuccess({ submitted: true, message: data.message })
        } catch (err) {
            console.log(err);
        }
    }
    //function to handle setting the form back to its default state after submit
    const resetForm = () => {
        setNewAirliftMsn(initialAirliftMsn);
        setSubmitSuccess({ submitted: false });
    }
    //The below functions retrieve the parameter data from the database to populate the select inputs
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
            //In addition to retrieving all the channels to populate the channels drop down box, the below code also
            //finds the channel with name of "No Channel" and then sets the inital value of channel in state equal
            //to that found No Channel item. Per business rules and customer request, all missions should have a default 
            //value for channel of "No Channel"
            const { data } = await ParameterService.retrieveChannels();
            setChannels(data);
            const channelID = data.find(filterChannel => filterChannel.name === 'No Channel')._id
            setNewAirliftMsn({ ...newAirliftMsn, channel: channelID })
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
            <div className="submit-form" data-test="component-InputMission">
                {submitSuccess.submitted ? (
                    <div>
                        <div className="form-row d-flex justify-content-center">
                            <h2 name="submitSuccess">{submitSuccess.message}</h2>
                        </div>
                        <div className="form-row d-flex justify-content-center">
                            <button data-test="button-add" name="addAnotherMsnBtn" className="btn btn-dark btn-lg" onClick={resetForm}>Add another New Mission</button>
                        </div>
                    </div>
                ) : (
                        <div>
                            <form onSubmit={saveMission} ref={form}>
                                <div className="container rounded " id="Airlift-Mission-Form">
                                    {/* A New Row */}
                                    <div className="row">
                                        <div className="col">
                                            <label htmlFor="date">Mission Date</label>
                                            <input
                                                type="date"
                                                className="form-control"
                                                id="date"
                                                onChange={handleInputChange}
                                                name="date"
                                                value={newAirliftMsn.date}
                                                required
                                            />
                                        </div>
                                        <div className="col">
                                            <label htmlFor="msnNumber">Mission #</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="msnNumber"
                                                onChange={handleInputChange}
                                                placeholder="Mission #"
                                                name="msnNumber"
                                                value={newAirliftMsn.msnNumber}
                                                pattern="[A-Z0-9]{1,12}"
                                                title="This field number should be between 1 and 12 chracters and contain only uppercase letters and numbers"
                                                required
                                                autoComplete="off"
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
                                                onChange={handleInputChange}
                                                placeholder="Callsign"
                                                name="callSign"
                                                value={newAirliftMsn.callSign}
                                                pattern="[A-Z]{1,25}"
                                                title="This field should contain only uppercase letters"
                                                required
                                                autoComplete="off"
                                            />
                                            {/* The below commented out code implements a feature that allows the user to prepopulate some fields based on a perviously used call sign. The user asked for this field to be removed at this time but it may be desired in the future so this code has been left in place */}
                                            {/* <label>Populate from previous callsigns</label> */}
                                            {/* <select onChange={handleCallsignChange} className="form-control" id="callSign" placeholder="Callsign" name="callSign" value={newAirliftMsn.callSign}> */}
                                            {/* <option value="">Callsign</option> */}
                                            {/* {callSigns.map((callSign, index) => (<option key={index} value={callSign}>{callSign}</option>))} */}
                                            {/* </select> */}
                                        </div>
                                        <div className="col">
                                            <label htmlFor="commander">Commander</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="commander"
                                                onChange={handleInputChange}
                                                placeholder="Commander"
                                                name="commander"
                                                value={newAirliftMsn.commander}
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
                                            <select onChange={handleInputChange} className="form-control" id="squadron" placeholder="Squadron" name="squadron" value={newAirliftMsn.squadron} required>
                                                <option value="">Squadron</option>
                                                {squadrons.filter(filterSquadron => filterSquadron.active === true).map((squadron) => (<option key={squadron._id} value={squadron._id}>{squadron.name}</option>))}
                                            </select>
                                        </div>
                                        <div className="col">
                                            <label htmlFor="aircraft">Aircraft</label>
                                            <select onChange={handleInputChange} className="form-control" id="aircraft" placeholder="Aircraft Type" name="aircraft" value={newAirliftMsn.aircraft} required>
                                                <option value="">Aircraft Type</option>
                                                {aircrafts.filter(filterAircraft => filterAircraft.active === true).map((aircraft) => (<option key={aircraft._id} value={aircraft._id}>{aircraft.name}</option>))}
                                            </select>
                                        </div>
                                    </div>
                                    {/* A New Row */}
                                    <div className="row">
                                        <div className="col">
                                            <label htmlFor="operation">Operation</label>
                                            <select onChange={handleInputChange} className="form-control" id="operation" placeholder="Operation" name="operation" value={newAirliftMsn.operation} required>
                                                <option value="">Operation</option>
                                                {operations.filter(filterOperation => filterOperation.active === true).map((operation) => (<option key={operation._id} value={operation._id}>{operation.name}</option>))}
                                            </select>
                                        </div>
                                        <div className="col">
                                            <label htmlFor="base">Base</label>
                                            <select onChange={handleInputChange} className="form-control" id="base" placeholder="Base" name="base" value={newAirliftMsn.base} required>
                                                <option value="">Base</option>
                                                {bases.filter(filterBase => filterBase.active === true).map((base) => (<option key={base._id} value={base._id}>{base.name}</option>))}
                                            </select>
                                        </div>
                                    </div>
                                    {/* A New Row */}
                                    <div className="row">
                                        <div className="col">
                                            <label htmlFor="msnType">Mission Type</label>
                                            <select onChange={handleInputChange} className="form-control" id="msnType" placeholder="Mission Type" name="msnType" value={newAirliftMsn.msnType} required>
                                                <option value="">Mission Type</option>
                                                {msnTypes.map((msnType) => (<option key={msnType._id} value={msnType._id}>{msnType.name}</option>))}
                                            </select>
                                        </div>
                                        <div className="col">
                                            <label htmlFor="channel">Channel Name</label>
                                            <select onChange={handleChannelChange} className="form-control" id="channel" placeholder="Channel" name="channel" value={newAirliftMsn.channel} >
                                                <option value="">Channel</option>
                                                {channels.filter(filterChannel => filterChannel.active === true).map((channel) => (<option key={channel._id} value={channel._id}>{channel.name}</option>))}
                                            </select>
                                        </div>
                                    </div>
                                    {/* A New Row */}
                                    <div className="row">
                                        <div className="col">
                                            <div className="form-check mt-4">
                                                <input type="checkbox" className="form-check-input" id="commType" onChange={handleCheckChange} name="commType" checked={newAirliftMsn.commType} />
                                                <label htmlFor="commType" className="form-check-label" id="commType">Commercial Type</label>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <label htmlFor="remarks">Remarks</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="remarks"
                                                onChange={handleInputChange}
                                                placeholder="Remarks"
                                                name="remarks"
                                                value={newAirliftMsn.remarks}
                                                pattern="[A-Za-z0-9,. ]{1,}"
                                                title="This field should contain only uppercase letters, lowercase letter, spaces, periods, commas, and numbers"
                                                autoComplete="off"
                                            />
                                        </div>
                                    </div>
                                    <div className="row d-flex justify-content-center pb-2">
                                        <button type="button" id="redButton" name="newLegButton" onClick={addLeg} className="btn btn-lg mr-1">New Leg</button>
                                        <button id="redButton" name="saveMsnBtn" className="btn btn-lg">Save Mission</button>
                                        <button type="button" id="redButton" name="reorderLegsBtn" onClick={reorderLegs} className="btn btn-lg ml-1">Re-Order Legs</button>
                                    </div>
                                </div>
                                <div className="container">
                                    <div className="row">
                                        <div className="span9">
                                            {newAirliftMsn.legs.map(leg => (
                                                <div>
                                                    <NewAirLiftLeg legNumber={leg.legNumber}
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
                                                    <button className="btn btn-danger" type="button" id={"removeleg" + leg.legNumber} name={"removeleg" + leg.legNumber} onClick={() => removeLeg(leg.legNumber)}>
                                                        Remove{" Leg " + leg.legNumber}
                                            </button>
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

export default NewAirLiftMsn;