import React, { Component } from 'react';
import ParameterService from '../services/Parameter.service';
import MissionDataService from "../services/missions.service";
import AuthService from "../services/auth.service";
import { Redirect } from "react-router-dom";
import NewAirLiftLeg from "./NewAirLiftLeg";

//Input Mission Form
export default class NewAirLiftMsn extends Component {

    constructor(props) {
        super(props);

        //Make sure you have one of these for all functions. It is a requirement of React
        //binds for onChange events
        this.onChangeMsnNumber = this.onChangeMsnNumber.bind(this);
        this.onChangeCommander = this.onChangeCommander.bind(this);
        this.onChangeBase = this.onChangeBase.bind(this);
        this.onChangeCallSign = this.onChangeCallSign.bind(this);
        this.onChangeSquadron = this.onChangeSquadron.bind(this);
        this.onChangeAircraft = this.onChangeAircraft.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangeMsnType = this.onChangeMsnType.bind(this);
        this.onChangeChannel = this.onChangeChannel.bind(this);
        this.onChangeCommType = this.onChangeCommType.bind(this);
        this.onChangeOperation = this.onChangeOperation.bind(this);
        this.onChangeRemarks = this.onChangeRemarks.bind(this);

        //binds for leg component
        this.onChangePassOn = this.onChangePassOn.bind(this);
        this.onChangePassOff = this.onChangePassOff.bind(this);
        this.onChangeSchedLand = this.onChangeSchedLand.bind(this);
        this.onChangeSchedTO = this.onChangeSchedTO.bind(this);
        this.onChangeActualTO =this.onChangeActualTO.bind(this);
        this.onChangeActualLand = this.onChangeActualLand.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangePassThru = this.onChangePassThru.bind(this);
        this.onChangeCargoOn = this.onChangeCargoOn.bind(this);
        this.onChangeCargoOff = this.onChangeCargoOff.bind(this);
        this.onChangeCargoThru= this.onChangeCargoThru.bind(this);
        this.onChangePalletOn = this.onChangePalletOn.bind(this);
        this.onChangePalletOff = this.onChangePalletOff.bind(this);
        this.onChangePalletThru = this.onChangePalletThru.bind(this);
        this.onChangeLegRemarks = this.onChangeLegRemarks.bind(this);
        this.onChangeACL = this.onChangeACL.bind(this);
        this.onChangeInitials = this.onChangeInitials.bind(this);
        this.onChangeLegNumber = this.onChangeLegNumber.bind(this);
        this.onChangePalletEmpty = this.onChangePalletEmpty.bind(this);
        this.onChangeICAOSource = this.onChangeICAOSource.bind(this);
        this.onChangeICAODest = this.onChangeICAODest.bind(this);
        this.onChangeLegType = this.onChangeLegType.bind(this);

        //binds for database entry
        this.saveMission = this.saveMission.bind(this);
        this.newMission = this.newMission.bind(this);
        //this.addLeg = this.addLeg.bind(this);
        this.addLegComponent = this.addLegComponent.bind(this);
        this.removeLegComponent = this.removeLegComponent.bind(this)

        //binds for data retrieval
        this.retrieveChannels = this.retrieveChannels.bind(this);
        this.retrieveAircraft = this.retrieveAircraft.bind(this);
        this.retrieveSquadrons = this.retrieveSquadrons.bind(this);
        this.retrieveOperations = this.retrieveOperations.bind(this);
        this.retrieveBases = this.retrieveBases.bind(this);
        this.retrieveMsnTypes = this.retrieveMsnTypes.bind(this);
        this.retrieveCommTypes = this.retrieveCommTypes.bind(this);

        //The below code sets the initial state
        this.state = {
            msnNumber: '',
            callSign: '',
            commander: '',
            squadron: '',
            aircraft: '',
            base: '',
            date: '',
            remarks: '',
            msnType: '',
            channel: '',
            commType: '',
            operation: '',
            squadrons: [],
            aircrafts: [],
            locations: [],
            operations: [],
            bases: [],
            msnTypes: [],
            commTypes: [],
            channels: [],
            redirect: null,
            submitted: false,
            currentUser: { username: "" },
            legscomponents: [],
            legcounter: 1,
            legindex: -1,
            updateindex: 0,
            legs: [],
        };
    }

