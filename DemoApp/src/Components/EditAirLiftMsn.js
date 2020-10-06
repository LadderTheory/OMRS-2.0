import React, { Component } from 'react';
import ParameterService from '../services/Parameter.service';
import MissionDataService from "../services/missions.service";
import AuthService from "../services/auth.service";
import { Redirect } from "react-router-dom";
import EditAirLiftLeg from "./EditAirLiftLeg";
import NewAirLiftLeg from "./NewAirLiftLeg";

//Input Mission Form
export default class EditAirLiftMsn extends Component {

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
        this.updateAirliftMsn = this.updateAirliftMsn.bind(this);
        //this.addLeg = this.addLeg.bind(this);
        this.addLegComponent = this.addLegComponent.bind(this);
        this.removeLegComponent = this.removeLegComponent.bind(this);


        //binds for data retrieval
        this.retrieveChannels = this.retrieveChannels.bind(this);
        this.retrieveAircraft = this.retrieveAircraft.bind(this);
        this.retrieveSquadrons = this.retrieveSquadrons.bind(this);
        this.retrieveOperations = this.retrieveOperations.bind(this);
        this.retrieveBases = this.retrieveBases.bind(this);
        this.retrieveMsnTypes = this.retrieveMsnTypes.bind(this);
        this.retrieveCommTypes = this.retrieveCommTypes.bind(this);
        this.retrieveAirLiftMsn = this.retrieveAirLiftMsn.bind(this);

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
            legs: [],
            message: '',
            squadrons: [],
            aircrafts: [],
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
            updateindex: 0,
            legindex: -1,
            id: ''
        };
    }

    //This function handles what will occur when the component is rendered
    componentDidMount() {
        const currentUser = AuthService.getCurrentUser();
        if (!currentUser) this.setState({ redirect: "/login" });
        this.retrieveAirLiftMsn(this.props.match.params.id);
        this.retrieveAircraft();
        this.retrieveChannels();
        this.retrieveSquadrons();
        this.retrieveOperations();
        this.retrieveBases();
        this.retrieveMsnTypes();
        this.retrieveCommTypes();
    }

    //These functons retrieve the data from the corresponding collections in the database to populate select boxes
    retrieveAirLiftMsn(id) {
        MissionDataService.getAirLiftMsnByID(id)
            .then(response => {
                this.setState({ 
                    id: response.data._id,
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
                    legcounter: response.data.legs.length + 1,
                    updateindex: response.data.legs.length,
                    legindex: response.data.legs.length -1,
                });
                response.data.legs.map((leg, index) => {
                    this.setState({
                        legscomponents: [...this.state.legscomponents, <EditAirLiftLeg 
                                                                        title={"Leg " + (index + 1)} 
                                                                        datatgt={"Leg" + (index + 1)} 
                                                                        legindex={index}
                                                                        schedTO={this.state.legs[index].scheduledTakeOff} 
                                                                        schedLand={this.state.legs[index].scheduledLand} 
                                                                        actualTO={this.state.legs[index].actualTakeOff} 
                                                                        actualLand={this.state.legs[index].actualLand} 
                                                                        duration={this.state.legs[index].duration} 
                                                                        passOn={this.state.legs[index].passengerOn} 
                                                                        passOff={this.state.legs[index].passengerOff}
                                                                        passThru={this.state.legs[index].passengerThru} 
                                                                        cargoOn={this.state.legs[index].cargoOn} 
                                                                        cargoOff={this.state.legs[index].cargoOff} 
                                                                        cargoThru={this.state.legs[index].cargoThru} 
                                                                        palletOn={this.state.legs[index].palletOn} 
                                                                        palletOff={this.state.legs[index].palletOff} 
                                                                        palletThru={this.state.legs[index].palletThru} 
                                                                        legRemarks={this.state.legs[index].remarks} 
                                                                        acl={this.state.legs[index].maxACL} 
                                                                        initials={this.state.legs[index].initials} 
                                                                        legNumber={this.state.legs[index].legNumber} 
                                                                        palletEmpty={this.state.legs[index].palletEmpty} 
                                                                        ICAOSource={this.state.legs[index].ICAOSource} 
                                                                        ICAODest={this.state.legs[index].ICAODest} 
                                                                        legType={this.state.legs[index].legType} 
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
                    });
                })
            })
            .catch(e => {
                console.log(e);
            })
    }

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
        this.setState({
            squadron: e.target.value
        });
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

    //The below onChange functions deal with the information on the leg component. The state for leg compoenent has been lifted up to the parent component and the setState is being handled in the parent component (EditAirLiftMsn)
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

    updateAirliftMsn() {

        const currentMsn = {
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
            }

        MissionDataService.updateAirliftMsn(
            this.state.id,
            currentMsn
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
            <div className="submit-form" data-test="component-UpdateMission">
                
                    <div>
                        <div className="container rounded bg-dark" data-test="InputMissionForm">
                            <form>
                                {/* A New Row */}

                                <div className="row">

                                    <div className="col">
                                        <label>Mission Date</label>
                                        <input type="date" className="form-control" id="date" data-test="date" onChange={this.onChangeDate} name="date"></input>
                                    </div>



                                    <div className="col">
                                        <label>Mission #</label>
                                        <input type="text" className="form-control" id="msnNumber" data-test="msnNumber" value={this.state.msnNumber} onChange={this.onChangeMsnNumber} placeholder="Mission #" name="msnNumber"></input>
                                    </div>

                                </div>


                                {/* A New Row */}

                                <div className="row">

                                    <div className="col">
                                        <label>CallSign</label>
                                        <input type="text" className="form-control" id="callSign" data-test="callSign" value={this.state.callSign} onChange={this.onChangeCallSign} placeholder="Call Sign" name="callSign"></input>
                                    </div>



                                    <div className="col">
                                        <label>Commander</label>
                                        <input type="text" className="form-control" id="commander" data-test="commander" value={this.state.commander} onChange={this.onChangeCommander} placeholder="Commander" name="commander" />
                                    </div>
                                </div>



                                {/* A New Row */}


                                <div className="row">


                                    <div className="col">
                                        <label>Squadron</label>
                                        <select value={this.state.squadron._id} onChange={this.onChangeSquadron} data-test="squadron" class="form-control" id="squadron" placeholder="Squadron" name="squadron">
                                            <option>Squadron</option>
                                            {squadrons.map((squadron) => (<option value={squadron._id}>{squadron.name}</option>))}
                                        </select>
                                    </div>

                                    <div className="col">
                                        <label>Airframe</label>
                                        <select value={this.state.aircraft._id} onChange={this.onChangeAircraft} data-test="aircraft" class="form-control" id="aircraft" placeholder="Aircraft Type" name="aircraft">
                                            <option>Aircraft Type</option>
                                            {aircrafts.map((aircraft) => (<option value={aircraft._id}>{aircraft.name}</option>))}
                                        </select>
                                    </div>


                                </div>



                                {/* A New Row */}

                                <div className="row">

                                    <div className="col">
                                        <label>Operation</label>
                                        <select value={this.state.operation._id} onChange={this.onChangeOperation} data-test="operation" class="form-control" id="operation" placeholder="Operation" name="operation">
                                            <option>Operation</option>
                                            {operations.map((operation) => (<option value={operation._id}>{operation.name}</option>))}
                                        </select>
                                    </div>




                                    <div className="col">
                                        <label>Base</label>
                                        <select value={this.state.base._id} onChange={this.onChangeBase} data-test="base" class="form-control" id="base" placeholder="Base" name="base">
                                            <option>Base</option>
                                            {bases.map((base) => (<option value={base._id}>{base.name}</option>))}
                                        </select>
                                    </div>

                                </div>


                                {/* A New Row */}

                                <div className="row">

                                    <div className="col">
                                        <label>Mission Type</label>
                                        <select value={this.state.msnType._id} onChange={this.onChangeMsnType} data-test="msnType" class="form-control" id="msnType" placeholder="Mission Type" name="msnType">
                                            <option>Mission Type</option>
                                            {msnTypes.map((msnType) => (<option value={msnType._id}>{msnType.name}</option>))}
                                        </select>
                                    </div>



                                    <div className="col">
                                        <label>Commercial Type</label>
                                        <select value={this.state.commType._id} onChange={this.onChangeCommType} data-test="commType" class="form-control" id="commType" placeholder="Commercial Type" name="commType">
                                            <option>Commercial Type</option>
                                            {commTypes.map((commType) => (<option value={commType._id}>{commType.name}</option>))}
                                        </select>
                                    </div>

                                </div>


                                {/* A New Row */}
                                <div className="row">
                                    <div className="col">
                                        <label>Channel Name</label>
                                        <select value={this.state.channel._id} onChange={this.onChangeChannel} data-test="channel" class="form-control" id="channel" placeholder="Channel" name="channel">
                                            <option>Channel</option>
                                            {channels.map((channel) => (<option value={channel._id}>{channel.name}</option>))}
                                        </select>
                                    </div>

                                    <div className="col"></div>
                                </div>




                                <div className="row">
                                    <div class="col">
                                        <label>Remarks</label>
                                        <input type="text" className="form-control" id="remarks" data-test="remarks" value={this.state.remarks} onChange={this.onChangeRemarks} placeholder="Remarks" name="remarks"></input>
                                    </div>
                                </div>



                                <div className="row d-flex justify-content-center">
                                    <div classname="col">
                                        <button type="button" onClick={this.addLegComponent} className="btn btn-light btn-lg">New Leg</button>
                                        <button type="button" onClick={this.updateAirliftMsn} className="btn btn-light btn-lg">Save Mission</button>
                                        <button type="button" onClick={this.removeLegComponent} className="btn btn-light btn-lg">Remove Leg</button>
                                    </div>
                                </div>
                            </form>

                        </div>

                        {/* {this.state.legs.map((legs, index) => (
                            this.addEditLegComponent(index)
                        ))} */}
                        
                        {/* {this.state.legs.map((leg, index) => (
                                <EditAirLiftLeg 
                                title={"Leg " + (index + 1)} 
                                datatgt={"Leg" + (index + 1)} 
                                legindex={index
                                }
                                schedTO={this.state.legs[index].scheduledTakeOff} 
                                schedLand={this.state.legs[index].scheduledLand} 
                                actualTO={this.state.legs[index].actualTakeOff} 
                                actualLand={this.state.legs[index].actualLand} 
                                duration={this.state.legs[index].duration} 
                                passOn={this.state.legs[index].passengerOn} 
                                passOff={this.state.legs[index].passengerOff}
                                passThru={this.state.legs[index].passengerThru} 
                                cargoOn={this.state.legs[index].cargoOn} 
                                cargoOff={this.state.legs[index].cargoOff} 
                                cargoThru={this.state.legs[index].cargoThru} 
                                palletOn={this.state.legs[index].palletOn} 
                                palletOff={this.state.legs[index].palletOff} 
                                palletThru={this.state.legs[index].palletThru} 
                                legRemarks={this.state.legs[index].remarks} 
                                acl={this.state.legs[index].maxACL} 
                                initials={this.state.legs[index].initials} 
                                legNumber={this.state.legs[index].legNumber} 
                                palletEmpty={this.state.legs[index].palletEmpty} 
                                ICAOSource={this.state.legs[index].ICAOSource} 
                                ICAODest={this.state.legs[index].ICAODest} 
                                legType={this.state.legs[index].legType} 
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
                                />
                        ))} */}


                        {this.state.legscomponents}


                    </div>




               
            </div>
        );
    }

}