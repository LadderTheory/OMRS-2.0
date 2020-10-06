import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
//Import for Nav-Links
import InputMission from "./Components/InputMission";
import MissionsList from "./Components/missionList";
import UpdateMission from "./Components/UpdateMission";

//import Login from "./Components/LoginPage";
import AdminActions from "./Components/AdminActions";
import UpdateUser from "./Components/UpdateUser";
import MissionReports from "./Components/MissionReports";

import DataManagement from "./Components/DataManagement";
import NewAirliftMsn from "./Components/NewAirLiftMsn";
import NewAirliftLeg from "./Components/NewAirLiftLeg"

//New Auth Functionality
import AuthService from "./services/auth.service";
import Login from "./Components/login.component";
import Register from "./Components/register.component";
import Profile from "./Components/profile.component";

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
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <Link to={"/"} className="navbar-brand">
            SST
            </Link>
            <div className="navbar-nav mr-auto">
  
              {showAdminBoard && (
                <div className="navbar-nav ml-auto">
                {/* <li className="nav-item"><Link to={"/dataManagement"} className="nav-link">Data Management</Link></li> */}
                  
                <li className="nav-item dropdown">
                                 <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Admin
                                  </a>
                                  <div className="dropdown-menu p-3 mb-2 bg-secondary text-white" aria-labelledby="navbarDropdown">
                                        <a className="dropdown-item " href="#"><Link to={'/adminActions'} className="nav-link">User Admin</Link></a>
                                        <a className="dropdown-item " href="#"><Link to={"/dataManagement"} className="nav-link">Data Management</Link></a>
                                       
                                    </div>
                                </li>   
                </div>             
                
              )}
              {currentUser && (
                <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/missionList"} className="nav-link">
                    Missions
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/InputMission"} className="nav-link">
                    New Mission
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
              <Route exact path='/missionList' component={MissionsList} />
              <Route exact path='/InputMission' component={InputMission} />
              <Route exact path='/missionList/update/:id/' component={UpdateMission} />
              <Route exact path='/missionList/update/:id/' component={UpdateMission} />
              <Route exact path='/DataManagement' component={DataManagement}/>
              <Route exact path='/adminActions' component={AdminActions}/>
              <Route exact path='/adminActions/update/:id/' component={UpdateUser}/>
              <Route exact path='/newairliftmsn' component={NewAirliftMsn} />
              <Route exact path='/newairliftleg' component={NewAirliftLeg} />
            </Switch>
          </div>
        </div>
      );
    }
  }







//Original App code
//Main staging area for all of the react components to be passed to index.js
// function App() {
//     return (
//         <div>
//             <Navbar />
//                 <Switch>
//                     <Route exact path='/InputMission' component={InputMission} />
//                     <Route exact path='/missionList' component={MissionsList} />
//                     <Route exact path='/missionList/update/:id/' component={UpdateMission} />
//                     <Route exact path='/login' component={Login}/>
//                     <Route exact path='/createUser' component={CreateUser}/>
//                     <Route exact path='/adminActions' component={AdminActions}/>
//                     <Route exact path='/adminActions/update/:id/' component={UpdateUser}/>
//                     <Route exact path='/missionReports' component={MissionReports}/>
//                     <Route exact path='/users/update/:id/' component={UpdateUser}/>
//                     <Route exact path='/AddInfo' component={AddInfo}/>
//                     <Route exact path='/DeleteInfo' component={DeleteInfo}/>
//                     <Route exact path='/EditInfo' component={EditInfo}/>
//                 </Switch>      
//         </div>
//     );
// }
// export default App;