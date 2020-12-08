import React, { useState, useEffect } from "react";
import { Switch, Route, Link, Redirect } from "react-router-dom";
import MissionList from "./Components/MissionList";
import UserManagement from "./Components/UserManagement";
import EditUser from "./Components/EditUser";
import MissionReports2 from "./Components/MissionReports2";
import ReportDisplay from "./Components/ReportDisplay";
import ViewFeedback from "./Components/ViewFeedback";
import DataManagement2 from "./Components/DataManagement2";
import NewAirliftMsn from "./Components/NewAirLiftMsn";
import EditAirliftMsn from "./Components/EditAirLiftMsn";
import Profile from "./Components/Profile";
import UserFeedbackForm from "./Components/UserFeedbackForm";
import AboutPage from "./Components/About";
import KeyCloak from 'keycloak-js';


const AdminRoute = ({ component: Component, ...rest}) => (
  <Route
    {...rest}
    render={props => 
      JSON.parse(localStorage.getItem('user')).roles.includes('admin') ? (
      <Component {...props} />
    ) : (
      <Redirect to={'/'} />
    )
    }
    />
);

function App(props) {

  const [loggedInUser, setCurrentUser] = useState({ currentUser: null, showAdminBoard: false });
  const [keycloak, setKeycloak] = useState({ keycloak: null, authenticated: false})

  //useEffect specifies the function to be run when the component initally loads
  useEffect(() => {
    const keycloak = KeyCloak('./keycloak.json')
    keycloak.init({ onLoad: 'login-required'}).then(authenticated => {
      setKeycloak({keycloak: keycloak, authenticated: authenticated})
      if (keycloak.authenticated) {
        localStorage.setItem('token', keycloak.token);
       keycloak.loadUserInfo().then(userInfo=> {
          const user = userInfo
          localStorage.setItem('user', JSON.stringify(user))
          if (user) {
            setCurrentUser({
              currentUser: user,
              showAdminBoard: user.roles.includes("admin")
            });
          }
        })
      }
    })        
  }, []);

  const logOut = () => {
    localStorage.clear()
    keycloak.keycloak.logout()
  }

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
                  <Link to={'/usermanagement'} id="view-feedback" className="nav-link">User Admin</Link>
                  <Link to={"/datamanagement"} id="view-feedback" className="nav-link">Data Management</Link>
                  <Link to={"/viewfeedback"} id="view-feedback" className="nav-link">View Feedback</Link>
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
                <Link to={"/newairliftmsn"} className="nav-link" id="newAirliftMission">
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
          <li className="nav-item dropdown ml-auto">
                <a className="nav-link dropdown-toggle" id="navbarDropdown" name="helpMenuDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                   Help
                 </a>
                 <div className="dropdown-menu p-3 mb-2  " aria-labelledby="navbarDropdown" id="dropdown"> 
                       <Link to={'/about'} id="about" className="nav-link">About</Link>
                       <Link to={"/UserFeedbackForm"} id="user-Feedback" className="nav-link">Contact Us</Link>
                   </div>
               </li>
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                {currentUser.preferred_username}
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"login"} className="nav-link" name="logOut" onClick={logOut}>
                LogOut
                  </Link>
            </li>
          </div>
        ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} name="logIn" className="nav-link">
                  Login
                  </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} name="signUp" className="nav-link">
                  Sign Up
                  </Link>
              </li>
            </div>
          )}
      </nav>

      <div >
        <Switch>
          <Route exact path="/profile" component={Profile} />
          <Route exact path='/' component={MissionList} />
          <Route exact path='/editairliftmsn/:id/' component={EditAirliftMsn} />
          <AdminRoute exact path='/datamanagement' component={DataManagement2} />
          <AdminRoute exact path='/usermanagement' component={UserManagement} />
          <AdminRoute exact path='/usermanagement/update/:id/' component={EditUser} />
          <Route exact path='/newairliftmsn' component={NewAirliftMsn} />
          <Route exact path='/missionreports' component={MissionReports2} />
          <Route exact path='/reportdisplay' component={ReportDisplay} />
          <Route exact path='/userfeedbackform' component={UserFeedbackForm} />
          <AdminRoute exact path='/viewfeedback' component={ViewFeedback} />
          <Route exact path='/about' component={AboutPage}/>
        </Switch>
      </div>
    </div>   
  );
  
}



export default App;