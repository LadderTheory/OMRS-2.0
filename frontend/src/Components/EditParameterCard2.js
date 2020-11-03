import React, { useState } from 'react';
import ParameterDataService from "../services/Parameter.service";

//This section establishes the function of the EditParameterCard
function EditParameterCard2(props) {
    //This constant sets the state of the "input" variable
    const [input, setInput] = useState();

    //This constant sets the state of the "input" variable to the contents of the text box on the loaded component.
    const changeInput = (e) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });
    }

    //This constant takes the props that were passed from the main data management page and runs through a switch statement to determine which update route the data is passed to. Once it is passed to that route,
    //the data is then put into an "patch" request to the database, which finds the data at a given ID and "patches" the existing data with the data that was input by the user.
    const editParameter = async () => {
        //The "selectedParameter" value is set when the user selects an item from the navbar component on the Data Management page.
        switch(props.selectedParameter){
            case "Squadrons":
                try{
                    await ParameterDataService.updateSquadrons(props.parameterID, input)
                }catch (err) {
                    console.log(err);
                }
            break;
            case "MsnTypes":
                try{
                    await ParameterDataService.updateMsnTypes(props.parameterID, input)
                }catch (err) {
                    console.log(err);
                }
            break;
            case "Channels":
                try{
                await ParameterDataService.updateChannels(props.parameterID, input)
                }catch (err) {
                    console.log(err);
                }
                break;
            case "CommTypes":
                try{
                await ParameterDataService.updateCommTypes(props.parameterID, input)
                }catch (err) {
                    console.log(err);
                }                
                break;
            case "Operation":
                try{
                    await ParameterDataService.updateOperations(props.parameterID, input)
                    }catch (err) {
                        console.log(err);
                    }   
                break;
            case "LegTypes":
                try{
                    await ParameterDataService.updateLegTypes(props.parameterID, input)
                    }catch (err) {
                        console.log(err);
                    }   
                break;
            case "Bases":
                try{
                    await ParameterDataService.updateBases(props.parameterID, input)
                    }catch (err) {
                        console.log(err);
                    }   
                break;
            case "Aircraft":
                try{
                    await ParameterDataService.updateAircraft(props.parameterID, input)
                    }catch (err) {
                        console.log(err);
                    }   
                break;
                case "ICAO":
                    try{
                        await ParameterDataService.updateICAO(props.parameterID, input)
                        }catch (err) {
                            console.log(err);
                        }   
                break;
        };
        //These calls will clear the edit component card from the screen and replace it with a message indicating the success of the update.
        props.handleClear();
        props.showChangeMessage();
    }

         //This constant takes the props that were passed from the main data management page and runs through a switch statement to determine which update route the data is passed to. Once it is passed to that route,
         //the data is then put into an "delete" request to the database, which finds the data at a given ID and deletes that entry.
        const deleteCurrentParameter = async () => {
           
            //This switch statement functions identically to the "update" statement above. 
            switch(props.selectedParameter){
                case "Squadrons":
                    try{
                        await ParameterDataService.deleteSquadrons(props.parameterID)
                    }catch (err) {
                        console.log(err);
                    }
                break;
                case "MsnTypes":
                    try{
                        await ParameterDataService.deleteSquadrons(props.parameterID)
                    }catch (err) {
                        console.log(err);
                    }
                break;
                case "Channels":
                    try{
                       await ParameterDataService.deleteChannels(props.parameterID)
                    }catch (err) {
                        console.log(err);
                    }
                case "CommTypes":
                    try{
                        await ParameterDataService.deleteCommTypes(props.parameterID)
                    }catch (err) {
                        console.log(err);
                    }
                case "Operations":
                    try{
                        await ParameterDataService.deleteOperations(props.parameterID)
                    }catch (err) {
                        console.log(err);
                    }
                case "LegTypes":
                    try{
                        await ParameterDataService.deleteLegTypes(props.parameterID)
                    }catch (err) {
                        console.log(err);
                    }
                case "Bases":
                    try{
                        await ParameterDataService.deleteBases(props.parameterID)
                    }catch (err) {
                        console.log(err);
                    }
                    break;
                    case "Aircraft":
                        try{
                            await ParameterDataService.deleteAircraft(props.parameterID)
                        }catch (err) {
                            console.log(err);
                        }
                    break;
                    case "ICAO":
                        try{
                            await ParameterDataService.deleteICAO(props.parameterID)
                        }catch (err) {
                            console.log(err);
                        }
                    break;
            };
            props.handleClear();
            props.showDeleteMessage();
        }


    // This method returns all the components to be rendered on the page, as well as their state.
    return(
        <div>
            <div className="card" id="editParameterCard">
                <div className="card-body">
                {/* This anchor tag creates a button that will let a user cancel their edit. This will de-render the component and clear any data that was entered. */}
                <a className="float-right btn btn-danger" id="cancelButton" onClick={props.handleClear()}>Cancel</a>
                {/* This anchor tag will pass the selected information as a prop back to the parent component, where it will be routed as a delete request to the database. */}
                <a className="float-left btn btn-danger" onClick={deleteCurrentParameter}>Delete</a>
                {/* These line breaks are solely for formatting */}
                <br/>
                <br/>

                    <div className="form-group">
                        <div className="form-group">
                            {/* This line generates a text box that is populated with the data from the selected item. The "readOnly" property prevents the user from editing this field, 
                                as it's only meant to display information, not enter information. the value itself is taken as "props.parameterName" */}
                            <input id="OldParameterName" type="text" className="form-control" readOnly value={props.parameterName}></input> 
                        </div>
                        <label for="NewParameterName" className="text-light">New Parameter Name:</label>
                        {/* This line generates a text input box for the user to enter in new data. the onChange method updates the state of "input" whenever there is a change in the field. */}
                        <input id="NewParameterName" type="text" name="name" className="form-control" onChange={changeInput}/>
                        <br/>
                        <div className="d-flex justify-content-center">
                                {/* This line creates the button that triggers the edit action. The onClick method here call the editParameter function, which takes the information from the 
                                    input box and passes it back to the parent component, from which it will be routed to the database in the form of a patch request. */}
                            <button id="AddParameter" className="text-center btn btn-success" onClick={editParameter}>Edit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
    }


export default EditParameterCard2;