    //This function handles what will occur when the component is rendered
    componentDidMount() {
        const currentUser = AuthService.getCurrentUser();
        if (!currentUser) this.setState({ redirect: "/login" });
        this.retrieveAircraft();
        this.retrieveChannels();
        this.retrieveSquadrons();
        this.retrieveOperations();
        this.retrieveBases();
        this.retrieveMsnTypes();
        this.retrieveCommTypes();
    }

    //These functons retrieve the data from the corresponding collections in the database to populate select boxes
    retrieveAircraft() {
        ParameterService.retrieveAircraft()
            .then(response => {
                this.setState({ aircrafts: response.data });
            })
            .catch(e => {
                console.log(e);
            })
    }

    retrieveChannels() {
        ParameterService.retrieveChannels()
            .then(response => {
                this.setState({ channels: response.data });
            })
            .catch(e => {
                console.log(e);
            })
    }

    retrieveSquadrons() {
        ParameterService.retrieveSquadrons()
            .then(response => {
                this.setState({ squadrons: response.data });
            })
            .catch(e => {
                console.log(e);
            })
    }

    retrieveOperations() {
        ParameterService.retrieveOperations()
            .then(response => {
                this.setState({ operations: response.data });
            })
            .catch(e => {
                console.log(e);
            })
    }

    retrieveBases() {
        ParameterService.retrieveBases()
            .then(response => {
                this.setState({ bases: response.data });
            })
            .catch(e => {
                console.log(e);
            })
    }

    retrieveMsnTypes() {
        ParameterService.retrieveMsnTypes()
            .then(response => {
                this.setState({ msnTypes: response.data });
            })
            .catch(e => {
                console.log(e);
            })
    }

    retrieveCommTypes() {
        ParameterService.retrieveCommTypes()
            .then(response => {
                this.setState({ commTypes: response.data });
            })
            .catch(e => {
                console.log(e);
            })
    }

