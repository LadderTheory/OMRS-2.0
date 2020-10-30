import React, { useState } from 'react';
import ParameterDataService from "../services/Parameter.service";

function AddParameterCard2(props) {
    const [input, setInput] = useState();

    const changeInput = (e) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });
    }

    const addParameter = async () => {
        
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
        props.handleClear();
        props.showMessage();
        
    }

    return(
        <div>
             <div className="card" id="addParameterCard">
                <div className="card-body">
                <a className="float-right btn btn-danger" >Cancel</a>
                <br/>
                <br/>                
        
                    <div className="form-group">
                    <label for="NewParameterName" className="text-light">New Parameter Name: </label>                    
                    <input id="NewParameterName" type="text" name="name" className="form-control" onChange={changeInput}/>
                    <br/>
                    <div className="d-flex justify-content-center">
                    <button id="AddParameter" className="text-center btn btn-success" onClick={addParameter}>Add</button>
                    </div>
                    </div>
        

                </div>
            </div>

        </div>
    ); 
}

export default AddParameterCard2;