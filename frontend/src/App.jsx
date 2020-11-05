import React, { useState, useEffect } from "react";
<<<<<<< HEAD
import { Switch, Route, Link, Redirect } from "react-router-dom";
import MissionList from "./Components/MissionList";
import UserManagement from "./Components/UserManagement";
import EditUser from "./Components/EditUser";
import MissionReports from "./Components/MissionReports";
=======
import { Switch, Route, Link } from "react-router-dom";
//Import for Nav-Links

import MissionList from "./Components/missionList";


//import Login from "./Components/LoginPage";
import AdminActions from "./Components/AdminActions";
import UpdateUser from "./Components/UpdateUser";
import MissionReports2 from "./Components/MissionReports2";
import ReportDisplay from "./Components/ReportDisplay.component";

>>>>>>> c6604f3bffb584dfc7111e573500fab5d298ad95
import DataManagement2 from "./Components/DataManagement2";
import NewAirliftMsn from "./Components/NewAirLiftMsn";
import EditAirliftMsn from "./Components/EditAirLiftMsn";
import AuthService from "./services/auth.service";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Profile from "./Components/Profile";

const PrivateRoute = ({ component: Component, ...rest}) => (
  <Route
    {...rest}
    render={props => 
      AuthService.getCurrentUser() ? (
      <Component {...props} />
    ) : (
      <Redirect to={'/login'} />
    )
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
  }, []);

  const logOut = () => {
    AuthService.logout();
    setCurrentUser({ currentUser: null})
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

<<<<<<< HEAD
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
=======
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
>>>>>>> c6604f3bffb584dfc7111e573500fab5d298ad95

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
            </li>
          </div>
        ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                  </Link>
<<<<<<< HEAD
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
        </Switch>
=======
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
              <Route exact path= '/missionreports/reportdisplay/' component={ReportDisplay}/>

            </Switch>
          </div>
       
>>>>>>> c6604f3bffb584dfc7111e573500fab5d298ad95
      </div>
    </div>
  );

}

export default App;