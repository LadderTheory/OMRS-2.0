import React, { Component } from "react";

import { Link } from "react-router-dom";
import MissionsService from "../services/missions.service";
import AuthService from "../services/auth.service";
import { Redirect } from "react-router-dom";
import missionsService from "../services/missions.service";


//Show a list of all missions in the database based on Mission Number.
export default class MissionsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchMsnNumber = this.onChangeSearchMsnNumber.bind(this);
    this.getAirLiftMsns = this.getAirLiftMsns.bind(this);
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
    this.getAirLiftMsns();
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
    this.getAirLiftMsns();
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
    });
  }

  //Retrieves all of the data in the missions collection in the database
  getAirLiftMsns() {
      MissionsService.getAirLiftMsns().then(
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
      this.getAirLiftMsns();
    }
    else {
      MissionDataService.findByMsnNum(this.state.searchMsn)
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


          <h4>Missions List: </h4>
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
                <label>
                  <strong>Mission #:</strong>
                </label>{" "}
                {currentMsn.msnNumber}
              </div>
              <div>
                <label>
                  <strong>Mission Date:</strong>
                </label>{" "}
                {currentMsn.date}
              </div>
              <div>
                <label>
                  <strong>Commander:</strong>
                </label>{" "}
                {currentMsn.commander}
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
                {currentMsn.squadron.name}
              </div>
              <div>
                <label>
                  <strong>Aircraft:</strong>
                </label>{" "}
                {currentMsn.aircraft.name}
              </div>
              <div>
                <label>
                  <strong>Mission Type:</strong>
                </label>{" "}
                {currentMsn.msnType.name}
              </div>
              <div>
                <label>
                  <strong>Commercial Type:</strong>
                </label>{" "}
                {currentMsn.commType.name}
              </div>
              <div>
                <label>
                  <strong>Channel:</strong>
                </label>{" "}
                {currentMsn.channel.name}
              </div>
              <div>
                <label>
                  <strong>Base:</strong>
                </label>{" "}
                {currentMsn.base.name}
              </div>
              <div>
                <label>
                  <strong>Operation:</strong>
                </label>{" "}
                {currentMsn.operation.name}
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