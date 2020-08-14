import Calendar1 from 'react-calendar';
import React, { Component } from 'react';
import axios from 'axios';
import MissionDataService from "../services/missions.service";
import Calendar from 'react-calendar';

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
            msnDate: '',
            submitted: false
        };
    }

    onChangeMsnNumber(e) {
        this.setState({
            msnNumber: e.target.value  
        });
    }

    onChangeCallSign(e) {
        this.setState({
            callSign: e.target.value
        });
    }

    onChangeSquadron(e) {
        this.setState({
            squadron: e.target.value
        });
    }

    onChangeAirframe(e) {
        this.setState({
            airframe: e.target.value
        });
    }

    onChangeSource(e) {
        this.setState({
            source: e.target.value
        });
    }

    onChangeDestination(e) {
        this.setState({
            destination: e.target.value
        });
    }


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

        MissionDataService.create(newMission)
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

    // state = {
    //     msndate: new Date(),
    //   }
    
    onChangeMsnDate = msnDate => this.setState({ msnDate })

    render() {

        return (
            <div className="submit-form">
            {this.state.submitted ? (
                <div>
                <h4>You submitted successfully</h4>
                <button className="btn btn-success" onClick={this.newMission}>Add</button>
                </div>
            ) : (
                <div>
                <div className="d-flex justify-content-center">
                <Calendar1
                onChange={this.onChangeMsnDate}
                value={this.state.msnDate}
                />
                </div> 
                <form>
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
                            <input type="text" className="form-control" id="squadron" value={this.state.squadron} onChange={this.onChangeSquadron} placeholder="Squadron" name="squadron"></input>

                        </div>
                        </div>
                        <div className="form-row d-flex justify-content-center">
                        <div class="form-group col-md-6">
                            <label for="airframe">Airframe</label>
                            <input type="text" className="form-control" id="airframe" value={this.state.airframe} onChange={this.onChangeAirframe} placeholder="Airframe" name="airframe"></input>

                        </div>
                        </div>
                        <div className="form-row d-flex justify-content-center">
                        <div class="form-group col-md-6">
                            <label for="source">Source</label>
                            <input type="text" className="form-control" id="source" value={this.state.source} onChange={this.onChangeSource} placeholder="Source" name="source"></input>

                        </div>
                        </div>
                        <div className="form-row d-flex justify-content-center">
                        <div class="form-group col-md-6">
                            <label for="destination">Destination</label>
                            <input type="text" className="form-control" id="destination" value={this.state.destination} onChange={this.onChangeDestination} placeholder="Destination" name="destination"></input>

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