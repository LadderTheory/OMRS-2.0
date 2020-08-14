import React, { Component } from "react";
import MissionDataService from "../services/missions.service";
import { Link } from "react-router-dom";
import Mission from "./mission";


export default class MissionsList extends Component {
  constructor(props) {
    super(props);
    //this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveMissions = this.retrieveMissions.bind(this);
    //this.refreshList = this.refreshList.bind(this);
    //this.setActiveTutorial = this.setActiveTutorial.bind(this);
    //this.removeAllTutorials = this.removeAllTutorials.bind(this);
    //this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      missions: []
    };
  }

  componentDidMount() {
    this.retrieveMissions();
  }

  //   onChangeSearchTitle(e) {
  //     const searchTitle = e.target.value;

  //     this.setState({
  //       searchTitle: searchTitle
  //     });
  //   }

  retrieveMissions() {
    MissionDataService.getAll()
      .then(response => {
        this.setState({missions: response.data});
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  //   refreshList() {
  //     this.retrieveTutorials();
  //     this.setState({
  //       currentTutorial: null,
  //       currentIndex: -1
  //     });
  //   }

  //   removeAllTutorials() {
  //     TutorialDataService.deleteAll()
  //       .then(response => {
  //         console.log(response.data);
  //         this.refreshList();
  //       })
  //       .catch(e => {
  //         console.log(e);
  //       });
  //   }

  //   searchTitle() {
  //     TutorialDataService.findByTitle(this.state.searchTitle)
  //       .then(response => {
  //         this.setState({
  //           tutorials: response.data
  //         });
  //         console.log(response.data);
  //       })
  //       .catch(e => {
  //         console.log(e);
  //       });
  //   }

  render() {
    const { missions } = this.state;
    const findMission = missions.find(function (mission) {
      return mission.msnNumber === '1001A';
    });
    return (
      <div className="col-md-8">
        <h4>Missions List</h4>
        <p>All data is test data only</p>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Mission Number</th>
              <th>Call Sign</th>
              <th>Squadron</th>
              <th>Airframe</th>
              <th>Source</th>
              <th>Destination</th>
              <th>Mission Date</th>
            </tr>
          </thead>
          <tbody>
            {missions.map((mission) => <Mission
              key={mission._id}
              msnNumber={mission.msnNumber}
              callSign={mission.callSign}
              squadron={mission.squadron}
              airframe={mission.airframe}
              source={mission.source}
              destination={mission.destination}
              msnDate={mission.msnDate}
            />
            )}
            </tbody>
        </table>



      </div>
    );
  }
}