    //These functions functions pass whatever value is being typed or selected for a form box to the corresponding entry in state
    onChangeDate(e) {
        this.setState({
            date: e.target.value
        })
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

    onChangeCommander(e) {
        this.setState({
            commander: e.target.value
        });
    }

    onChangeSquadron(e) {
        this.setState({ squadron: e.target.value });
    }

    onChangeAircraft(e) {
        this.setState({
            aircraft: e.target.value
        });
    }

    onChangeBase(e) {
        this.setState({
            base: e.target.value
        });
    }

    onChangeMsnType(e) {
        this.setState({
            msnType: e.target.value
        });
    }

    onChangeChannel(e) {
        this.setState({
            channel: e.target.value
        });
    }

    onChangeCommType(e) {
        this.setState({
            commType: e.target.value
        });
    }

    onChangeOperation(e) {
        this.setState({
            operation: e.target.value
        });
    }

    onChangeRemarks(e) {
        this.setState({
            remarks: e.target.value
        });
    }


    //The below onChange functions deal with the information on the leg component. The state for leg compoenent has been lifted up to the parent component and the setState is being handled in the parent component (EditAirLiftMsn).
    onChangePassOn(val) {
        const passOn = val.val;
        const index = val.index;

        this.setState(prevState => {
            const legs = [...prevState.legs];
            legs[index] = { ...legs[index], passengerOn: passOn };
            return { legs };
          });
        
    }

    onChangePassOff(val) {
        const passOff = val.val;
        const index = val.index;

        this.setState(prevState => {
            const legs = [...prevState.legs];
            legs[index] = { ...legs[index], passengerOff: passOff };
            return { legs };
          });
        
    }

    onChangeSchedTO(val) { 
        const schedTO = val.val;
        const index = val.index;

        this.setState(prevState => {
            const legs = [...prevState.legs];
            legs[index] = { ...legs[index], scheduledTakeOff: schedTO };
            return { legs };
          });
    }

    onChangeSchedLand(val) {
        const schedLand = val.val;
        const index = val.index;

        this.setState(prevState => {
            const legs = [...prevState.legs];
            legs[index] = { ...legs[index], scheduledLand: schedLand };
            return { legs };
          });
    }

    onChangeActualTO(val) {
        const actualTO = val.val;
        const index = val.index;

        this.setState(prevState => {
            const legs = [...prevState.legs];
            legs[index] = { ...legs[index], actualTakeOff: actualTO };
            return { legs };
          });
    }

    onChangeActualLand(val) {
        const actualLand = val.val;
        const index = val.index;

        this.setState(prevState => {
            const legs = [...prevState.legs];
            legs[index] = { ...legs[index], actualLand: actualLand };
            return { legs };
          });
    }

    onChangeDuration(val) {
        const duration = val.val;
        const index = val.index;

        this.setState(prevState => {
            const legs = [...prevState.legs];
            legs[index] = { ...legs[index], duration: duration };
            return { legs };
          });
    }

    onChangePassThru(val) {
        const passThru = val.val;
        const index = val.index;

        this.setState(prevState => {
            const legs = [...prevState.legs];
            legs[index] = { ...legs[index], passengerThru: passThru };
            return { legs };
          });
    }

    onChangeCargoOn(val) {
        const cargoOn = val.val;
        const index = val.index;

        this.setState(prevState => {
            const legs = [...prevState.legs];
            legs[index] = { ...legs[index], cargoOn: cargoOn };
            return { legs };
          });
    }

    onChangeCargoOff(val) {
        const cargoOff = val.val;
        const index = val.index;

        this.setState(prevState => {
            const legs = [...prevState.legs];
            legs[index] = { ...legs[index], cargoOff: cargoOff };
            return { legs };
          });
    }

    onChangeCargoThru(val) {
        const cargoThru = val.val;
        const index = val.index;

        this.setState(prevState => {
            const legs = [...prevState.legs];
            legs[index] = { ...legs[index], cargoThru: cargoThru };
            return { legs };
          });
    }

    onChangePalletOn(val) {
        const palletOn = val.val;
        const index = val.index;

        this.setState(prevState => {
            const legs = [...prevState.legs];
            legs[index] = { ...legs[index], palletOn: palletOn };
            return { legs };
          });
    }

    onChangePalletOff(val) {
        const palletOff = val.val;
        const index = val.index;

        this.setState(prevState => {
            const legs = [...prevState.legs];
            legs[index] = { ...legs[index], palletOff: palletOff };
            return { legs };
          });
    }

    onChangePalletThru(val) {
        const palletThru = val.val;
        const index = val.index;

        this.setState(prevState => {
            const legs = [...prevState.legs];
            legs[index] = { ...legs[index], palletThru: palletThru };
            return { legs };
          });
    }

    onChangeLegRemarks(val) {
        const legRemarks = val.val;
        const index = val.index;

        this.setState(prevState => {
            const legs = [...prevState.legs];
            legs[index] = { ...legs[index], remarks: legRemarks };
            return { legs };
          });
    }

    onChangeACL(val) {
        const maxACL = val.val;
        const index = val.index;

        this.setState(prevState => {
            const legs = [...prevState.legs];
            legs[index] = { ...legs[index], maxACL: maxACL };
            return { legs };
          });
    }

    onChangeInitials(val) {
        const initials = val.val;
        const index = val.index;

        this.setState(prevState => {
            const legs = [...prevState.legs];
            legs[index] = { ...legs[index], initials: initials };
            return { legs };
          });
    }

    onChangeLegNumber(val) {
        const legNumber = val.val;
        const index = val.index;

        this.setState(prevState => {
            const legs = [...prevState.legs];
            legs[index] = { ...legs[index], legNumber: legNumber };
            return { legs };
          });
    }

    onChangePalletEmpty(val) {
        const palletEmpty = val.val;
        const index = val.index;

        this.setState(prevState => {
            const legs = [...prevState.legs];
            legs[index] = { ...legs[index], palletEmpty: palletEmpty };
            return { legs };
          });
    }

    onChangeICAOSource(val) {
        const ICAOSource = val.val;
        const index = val.index;

        this.setState(prevState => {
            const legs = [...prevState.legs];
            legs[index] = { ...legs[index], ICAOSource: ICAOSource };
            return { legs };
          });
    }

    onChangeICAODest(val) {
        const ICAODest = val.val;
        const index = val.index;

        this.setState(prevState => {
            const legs = [...prevState.legs];
            legs[index] = { ...legs[index], ICAODest: ICAODest };
            return { legs };
          });
    }

    onChangeLegType(val) {
        const legType = val.val;
        const index = val.index;

        this.setState(prevState => {
            const legs = [...prevState.legs];
            legs[index] = { ...legs[index], legType: legType };
            return { legs };
          });
    }
  

    //Submits the data entered on the form to the database.
    saveMission() {
        console.log('Form submitted');
        const newMission = {
            msnNumber: this.state.msnNumber,
            callSign: this.state.callSign,
            commander: this.state.commander,
            squadron: this.state.squadron,
            aircraft: this.state.aircraft,
            base: this.state.base,
            date: this.state.date,
            remarks: this.state.remarks,
            msnType: this.state.msnType,
            channel: this.state.channel,
            commType: this.state.commType,
            operation: this.state.operation,
            legs: this.state.legs
        };

        MissionDataService.addAirLiftMsn(newMission)
            .then(response => {
                this.setState({
                    msnNumber: response.data.msnNumber,
                    callSign: response.data.callSign,
                    commander: response.data.commander,
                    squadron: response.data.squadron,
                    aircraft: response.data.aircraft,
                    base: response.data.base,
                    date: response.data.date,
                    remarks: response.data.remarks,
                    msnType: response.data.msnType,
                    channel: response.data.channel,
                    commType: response.data.commType,
                    operation: response.data.operation,
                    legs: response.data.legs,
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
            commander: '',
            squadron: '',
            aircraft: '',
            base: '',
            date: '',
            remarks: '',
            msnType: '',
            channel: '',
            commType: '',
            operation: '',
            legs: [],
            legscomponents: [],
            legcounter: 1,
            legindex: -1,
            updateindex: 0,
            submitted: false
        });
    }


    addLegComponent = () => {
        this.setState({
            legs: [...this.state.legs, { legNumber: this.state.legcounter }],
            legcounter: this.state.legcounter + 1,
            legindex: this.state.legindex + 1,
            updateindex: this.state.updateindex + 1,
            legscomponents: [...this.state.legscomponents, <NewAirLiftLeg 
                                                            title={"Leg " + this.state.legcounter} 
                                                            datatgt={"Leg" + this.state.legcounter} 
                                                            legindex={this.state.updateindex}
                                                            handleChangeSchedTO={this.onChangeSchedTO}
                                                            handleChangeSchedLand={this.onChangeSchedLand}
                                                            handleChangeActualTO={this.onChangeActualTO}
                                                            handleChangeActualLand={this.onChangeActualLand}
                                                            handleChangeDuration={this.onChangeDuration}
                                                            handleChangePassOff={this.onChangePassOff} 
                                                            handleChangePassOn={this.onChangePassOn}
                                                            handleChangePassThru={this.onChangePassThru}
                                                            handleChangeCargoOn={this.onChangeCargoOn}
                                                            handleChangeCargoOff={this.onChangeCargoOff}
                                                            handleChangeCargoThru={this.onChangeCargoThru}
                                                            handleChangePalletOn={this.onChangePalletOn}
                                                            handleChangePalletOff={this.onChangePalletOff}
                                                            handleChangePalletThru={this.onChangePalletThru}
                                                            handleChangeRemarks={this.onChangeLegRemarks}
                                                            handleChangeACL={this.onChangeACL}
                                                            handleChangeInitials={this.onChangeInitials}
                                                            handleChangeLegNumber={this.onChangeLegNumber}
                                                            handleChangePalletEmpty={this.onChangePalletEmpty}
                                                            handleChangeICAOSource={this.onChangeICAOSource}
                                                            handleChangeICAODest={this.onChangeICAODest}
                                                            handleChangeLegType={this.onChangeLegType}
                                                            />]
        })
      }

      removeLegComponent() {
            const legs = [...this.state.legs];
            const index = this.state.legindex;
            
            if (index > -1) {
            const legscomponents = [...this.state.legscomponents];
            legs.splice(index, 1);
            legscomponents.splice(index, 1)
            this.setState({
                legs: legs,
                legindex: this.state.legindex - 1,
                legcounter: this.state.legcounter - 1,
                updateindex: this.state.updateindex - 1,
                legscomponents: legscomponents
            })
        }
      }
   

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        const { squadrons, aircrafts, channels, operations, bases, msnTypes, commTypes } = this.state;
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
                      <div>
                        <div className="container rounded " data-test="InputMissionForm" id="Airlift-Mission-Form">
                            <form>
                                {/* A New Row */}

                                <div className="row">

                                    <div className="col">
                                        <label for="date">Mission Date</label>
                                        <input type="date" className="form-control" id="date" data-test="date"  onChange={this.onChangeDate} name="date"></input>
                                    </div>



                                    <div className="col">
                                        <label for="msnNumber">Mission #</label>
                                        <input type="text" className="form-control" id="msnNumber" data-test="msnNumber" onChange={this.onChangeMsnNumber} placeholder="Mission #" name="msnNumber"></input>
                                    </div>

                                </div>


                                {/* A New Row */}

                                <div className="row">

                                    <div className="col">
                                        <label for="callSign">CallSign</label>
                                        <input type="text" className="form-control" id="callSign" data-test="callSign"  onChange={this.onChangeCallSign} placeholder="Call Sign" name="callSign"></input>
                                    </div>



                                    <div className="col">
                                        <label for="commander">Commander</label>
                                        <input type="text" className="form-control" id="commander" data-test="commander"  onChange={this.onChangeCommander} placeholder="Commander" name="commander"/>
                                    </div>
                                </div>



                                {/* A New Row */}


                                <div className="row">


                                    <div className="col">
                                        <label for="squadron">Squadron</label>
                                        <select onChange={this.onChangeSquadron} data-test="squadron" class="form-control" id="squadron" placeholder="Squadron" name="squadron">
                                            <option>Squadron</option>
                                            {squadrons.map((squadron) => (<option value={squadron._id}>{squadron.name}</option>))}
                                        </select>
                                    </div>

                                    <div className="col">
                                        <label for="aircraft">Airframe</label>
                                        <select onChange={this.onChangeAircraft}  data-test="aircraft" class="form-control" id="aircraft" placeholder="Aircraft Type" name="aircraft">
                                            <option>Aircraft Type</option>
                                            {aircrafts.map((aircraft) => (<option value={aircraft._id}>{aircraft.name}</option>))}
                                        </select>
                                    </div>


                                </div>



                                {/* A New Row */}

                                <div className="row">

                                    <div className="col">
                                        <label for="operation">Operation</label>
                                        <select onChange={this.onChangeOperation}  data-test="operation" class="form-control" id="operattion" placeholder="Operation" name="operation">
                                            <option>Operation</option>
                                            {operations.map((operation) => (<option value={operation._id}>{operation.name}</option>))}
                                        </select>
                                    </div>




                                    <div className="col">
                                        <label for="base">Base</label>
                                        <select onChange={this.onChangeBase}  data-test="base" class="form-control" id="base" placeholder="Base" name="base">
                                            <option>Base</option>
                                            {bases.map((base) => (<option value={base._id}>{base.name}</option>))}
                                        </select>
                                    </div>

                                </div>


                                {/* A New Row */}

                                <div className="row">

                                    <div className="col">
                                        <label for="msnType">Mission Type</label>
                                        <select onChange={this.onChangeMsnType}  data-test="msnType" class="form-control" id="msnType" placeholder="Mission Type" name="msnType">
                                            <option>Mission Type</option>
                                            {msnTypes.map((msnType) => (<option value={msnType._id}>{msnType.name}</option>))}
                                        </select>
                                    </div>



                                    <div className="col">
                                        <label for="commType">Commercial Type</label>
                                        <select onChange={this.onChangeCommType}  data-test="commType" class="form-control" id="commType" placeholder="Commercial Type" name="commType">
                                            <option>Commercial Type</option>
                                            {commTypes.map((commType) => (<option value={commType._id}>{commType.name}</option>))}
                                        </select>
                                    </div>

                                </div>


                                {/* A New Row */}
                                <div className="row">
                                    <div className="col">
                                        <label for="channel">Channel Name</label>
                                        <select onChange={this.onChangeChannel}  data-test="channel" class="form-control" id="channel" placeholder="Channel" name="channel">
                                            <option>Channel</option>
                                            {channels.map((channel) => (<option value={channel._id}>{channel.name}</option>))}
                                        </select>
                                    </div>

                                    <div className="col"></div>
                                </div>




                                <div className="row">
                                    <div class="col">
                                        <label for="remarks">Remarks</label>
                                        <input type="text" className="form-control" id="remarks" data-test="remarks"  onChange={this.onChangeRemarks} placeholder="Remarks" name="remarks"></input>
                                    </div>
                                </div>



                                <div className="row d-flex justify-content-center">
                                 
                                        <button type="button" id="edit-new" onClick={this.addLegComponent} className="btn  btn-lg">New Leg</button>
                                        <button type="button" id="edit-save" onClick={this.saveMission} className="btn btn-lg">Save Mission</button>
                                        <button type="button" id="edit-remove" onClick={this.removeLegComponent} className="btn  btn-lg">Remove Leg</button>
                                </div>
                                <br></br>
                            </form>

                        </div>
                        <div className="container">
                            <div className="row">
                                <div className="span9">
                                    {this.state.legscomponents}
                                </div>
                            </div>                            
                        </div>


                    </div>
                    )}
            </div>
        );
    }

}