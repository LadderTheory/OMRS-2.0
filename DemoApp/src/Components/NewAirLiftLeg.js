import React, { Component } from 'react';
import ParameterService from '../services/Parameter.service';
import AuthService from "../services/auth.service";


//Input Mission Form
export default class NewAirLiftLeg extends Component {

    constructor(props) {
        super(props);

        //Make sure you have one of these for all functions. It is a requirement of React
        this.onChangeSchedTO = this.onChangeSchedTO.bind(this);
        this.onChangeSchedLand = this.onChangeSchedLand.bind(this);
        this.onChangeActualTO = this.onChangeActualTO.bind(this);
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
        this.onChangeLegType = this.onChangeLegType.bind(this);
        this.retrieveICAOs = this.retrieveICAOs.bind(this);
        this.retrieveLegTypes = this.retrieveLegTypes.bind(this);

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
            icaos: [],
            legTypes: [],
            redirect: null,
            currentUser: { username: "" },
            currentLeg: null
        };
     }

    //This function handles what will occur when the component is rendered
    componentDidMount() {
        const currentUser = AuthService.getCurrentUser();
        if (!currentUser) this.setState({ redirect: "/login" });
        
        //These functons retrieve the data from the corresponding collections in the database to populate select boxes
        this.retrieveICAOs();
        this.retrieveLegTypes();
        
    }
    retrieveICAOs() {
        ParameterService.retrieveICAOs()
            .then(response => {
                this.setState({ icaos: response.data });
            })
            .catch(e => {
                console.log(e);
            });
    }
    retrieveLegTypes() {
        ParameterService.retrieveLegTypes()
            .then(response => {
                this.setState({ legTypes: response.data });
            })
            .catch(e => {
                console.log(e);
            })
    }

    //These functions functions pass whatever value is being typed or selected for a form box to the corresponding entry in state
    onChangeSchedTO(e) { 
        const schedTO = { val: e.target.value, index: this.props.legindex }
        this.props.handleChangeSchedTO(schedTO);
    }

    onChangeSchedLand(e) {
        const schedLand = { val: e.target.value, index: this.props.legindex }
        
        this.props.handleChangeSchedLand(schedLand);
    }

    onChangeActualTO(e) {
        const actualTO = { val: e.target.value, index: this.props.legindex }
        
        this.props.handleChangeActualTO(actualTO);
    }

    onChangeActualLand(e) {
        const actualLand = { val: e.target.value, index: this.props.legindex }
        
        this.props.handleChangeActualLand(actualLand);
    }

    onChangeDuration(e) {
        const duration = { val: e.target.value, index: this.props.legindex }
        
        this.props.handleChangeDuration(duration);
    }

    onChangePassOn(e) {
        const passOn = { val: e.target.value, index: this.props.legindex }
        
        this.props.handleChangePassOn(passOn);
    }

    onChangePassOff(e) {
        const passOff = { val: e.target.value, index: this.props.legindex }
        
        this.props.handleChangePassOff(passOff);
    }

    onChangePassThru(e) {
        const passThru = { val: e.target.value, index: this.props.legindex }
        
        this.props.handleChangePassThru(passThru);
    }

    onChangeCargoOn(e) {
        const cargoOn= { val: e.target.value, index: this.props.legindex }
        
        this.props.handleChangeCargoOn(cargoOn);
    }

    onChangeCargoOff(e) {
        const cargoOff = { val: e.target.value, index: this.props.legindex }
        
        this.props.handleChangeCargoOff(cargoOff);
    }

    onChangeCargoThru(e) {
        const cargoThru = { val: e.target.value, index: this.props.legindex }
        
        this.props.handleChangeCargoThru(cargoThru);
    }

    onChangePalletOn(e) {
        const palletOn = { val: e.target.value, index: this.props.legindex }
        
        this.props.handleChangePalletOn(palletOn);
    }

    onChangePalletOff(e) {
        const palletOff = { val: e.target.value, index: this.props.legindex }
        
        this.props.handleChangePalletOff(palletOff);
    }

    onChangePalletThru(e) {
        const palletThru = { val: e.target.value, index: this.props.legindex }
        
        this.props.handleChangePalletThru(palletThru);
    }

    onChangeRemarks(e) {
        const remarks = { val: e.target.value, index: this.props.legindex }
        
        this.props.handleChangeRemarks(remarks);
    }

    onChangeMaxACL(e) {
        const acl = { val: e.target.value, index: this.props.legindex }
        
        this.props.handleChangeACL(acl);
    }

    onChangeInitials(e) {
        const initials = { val: e.target.value, index: this.props.legindex }
        
        this.props.handleChangeInitials(initials);
    }

    onChangeLegNumber(e) {
        const legNumber = { val: e.target.value, index: this.props.legindex }
        
        this.props.handleChangeLegNumber(legNumber);
    }

    onChangePalletEmpty(e) {
        const palletEmpty = { val: e.target.value, index: this.props.legindex }
        
        this.props.handleChangePalletEmpty(palletEmpty);
    }

    onChangeICAOSource(e) {
        const ICAOSource = { val: e.target.value, index: this.props.legindex }
        
        this.props.handleChangeICAOSource(ICAOSource);
    }

    onChangeICAODest(e) {
        const ICAODest = { val: e.target.value, index: this.props.legindex }
        
        this.props.handleChangeICAODest(ICAODest);
    }

    onChangeLegType(e) {
        const legType = { val: e.target.value, index: this.props.legindex }
        
        this.props.handleChangeLegType(legType);
    }

    //This function creates a new object called newLeg and is passed all the values of the data that is currently in state
    // saveLeg = () => {
    //     const newLeg = {
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
    //     }
        
    //     //This passes the newLeg Object back to the parent component (NewAirLiftMsn.js) as the input for the onLegAdd function on that component
    //     this.props.onLegAdd(newLeg);
    //   }     

    render() {
        const { icaos, legTypes } = this.state;

        return (

            <div class="accordion" id="accordionExample">
                <div class="card ">
                    <div class="card-header" id="headingOne">
                        <h2 class="mb-0">
                            <button id="legbtn" class="btn btn-primary btn-lg span9" type="button" data-toggle="collapse" data-target={"#" + this.props.datatgt} aria-expanded="true" aria-controls="collapseOne">
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
                                                    <input type="time" className="form-control" id="schedto" data-test="schedto" onChange={this.onChangeSchedTO} name="schedto" placeholder="Scheduled Take Off"></input>
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
                                                    {icaos.map((icao) => (<option value={icao._id}>{icao.name}</option>))}
                                                </select>
                                            </div>




                                            <div className="col">
                                                <label>ICAO Destination</label>
                                                <select onChange={this.onChangeICAODest} data-test="icaodest" class="form-control" id="icaodest" name="icaodest">
                                                    <option>Destination</option>
                                                    {icaos.map((icao) => (<option value={icao._id}>{icao.name}</option>))}
                                                </select>
                                            </div>

                                        </div>


                                        {/* A New Row */}

                                        <div className="row">

                                            <div className="col">
                                                <label>Leg Type</label>
                                                <select onChange={this.onChangeLegType} data-test="legtype" class="form-control" id="legtype" name="legtype">
                                                    <option>Leg Type</option>
                                                    {legTypes.map((legType) => (<option value={legType._id}>{legType.name}</option>))}
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