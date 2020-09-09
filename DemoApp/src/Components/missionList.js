import React, { Component } from "react";
import MissionDataService from "../services/missions.service";
import { Link } from "react-router-dom";
import Mission from "./mission";
import UpdateMission from "./UpdateMission";


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
      searchMsn: ""
    };
  }

  componentDidMount() {
    this.retrieveMissions();
  }

  componentWillUnmount() {
    // fix Warning: Can't perform a React state update on an unmounted component
    this.setState = (state, callback) => {
      return;
    };
  }

  onChangeSearchMsnNumber(e) {
    const searchMsn = e.target.value;
    this.setState({
      searchMsn: searchMsn
    });
  }


  refreshList() {
    this.retrieveMissions();
    this.setState({
      currentMsn: null,
      currentIndex: -1
    });
  }

  setActiveMsn(mission, index) {
    this.setState({
      currentMsn: mission,
      currentIndex: index
    });
  }

  retrieveMissions() {
    MissionDataService.getAll()
      .then(response => {
        this.setState({ missions: response.data });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

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
    const { missions, currentMsn, currentIndex } = this.state;

    return (
      <div className="list row d-flex justify-content-start" id="missionList">
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


          <h4>Missions List:</h4>
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
                to={"missions/update/" + currentMsn._id}
                className="badge badge-warning"
              >
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