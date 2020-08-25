
import React, { Component } from 'react';
import axios from 'axios';
import MissionDataService from "../services/missions.service";


//Input Mission Form
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

        this.state = {
            currentMsn: {
                id: null,
                msnNumber: '',
                callSign: '',
                squadron: '',
                airframe: '',
                source: '',
                destination: '',
                msnDate: new Date()
            },
            message: ''
        };
    }

    componentDidMount() {
        this.getMission(this.props.match.params.id);
    }

    componentWillUnmount() {
        // fix Warning: Can't perform a React state update on an unmounted component
        this.setState = (state,callback)=>{
            return;
        };
    }

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

    //onChangeMsnDate = msnDate => this.setState({ msnDate })

    getMission(id) {
        MissionDataService.get(id)
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


    updateMission() {
        MissionDataService.update(
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
            //this.props.history.push('/missions');
    }

    deleteMission() {
        MissionDataService.delete(this.state.currentMsn._id)
            .then(response => {
                console.log(response.data);
                this.props.history.push('/missions');
            })
            .catch(e => {
                console.log(e);
            });
    }


    render() {
        const { currentMsn } = this.state;

        return (


            <div className="col-md-6">
                {currentMsn ? (

                    <div className="edit-form">

                        <div className="d-flex justify-content-center">
                            {/* <DatePicker
                                onChange={this.onChangeMsnDate}
                                value={this.state.msnDate}
                            /> */}
                        </div>
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
                                    <input type="text" className="form-control" id="squadron" value={currentMsn.squadron} onChange={this.onChangeSquadron} placeholder="Squadron" name="squadron"></input>

                                </div>
                            </div>
                            <div className="form-row d-flex justify-content-center">
                                <div class="form-group col-md-6">
                                    <label for="airframe">Airframe</label>
                                    <input type="text" className="form-control" id="airframe" value={currentMsn.airframe} onChange={this.onChangeAirframe} placeholder="Airframe" name="airframe"></input>

                                </div>
                            </div>
                            <div className="form-row d-flex justify-content-center">
                                <div class="form-group col-md-6">
                                    <label for="source">Source</label>
                                    <input type="text" className="form-control" id="source" value={currentMsn.source} onChange={this.onChangeSource} placeholder="Source" name="source"></input>

                                </div>
                            </div>
                            <div className="form-row d-flex justify-content-center">
                                <div class="form-group col-md-6">
                                    <label for="destination">Destination</label>
                                    <input type="text" className="form-control" id="destination" value={currentMsn.destination} onChange={this.onChangeDestination} placeholder="Destination" name="destination"></input>

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