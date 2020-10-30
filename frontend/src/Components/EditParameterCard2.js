import React, { useState } from 'react';
import ParameterDataService from "../services/Parameter.service";

function EditParameterCard2(props) {
    const [input, setInput] = useState();
    


    const changeInput = (e) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });
    }

    const editParameter = async () => {
        
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
        props.handleClear();
        props.showChangeMessage();
        
    }


        const deleteCurrentParameter = async () => {
           
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



    return(
        <div>
            <div className="card" id="editParameterCard">
                <div className="card-body">
                <a className="float-right btn btn-danger" id="cancelButton" >Cancel</a>             
                <a className="float-left btn btn-danger" onClick={deleteCurrentParameter}>Delete</a>
                <br/>
                <br/>
              
                    <div className="form-group">
                    <div className="form-group">
                    <input id="OldParameterName" type="text" className="form-control" readOnly value={props.parameterName}></input> 
                    </div>
                    <label for="NewParameterName" className="text-light">New Parameter Name: </label>
                    <input id="NewParameterName" type="text" name="name" className="form-control" onChange={changeInput}/>
                    <br/>
                    <div className="d-flex justify-content-center">
                    <button id="AddParameter" className="text-center btn btn-success" onClick={editParameter}>Edit</button>
                    </div>
                    </div>
               

                </div>
            </div>
        </div>
    );
    }


export default EditParameterCard2;