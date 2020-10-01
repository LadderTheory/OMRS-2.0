import React, { Component } from 'react';
// import ParameterDataService from "../services/Parameters.service";
import AuthService from "../services/auth.service";
import missionsService from '../services/missions.service';
import { Redirect } from "react-router-dom";


//Form for updating the status of a selected mission
export default class UpdateMission extends Component {

    constructor(props) {
        super(props);

        this.onChangeMsnNumber = this.onChangeMsnNumber.bind(this);
        this.onChangeCallSign = this.onChangeCallSign.bind(this);
        this.onChangeSquadron = this.onChangeSquadron.bind(this);
        this.onChangeAirframe = this.onChangeAirframe.bind(this);
        this.onChangeSource = this.onChangeSource.bind(this);
        this.onChangeDestination = this.onChangeDestination.bind(this);
        this.onChangeMsnDate = this.onChangeMsnDate.bind(this);
        this.updateMission = this.updateMission.bind(this);
        this.deleteMission = this.deleteMission.bind(this);
        this.retrieveParameters = this.retrieveParameters.bind(this);

        this.state = {
            currentMsn: {
                id: null,
                msnNumber: '',
                callSign: '',
                squadron: '',
                airframe: '',
                source: '',
                destination: '',
                msnDate: new Date(),
                
            },
            message: '',
            squadrons:[],
            airframes:[],
            locations:[],
            newSquadron:'',
            newAirframe:'',
            newSource:'',
            newDestination:'',
            redirect: null,
            currentUser: { username: "" }
        };
    }

    //Retrieves the mission from the database based on its' id when the form loads    
    componentDidMount() {
        const currentUser = AuthService.getCurrentUser();
        if (!currentUser) this.setState({ redirect: "/login" });
        this.getMission(this.props.match.params.id);
        this.retrieveParameters();
    }

    // retrieveParameters(){
    //     ParameterDataService.retrieveSquadron()
    //         .then(response=>{
    //             this.setState({squadrons:response.data});
    //             console.log(response.data);
    //         })
    //         .catch(e=>{
    //             console.log(e);
    //         });
    //         ParameterDataService.retrieveAirframe()
    //         .then(response=>{
    //             this.setState({airframes:response.data});
    //             console.log(response.data);
    //         })
    //         .catch(e=>{
    //             console.log(e);
    //         });
        
    //         ParameterDataService.retrieveLocation()
    //         .then(response=>{
    //             this.setState({locations:response.data});
    //             console.log(response.data);
    //         })
    //         .catch(e=>{
    //             console.log(e);
    //         });
        
        

    // }

