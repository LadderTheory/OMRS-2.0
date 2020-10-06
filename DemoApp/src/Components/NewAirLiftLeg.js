import React, { Component } from 'react';
import ParameterService from '../services/Parameter.service';
import MissionDataService from "../services/missions.service";
import AuthService from "../services/auth.service";
import { Redirect } from "react-router-dom";
import AirliftMissionService from '../services/AirliftMission.service';


//Input Mission Form
export default class NewAirLiftMsn extends Component {

    constructor(props) {
        super(props);

        //Make sure you have one of these for all functions. It is a requirement of React
        this.onChangeSchedTO = this.onChangeSchedTO.bind(this);
        this.onChangeSchedLand = this.onChangeSchedLand.bind(this);
        this.onChangeActualTO = this.onChangeSchedTO.bind(this);
        this.onChangeActualLand = this.onChangeActualLand.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangePassOn = this.onChangePassOn.bind(this);
        this.onChangePassOff = this.onChangePassOff.bind(this);
        this.onChangePassThru = this.onChangePassThru.bind(this);
        this.onChangeCargoOn = this.onChangeCargoOn.bind(this);
        this.onChangeCargoOff = this.onChangeCargoOff.bind(this);
        this.onChangeCargoThru = this.onChangeCargoThru.bind(this);
        this.onChangePalletOn = this.onChangePalletOn.bind(this);
        this.onChangePalletOff = this.onChangePalletOff.bind(this);
        this.onChangePalletThru = this.onChangePalletThru.bind(this);
        this.onChangeRemarks = this.onChangeRemarks.bind(this);
        this.onChangeMaxACL = this.onChangeMaxACL.bind(this);
        this.onChangeInitials = this.onChangeInitials.bind(this);
        this.onChangeLegNumber = this.onChangeLegNumber.bind(this);
        this.onChangePalletEmpty = this.onChangePalletEmpty.bind(this);
        this.onChangeICAODest = this.onChangeICAODest.bind(this);
        this.onChangeICAOSource = this.onChangeICAOSource.bind(this);

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
            passengerThru: '',
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
            ICAOSource: '',
            ICAODest: '',
            legType: '',
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

    onChangeICAOSource(e) {
        this.setState({
            ICAOSource: e.target.value
        });
    }

    onChangeICAODest(e) {
        this.setState({
            ICAODest: e.target.value
        });
    }

    onChangeLegType(e) {
        this.setState({
            legType: e.target.value
        });
    }

    //Submits the data entered on the form to the database.
    // saveMission() {

    //     console.log('Form submitted');
    //     //
    //     const newLegType = {
    //         scheduledTakeOff: this.state.scheduledTakeOff,
    //         scheduledLand: this.state.scheduledLand,
    //         actualTakeOff: this.state.actualTakeOff,
    //         actualLand: this.state.actualLand,
    //         duration: this.state.duration,
    //         passengerOn: this.state.passengerOn,
    //         passengerOff: this.state.passengerOff,
    //         passengerThru: this.state.passengerThru,
    //         cargoOn: this.state.cargoOn,
    //         cargoOff: this.state.cargoOff,
    //         cargoThru: this.state.cargoThru,
    //         palletOn: this.state.palletOn,
    //         palletOff: this.state.palletOff,
    //         palletThru: this.state.palletThru,
    //         remarks: this.state.remarks,
    //         maxACL: this.state.maxACL,
    //         legNumber: this.state.legNumber,
    //         initials: this.state.initials,
    //         palletEmpty: this.state.palletEmpty,
    //         ICAOSource: this.state.ICAOSource,
    //         ICAODest: this.state.ICAODest,
    //         legType: this.state.legType
    //     };

    //     MissionDataService.addMission(newMission)
    //         .then(response => {
    //             this.setState({
    //                 scheduledTakeOff: response.data.scheduledTakeOff,
    //                 scheduledLand: response.data.scheduledLand,
    //                 actualTakeOff: response.data.actualTakeOff,
    //                 actualLand: response.data.actualLand,
    //                 duration: response.data.duration,
    //                 passengerOn: response.data.passengerOn,
    //                 passengerOff: response.data.passengerOff,
    //                 passengerThru: response.data.passengerThru,
    //                 cargoOn: response.data.cargoOn,
    //                 cargoOff: response.data.cargoOff,
    //                 cargoThru: response.data.cargoThru,
    //                 palletOn: response.data.palletOn,
    //                 palletOff: response.data.palletOff,
    //                 palletThru: response.data.palletThru,
    //                 remarks: response.data.remarks,
    //                 maxACL: response.data.maxACL,
    //                 legNumber: response.data.legNumber,
    //                 initials: response.data.initials,
    //                 palletEmpty: response.data.palletEmpty,
    //                 ICAOSource: response.data.ICAOSource,
    //                 ICAODest: response.data.ICAODest,
    //                 legType: response.data.legType,
    //                 submitted: true
    //             });
    //             console.log(response.data)
    //         })
    //         .catch(e => {
    //             console.log(e);
    //         });
    // }
    // //Resets the state of the form for new inputs
    // newMission() {
    //     this.setState({
    //         scheduledTakeOff: '',
    //         scheduledLand: '',
    //         actualTakeOff: '',
    //         actualLand: '',
    //         duration: '',
    //         passengerOn: '',
    //         passengerOff: '',
    //         passengerThru: '',
    //         cargoOn: '',
    //         cargoOff: '',
    //         cargoThru: '',
    //         palletOn: '',
    //         palletOff: '',
    //         palletThru: '',
    //         remarks: '',
    //         maxACL: '',
    //         legNumber: '',
    //         initials: '',
    //         palletEmpty: '',
    //         ICAOSource: '',
    //         ICAODest: '',
    //         legType: '',
    //         submitted: false
    //     });
    // }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        const { icaos } = this.state;
        return (







            <div class="accordion" id="accordionExample">
                <div class="card bg-dark">
                    <div class="card-header" id="headingOne">
                        <h2 class="mb-0">
                            <button class="btn btn-link btn-block text-left" type="button" data-toggle="collapse" data-target={"#" + this.props.datatgt} aria-expanded="true" aria-controls="collapseOne">
                                {this.props.title}
                            </button>
                        </h2>
                    </div>

                    <div id={this.props.datatgt} class="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
                        <div class="card-body">

                            <div className="submit-form" data-test="component-newLeg">
                                
                                    <form>
                                        {/* A New Row */}

                                        <div className="row">

                                            <div className="col">
                                                <div className="row">
                                                    <label>Take Off Times</label>
                                                </div>
                                                <div className="row">
                                                    <input type="text" className="form-control" id="schedto" data-test="schedto" onChange={this.onChangeSchedTO} name="schedto" placeholder="Scheduled Take Off"></input>
                                                    <input type="text" className="form-control" id="actualto" data-test="actualto" onChange={this.onChangeActualTO} name="actualto" placeholder="Actual Take Off"></input>
                                                </div>
                                            </div>

                                            <div className="col">
                                                <div className="row">
                                                    <label>Landing Times</label>
                                                </div>
                                                <div className="row">
                                                    <input type="text" className="form-control" id="schedland" data-test="schedland" onChange={this.onChangeSchedLand} name="schedland" placeholder="Scheduled Land"></input>
                                                    <input type="text" className="form-control" id="actualland" data-test="actualland" onChange={this.onChangeActualLand} name="actualland" placeholder="Actual Land"></input>
                                                </div>
                                            </div>

                                            <div className="col">
                                                <div className="row">
                                                    <label>Duration</label>
                                                </div>
                                                <div className="row">
                                                    <input type="text" className="form-control" id="duration" data-test="schedland" onChange={this.onChangeDuration} name="duration" placeholder="Duration"></input>
                                                </div>
                                            </div>

                                        </div>


                                        {/* A New Row */}

                                        <div className="row">

                                            <div className="col">
                                                <div className="row">
                                                    <label>Passengers</label>
                                                </div>
                                                <div className="row">
                                                    <input type="text" className="form-control" id="passon" data-test="passon" onChange={this.onChangePassOn} name="passon" placeholder="Passengers On"></input>
                                                    <input type="text" className="form-control" id="passoff" data-test="passoff" onChange={this.onChangePassOff} name="passoff" placeholder="Passengers Off"></input>
                                                    <input type="text" className="form-control" id="passthru" data-test="passthru" onChange={this.onChangePassThru} name="passthru" placeholder="Passengers Thru"></input>
                                                </div>
                                            </div>

                                            <div className="col">
                                                <div className="row">
                                                    <label>Cargo</label>
                                                </div>
                                                <div className="row">
                                                    <input type="text" className="form-control" id="cargoon" data-test="cargoon" onChange={this.onChangeCargoOn} name="cargoon" placeholder="Cargo On"></input>
                                                    <input type="text" className="form-control" id="cargooff" data-test="cargooff" onChange={this.onChangeCargoOff} name="cargooff" placeholder="Cargo Off"></input>
                                                    <input type="text" className="form-control" id="cargothru" data-test="cargothru" onChange={this.onChangeCargoThru} name="cargothru" placeholder="Cargo Thru"></input>
                                                </div>
                                            </div>

                                            <div className="col">
                                                <div className="row">
                                                    <label>Pallets</label>
                                                </div>
                                                <div className="row">
                                                    <input type="text" className="form-control" id="palleton" data-test="palleton" onChange={this.onChangePalletOn} name="palleton" placeholder="Pallet On"></input>
                                                    <input type="text" className="form-control" id="palletoff" data-test="palletoff" onChange={this.onChangePalletOff} name="palletoff" placeholder="Pallet Off"></input>
                                                    <input type="text" className="form-control" id="palletthru" data-test="palletthru" onChange={this.onChangePalletThru} name="palletthru" placeholder="Pallet Thru"></input>
                                                </div>
                                            </div>

                                        </div>



                                        {/* A New Row */}


                                        <div className="row">


                                            <div className="col">
                                                <label>ACL</label>
                                                <input type="text" className="form-control" id="acl" data-test="acl" onChange={this.onChangeMaxACL} name="acl" placeholder="ACL"></input>
                                            </div>

                                        </div>



                                        {/* A New Row */}

                                        <div className="row">

                                            <div className="col">
                                                <label>ICAO Source</label>
                                                <select onChange={this.onChangeICAOSource} data-test="icaosource" class="form-control" id="icaosource" name="icaosource">
                                                    <option>Operation</option>

                                                </select>
                                            </div>




                                            <div className="col">
                                                <label>ICAO Destination</label>
                                                <select onChange={this.onChangeICAODest} data-test="icaodest" class="form-control" id="icaodest" name="icaodest">
                                                    <option>Destination</option>

                                                </select>
                                            </div>

                                        </div>


                                        {/* A New Row */}

                                        <div className="row">

                                            <div className="col">
                                                <label>Leg Type</label>
                                                <select onChange={this.onChangeLegType} data-test="legtype" class="form-control" id="legtype" name="legtype">
                                                    <option>Leg Type</option>

                                                </select>
                                            </div>



                                            <div className="col">
                                                <label>Remarks</label>
                                                <input type="text" className="form-control" id="remarks" data-test="remarks" onChange={this.onChangeRemarks} name="remarks" placeholder="Remarks"></input>
                                            </div>

                                        </div>

                                    </form>
                                

                            </div>
                        </div>
                    </div>
                </div>
            </div>




        );
    }

}