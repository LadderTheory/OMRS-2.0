import React, { Component, Fragment } from "react";
import MissionDataService from "../services/missions.service";
import { Link } from "react-router-dom";
import MissionsService from "../services/missions.service";
import AuthService from "../services/auth.service";
import { Redirect } from "react-router-dom";
import AddParameterCard from "./AddParameterCard";


//Show a list of all missions in the database based on Mission Number.
export default class MissionsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchMsnNumber = this.onChangeSearchMsnNumber.bind(this);
    this.retrieveMissions = this.retrieveMissions.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveMsn = this.setActiveMsn.bind(this);
    this.searchMsn = this.searchMsn.bind(this);

    this.state = {
      missions: [],
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
    this.retrieveMissions();
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

  //Retrieves all of the missions and sets the currentMsn to null
  refreshList() {
    this.retrieveMissions();
    this.setState({
      currentMsn: null,
      currentIndex: -1
    });
  }

  //Sets the current mission to the selected mission 
  setActiveMsn(mission, index) {
    this.setState({
      currentMsn: mission,
      currentIndex: index
    });
  }

  //Retrieves all of the data in the missions collection in the database
  retrieveMissions() {
    // MissionDataService.getAll()
    //   .then(response => {
    //     this.setState({ missions: response.data });
    //     console.log(response.data);
    //   })
    //   .catch(e => {
    //     console.log(e);
    //   });

      MissionsService.getMissionsList().then(
        response => {
          this.setState({
            missions: response.data,
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
        }
      );
  }

  //Locates a specific group of missions based on Mission Number
  searchMsn() {
    if (this.state.searchMsn === "") {
      this.retrieveMissions();
    }
    else {
      MissionDataService.findByMissionNumber(this.state.searchMsn)
        .then(response => {
          this.setState({ missions: response.data });
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }


    const { missions, currentMsn, currentIndex } = this.state;

    return (
        <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <ul class="nav navbar-nav navbar-dark justify-content-center">
                                <li class="active"><a className="dropdown-item" href="#">Squadron</a></li>
                                <li class="active"><a className="dropdown-item" href="#">Base</a></li>
                                <li class="active"><a className="dropdown-item" href="#">Aircraft</a></li>
                                <li class="active"><a className="dropdown-item" href="#">Mission Type</a></li>
                                <li class="active"><a className="dropdown-item" href="#">Channel</a></li>
                                <li class="active"><a className="dropdown-item" href="#">Commercial Type</a></li>
                                <li class="active"><a className="dropdown-item" href="#">Operation</a></li>
                                <li class="active"><a className="dropdown-item" href="#">Source/Dest Base</a></li>
                                <li class="active"><a className="dropdown-item" href="#">ICAO Source/Dest</a></li>
                                <li class="active"><a className="dropdown-item" href="#">Leg Type</a></li>

            </ul>
        </nav>
<div class="container row">
        <div class="col-lg">
      <div className="list row d-flex justify-content-start" id="missionList">

        <div className="col-md-6">

          <div className="input-group mb-3">

            <input type="text" className="form-control" placeholder="Search by Msn Number" onChange={this.onChangeSearchMsnNumber}/>
            <div className="input-group-append">
              <button className="btn btn-dark" type="button" onClick={this.searchMsn}>Search</button>
            </div>
          </div>


          <h4>Missions List:</h4>
          <p>All data is test data only</p>


          <ul className="list-group">
            {missions.map((mission, index) => (
              <li
                className={
                  "list-group-item col-md-6" +
                  (index === currentIndex ? "active" : "")
                }
                onClick={() => this.setActiveMsn(mission, index)}
                key={index}
              >
                {mission.msnNumber}
              </li>
            ))}
          </ul>

        </div>
        <div className="col-6" id="AddParameterCard"><AddParameterCard/></div>
        <div className="col-4">
          {currentMsn ? (
            <div>
              <h4>Mission</h4>
              <p><br></br></p>
              <div>
                <label>
                  <strong>Msn Number:</strong>
                </label>{" "}
                {currentMsn.msnNumber}
              </div>
              <div>
                <label>
                  <strong>CallSign:</strong>
                </label>{" "}
                {currentMsn.callSign}
              </div>
              <div>
                <label>
                  <strong>Squadron:</strong>
                </label>{" "}
                {currentMsn.squadron}
              </div>
              <div>
                <label>
                  <strong>Airframe:</strong>
                </label>{" "}
                {currentMsn.airframe}
              </div>
              <div>
                <label>
                  <strong>Source:</strong>
                </label>{" "}
                {currentMsn.source}
              </div>
              <div>
                <label>
                  <strong>Destination:</strong>
                </label>{" "}
                {currentMsn.destination}
              </div>
              <div>
                <label>
                  <strong>Mission Date:</strong>
                </label>{" "}
                {currentMsn.msnDate}
              </div>
              <Link
                to={"missionList/update/" + currentMsn._id}
                className="badge badge-warning"
              >
                Edit
              </Link> 
            </div>
           
          ) : (
              <div>
                <br />
                <p>Space</p>
              </div>
            )}
        </div>

        
    </div>
         </div>
       
        </div>
    </div>
    );
    
    
    }
        
}
