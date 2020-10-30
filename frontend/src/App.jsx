import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
//Import for Nav-Links
import InputMission from "./Components/InputMission";
import MissionList from "./Components/MissionList";
import UpdateMission from "./Components/UpdateMission";

//import Login from "./Components/LoginPage";
import AdminActions from "./Components/AdminActions";
import UpdateUser from "./Components/UpdateUser";
import MissionReports2 from "./Components/MissionReports2";

import DataManagement2 from "./Components/DataManagement2";
import NewAirliftMsn from "./Components/NewAirLiftMsn";
import EditAirliftMsn from "./Components/EditAirLiftMsn";

//New Auth Functionality
import AuthService from "./services/auth.service";
import Login from "./Components/login.component";
import Register from "./Components/register.component";
import Profile from "./Components/profile.component";
import SelectedReportFilters from "./Components/SelectedReportFilters";


export default class App extends Component {
    constructor(props) {
      super(props);
      this.logOut = this.logOut.bind(this);
  
      this.state = {
        showAdminBoard: false,
        currentUser: undefined,
      };
    }
  
    componentDidMount() {
      const user = AuthService.getCurrentUser();
  
      if (user) {
        this.setState({
          currentUser: user,
          showAdminBoard: user.roles.includes("ADMIN"),
        });
      }
    }
  
    logOut() {
      AuthService.logout();
    }
  
    render() {
      const { currentUser, showAdminBoard } = this.state;
  
      return (
        <div>
          <nav className="navbar navbar-expand " id="navbar">
            <Link to={"/"} className="navbar-brand">
            OMRS
            </Link>
            <div className="navbar-nav mr-auto">
  
              {showAdminBoard && (
                <div className="navbar-nav ml-auto">             
                <li className="nav-item dropdown">
                                 <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Admin
                                  </a>
                                  <div className="dropdown-menu p-3 mb-2  " aria-labelledby="navbarDropdown" id="dropdown"> 
                                        <a className="dropdown-item"><Link to={'/adminactions'} id="user-Admin" className="nav-link">User Admin</Link></a>
                                        <a className="dropdown-item"><Link to={"/datamanagement"} id="data-Management" className="nav-link">Data Management</Link></a>
                                    </div>
                                </li>   
                </div>             
                
              )}
              {currentUser && (
                <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/missionlist"} className="nav-link">
                    Missions
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/newairliftmsn"} className="nav-link">
                    New Airlift Mission
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/missionreports"} className="nav-link">
                    Mission Reports
                  </Link>
                </li>
                </div>
              )}

            </div>
  
            {currentUser ? (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/profile"} className="nav-link">
                    {currentUser.username}
                  </Link>
                </li>
                <li className="nav-item">
                  <a href="/login" className="nav-link" onClick={this.logOut}>
                    LogOut
                  </a>
                </li>
              </div>
            ) : (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/login"} className="nav-link">
                    Login
                  </Link>
                </li>
  
                <li className="nav-item">
                  <Link to={"/register"} className="nav-link">
                    Sign Up
                  </Link>
                </li>
              </div>
            )}
          </nav>
  
          <div >
            <Switch>
              <Route exact path={["/", "/login"]} component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path='/missionlist' component={MissionList} />
              <Route exact path='/missionlist/update/:id/' component={EditAirliftMsn} />
              <Route exact path='/datamanagement' component={DataManagement2}/>
              <Route exact path='/adminactions' component={AdminActions}/>
              <Route exact path='/adminAations/update/:id/' component={UpdateUser}/>
              <Route exact path='/newairliftmsn' component={NewAirliftMsn} />
              <Route exact path= '/missionreports' component={MissionReports2}/>
              <Route exact path= '/missionreports/report/' component={SelectedReportFilters}/>
            </Switch>
          </div>
        </div>
      );
    }
  }