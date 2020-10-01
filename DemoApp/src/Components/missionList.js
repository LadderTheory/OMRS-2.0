import React, { Component } from "react";
import MissionDataService from "../services/missions.service";
import { Link } from "react-router-dom";
import MissionsService from "../services/missions.service";
import AuthService from "../services/auth.service";
import { Redirect } from "react-router-dom";


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
      currentUser: { username: "" },
      currentInput: null
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
      currentIndex: index,
      Msnkeys: Object.keys(mission)
    });
  }

  //Retrieves all of the data in the missions collection in the database
  retrieveMissions() {
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
      <div className="list row d-flex justify-content-start" id="missionList" data-test="component-MissionList">
        <div className="col-md-3">

        </div>


        <div className="col-sm-3">

          <div className="input-group mb-3">

            <input
              type="text"
              className="form-control"
              placeholder="Search by Msn Number"

              onChange={this.onChangeSearchMsnNumber}
            />

            <div className="input-group-append">

              <button
                className="btn btn-dark"
                type="button"
                onClick={this.searchMsn}
              >
                Search
</button>

            </div>
          </div>


          <h4>Missions List: Test Path 25</h4>
          <p>All data is test data only</p>


          <ul className="list-group">
            {missions.map((mission, index) => (
              <li
                className={
                  "list-group-item " +
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

        <div className="col-md-6">
          {currentMsn ? (
            <div>
              <h4>Mission</h4>
              <p><br></br></p>
              <div>
                <label for="msnNumber">Mission #</label>
                <input type="text" className="form-control" id="msnNumber" value={currentMsn.msnNumber} onChange={this.onChangeMsnNumber} placeholder="Mission #" name="msnNumber"></input>
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
                className="badge badge-warning">
                Edit
              </Link>
            </div>
          ) : (
              <div>
                <br />
                <p>Click on a mission number to display it's details.</p>
              </div>
            )}
        </div>



      </div>
    );
  }
}