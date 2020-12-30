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
import About from "./Components/About";
import KeyCloak from 'keycloak-js';

//AdminRoute checks that the currently logged in user has the admin role. If the user has admin then they are allowed to navigate to the admin related components. If not they are redirected back to the root page.
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
  const [keycloak, setKeycloak] = useState({ keycloak: null, authenticated: false, loading: true })

  //When the app loads keycloak is initialized and checks to see if a user is authenticated. If not, they are redirected to the login page for keycloak. If authentication is successfull then a keycloak object is created in state, the authenticated state is set to authenticated and the loading state is set to false
  //Next the token and user profile recieved from keycloak server is set in local storage. Finally the current user is set in state and checked for admin role to determine whether or not to display the admin related elements of the page.
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

              {showAdminBoard && (
                <div className="navbar-nav ml-auto">
                  <li className="nav-item dropdown">
                    <button className="nav-link dropdown-toggle menudropdown" name="adminDropdown" id="navbarDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      Admin
                </button>
                    <div className="dropdown-menu p-3 mb-2 " aria-labelledby="navbarDropdown" id="dropdown">
                      <Link to={"/datamanagement"} id="view-feedback" name="dataManagement" className="nav-link">Data Management</Link>
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
                    <Link to={"/missionreports"} className="nav-link" name="msnReports">
                      Mission Reports
                  </Link>
                  </li>
                </div>
              )}

            </div>

            {currentUser && (
              <div className="navbar-nav ml-auto">
                <li className="nav-item dropdown ml-auto">
                  <button className="nav-link dropdown-toggle menudropdown" id="navbarDropdown" name="helpDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Help
                 </button>
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
              <Route exact path='/about' component={About} />
            </Switch>
          </div>
          </div>
    )}
    </div>
  );

}



export default App;