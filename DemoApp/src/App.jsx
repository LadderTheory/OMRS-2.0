import React, { Component } from "react";
import Navbar from "./Components/Navbar";
import { Switch, Route, Link } from "react-router-dom";
//Import for Nav-Links
import InputMission from "./Components/InputMission";
import MissionsList from "./Components/missionList";
import UpdateMission from "./Components/UpdateMission";
//import Login from "./Components/LoginPage";
import CreateUser from "./Components/CreateUser";
import AdminActions from "./Components/AdminActions";
import UpdateUser from "./Components/UpdateUser";
import MissionReports from "./Components/MissionReports";
import AddInfo from "./Components/AddInfo";
import DeleteInfo from "./Components/DeleteInfo";
import EditInfo from "./Components/EditInfo";

//New Auth Functionality
import AuthService from "./services/auth.service";
import Login from "./Components/login.component";
import Register from "./Components/register.component";
import Home from "./Components/home.component";
import Profile from "./Components/profile.component";
import BoardUser from "./Components/board-user.component";
import BoardAdmin from "./Components/board-admin.component";

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
          showAdminBoard: user.roles.includes("ROLE_ADMIN"),
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
            <a className="navbar-brand"><img src="../public/Images/Brand." alt="brand" width="120px" height="30px"></img></a>
            </Link>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/home"} className="nav-link">
                  Home
                </Link>
              </li>
  
              {showAdminBoard && (
                <li className="nav-item">
                  <Link to={"/admin"} className="nav-link">
                    Admin Board
                  </Link>
                </li>
              )}
  
              {currentUser && (
                <li className="nav-item">
                  <Link to={"/user"} className="nav-link">
                    User
                  </Link>
                </li>
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
  
          <div className="container mt-3">
            <Switch>
              <Route exact path={["/", "/home"]} component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/profile" component={Profile} />
              <Route path="/user" component={BoardUser} />
              <Route path="/admin" component={BoardAdmin} />
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