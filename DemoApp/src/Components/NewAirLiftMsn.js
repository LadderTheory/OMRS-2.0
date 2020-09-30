import React, { Component } from 'react';
import ParameterService from '../services/Parameters.service';
import MissionDataService from "../services/missions.service";
import AuthService from "../services/auth.service";
import { Redirect } from "react-router-dom";


//Input Mission Form
export default class NewAirLiftMsn extends Component {

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
        this.getChannels = this.getChannels.bind(this);


        this.state = {
            msnNumber: '',
            callSign: '',
            squadron: '',
            airframe: '',
            source: '',
            destination: '',
            msnDate: "",
            submitted: false,
            squadrons: [],
            airframes: [],
            locations: [],
            redirect: null,
            currentUser: { username: "" },
            channels: ''
        };
    }
    componentDidMount() {
        const currentUser = AuthService.getCurrentUser();
        if (!currentUser) this.setState({ redirect: "/login" });
        this.retrieveParameters();
        this.retrieveAirframe();
        this.retrieveLocation();
        this.getChannels();

    }
    retrieveParameters() {
        ParameterService.retrieveSquadron()
            .then(response => {
                this.setState({ squadrons: response.data });
            })
            .catch(e => {
                console.log(e);
            });
    }
    retrieveAirframe() {
        ParameterService.retrieveAirframe()
            .then(response => {
                this.setState({ airframes: response.data });
            })
            .catch(e => {
                console.log(e);
            })
    }
    retrieveLocation() {
        ParameterService.retrieveLocation()
            .then(response => {
                this.setState({ locations: response.data });
            })
            .catch(e => {
                console.log(e);
            })
    }

    getChannels() {
        ParameterService.getChannels()
            .then(response => {
                this.setState({ channels: response.data });
            })
            .catch(e => {
                console.log(e);
            })
    }
    //Sets the value of the property when changed.
    onChangeMsnDate(e) {
        this.setState({
            msnDate: e.target.value
        })
    }
    //Sets the value of the property when changed.
    onChangeMsnNumber(e) {
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
                        <div data-test="InputMissionForm">
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