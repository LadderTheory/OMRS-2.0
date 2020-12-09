import React, { useState, useEffect } from "react";
import { Switch, Route, Link, Redirect } from "react-router-dom";
import MissionList from "./Components/MissionList";
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

const AdminRoute = ({ component: Component, ...rest }) => (
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
  const [keycloak, setKeycloak] = useState({ keycloak: null, authenticated: false, loading:true })

  //useEffect specifies the function to be run when the component initally loads
  useEffect(() => {
    const keycloak = KeyCloak('./keycloak.json')
    keycloak.init({ onLoad: 'login-required', redirectUri: 'http://localhost:3000/' }).then(authenticated => {
      setKeycloak({ keycloak: keycloak, authenticated: authenticated, loading:false })
      if (keycloak.authenticated) {
        localStorage.setItem('token', keycloak.token);
        keycloak.loadUserInfo().then(userInfo => {
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
    keycloak.keycloak.logout({ redirectUri: 'http://localhost:3000/' })
  }

  //Destructures the loggedInUser item from state into currentUser and showAdminboard
  const { currentUser, showAdminBoard } = loggedInUser;

  return (

    <div id="main">
      {keycloak.loading ? 
      <div id="loading" className="d-flex justify-content-center">
      <div id="spinner" className="spinner-border m-auto" role="status">
        <span className="sr-only">Loading...</span>
      </div>
      </div> : (
          <div>
          <nav className="navbar navbar-expand " id="navBar">
            <Link to={"/"} className="navbar-brand">
              OMRS
          </Link>
            <div className="navbar-nav mr-auto">

<<<<<<< HEAD
          {showAdminBoard && (
            <div className="navbar-nav ml-auto">
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" name="adminDropdown" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Admin
                </a>
                <div className="dropdown-menu p-3 mb-2  " aria-labelledby="navbarDropdown" id="dropdown">
                  <Link to={'/usermanagement'} name="userAdmin" id="view-feedback" className="nav-link">User Admin</Link>
                  <Link to={"/datamanagement"} name="dataManagement" id="view-feedback" className="nav-link">Data Management</Link>
                  <Link to={"/viewfeedback"} name="viewFeedback" id="view-feedback" className="nav-link">View Feedback</Link>
=======
              {showAdminBoard && (
                <div className="navbar-nav ml-auto">
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      Admin
                </a>
                    <div className="dropdown-menu p-3 mb-2  " aria-labelledby="navbarDropdown" id="dropdown">
                      <Link to={"/datamanagement"} id="view-feedback" className="nav-link">Data Management</Link>
                      <Link to={"/viewfeedback"} id="view-feedback" className="nav-link">View Feedback</Link>
                    </div>
                  </li>
>>>>>>> keycloak
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
<<<<<<< HEAD
              </li>
              <li className="nav-item">
                <Link to={"/missionreports"} name="msnReports" className="nav-link">
                  Mission Reports
=======
                  </li>
                  <li className="nav-item">
                    <Link to={"/missionreports"} className="nav-link">
                      Mission Reports
>>>>>>> keycloak
                  </Link>
                  </li>
                </div>
              )}

            </div>

            {currentUser && (
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
              )}
          </nav>

          <div >
            <Switch>
              <Route exact path="/profile" component={Profile} />
              <Route exact path={['/', '/missionlist']} component={MissionList} />
              <Route exact path='/editairliftmsn/:id/' component={EditAirliftMsn} />
              <AdminRoute exact path='/datamanagement' component={DataManagement2} />
              <Route exact path='/newairliftmsn' component={NewAirliftMsn} />
              <Route exact path='/missionreports' component={MissionReports2} />
              <Route exact path='/reportdisplay' component={ReportDisplay} />
              <Route exact path='/userfeedbackform' component={UserFeedbackForm} />
              <AdminRoute exact path='/viewfeedback' component={ViewFeedback} />
              <Route exact path='/about' component={AboutPage} />
            </Switch>
          </div>
          </div>
    )}
    </div>
  );

}



export default App;