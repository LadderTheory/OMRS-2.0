<<<<<<< HEAD
import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
//Import for Nav-Links
import InputMission from "./Components/InputMission";
import missionList from "./Components/missionList";
import UpdateMission from "./Components/UpdateMission";
import UserFeedbackForm from "./Components/UserFeedbackForm";
import AboutPage from "./Components/About";

//import Login from "./Components/LoginPage";
import AdminActions from "./Components/AdminActions";
import UpdateUser from "./Components/UpdateUser";
import MissionReports from "./Components/MissionReports";

=======
import React, { useState, useEffect } from "react";
import { Switch, Route, Link, Redirect } from "react-router-dom";
import MissionList from "./Components/MissionList";
import UserManagement from "./Components/UserManagement";
import EditUser from "./Components/EditUser";
import MissionReports2 from "./Components/MissionReports2";
>>>>>>> e5c05d7ac88927fa3a5e51c52f78125dd5cff242
import DataManagement2 from "./Components/DataManagement2";
import NewAirliftMsn from "./Components/NewAirLiftMsn";
import EditAirliftMsn from "./Components/EditAirLiftMsn";
import AuthService from "./services/auth.service";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Profile from "./Components/Profile";
import ReportDisplay from "./Components/ReportDisplay";

<<<<<<< HEAD

export default class App extends Component {
    constructor(props) {
      super(props);
      this.logOut = this.logOut.bind(this);
  
      this.state = {
        showAdminBoard: false,
        currentUser: undefined,
      };
=======
const PrivateRoute = ({ component: Component, ...rest}) => (
  <Route
    {...rest}
    render={props => 
      AuthService.getCurrentUser() ? (
      <Component {...props} />
    ) : (
      <Redirect to={'/login'} />
    )
>>>>>>> e5c05d7ac88927fa3a5e51c52f78125dd5cff242
    }
    />
);

function App(props) {

  const [loggedInUser, setCurrentUser] = useState({ currentUser: null, showAdminBoard: false });

  //useEffect specifies the function to be run when the component initally loads
  useEffect(() => {
    //Get the currently logged in user information from the AuthService
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser({
        currentUser: user,
        showAdminBoard: user.roles.includes("ADMIN"),
      });
    }
<<<<<<< HEAD
  
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
                <li className="nav-item dropdown">
                                 <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Help
                                  </a>
                                  <div className="dropdown-menu p-3 mb-2  " aria-labelledby="navbarDropdown" id="dropdown"> 
                                        <a className="dropdown-item"><Link to={'/about'} id="about" className="nav-link">About</Link></a>
                                        <a className="dropdown-item"><Link to={"/UserFeedbackForm"} id="user-Feedback" className="nav-link">Contact Us</Link></a>
                                    </div>
                                </li>
                </div>
                
              )}
=======
  }, []);

  const logOut = () => {
    AuthService.logout();
    setCurrentUser({ currentUser: null})
  }
>>>>>>> e5c05d7ac88927fa3a5e51c52f78125dd5cff242

  //Destructures the loggedInUser item from state into currentUser and showAdminboard
  const { currentUser, showAdminBoard } = loggedInUser;

  return (
    <div>
      <nav className="navbar navbar-expand " id="navBar">
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
                  <Link to={'/usermanagement'} id="user-Admin" className="dropdown-item">User Admin</Link>
                  <Link to={"/datamanagement"} id="data-Management" className="dropdown-item">Data Management</Link>
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
              <Link to={"login"} className="nav-link" onClick={logOut}>
                LogOut
                  </Link>
<<<<<<< HEAD
                </li>
              </div>
            )}
          </nav>
  
          <div >
            <Switch>
              <Route exact path={["/", "/login"]} component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path='/missionlist' component={missionList} />
              <Route exact path='/missionlist/update/:id/' component={EditAirliftMsn} />
              <Route exact path='/datamanagement' component={DataManagement2}/>
              <Route exact path='/adminactions' component={AdminActions}/>
              <Route exact path='/adminAations/update/:id/' component={UpdateUser}/>
              <Route exact path='/newairliftmsn' component={NewAirliftMsn} />
              <Route exact path='/userfeedbackform' component ={UserFeedbackForm} />
              <Route exact path='/about' component={AboutPage}/>
            </Switch>
=======
            </li>
>>>>>>> e5c05d7ac88927fa3a5e51c52f78125dd5cff242
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
          <PrivateRoute exact path="/profile" component={Profile} />
          <PrivateRoute exact path='/missionlist' component={MissionList} />
          <PrivateRoute exact path='/editairliftmsn/:id/' component={EditAirliftMsn} />
          <PrivateRoute exact path='/datamanagement' component={DataManagement2} />
          <PrivateRoute exact path='/usermanagement' component={UserManagement} />
          <PrivateRoute exact path='/usermanagement/update/:id/' component={EditUser} />
          <PrivateRoute exact path='/newairliftmsn' component={NewAirliftMsn} />
          <PrivateRoute exact path='/missionreports' component={MissionReports2} />
          <PrivateRoute exact path='/reportdisplay' component={ReportDisplay} />
        </Switch>
      </div>
    </div>
  );

}

export default App;