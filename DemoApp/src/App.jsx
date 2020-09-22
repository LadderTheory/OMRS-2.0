import React from "react";
import Navbar from "./Components/Navbar";
import { Switch, Route, Link } from "react-router-dom";
//Import for Nav-Links
import InputMission from "./Components/InputMission";
import MissionsList from "./Components/missionList";
import UpdateMission from "./Components/UpdateMission";
import Login from "./Components/LoginPage";
import CreateUser from "./Components/CreateUser";
import AdminActions from "./Components/AdminActions";
import UpdateUser from "./Components/UpdateUser";
import MissionReports from "./Components/MissionReports";
import AddInfo from "./Components/AddInfo";
import DeleteInfo from "./Components/DeleteInfo";
import EditInfo from "./Components/EditInfo";

//Main staging area for all of the react components to be passed to index.js
function App() {
    return (
        <div>
            <Navbar />
                <Switch>
                    <Route exact path='/InputMission' component={InputMission} />
                    <Route exact path='/missionList' component={MissionsList} />
                    <Route exact path='/missionList/update/:id/' component={UpdateMission} />
                    <Route exact path='/login' component={Login}/>
                    <Route exact path='/createUser' component={CreateUser}/>
                    <Route exact path='/adminActions' component={AdminActions}/>
                    <Route exact path='/adminActions/update/:id/' component={UpdateUser}/>
                    <Route exact path='/missionReports' component={MissionReports}/>
                    <Route exact path='/users/update/:id/' component={UpdateUser}/>
                    <Route exact path='/AddInfo' component={AddInfo}/>
                    <Route exact path='/DeleteInfo' component={DeleteInfo}/>
                    <Route exact path='/EditInfo' component={EditInfo}/>
                </Switch>      
        </div>
    );
}
export default App;