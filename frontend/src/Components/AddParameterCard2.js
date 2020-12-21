import React, { useState, useRef } from 'react';
import ParameterDataService from "../services/Parameter.service";

//This section establishes the function of the AddParameterCard
function AddParameterCard2(props) {
    //This constant sets the state of the "input" variable
    const form = useRef();
    const [input, setInput] = useState();

    //This constant sets the state of the "input" variable to the contents of the text box on the loaded component.
    const changeInput = (e) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });
    }

    //This constant takes the props that were passed from the main data management page and runs through a switch statement to determine which update route the data is passed to. Once it is passed to that route,
    //the data is then put into an "add" request to the database, which finds the data at a given ID and adds the data that was input by the user.
    const addParameter = async (e) => {
        //The "selectedParameter" value is set when the user selects an item from the navbar component on the Data Management page.
        e.preventDefault();

        switch (props.selectedParameter) {
            case "Squadrons":
                try {
                    const {data} = await ParameterDataService.createSquadrons(input)
                    props.showMessage(data.message);
                } catch (err) {
                    console.log(err);
                }
                break;
            case "MsnTypes":
                try {
                    const {data} = await ParameterDataService.createMsnTypes(input)
                    props.showMessage(data.message);
                } catch (err) {
                    console.log(err);
                }
                break;
            case "Channels":
                try {
                    const {data} = await ParameterDataService.createChannels(input)
                    props.showMessage(data.message);
                } catch (err) {
                    console.log(err);
                }
                break;            
            case "Operations":
                try {
                    const {data} = await ParameterDataService.createOperations(input)
                    props.showMessage(data.message);
                } catch (err) {
                    console.log(err);
                }
                break;
            case "Bases":
                try {
                    const {data} = await ParameterDataService.createBases(input)
                    props.showMessage(data.message);
                } catch (err) {
                    console.log(err);
                }
                break;
            case "Aircraft":
                try {
                    const {data} = await ParameterDataService.createAircraft(input)
                    props.showMessage(data.message);
                } catch (err) {
                    console.log(err);
                }
                break;
            case "ICAOs":
                try {
                    const {data} = await ParameterDataService.createICAO(input)
                    props.showMessage(data.message);
                } catch (err) {
                    console.log(err);
                }
                break;
            default:
        };
        //These calls will clear the edit component card from the screen and replace it with a message indicating the success of the update.
        props.handleClear();
        props.handleClearParameters();
    }

    const clearCards = () => {
        props.handleClear();
    }
    // This method returns all the components to be rendered on the page, as well as their state.
    return (
        <div>
            <div className="card" id="addParameterCard">
                <div className="card-body">
                    {/* This anchor tag creates a button that will let a user cancel their addition. This will de-render the component and clear any data that was entered. */}
                    <button name="cancelBtn" className="float-right btn btn-danger" onClick={clearCards}>Cancel</button>
                    <br />
                    <br />
                    <form ref={form} onSubmit={addParameter}> 
                        <div className="form-group">
                            <label htmlFor="NewParameterName" className="text-light">New Parameter Name: </label>
                            {/* This line generates a text input box for the user to enter in new data. The onChange method updates the state of "input" whenever there is a change in the field. */}
                            <input id="NewParameterName" autofill="off" autoComplete="off" type="text" name="name" className="form-control" onChange={changeInput} required pattern="[A-Za-z0-9- ]{1,}" title="This field should contain only uppercase letters, lowercase letter, numbers, dashes, or spaces."/>
                            <br />
                            <div className="d-flex justify-content-center">
                                {/* This line creates the button that triggers the add action. The onClick method here calls the addParameter function, which takes the information from the 
                                    input box and passes it back to the parent component, from which it will be routed to the database in the form of an add request. */}
                                <button id="AddParameter" name="addBtn" className="text-center btn btn-success">Add</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddParameterCard2;