import React, { Component } from 'react';
import ParameterService from '../services/Parameters.service';
import MissionDataService from "../services/missions.service";
import AuthService from "../services/auth.service";
import { Redirect } from "react-router-dom";
import AirliftMissionService from '../services/AirliftMission.service';


//Input Mission Form
export default class NewAirLiftMsn extends Component {

    constructor(props) {
        super(props);

        //Make sure you have one of these for all functions. It is a requirement of React
        // this.onChangeMsnNumber = this.onChangeMsnNumber.bind(this);
        // this.onChangeCallSign = this.onChangeCallSign.bind(this);
        // this.onChangeSquadron = this.onChangeSquadron.bind(this);
        // this.onChangeAirframe = this.onChangeAirframe.bind(this);
        // this.onChangeSource = this.onChangeSource.bind(this);
        // this.onChangeDestination = this.onChangeDestination.bind(this);
        // this.onChangeMsnDate = this.onChangeMsnDate.bind(this);
        // this.saveMission = this.saveMission.bind(this);
        // this.newMission = this.newMission.bind(this);
        // this.getChannels = this.getChannels.bind(this);

        //The below code sets the initial state
        this.state = {
            scheduledTakeOff: '',
            scheduledLand: '',
            actualTakeOff: '',
            actualLand: '',
            duration: '',
            passengerOn: '',
            passengerOff: '',
            passengerThru: false,
            cargoOn: '',
            cargoOff: '',
            cargoThru: '',
            palletOn: '',
            palletOff: '',
            palletThru: '',
            remarks: '',
            maxACL: '',
            legNumber: '',
            initials: '',
            palletEmpty: '',
            icao: [],
            legType: [],
            redirect: null,
            currentUser: { username: "" },
        };
    }
    //This function handles what will occur when the component is rendered
    componentDidMount() {
        const currentUser = AuthService.getCurrentUser();
        if (!currentUser) this.setState({ redirect: "/login" });

    //These functons retrieve the data from the corresponding collections in the database to populate select boxes
    }
    getICAO() {
        ParameterService.getICAO()
            .then(response => {
                this.setState({ icao: response.data });
            })
            .catch(e => {
                console.log(e);
            });
    }
    getLegType() {
        ParameterService.getLegType()
            .then(response => {
                this.setState({ legType: response.data });
            })
            .catch(e => {
                console.log(e);
            })
    }

    //These functions functions pass whatever value is being typed or selected for a form box to the corresponding entry in state
    onChangeSchedTO(e) {
        this.setState({
            scheduledTakeOff: e.target.value
        })
    }
    
    onChangeSchedLand(e) {
        this.setState({
            scheduledLand: e.target.value
        });
    }
    
    onChangeActualTO(e) {
        this.setState({
            actualTakeOff: e.target.value
        });
    }
    
    onChangeActualLand(e) {
        this.setState({
            actualLand: e.target.value
        });
    }
   
    onChangeDuration(e) {
        this.setState({
            duration: e.target.value
        });
    }
  
    onChangePassOn(e) {
        this.setState({
            passengerOn: e.target.value
        });
    }
  
    onChangePassOff(e) {
        this.setState({
            passengerOff: e.target.value
        });
    }

    onChangePassThru(e) {
        this.setState({
            passengerThru: e.target.value
        });
    }

    onChangeCargoOn(e) {
        this.setState({
            cargoOn: e.target.value
        });
    }

    onChangeCargoOff(e) {
        this.setState({
            cargoOff: e.target.value
        });
    }

    onChangeCargoThru(e) {
        this.setState({
            cargoThru: e.target.value
        });
    }

    onChangePalletOn(e) {
        this.setState({
            palletOn: e.target.value
        });
    }

    onChangePalletOff(e) {
        this.setState({
            palletOff: e.target.value
        });
    }

    onChangePalletThru(e) {
        this.setState({
            palletThru: e.target.value
        });
    }

    onChangeRemarks(e) {
        this.setState({
            remarks: e.target.value
        });
    }

    onChangeMaxACL(e) {
        this.setState({
            maxACL: e.target.value
        });
    }

    onChangeInitials(e) {
        this.setState({
            initials: e.target.value
        });
    }

    onChangeLegNumber(e) {
        this.setState({
            legNumber: e.target.value
        });
    }

