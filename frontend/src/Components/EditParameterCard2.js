import React, { useState, useRef } from 'react';
import ParameterDataService from "../services/Parameter.service";

//This section establishes the function of the EditParameterCard
function EditParameterCard2(props) {
    //This constant sets the state of the "input" variable
    const form = useRef();
    const [input, setInput] = useState();
    const [message, setMessage] = useState("");

    //This constant sets the state of the "input" variable to the contents of the text box on the loaded component.
    const changeInput = (e) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });
    }

    const toggleActiveParameter = async (id) => {

        switch (props.selectedParameter) {
            case "Squadrons":
                try {
                    const { data } = await ParameterDataService.deactivateSquadrons(id);
                    setMessage(data);
                } catch (err) {
                    console.log(err);
                }
                break;
            case "MsnTypes":
                try {
                    const { data } = await ParameterDataService.deactivateMsnTypes(id);
                    setMessage(data);
                } catch (err) {
                    console.log(err);
                }
                break;
            case "Channels":
                try {
                    const { data } = await ParameterDataService.deactivateChannels(id);
                    setMessage(data);
                } catch (err) {
                    console.log(err);
                }
                break;
            case "CommTypes":
                try {
                    const { data } = await ParameterDataService.deactivateCommTypes(id);
                    setMessage(data);
                } catch (err) {
                    console.log(err);
                }
                break;
            case "Operations":
                try {
                    const { data } = await ParameterDataService.deactivateOperations(id);
                    setMessage(data);
                } catch (err) {
                    console.log(err);
                }
                break;
            case "LegTypes":
                try {
                    const { data } = await ParameterDataService.deactivateLegTypes(id);
                    setMessage(data);
                } catch (err) {
                    console.log(err);
                }
                break;
            case "Bases":
                try {
                    const { data } = await ParameterDataService.deactivateBases(id);
                    setMessage(data);
                } catch (err) {
                    console.log(err);
                }
                break;
            case "Aircraft":
                try {
                    const { data } = await ParameterDataService.deactivateAircraft(id);
                    setMessage(data);
                } catch (err) {
                    console.log(err);
                }
                break;
            case "ICAO":
                try {
                    const { data } = await ParameterDataService.deactivateICAO(id);
                    setMessage(data);
                } catch (err) {
                    console.log(err);
                }
                break;

        };
        props.handleClear();
        props.showChangeMessage();
        props.handleClearParameters();



    }

    //This constant takes the props that were passed from the main data management page and runs through a switch statement to determine which update route the data is passed to. Once it is passed to that route,
    //the data is then put into an "patch" request to the database, which finds the data at a given ID and "patches" the existing data with the data that was input by the user.
    const editParameter = async (e) => {
        e.preventDefault();

        //The "selectedParameter" value is set when the user selects an item from the navbar component on the Data Management page.
        switch (props.selectedParameter) {
            case "Squadrons":
                try {
                    await ParameterDataService.updateSquadrons(props.parameterID, input)
                } catch (err) {
                    console.log(err);
                }
                break;
            case "MsnTypes":
                try {
                    await ParameterDataService.updateMsnTypes(props.parameterID, input)
                } catch (err) {
                    console.log(err);
                }
                break;
            case "Channels":
                try {
                    await ParameterDataService.updateChannels(props.parameterID, input)
                } catch (err) {
                    console.log(err);
                }
                break;
           
            case "Operation":
                try {
                    await ParameterDataService.updateOperations(props.parameterID, input)
                } catch (err) {
                    console.log(err);
                }
                break;

                break;
            case "Bases":
                try {
                    await ParameterDataService.updateBases(props.parameterID, input)
                } catch (err) {
                    console.log(err);
                }
                break;
            case "Aircraft":
                try {
                    await ParameterDataService.updateAircraft(props.parameterID, input)
                } catch (err) {
                    console.log(err);
                }
                break;
            case "ICAO":
                try {
                    await ParameterDataService.updateICAO(props.parameterID, input)
                } catch (err) {
                    console.log(err);
                }
                break;
        };
        //These calls will clear the edit component card from the screen and replace it with a message indicating the success of the update.
        props.handleClear();
        props.showChangeMessage();
        props.handleClearParameters();
    }



    const clearCards = () => {
        props.handleClear();
    }


    // This method returns all the components to be rendered on the page, as well as their state.
    return (
        <div>
            <div className="card" id="editParameterCard">
                <div className="card-body">
                    {/* This anchor tag creates a button that will let a user cancel their edit. This will de-render the component and clear any data that was entered. */}
                    <button className='align-left btn btn-danger' id='ToggleActiveParameterButton' onClick={() => toggleActiveParameter(props.parameterID)}>Toggle Active Parameter</button>
                    <button className="float-right btn btn-danger" id="cancelButton" onClick={clearCards}>Cancel</button>

                    {/* This anchor tag will pass the selected information as a prop back to the parent component, where it will be routed as a delete request to the database. */}
                    {/* These line breaks are solely for formatting */}
                    <br />
                    <br />
                    <form ref={form} onSubmit={editParameter}>
                        <div className="form-group">
                            <div className="form-group">
                                {/* This line generates a text box that is populated with the data from the selected item. The "readOnly" property prevents the user from editing this field, 
                                as it's only meant to display information, not enter information. the value itself is taken as "props.parameterName" */}
                                <input id="OldParameterName" type="text" className="form-control" readOnly value={props.parameterName}></input>
                            </div>
                            <label htmlFor="NewParameterName" className="text-light">New Parameter Name:</label>
                            {/* This line generates a text input box for the user to enter in new data. the onChange method updates the state of "input" whenever there is a change in the field. */}
                            <input id="NewParameterName" autofill="off" autoComplete="off" type="text" name="name" className="form-control" onChange={changeInput} required pattern="[A-Za-z0-9- ]{1,}" title="This field should contain only uppercase letters, lowercase letter, numbers, dashes, or spaces." />
                            <br />
                            <div className="d-flex justify-content-center">
                                {/* This line creates the button that triggers the edit action. The onClick method here call the editParameter function, which takes the information from the 
                                    input box and passes it back to the parent component, from which it will be routed to the database in the form of a patch request. */}
                                <button id="AddParameter" className="text-center btn btn-success" >Edit</button>
                                {message}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );

}

export default EditParameterCard2;