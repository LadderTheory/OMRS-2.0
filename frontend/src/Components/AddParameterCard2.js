import React, { useState } from 'react';
import ParameterDataService from "../services/Parameter.service";

//This section establishes the function of the AddParameterCard
function AddParameterCard2(props) {
    //This constant sets the state of the "input" variable
    const [input, setInput] = useState();

    
    //This constant sets the state of the "input" variable to the contents of the text box on the loaded component.
    const changeInput = (e) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });
    }

    //This constant takes the props that were passed from the main data management page and runs through a switch statement to determine which update route the data is passed to. Once it is passed to that route,
    //the data is then put into an "add" request to the database, which finds the data at a given ID and adds the data that was input by the user.
    const addParameter = async () => {
        //The "selectedParameter" value is set when the user selects an item from the navbar component on the Data Management page.
        switch(props.selectedParameter){
            case "Squadrons":
                try{
                    await ParameterDataService.createSquadrons(input)
                }catch (err) {
                    console.log(err);
                }
            break;
            case "MsnTypes":
                try{
                    await ParameterDataService.createMsnTypes(input)
                }catch (err) {
                    console.log(err);
                }
            break;
            case "Channels":
                try{
                await ParameterDataService.createChannels(input)
                }catch (err) {
                    console.log(err);
                }
                break;
            case "CommTypes":
                try{
                await ParameterDataService.createCommTypes(input)
                }catch (err) {
                    console.log(err);
                }                
                break;
            case "Operations":
                try{
                    await ParameterDataService.createOperations(input)
                    }catch (err) {
                        console.log(err);
                    }   
                break;
            case "LegTypes":
                try{
                    await ParameterDataService.createLegTypes(input)
                    }catch (err) {
                        console.log(err);
                    }   
                break;
            case "Bases":
                try{
                    await ParameterDataService.createBases(input)
                    }catch (err) {
                        console.log(err);
                    }   
                break;
            case "Aircraft":
                try{
                    await ParameterDataService.createAircraft(input)
                    }catch (err) {
                        console.log(err);
                    }   
                break;
                case "ICAO":
                    try{
                        await ParameterDataService.createICAO(input)
                        }catch (err) {
                            console.log(err);
                        }   
                break;
        };
        //These calls will clear the edit component card from the screen and replace it with a message indicating the success of the update.
        props.handleClear();
        props.showMessage();
        
    }
    // This method returns all the components to be rendered on the page, as well as their state.
    return(
        <div>
             <div className="card" id="addParameterCard">
                <div className="card-body">
                {/* This anchor tag creates a button that will let a user cancel their addition. This will de-render the component and clear any data that was entered. */}
                    <a className="float-right btn btn-danger" >Cancel</a>
                <br/>
                <br/>                
                    <div className="form-group">
                        <label for="NewParameterName" className="text-light">New Parameter Name: </label>
                        {/* This line generates a text input box for the user to enter in new data. The onChange method updates the state of "input" whenever there is a change in the field. */}              
                        <input id="NewParameterName" type="text" name="name" className="form-control" onChange={changeInput}/>
                        <br/>
                        <div className="d-flex justify-content-center">
                            {/* This line creates the button that triggers the add action. The onClick method here calls the addParameter function, which takes the information from the 
                                    input box and passes it back to the parent component, from which it will be routed to the database in the form of an add request. */}
                            <button id="AddParameter" className="text-center btn btn-success" onClick={addParameter}>Add</button>
                        </div>
                    </div>
        

                </div>
            </div>

        </div>
    ); 
}

export default AddParameterCard2;