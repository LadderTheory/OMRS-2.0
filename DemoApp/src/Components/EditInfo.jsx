import React, { Component } from 'react';
import ParameterService from '../services/Parameters.service';
import MissionDataService from "../services/missions.service";
import UserService from "../services/user.service";
import AuthService from "../services/auth.service";
import { Redirect } from "react-router-dom";
export default class AddInfo extends Component {
    constructor(props) {
        super(props);
        this.retrieveParameters = this.retrieveParameters.bind(this);
        this.retrieveAirframe = this.retrieveAirframe.bind(this);
        this.retrieveLocation = this.retrieveLocation.bind(this);
        this.onChangeSquadron = this.onChangeSquadron.bind(this);
        this.onChangeNewSquadron = this.onChangeNewSquadron.bind(this);
        this.updateSquadron = this.updateSquadron.bind(this);
        this.onChangeAirframe = this.onChangeAirframe.bind(this);
        this.onChangeNewAirframe = this.onChangeNewAirframe.bind(this);
        this.updateAirframe = this.updateAirframe.bind(this);
        this.onChangeLocation = this.onChangeLocation.bind(this);
        this.onChangeNewLocation = this.onChangeNewLocation.bind(this);
        this.updateLocation = this.updateLocation.bind(this);
        this.state = {
            squadrons: [],
            airframes:[],
            locations:[],
            currentSquadron:"",
            currentAirframe:"",
            currentLocation:"",
            newSquadron:"",
            newAirframe:"",
            newLocation:"",
            submitted: false,
            redirect: null,
            currentUser: { username: "" }
        };
    }
    componentDidMount() {
        
        this.retrieveParameters();
        this.retrieveAirframe();
        this.retrieveLocation();
        const currentUser = AuthService.getCurrentUser();
    if (!currentUser) this.setState({ redirect: "/login" });

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
    //***********************************************************************************************************/
    //This is the section for editing the Squadrons
    onChangeSquadron(e) {
        this.setState({currentSquadron: e.target.value});
    }
    onChangeNewSquadron(e)
    {
        this.setState({newSquadron:e.target.value});
    }
    updateSquadron() {
        const data={
            newSquadron : this.state.newSquadron
        }
        ParameterService.updateSquadron(this.state.currentSquadron,data)
            .then(response => {
                console.log(response.data);
                this.retrieveParameters();
                this.setState({currentSquadron:"Squadron"});
                this.setState({newSquadron: ""});
                this.setState({submitted: true});
            })
            .catch(e => 
            {
                console.log(e);
            });
    }
    //***********************************************************************************************************/
    //This is the section for editing the Airframes
    onChangeAirframe(e) {
        this.setState({currentAirframe: e.target.value});
    }
    onChangeNewAirframe(e)
    {
        this.setState({newAirframe:e.target.value});
    }
    updateAirframe() {
        const data={
            newAirframe : this.state.newAirframe
        }
        ParameterService.updateAirframe(this.state.currentAirframe,data)
            .then(response => {
                console.log(response.data);
                this.retrieveAirframe();
                this.setState({currentAirframe:"Airframe"});
                this.setState({newAirframe: ""});
                this.setState({submitted: true});
            })
            .catch(e => 
            {
                console.log(e);
            });
    }
    //***********************************************************************************************************/
    //This is the section for editing the Locations
    onChangeLocation(e) {  
        this.setState({currentLocation: e.target.value});
    }
    onChangeNewLocation(e)
    {
        
        this.setState({newLocation:e.target.value});
    }
    updateLocation() {
        const data={
            newLocation : this.state.newLocation
        }
        ParameterService.updateLocation(this.state.currentLocation,data)
            .then(response => {
                console.log(response.data);
                this.retrieveLocation();
                this.setState({currentLocation:"Location"});
                this.setState({newLocation: ""});
                this.setState({submitted: true});
            })
            .catch(e => 
            {
                console.log(e);
            });
    }



    //***********************************************************************************************************/
   render() {
    const{squadrons, airframes, locations, currentIndex, newSquadron, newAirframe, newLocation} =this.state; 
     return (
     //   <p>Hello World</p>
        <div className="editData" data-test="component-EditInfo">
        {this.state.submitted ? (
                <form>
                <div className="form-row d-flex justify-content-center">
                <h2>Data Edited Successfully</h2>
                </div>
                <div className="form-row d-flex justify-content-center">
                <button className="btn btn-dark btn-lg" onClick={this.mainEdit}>Return</button>
                </div>
                </form>
            ) : (
                <div>
                {/* This area is for the inputs for editing the Squadron name */}
                <div className="form-row d-flex justify-content-center">
                    <div className="form-group col-md-3">
                    <label for="exampleFormControlSelect1">Current Squadron Name</label>
                    <select data-test="currentSquadron" onChange={this.onChangeSquadron} class="form-control" id="squadron">
                            <option>squadron</option>
                            {squadrons.map((squadron)=> (                                
                                <option>{squadron.Name}
                                </option>))}
                   </select>  
                    </div>
                    <div className="form-group col-md-3">
                    <label for="squadron">New Squadron Name</label>
                            <input data-test="newSquadron" type="text" className="form-control" id="squadron" value={this.state.newSquadron}  onChange={this.onChangeNewSquadron} placeholder="Squadron" name="squadron"></input>                                          
                    </div>
                    <div className="form-row d-flex justify-content-center">
                    <button onClick={this.updateSquadron} type="button" className="align-self-center btn btn-dark btn-lg h-90">Edit</button>      
            </div>
                </div>
                {/* This area is for the inputs for editing the Airframe name */}
                 <div className="form-row d-flex justify-content-center">
                    <div className="form-group col-md-3">
                    <label for="exampleFormControlSelect1">Current Airframe</label>
                    <select data-test="currentAirframe" onChange={this.onChangeAirframe} class="form-control" id="airframe">
                            <option>airframe</option>
                            {airframes.map((airframe)=> (
                                <option>{airframe.Name}
                                </option>))}
                   </select> 
                    </div>
                    <div className="form-group col-md-3">
                    <label for="squadron">New Airframe</label>
                    <input data-test="newAirframe" type="text" className="form-control" id="airframe" value={this.state.newAirframe}  onChange={this.onChangeNewAirframe} placeholder="Airframe" name="airframe"></input>                                          
                    </div>
                    <div className="form-row d-flex justify-content-center">
                    <button onClick={this.updateAirframe} type="button" className="align-self-center btn btn-dark btn-lg h-90">Edit</button>      
            </div>
                </div> 

                {/* This area is for the inputs for editing the Location*/}
                 <div className="form-row d-flex justify-content-center">
                    <div className="form-group col-md-3">
                    <label for="exampleFormControlSelect1">Current Location</label>
                    <select data-test="currentLocation" onChange={this.onChangeLocation} class="form-control" id="location">
                            <option>location</option>
                            {locations.map((location)=> (
                                <option>{location.Name}
                                </option>))}
                   </select> 
                    </div>
                    <div className="form-group col-md-3">
                    <label for="location">New Location</label>
                    <input data-test="newLocation" type="text" className="form-control" id="Location" value={this.state.newLocation}  onChange={this.onChangeNewLocation} placeholder="Location" name="Location"></input>                                          
                    </div>
                    <div className="form-row d-flex justify-content-center">
                    <button onClick={this.updateLocation} type="button" className="align-self-center btn btn-dark btn-lg h-90">Edit</button>      
            </div>
                </div> 
                {/* <div className="form-row d-flex justify-content-center">
            <button onClick={this.saveChanges} type="button" className="btn btn-dark btn-lg">Edit</button>      
            </div> */}
                </div>
                )
            }</div>            
        )
    }
}