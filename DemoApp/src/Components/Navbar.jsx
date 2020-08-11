import React from "react";
//Import for Nav-Links
import {BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import InputMission from "./InputMission";

//Navbar for Demo App
function Navbar()
{
return(
    <Router>
    <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <a class="navbar-brand">Demo</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <li> <Link to={'/InputMission'} class="nav-link active">Input Mission</Link>
                </li>
                <li> <Link to={'/Missions'} class="nav-link">Missions</Link>
                </li>
            </ul>
            
        </div>
    </nav>
    <hr />
    <Switch>
        <Route exact path='/InputMission' component={InputMission}/>
    </Switch>
    </div>
    </Router>
);
}
export default Navbar;