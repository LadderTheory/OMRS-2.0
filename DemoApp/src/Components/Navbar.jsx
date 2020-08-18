import React, { Component } from "react";
//Import for Nav-Links
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import InputMission from "./InputMission";
import MissionsList from "./missionList";
import UpdateMission from "./UpdateMission";

//Navbar for Demo App
function Navbar() {
    return (
        <Router>
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <a className="navbar-brand"><img src="../Images/Brand2.png" alt="brand" width="120px" height="30px"></img></a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li> <Link to={'/InputMission'} className="nav-link active">Input Mission</Link>
                            </li>
                            <li> <Link to={'/missions'} className="nav-link">Missions</Link>
                            </li>
                        </ul>

                    </div>
                </nav>
                <br />
                <Switch>
                    <Route exact path='/InputMission' component={InputMission} />
                    <Route exact path='/missions' component={MissionsList} />
                    <Route exact path='/missions/update/:id/' component={UpdateMission} />
                </Switch>
            </div>
        </Router>
    );
}
export default Navbar;