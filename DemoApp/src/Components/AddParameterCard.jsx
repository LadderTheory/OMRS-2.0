import React, { Component } from "react";
import DataManagement from "./DataManagement";
import ParameterDataService from "../services/Parameter.service";


export default class AddParameterCard extends Component{
    constructor(props){
        super(props);

        this.onChangeParamName = this.onChangeParamName.bind(this);
        this.addParameter = this.addParameter.bind(this);
        this.cancelChange = this.cancelChange.bind(this);


        this.state={
            paramName: '',
            currentParameter: '',
            message: ''
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

    addParameter(parameter)
    {

        this.setState({
            currentParameter: this.props.currentParameter
        });

        const newParam =  {
           name: this.state.paramName
        }

        const currentParameter = this.state.currentParameter;
        console.log(currentParameter);
        switch(currentParameter){
            case "squadron":
                ParameterDataService.createSquadrons(newParam)
                .then(response =>{
                    this.setState({
                        paramName: ''
                    });
                    console.log(response.data)
                    this.props.clearAdd();
                });
            break;
            case "msntype":
                ParameterDataService.createMsnTypes(newParam)
                .then(response =>{
                    this.setState({
                        paramName: ''
                    });
                    console.log(response.data)
                    this.props.clearAdd();
                });
            break;
            case "channel":
                ParameterDataService.createChannels(newParam)
                .then(response =>{
                    this.setState({
                        paramName: ''
                    });
                    console.log(response.data)
                    this.props.clearAdd();
                });
                break;
            case "commTypes":
                ParameterDataService.createCommTypes(newParam)
                .then(response =>{
                    this.setState({
                        paramName: ''
                    });
                    console.log(response.data)
                    this.props.clearAdd();
                });
                break;
            case "operation":
                ParameterDataService.createOperations(newParam)
                .then(response =>{
                    this.setState({
                        paramName: ''
                    });
                    console.log(response.data)
                    this.props.clearAdd();
                });
                break;
            case "legtypes":
                ParameterDataService.createLegTypes(newParam)
                .then(response =>{
                    this.setState({
                        paramName: ''
                    });
                    console.log(response.data)
                    this.props.clearAdd();
                });
                break;
            case "bases":
                ParameterDataService.createBases(newParam)
                .then(response =>{
                    this.setState({
                        paramName: ''
                    });
                    console.log(response.data)
                    this.props.clearAdd();
                });
                break;
                case "aircraft":
                ParameterDataService.createAircraft(newParam).then(
                    response => {
                      this.setState({
                       paramName:''
                      });
                      this.props.clearAdd();
                    },
                  
                  )
                break;
        };
    }

    cancelChange()
    {
        this.props.cancel();
    }

    render(){
        
        return(

            <div className="card">
                <div className="card-body">

                <a className="float-right btn btn-outline-danger" onClick={this.cancelChange}>Delete</a>
                <br/>
                <br/>
                
                <form>
                    <div className="form-group">
                    <label for="NewParameterName">New Parameter Name: </label>
                    
                    <input id="NewParameterName" type="text" onChange={this.onChangeParamName} className="form-control"/>
                    <br/>
                    <div className="d-flex justify-content-center">
                    <button id="AddParameter" className="text-center btn btn-success" onClick={this.addParameter}>Add</button>
                    </div>
                    </div>
                </form>

                </div>
            </div>

        );
    };
}