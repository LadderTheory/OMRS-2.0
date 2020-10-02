import React, { Component, Fragment } from "react";
import ParameterDataService from "../services/Parameter.service";
import { Link } from "react-router-dom";
// import SquadronDataService from 
import AuthService from "../services/auth.service";
import { Redirect } from "react-router-dom";
import AddParameterCard from "./AddParameterCard";
import EditParameterCard from "./EditParameterCard";


//Show a list of all missions in the database based on Mission Number.
export default class MissionsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchMsnNumber = this.onChangeSearchMsnNumber.bind(this);
    // this.retrieveSquadrons = this.retrieveSquadrons.bind(this);
    // this.refreshList = this.refreshList.bind(this);
    this.retrieveParameters = this.retrieveParameters.bind(this);
    this.setActiveMsn = this.setActiveMsn.bind(this);
  

    this.state = {
      parameters: [],
      currentMsn: null,
      currentIndex: -1,
      searchMsn: "",
      redirect: null,
      currentUser: { username: "" }
    };
  }

  //Retrieves all missions in the database when the form loads
  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();
    if (!currentUser) this.setState({ redirect: "/login" });
    // this.retrieveMissions();
  }

  componentWillUnmount() {
    // fix Warning: Can't perform a React state update on an unmounted component
    this.setState = (state, callback) => {
      return;
    };
  }

  //Sets the property when changed.
  onChangeSearchMsnNumber(e) {
    const searchMsn = e.target.value;
    this.setState({
      searchMsn: searchMsn
    });
  }

//   //Retrieves all of the missions and sets the currentMsn to null
//   refreshList() {
//     this.retrieveMissions();
//     this.setState({
//       currentMsn: null,
//       currentIndex: -1
//     });
//   }

  //Sets the current mission to the selected mission 
  setActiveMsn(mission, index) {
    this.setState({
      currentMsn: mission,
      currentIndex: index
    });
  }

  retrieveParameters(parameter)
  {
   

    switch(parameter){
        case "squadron":
            ParameterDataService.retrieveSquadrons().then(
                response => {
                  this.setState({
                    parameters: response.data,
                  });
                },
                error => {
                  this.setState({
                    content:
                      (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                      error.message ||
                      error.toString()
                  });
                },
              )
        break;
        case "msntype":
            ParameterDataService.retrieveMsnTypes().then(
                response => {
                  this.setState({
                    parameters: response.data,
                  });
                },
                error => {
                  this.setState({
                    content:
                      (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                      error.message ||
                      error.toString()
                  });
                },
              )
        break;
        case "channel":
            ParameterDataService.retrieveChannels().then(
                response => {
                  this.setState({
                    parameters: response.data,
                  });
                },
                error => {
                  this.setState({
                    content:
                      (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                      error.message ||
                      error.toString()
                  });
                },
              )
            break;
        case "commTypes":
            ParameterDataService.retrieveCommTypes().then(
                response => {
                  this.setState({
                    parameters: response.data,
                  });
                },
                error => {
                  this.setState({
                    content:
                      (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                      error.message ||
                      error.toString()
                  });
                },
              )
            break;
        case "operation":
            ParameterDataService.retrieveOperations().then(
                response => {
                  this.setState({
                    parameters: response.data,
                  });
                },
                error => {
                  this.setState({
                    content:
                      (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                      error.message ||
                      error.toString()
                  });
                },
              )
            break;
        case "legTypes":
            ParameterDataService.retrieveLegTypes().then(
                response => {
                  this.setState({
                    parameters: response.data,
                  });
                },
                error => {
                  this.setState({
                    content:
                      (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                      error.message ||
                      error.toString()
                  });
                },
              )
            break;
        case "bases":
            ParameterDataService.retrieveBases().then(
                response => {
                  this.setState({
                    parameters: response.data,
                  });
                },
                error => {
                  this.setState({
                    content:
                      (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                      error.message ||
                      error.toString()
                  });
                },
              )
            break;
            case "aircraft":
            ParameterDataService.retrieveAircraft().then(
                response => {
                  this.setState({
                    parameters: response.data,
                  });
                },
                error => {
                  this.setState({
                    content:
                      (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                      error.message ||
                      error.toString()
                  });
                },
              )
            break;
        
      };
    }
  

//   //Locates a specific group of missions based on Mission Number
//   searchMsn(){
//     if (this.state.searchMsn === "") {
//       this.retrieveMissions();
//     }
//     else {
//       MissionDataService.findByMissionNumber(this.state.searchMsn)
//         .then(response => {
//           this.setState({ missions: response.data });
//           console.log(response.data);
//         })
//         .catch(e => {
//           console.log(e);
//         });
//     }
//   }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }


    const { parameters, currentMsn, currentIndex } = this.state;

    return (
        <div class="col-xxl">
        <br/>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
            <ul class="nav navbar-nav navbar-dark justify-content-center">
                                <li><a class="dropdown-item" href="#" onClick={this.retrieveParameters.bind(this.retrieveParameters, "squadron")}>Squadron</a></li>
                                <li><a class="dropdown-item" href="#" onClick={this.retrieveParameters.bind(this.retrieveParameters, "bases")}>Base</a></li>
                                <li><a class="dropdown-item" href="#" onClick={this.retrieveParameters.bind(this.retrieveParameters, "aircraft")}>Aircraft</a></li>
                                <li><a class="dropdown-item" href="#" onClick={this.retrieveParameters.bind(this.retrieveParameters, "msntype")}>Mission Type</a></li>
                                <li><a class="dropdown-item" href="#" onClick={this.retrieveParameters.bind(this.retrieveParameters, "channel")}>Channel</a></li>
                                <li><a class="dropdown-item" href="#" onClick={this.retrieveParameters.bind(this.retrieveParameters, "commTypes")}>Commercial Type</a></li>
                                <li><a class="dropdown-item" href="#" onClick={this.retrieveParameters.bind(this.retrieveParameters, "operation")}>Operation</a></li>
                                <li><a class="dropdown-item" href="#" onClick={this.retrieveParameters.bind(this.retrieveParameters, "bases")}>Source/Dest Base</a></li>
                                <li><a class="dropdown-item" href="#" onClick={this.retrieveParameters.bind(this.retrieveParameters, "bases")}>ICAO Source/Dest</a></li>
                                <li><a class="dropdown-item" href="#" onClick={this.retrieveParameters.bind(this.retrieveParameters, "legTypes")}>Leg Type</a></li>

            </ul>
        </nav>
<div >
        <div class="col-sm">
   

        {/* <div className="col-md-6">
        <br/>

          {/* <div className="input-group mb-3">

            <input type="text" className="form-control" placeholder="Search by Msn Number" onChange={this.onChangeSearchMsnNumber}/>
            <div className="input-group-append">
              <button className="btn btn-dark" type="button" onClick={this.searchMsn}>Search</button>
            </div>
          </div> */}
<div className="d-flex justify-content-start col-sm-6">
          <ul className="list-group col-sm-3">
            {parameters.map((parameter, index) => (
              <li
                className={
                  "list-group-item"  +
                  (index === currentIndex ? "active" : "")
                }
                
                key={index}
              >
                {parameter.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="col-6" id="AddParameterCard"><AddParameterCard/></div>
        <div className="col-6" id="AddParameterCard"><EditParameterCard/></div>
        
            </div>
         </div>
        </div>
    );
    }        
}
