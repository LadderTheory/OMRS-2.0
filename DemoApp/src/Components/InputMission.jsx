
import React, { Component } from 'react';
import ParameterService from '../services/Parameters.service';
import MissionDataService from "../services/missions.service";
import AuthService from "../services/auth.service";
import { Redirect } from "react-router-dom";


//Input Mission Form
export default class InsertMission extends Component {

    constructor(props) {
        super(props);

        this.onChangeMsnNumber = this.onChangeMsnNumber.bind(this);
        this.onChangeCallSign = this.onChangeCallSign.bind(this);
        this.onChangeSquadron = this.onChangeSquadron.bind(this);
        this.onChangeAirframe = this.onChangeAirframe.bind(this);
        this.onChangeSource = this.onChangeSource.bind(this);
        this.onChangeDestination = this.onChangeDestination.bind(this);
        this.onChangeMsnDate = this.onChangeMsnDate.bind(this);
        this.saveMission = this.saveMission.bind(this);
        this.newMission = this.newMission.bind(this);  
    

        this.state = {
            msnNumber: '',
            callSign: '',
            squadron: '',
            airframe: '',
            source: '',
            destination: '',
            msnDate: "",
            submitted: false,   
            squadrons:[],
            airframes:[],
            locations:[],
            redirect: null,
            currentUser: { username: "" }
        };
    }
    componentDidMount() {
        const currentUser = AuthService.getCurrentUser();
        if (!currentUser) this.setState({ redirect: "/login" });
        this.retrieveParameters();
        this.retrieveAirframe();
        this.retrieveLocation();

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
    //Sets the value of the property when changed.
    onChangeMsnDate(e)
    {
        this.setState({
            msnDate:e.target.value
        })
    }
    //Sets the value of the property when changed.
    onChangeMsnNumber(e){
        this.setState({
            msnNumber: e.target.value  
        });
    }
    //Sets the value of the property when changed.
    onChangeCallSign(e) {
        this.setState({
            callSign: e.target.value
        });
    }
    //Sets the value of the property when changed.
    onChangeSquadron(e) {
        this.setState({
            squadron: e.target.value
        });
    }
    //Sets the value of the property when changed.
    onChangeAirframe(e) {
        this.setState({
            airframe: e.target.value
        });
    }
    //Sets the value of the property when changed.
    onChangeSource(e) {
        this.setState({
            source: e.target.value
        });
    }
    //Sets the value of the property when changed.
    onChangeDestination(e) {
        this.setState({
            destination: e.target.value
        });
    }
    //Submits the data entered on the form to the database.
    saveMission() {

        console.log('Form submitted');
        const newMission = {
            msnNumber: this.state.msnNumber,
            callSign: this.state.callSign,
            squadron: this.state.squadron,
            airframe: this.state.airframe,
            source: this.state.source,
            destination: this.state.destination,
            msnDate: this.state.msnDate
        };

        MissionDataService.addMission(newMission)
            .then(response => {
                this.setState({
                    msnNumber: response.data.msnNumber,
                    callSign: response.data.callSign,
                    squadron: response.data.squadron,
                    airframe: response.data.airframe,
                    source: response.data.source,
                    destination: response.data.destination,
                    msnDate: response.data.msnDate,
                    submitted: true
                });
                console.log(response.data)
            })
            .catch(e => {
                console.log(e);
            });
    }
    //Resets the state of the form for new inputs
    newMission() {
        this.setState({
            msnNumber: '',
            callSign: '',
            squadron: '',
            airframe: '',
            source: '',
            destination: '',
            msnDate: '',
            submitted: false
        });
    }
    
    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        const{squadrons, airframes, locations, currentIndex} = this.state;
        return (
            <div className="submit-form">
            {this.state.submitted ? (
                <form>
                <div className="form-row d-flex justify-content-center">
                <h2>You submitted successfully</h2>
                </div>
                <div className="form-row d-flex justify-content-center">
                <button className="btn btn-dark btn-lg" onClick={this.newMission}>Add</button>
                </div>
                </form>
            ) : (
                <div>
                <form>
                        <div className="form-row d-flex justify-content-center">
                        <div className="form-group col-md-6">
                            <label for="msnDate">Mission Date</label>
                            <input type="date" className="form-control" id="msnDate" value={this.msnDate} onChange={this.onChangeMsnDate}  name="msnDate"></input>
                        </div>
                        </div>
                        <div className="form-row d-flex justify-content-center">
                        <div className="form-group col-md-6">
                            <label for="msnNumber">Mission #</label>
                            <input type="text" className="form-control" id="msnNumber" value={this.state.msnNumber} onChange={this.onChangeMsnNumber} placeholder="Mission #" name="msnNumber"></input>

                        </div>
                        </div>
                        <div className="form-row d-flex justify-content-center">
                        <div class="form-group col-md-6">
                            <label for="callSign">CallSign</label>
                            <input type="text" className="form-control" id="callSign" value={this.state.callSign} onChange={this.onChangeCallSign} placeholder="Call Sign" name="callSign"></input>

                        </div>
                        </div>
                        <div className="form-row d-flex justify-content-center">
                        <div class="form-group col-md-6">
                            <label for="squadron">Squadron</label>
                            {/* <input type="text" className="form-control" id="squadron" value={this.state.squadron} onChange={this.onChangeSquadron} placeholder="Squadron" name="squadron"></input> */}
                            <select onChange={this.onChangeSquadron} value={this.state.squadron} class="form-control" id="squadron" placeholder="Squadron" name="squadron">
                            <option>squadron</option>
                            {squadrons.map((squadron)=> (                                
                                <option>{squadron.Name}
                                </option>))}
                   </select> 
                        </div>
                        </div>
                        <div className="form-row d-flex justify-content-center">
                        <div class="form-group col-md-6">
                            <label for="airframe">Airframe</label>
                            {/* <input type="text" className="form-control" id="airframe" value={this.state.airframe} onChange={this.onChangeAirframe} placeholder="Airframe" name="airframe"></input> */}
                            <select onChange={this.onChangeAirframe} value={this.state.airframe} class="form-control" id="airframe" placeholder="Airframe" name="airframe">
                            <option> airframe</option>
                            {airframes.map((airframe)=> (
                                <option>{airframe.Name}
                                </option>))}
                   </select>
                        </div>
                        </div>
                        <div className="form-row d-flex justify-content-center">
                        <div class="form-group col-md-6">
                            <label for="source">Source</label>
                            {/* <input type="text" className="form-control" id="source" value={this.state.source} onChange={this.onChangeSource} placeholder="Source" name="source"></input> */}
                            <select onChange={this.onChangeSource} value={this.state.source} class="form-control" id="location" placeholder="Source" name="source">  
                            <option>source</option>
                            {locations.map((location)=> (
                                <option>{location.Name}
                                </option>))}
                   </select> 
                        </div>
                        </div>
                        <div className="form-row d-flex justify-content-center">
                        <div class="form-group col-md-6">
                            <label for="destination">Destination</label>
                            {/* <input type="text" className="form-control" id="destination" value={this.state.destination} onChange={this.onChangeDestination} placeholder="Destination" name="destination"></input> */}
                            <select onChange={this.onChangeDestination} value={this.state.destination} class="form-control" id="location" placeholder="Destination" name="destination">
                            <option>location</option>
                            {locations.map((location)=> (
                                <option>{location.Name}
                                </option>))}
                   </select> 
                        </div>
                        </div>
                        <div className="form-row d-flex justify-content-center">
                    <button onClick={this.saveMission} type="button" className="btn btn-dark btn-lg">Submit</button>
                    </div>
                    </form>
                </div>
            )}
            </div>
        );
    }

}