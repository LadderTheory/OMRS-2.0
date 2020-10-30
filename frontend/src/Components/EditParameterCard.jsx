import React, { Component } from "react";
import ParameterDataService from "../services/Parameter.service";


export default class EditParameterCard extends Component{
    constructor(props){
        super(props);
        this.onChangeParamName = this.onChangeParamName.bind(this);
        this.cancelChange = this.cancelChange.bind(this);
        this.deleteCurrentParameter = this.deleteCurrentParameter.bind(this);
        this.editParameter = this.editParameter.bind(this);

        this.state={
            paramName: '',
            OldParameterName: this.props.currentParameterName,
            currentParameter: ''
        };

    }
    componentDidMount() {
        this.setState({
            currentParameter: this.props.currentParameter
        });
    }

    onChangeParamName(e)
    {
        this.setState({
            paramName: e.target.value
        });
    }
    cancelChange(){
        this.props.cancel();
    }
    editParameter()
    {
       
        const currentParameter = this.state.currentParameter;
        const id = this.props.currentParameterID;
        const paramObject = { name: this.state.paramName };
        switch(currentParameter){
            case "squadron":
                ParameterDataService.updateSquadrons(id, paramObject)
                .then(response =>{
                 this.props.editCompletion();
                });
                
            break;
            case "msntype":
                console.log("test 5");
                ParameterDataService.updateMsnTypes(id, paramObject)
                .then(response =>{                   
                    this.props.editCompletion();
                });
            break;
            case "channel":
                ParameterDataService.updateChannels(id, paramObject)
                .then(response =>{                    
                    this.props.editCompletion();
                });
                break;
            case "commTypes":
                ParameterDataService.updateCommTypes(id, paramObject)
                .then(response =>{                   
                    this.props.editCompletion();
                });
                break;
            case "operation":
                ParameterDataService.updateOperations(id, paramObject)
                .then(response =>{
                    this.props.editCompletion();
                });
                break;
            case "legtypes":
                ParameterDataService.updateLegTypes(id, paramObject)
                .then(response =>{
                    this.props.editCompletion();
                });
                break;
            case "bases":
                ParameterDataService.updateBases(id, paramObject)
                .then(response =>{
                    this.props.editCompletion();
                });
                break;
                case "aircraft":
                ParameterDataService.updateAircraft(id, paramObject)
                .then(
                    response => {
                        this.props.editCompletion();
                    },                  
                  )
                break;
                case "icao":
                ParameterDataService.updateICAO(id, paramObject)
                .then(
                    response => {
                        this.props.editCompletion();
                    },                  
                  )
                break;
        };
        props.handleClear();
    }

    deleteCurrentParameter(parameter){
        console.log("test");
        this.setState({
            currentParameter: this.props.currentParameter
        });
        const currentParameter = this.state.currentParameter;
        const id = this.props.currentParameterID;
       
        switch(currentParameter){
            case "squadron":
                ParameterDataService.deleteSquadrons(id)
                .then(response =>{
                    this.props.delete();
                });
                
            break;
            case "msntype":
                console.log("test 5");
                ParameterDataService.deleteMsnTypes(id)
                .then(response =>{                   
                    this.props.delete();
                });
            break;
            case "channel":
                ParameterDataService.deleteChannels(id)
                .then(response =>{                    
                    this.props.delete();
                });
                break;
            case "commTypes":
                ParameterDataService.deleteCommTypes(id)
                .then(response =>{                   
                    this.props.delete();
                });
                break;
            case "operation":
                ParameterDataService.deleteOperations(id)
                .then(response =>{
                    this.props.delete();
                });
                break;
            case "legtypes":
                ParameterDataService.deleteLegTypes(id)
                .then(response =>{
                    this.props.delete();
                });
                break;
            case "bases":
                ParameterDataService.deleteBases(id)
                .then(response =>{
                    this.props.delete();
                });
                break;
                case "aircraft":
                ParameterDataService.deleteAircraft(id)
                .then(
                    response => {
                        this.props.delete();
                    },                  
                  )
                break;
                case "icao":
                ParameterDataService.deleteICAO(id)
                .then(
                    response => {
                        this.props.delete();
                    },                  
                  )
                break;
        };
        props.handleClear();

    }

    render(){
        return(
            <div className="card" id="editParameterCard">
                <div className="card-body">
                <a className="float-right btn btn-danger" id="cancelButton" onClick={this.cancelChange}>Cancel</a>             
                <a className="float-left btn btn-danger" onClick={this.deleteCurrentParameter}>Delete</a>
                <br/>
                <br/>
                <form>
                    <div className="form-group">
                    <div className="form-group">
                    <input id="OldParameterName" type="text" className="form-control" readOnly value={this.props.currentParameterName}></input> 
                    </div>
                    <label for="NewParameterName" className="text-light">New Parameter Name: </label>
                    <input id="NewParameterName" type="text" className="form-control" onChange={this.onChangeParamName}/>
                    <br/>
                    <div className="d-flex justify-content-center">
                    <button id="AddParameter" className="text-center btn btn-success" onClick={this.editParameter}>Edit</button>
                    </div>
                    </div>
                </form>

                </div>
            </div>
        );
    };
}