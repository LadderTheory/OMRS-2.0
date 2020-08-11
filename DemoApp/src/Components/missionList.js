import React, { Component } from "react";
import MissionDataService from "../services/missions.service";
import { Link } from "react-router-dom";

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
        this.setState({
          missions: response.data
        });
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

    return (
    //   <div className="list row">
    //     <div className="col-md-8">
    //       {/* <div className="input-group mb-3">
    //         {/* <input
    //           type="text"
    //           className="form-control"
    //           placeholder="Search by title"
    //           value={searchTitle}
    //           onChange={this.onChangeSearchTitle}
    //         /> */}
    //         {/* <div className="input-group-append">
    //           <button
    //             className="btn btn-outline-secondary"
    //             type="button"
    //             onClick={this.searchTitle}
    //           >
    //             Search
    //           </button>
    //         </div> */}
    //       </div> */}
    //     </div>
        <div className="col-md-6">
          <h4>Missions List</h4>
        <table>
          <tr>
            {missions.map((mission) => (
                <div>
                <td>{mission.msnNumber}</td>
                <td>{mission.callSign}</td>
                <td>{mission.squadron}</td>
                <td>{mission.airframe}</td>
                <td>{mission.source}</td>
                <td>{mission.destination}</td>
                <td>{mission.msnDate}</td>
                </div>
              ))}
          </tr>
        </table>
        </div>
        /* <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllTutorials}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentTutorial ? (
            <div>
              <h4>Tutorial</h4>
              <div>
                <label>
                  <strong>Title:</strong>
                </label>{" "}
                {currentTutorial.title}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentTutorial.description}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentTutorial.published ? "Published" : "Pending"}
              </div>

              <Link
                to={"/tutorials/" + currentTutorial.id}
                className="badge badge-warning"
              >
                Edit
              </Link> */
           /* </div> */
        /* //   ) : (
        //     <div>
        //       <br />
        //       <p>Please click on a Tutorial...</p>
        //     </div> */
          

    );
}
}