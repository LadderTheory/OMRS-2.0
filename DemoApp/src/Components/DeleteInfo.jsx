import React, { Component } from 'react';
import ParameterService from '../services/Parameters.service';
import UserService from "../services/user.service";
import AuthService from "../services/auth.service";
import { Redirect } from "react-router-dom";
export default class AddInfo extends Component {
    constructor(props) {
        super(props);
        this.retrieveParameters = this.retrieveParameters.bind(this);
        this.retrieveAirframe = this.retrieveAirframe.bind(this);
        this.retrieveLocation = this.retrieveLocation.bind(this);
        this.onSquadronChange = this.onSquadronChange.bind(this);
        this.squadronDelete = this.squadronDelete.bind(this);
        this.onAirframeChange = this.onAirframeChange.bind(this);
        this.airframeDelete = this.airframeDelete.bind(this);
        this.onLocationChange = this.onLocationChange.bind(this);
        this.locationDelete = this.locationDelete.bind(this);        
        this.state = {
           squadrons: [],
           airframes:[],
           locations:[],
           currentSquadron:"",
           currentAirframe:"",
           currentLocation:"",
           submitted: false
        };
    }
    
    componentDidMount() {
        this.retrieveParameters();
        this.retrieveAirframe();
        this.retrieveLocation();
        const currentUser = AuthService.getCurrentUser();
    if (!currentUser) this.setState({ redirect: "/login" });
    }
    onSquadronChange(e)
    {
        this.setState({
         currentSquadron: e.target.value
        });
    }
    onLocationChange(e)
    {
        this.setState({
         currentLocation: e.target.value
        });
    }
    onAirframeChange(e)
    {
        this.setState({
         currentAirframe: e.target.value
        });
    }
    retrieveParameters(){
        ParameterService.retrieveSquadron()
            .then(response=> {
                this.setState({squadrons: response.data});
                console.log(response.data);
            })
            .catch(e=>{
                console.log(e);
            });
    }
    retrieveAirframe(){
        ParameterService.retrieveAirframe()
            .then(response=> {
                this.setState({airframes: response.data});
                console.log(response.data);
            })
            .catch(e=>{
                console.log(e);
            })
    }
    retrieveLocation(){
        ParameterService.retrieveLocation()
            .then(response=> {
                this.setState({locations: response.data});
                console.log(response.data);
            })
            .catch(e=>{
                console.log(e);
            })
    }
    squadronDelete()
    {
        ParameterService.deleteSquadron(this.state.currentSquadron)
            .then(response=>{
                console.log(response.data);
                this.retrieveParameters();
                this.setState({submitted: true});
            })
            .catch(e =>
                {
                    console.log(e);
                });
    }
    locationDelete()
    {
        ParameterService.deleteLocation(this.state.currentLocation)
            .then(response=>{
                console.log(response.data);
                this.retrieveLocation();
                this.setState({submitted: true});
            })
            .catch(e =>
                {
                    console.log(e);
                });
    }
    airframeDelete()
    {
        ParameterService.deleteAirframe(this.state.currentAirframe)
            .then(response=>{
                console.log(response.data);
                this.retrieveAirframe();
                this.setState({submitted: true});
            })
            .catch(e =>
                {
                    console.log(e);
                });
    }

   render() {
       const{squadrons, airframes, locations, currentIndex } =this.state;
     return (

        <div className="editData" data-test="component-DeleteInfo">
        {this.state.submitted ? (
                <form>
                <div className="form-row d-flex justify-content-center">
                <h2>Data Deleted Successfully</h2>
                </div>
                <div className="form-row d-flex justify-content-center">
                <button className="align-self-center btn btn-dark btn-lg h-90" onClick={this.mainEdit}>Return</button>
                </div>
                </form>
            ) : (
                <div>
                {/* This area is for the inputs for editing a Squadron name */}
                <div className="form-row d-flex justify-content-center">
                    <div className="form-group col-md-3">
                    <label for="squadron">Current Squadron</label>
                        <select data-test="squadron" onChange={this.onSquadronChange} class="form-control" id="squadron">
                            <option>squadron</option>
                            {squadrons.map((squadron)=> (                                
                                <option>{squadron.Name}
                                </option>))}
                   </select>
                   </div>
                   <div className="form-row d-flex">
            <button onClick={this.squadronDelete} type="button" className="align-self-center btn btn-dark btn-lg h-90">Delete</button>      
            </div>
                </div>
                {/* This area is for the inputs for Deleting an Airframe*/}
                <div className="form-row d-flex justify-content-center">
                    <div className="form-group col-md-3">
                    <label for="airframe">Current Airframe</label>
                        <select data-test="airframe" onChange={this.onAirframeChange} class="form-control" id="airframe">
                            <option>airframe</option>
                            {airframes.map((airframe)=> (
                                <option>{airframe.Name}
                                </option>))}
                   </select>
                   </div>
                    <div className="form-row d-flex">
                    <button onClick={this.airframeDelete} type="button" className="align-self-center btn btn-dark btn-lg h-90">Delete</button>     
            </div>
                </div>
                {/* This area is for the inputs for Deleting a Location*/}
                <div className="form-row d-flex justify-content-center">
                    <div className="form-group col-md-3">
                    <label for="location">Current Location</label>
                        <select data-test="location" onChange={this.onLocationChange} class="form-control" id="location">
                            <option>location</option>
                            {locations.map((location)=> (
                                <option>{location.Name}
                                </option>))}
                   </select>
                   </div>
                    <div className="form-row d-flex">
                    <button onClick={this.locationDelete} type="button" className="align-self-center btn btn-dark btn-lg h-90">Delete</button>      
            </div>
                </div>
                {/* <div className="form-row d-flex justify-content-center">
            <button onClick={this.saveChanges} type="button" className="btn btn-dark btn-lg">Delete</button>      
            </div> */}
                </div>
                )
            }</div>
        )
    }
}