     //Sets the property when changed.
    onChangeMsnNumber(e) {
        const msnNumber = e.target.value;

        this.setState(function (prevState) {
            return {
                currentMsn: {
                    ...prevState.currentMsn,
                    msnNumber: msnNumber
                }
            };
        });
    }
    //Sets the property when changed.
    onChangeCallSign(e) {
        const callSign = e.target.value;

        this.setState(function (prevState) {
            return {
                currentMsn: {
                    ...prevState.currentMsn,
                    callSign: callSign
                }
            };
        });
    }
    //Sets the property when changed.
    onChangeSquadron(e) {
        const squadron = e.target.value;

        this.setState(function (prevState) {
            return {
                currentMsn: {
                    ...prevState.currentMsn,
                    squadron: squadron
                }
            };
        });
    }
    //Sets the property when changed.
    onChangeAirframe(e) {
        const airframe = e.target.value;

        this.setState(function (prevState) {
            return {
                currentMsn: {
                    ...prevState.currentMsn,
                    airframe: airframe
                }
            };
        });
    }
    //Sets the property when changed.
    onChangeSource(e) {
        const source = e.target.value;

        this.setState(function (prevState) {
            return {
                currentMsn: {
                    ...prevState.currentMsn,
                    source: source
                }
            };
        });
    }
    //Sets the property when changed.
    onChangeDestination(e) {
        const destination = e.target.value;

        this.setState(function (prevState) {
            return {
                currentMsn: {
                    ...prevState.currentMsn,
                    destination: destination
                }
            };
        });
    }
    //Sets the property when changed.
    onChangeMsnDate(e) {
        const msnDate = e.target.value

        this.setState(function (prevState) {
            return {
                currentMsn: {
                    ...prevState.currentMsn,
                    msnDate: msnDate
                }
            };
        });
    }
    //Requests a specific mission from the database based on a passed id.
    getMission(id) {
        missionsService.getMsnByID(id)
            .then(response => {
                this.setState({
                    currentMsn: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }
    //Sends a patch request to the database based on the data entered into the form.
    updateMission() {
        missionsService.updateMission(
            this.state.currentMsn._id,
            this.state.currentMsn
        )
            .then(response => {
                console.log(response.data);
                this.setState({
                    message: "The mission was updated successfully!"
                    
                });
            })
            .catch(e => {
                console.log(e);
            });
    }
    //Sends a delete request to the database based on the selected mission
    deleteMission() {
        missionsService.deleteMission(this.state.currentMsn._id)
            .then(response => {
                console.log(response.data);
                this.props.history.push('/missionList');
            })
            .catch(e => {
                console.log(e);
            });
    }


    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
          }
        const { currentMsn, squadrons, airframes,locations } = this.state;

        return (


            <div className="col-md-6" data-test="component-UpdateMission">
                {currentMsn ? (

                    <div className="edit-form">
                        <h4>Update Mission</h4>
                        <form>
                            <div className="form-row d-flex justify-content-center">
                                <div className="form-group col-md-6">
                                    <label for="msnNumber">Mission #</label>
                                    <input type="text" className="form-control" id="msnNumber" value={currentMsn.msnNumber} onChange={this.onChangeMsnNumber} placeholder="Mission #" name="msnNumber"></input>

                                </div>
                            </div>
                            <div className="form-row d-flex justify-content-center">
                                <div class="form-group col-md-6">
                                    <label for="callSign">CallSign</label>
                                    <input type="text" className="form-control" id="callSign" value={currentMsn.callSign} onChange={this.onChangeCallSign} placeholder="Call Sign" name="callSign"></input>

                                </div>
                            </div>
                            <div className="form-row d-flex justify-content-center">
                                <div class="form-group col-md-6">
                                    <label for="squadron">Squadron</label>
                                    <select onChange={this.onChangeSquadron} value={this.state.currentMsn.squadron} class="form-control" id="squadron">
                         
                            {squadrons.map((squadron)=> (                                
                                <option>{squadron.Name}
                                </option>))}
                   </select> 

                                </div>
                            </div>
                            <div className="form-row d-flex justify-content-center">
                                <div class="form-group col-md-6">
                                    <label for="airframe">Airframe</label>
                                    <select onChange={this.onChangeAirframe} value={this.state.currentMsn.airframe} class="form-control" id="airframe">
                          
                            {airframes.map((airframe)=> (
                                <option>{airframe.Name}
                                </option>))}
                                </select>
                                </div>
                            </div>
                            <div className="form-row d-flex justify-content-center">
                                <div class="form-group col-md-6">
                                    <label for="source">Source</label>
                                    <select onChange={this.onChangeSource} value={this.state.currentMsn.source} class="form-control" id="location">
                          
                            {locations.map((location)=> (
                                <option>{location.Name}
                                </option>))}
                   </select> 

                                </div>
                            </div>
                            <div className="form-row d-flex justify-content-center">
                                <div class="form-group col-md-6">
                                    <label for="destination">Destination</label>
                                    <select onChange={this.onChangeDestination} value={this.state.currentMsn.destination} class="form-control" id="location">
                            
                            {locations.map((location)=> (
                                <option>{location.Name}
                                </option>))}
                   </select> 

                                </div>
                            </div>

                            <div className="form-row d-flex justify-content-center">
                                <button onClick={this.updateMission} type="button" className="badge badge-success">Update</button>
                                <button onClick={this.deleteMission} type="button" className="badge badge-danger mr-2">Delete</button>
                                <div>
                                <br />
                                <p>{this.state.message}</p>
                                </div>
                            </div>
                        </form>


                    </div>


                ) : (
                        <div>
                            <br />
                            <p>Please click on a Tutorial...</p>
                        </div>
                    )}
            </div>


        );
    }

}