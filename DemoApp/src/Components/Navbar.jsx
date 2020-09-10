import React from "react";
//Import for Nav-Links
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import InputMission from "./InputMission";
import MissionsList from "./missionList";
import UpdateMission from "./UpdateMission";
import Login from "./LoginPage";
import CreateUser from "./CreateUser";
import AdminActions from "./AdminActions";
import UpdateUser from "./UpdateUser";
import AddInfo from "./AddInfo";
import DeleteInfo from "./DeleteInfo";
import EditInfo from "./EditInfo";

//Navbar for Demo App
function Navbar() {
    return (
        <Router>
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <a class="navbar-brand" href="#"><img src="../Images/Brand2.png" alt="brand" width="120px" height="30px"></img></a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav mr-auto">
                            <li> <Link to={'/InputMission'} className="nav-link active">Input Mission</Link></li>
                            <li> <Link to={'/missions'} className="nav-link">Missions</Link></li>
                            <li><Link to={'/adminActions'} className="nav-link">Admin</Link></li>
                            <li></li>
                            <li className="nav-item dropdown">
                                 <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Data Management
                                  </a>
                                  <div className="dropdown-menu p-3 mb-2 bg-secondary text-white" aria-labelledby="navbarDropdown">
                                     <a className="dropdown-item " href="#"><Link to={'/AddInfo'} className="nav-link">Add Item</Link></a>
                                     <a className="dropdown-item" href="#"><Link to={'/EditInfo'} className="nav-link">Edit Item</Link></a>
                                     <a className="dropdown-item" href="#"><Link to={'/DeleteInfo'} className="nav-link">Delete Item</Link></a>
                                    </div>
                                </li>           
                        </ul>
                    </div>
                </nav>
                <br />
                <Switch>
                    <Route exact path='/InputMission' component={InputMission} />
                    <Route exact path='/missions' component={MissionsList} />
                    <Route exact path='/missions/update/:id/' component={UpdateMission} />
                    <Route exact path='/login' component={Login}/>
                    <Route exact path='/createUser' component={CreateUser}/>
                    <Route exact path='/adminActions' component={AdminActions}/>
                    <Route exact path='/users/update/:id/' component={UpdateUser}/>
                    <Route exact path='/AddInfo' component={AddInfo}/>
                    <Route exact path='/DeleteInfo' component={DeleteInfo}/>
                    <Route exact path='/EditInfo' component={EditInfo}/>
                </Switch>
            </div>
            
        </Router>
    );
}
export default Navbar;