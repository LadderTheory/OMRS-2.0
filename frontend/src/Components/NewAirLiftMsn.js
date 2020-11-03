import React, { useState, useEffect } from 'react';
import ParameterService from '../services/Parameter.service';
import MissionDataService from "../services/missions.service";
import AuthService from "../services/auth.service";
import { Redirect } from "react-router-dom";
import NewAirLiftLeg from "./NewAirLiftLeg";

function NewAirLiftMsn() {
    //declare the initial values that will be passed into the parent newAirliftMsn state
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

    //declare the different states needed in the component
    const [newAirliftMsn, setNewAirliftMsn] = useState(initialAirliftMsn);
    const [legCounter, setLegCounter] = useState(1);
    const [aircrafts, setAircrafts] = useState([]);
    const [squadrons, setSquadrons] = useState([]);
    const [msnTypes, setMsnTypes] = useState([]);
    const [channels, setChannels] = useState([]);
    const [bases, setBases] = useState([]);
    const [commTypes, setCommTypes] = useState([]);
    const [operations, setOperations] = useState([]);
    const [submitSuccess, setSubmitSuccess] = useState({ submitted: false, message: '' });
    const [redirect, setRedirect] = useState(false)

    //useEffect specifies the function to be run when the component initally loads
    useEffect(() => {
        //Check to see if there is a logged in user. If not redirect to the login page
        const currentUser = AuthService.getCurrentUser();
        if (!currentUser) setRedirect(true);
        //Call all the functions that will retrieve data to populate the select boxes
        retrieveAircrafts();
        retrieveChannels();
        retrieveSquadrons();
        retrieveOperations();
        retrieveBases();
        retrieveMsnTypes();
        retrieveCommTypes();
    }, []);

    //function to handle the changes in input values on the parent form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewAirliftMsn({ ...newAirliftMsn, [name]: value })
    }

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
            const airliftMsn = { ...prevState, legs: [...prevState.legs, 
                { legNumber: legCounter,
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
                remarks: ''
                }] }
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
        newAirliftMsn.legs.map((index) => {

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
    const saveMission = async () => {
        try {
            await MissionDataService.addAirLiftMsn(newAirliftMsn);
            //once the data is inserted diplay the success message
            setSubmitSuccess({ submitted: true, message: 'Added Successfully' })
        } catch (err) {
            console.log(err);
        }
    }

    //function to handle setting the form back to its default state after submit
    const resetForm = () => {
        setNewAirliftMsn(initialAirliftMsn);
        setSubmitSuccess({ submitted: false });
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
            {redirect ? (<Redirect to="/login" />) : (
                <div className="submit-form" data-test="component-InputMission">
                    {submitSuccess.submitted ? (
                        <div>
                            <div className="form-row d-flex justify-content-center">
                                <h2>{submitSuccess.message}</h2>
                            </div>
                            <div className="form-row d-flex justify-content-center">
                                <button data-test="button-add" className="btn btn-dark btn-lg" onClick={resetForm}>Add another New Mission</button>
                            </div>
                        </div>
                    ) : (
                            <div>
                                <form>
                                    <div className="container rounded " data-test="InputMissionForm" id="Airlift-Mission-Form">

                                        {/* A New Row */}

                                        <div className="row">

                                            <div className="col">
                                                <label>Mission Date</label>
                                                <input type="date" className="form-control" id="date" data-test="date" onChange={handleInputChange} name="date" value={newAirliftMsn.date}></input>
                                            </div>



                                            <div className="col">
                                                <label>Mission #</label>
                                                <input type="text" className="form-control" id="msnNumber" data-test="msnNumber" onChange={handleInputChange} placeholder="Mission #" name="msnNumber" value={newAirliftMsn.msnNumber}></input>
                                            </div>

                                        </div>


                                        {/* A New Row */}

                                        <div className="row">

                                            <div className="col">
                                                <label>CallSign</label>
                                                <input type="text" className="form-control" id="callSign" data-test="callSign" onChange={handleInputChange} placeholder="Call Sign" name="callSign" value={newAirliftMsn.callSign}></input>
                                            </div>



                                            <div className="col">
                                                <label>Commander</label>
                                                <input type="text" className="form-control" id="commander" data-test="commander" onChange={handleInputChange} placeholder="Commander" name="commander" value={newAirliftMsn.commander} />
                                            </div>
                                        </div>



                                        {/* A New Row */}


                                        <div className="row">


                                            <div className="col">
                                                <label>Squadron</label>
                                                <select onChange={handleInputChange} data-test="squadron" className="form-control" id="squadron" placeholder="Squadron" name="squadron" value={newAirliftMsn.squadron}>
                                                    <option>Squadron</option>
                                                    {squadrons.map((squadron) => (<option key={squadron._id} value={squadron._id}>{squadron.name}</option>))}
                                                </select>
                                            </div>

                                            <div className="col">
                                                <label>Airframe</label>
                                                <select onChange={handleInputChange} data-test="aircraft" className="form-control" id="aircraft" placeholder="Aircraft Type" name="aircraft" value={newAirliftMsn.aircraft}>
                                                    <option>Aircraft Type</option>
                                                    {aircrafts.map((aircraft) => (<option key={aircraft._id} value={aircraft._id}>{aircraft.name}</option>))}
                                                </select>
                                            </div>


                                        </div>



                                        {/* A New Row */}

                                        <div className="row">

                                            <div className="col">
                                                <label>Operation</label>
                                                <select onChange={handleInputChange} data-test="operation" className="form-control" id="operattion" placeholder="Operation" name="operation" value={newAirliftMsn.operation}>
                                                    <option>Operation</option>
                                                    {operations.map((operation) => (<option key={operation._id} value={operation._id}>{operation.name}</option>))}
                                                </select>
                                            </div>




                                            <div className="col">
                                                <label>Base</label>
                                                <select onChange={handleInputChange} data-test="base" className="form-control" id="base" placeholder="Base" name="base" value={newAirliftMsn.base}>
                                                    <option>Base</option>
                                                    {bases.map((base) => (<option key={base._id} value={base._id}>{base.name}</option>))}
                                                </select>
                                            </div>

                                        </div>


                                        {/* A New Row */}

                                        <div className="row">

                                            <div className="col">
                                                <label>Mission Type</label>
                                                <select onChange={handleInputChange} data-test="msnType" className="form-control" id="msnType" placeholder="Mission Type" name="msnType" value={newAirliftMsn.msnType}>
                                                    <option>Mission Type</option>
                                                    {msnTypes.map((msnType) => (<option key={msnType._id} value={msnType._id}>{msnType.name}</option>))}
                                                </select>
                                            </div>



                                            <div className="col">
                                                <label>Commercial Type</label>
                                                <select onChange={handleInputChange} data-test="commType" className="form-control" id="commType" placeholder="Commercial Type" name="commType" value={newAirliftMsn.commType}>
                                                    <option>Commercial Type</option>
                                                    {commTypes.map((commType) => (<option key={commType._id} value={commType._id}>{commType.name}</option>))}
                                                </select>
                                            </div>

                                        </div>


                                        {/* A New Row */}
                                        <div className="row">
                                            <div className="col">
                                                <label>Channel Name</label>
                                                <select onChange={handleInputChange} data-test="channel" className="form-control" id="channel" placeholder="Channel" name="channel" value={newAirliftMsn.channel}>
                                                    <option>Channel</option>
                                                    {channels.map((channel) => (<option key={channel._id} value={channel._id}>{channel.name}</option>))}
                                                </select>
                                            </div>

                                            <div className="col"></div>
                                        </div>




                                        <div className="row">
                                            <div className="col">
                                                <label>Remarks</label>
                                                <input type="text" className="form-control" id="remarks" data-test="remarks" onChange={handleInputChange} placeholder="Remarks" name="remarks" value={newAirliftMsn.remarks}></input>
                                            </div>
                                        </div>



                                        <div className="row d-flex justify-content-center">

                                            <button type="button" id="edit-new" onClick={addLeg} className="btn  btn-lg">New Leg</button>
                                            <button type="button" id="edit-save" onClick={saveMission} className="btn btn-lg">Save Mission</button>
                                            <button type="button" id="edit-new" onClick={reorderLegs} className="btn btn-lg">Re-Order Legs</button>
                                        </div>
                                        <br></br>


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
                                                            acl={leg.maxACL}
                                                            ICAOSource={leg.ICAOSource}
                                                            ICAODest={leg.ICAODest}
                                                            legRemarks={leg.remarks}
                                                        />
                                                        <button className="btn btn-danger" type="button" onClick={() => removeLeg(leg.legNumber)}>
                                                            Remove
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
            )}
        </div>
    );
}

export default NewAirLiftMsn;