    onChangePalletEmpty(e) {
        this.setState({
            palletEmpty: e.target.value
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
        const { squadrons, airframes, locations, channels } = this.state;
        return (
            <div className="submit-form" data-test="component-InputMission">
                {this.state.submitted ? (
                    <form>
                        <div className="form-row d-flex justify-content-center">
                            <h2>You submitted successfully</h2>
                        </div>
                        <div className="form-row d-flex justify-content-center">
                            <button data-test="button-add" className="btn btn-dark btn-lg" onClick={this.newMission}>Add a New Mission</button>
                        </div>
                    </form>
                ) : (
                        <div className="container rounded bg-dark" data-test="InputMissionForm">
                            <form>
                                {/* A New Row */}

                                <div className="row">

                                    <div className="col">
                                        <label for="msnDate">Mission Date</label>
                                        <input type="date" className="form-control" id="msnDate" data-test="msnDate" value={this.msnDate} onChange={this.onChangeMsnDate} name="msnDate"></input>
                                    </div>



                                    <div className="col">
                                        <label for="msnNumber">Mission #</label>
                                        <input type="text" className="form-control" id="msnNumber" data-test="msnNumber" value={this.state.msnNumber} onChange={this.onChangeMsnNumber} placeholder="Mission #" name="msnNumber"></input>
                                    </div>

                                </div>


                                {/* A New Row */}

                                <div className="row">

                                    <div className="col">
                                        <label for="callSign">CallSign</label>
                                        <input type="text" className="form-control" id="callSign" data-test="callSign" value={this.state.callSign} onChange={this.onChangeCallSign} placeholder="Call Sign" name="callSign"></input>
                                    </div>



                                    <div className="col">
                                        <label for="msnDate">Commander</label>
                                        <input type="text" className="form-control" id="commander" data-test="commander" value={this.msnDate} onChange={this.onChangeMsnDate} placeholder="Commander" name="commander"></input>
                                    </div>
                                </div>



                                {/* A New Row */}


                                <div className="row">


                                    <div className="col">
                                        <label for="squadron">Squadron</label>
                                        <select onChange={this.onChangeSquadron} value={this.state.squadron} data-test="squadron" class="form-control" id="squadron" placeholder="Squadron" name="squadron">
                                            <option>Squadron</option>
                                            {squadrons.map((squadron) => (<option>{squadron.Name}</option>))}
                                        </select>
                                    </div>

                                    <div className="col">
                                        <label for="airframe">Airframe</label>
                                        <select onChange={this.onChangeAirframe} value={this.state.airframe} data-test="airframe" class="form-control" id="airframe" placeholder="Airframe" name="airframe">
                                            <option>Airframe</option>
                                            {airframes.map((airframe) => (
                                                <option>{airframe.Name}
                                                </option>))}
                                        </select>
                                    </div>


                                </div>



                                {/* A New Row */}

                                <div className="row">

                                    <div className="col">
                                        <label for="airframe">Operation</label>
                                        <select onChange={this.onChangeAirframe} value={this.state.airframe} data-test="airframe" class="form-control" id="airframe" placeholder="Airframe" name="airframe">
                                            <option>Operation</option>
                                            {airframes.map((airframe) => (
                                                <option>{airframe.Name}
                                                </option>))}
                                        </select>
                                    </div>




                                    <div className="col">
                                        <label for="source">Base</label>
                                        <select onChange={this.onChangeSource} value={this.state.source} data-test="source" class="form-control" id="location" placeholder="Source" name="source">
                                            <option>Base</option>
                                            {locations.map((location) => (
                                                <option>{location.Name}
                                                </option>))}
                                        </select>
                                    </div>

                                </div>


                                {/* A New Row */}

                                <div className="row">

                                    <div className="col">
                                        <label for="source">Mission Type</label>
                                        <select onChange={this.onChangeSource} value={this.state.source} data-test="source" class="form-control" id="location" placeholder="Source" name="source">
                                            <option>Mission Type</option>
                                            {locations.map((location) => (
                                                <option>{location.Name}
                                                </option>))}
                                        </select>
                                    </div>



                                    <div className="col">
                                        <label for="source">Commercial Type</label>
                                        <select onChange={this.onChangeSource} value={this.state.source} data-test="source" class="form-control" id="location" placeholder="Source" name="source">
                                            <option>Commercial Type</option>
                                            {locations.map((location) => (
                                                <option>{location.Name}
                                                </option>))}
                                        </select>
                                    </div>

                                </div>


                                {/* A New Row */}
                                <div className="row">
                                    <div className="col">
                                        <label for="source">Channel Name</label>
                                        <select onChange={this.onChangeChannel} value={this.state.channel} data-test="channel" class="form-control" id="location" placeholder="Channel" name="channel">
                                            <option>Channel</option>
                                            {channels.map((channel) => (
                                                <option>{channel.name}
                                                </option>))}
                                        </select>
                                    </div>

                                    <div className="col"></div>
                                </div>




                                <div className="row">
                                    <div class="col">
                                        <label for="callSign">Remarks</label>
                                        <input type="text" className="form-control" id="remarks" data-test="remarks" value={this.state.callSign} onChange={this.onChangeCallSign} placeholder="Remarks" name="remarks"></input>
                                    </div>
                                </div>



                                <div className="row d-flex justify-content-center">
                                    <div classname="col">
                                        <button onClick={this.saveMission} data-test="submit-button" type="button" className="btn btn-dark btn-lg">Submit</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    )}
            </div>
        );
    }

}