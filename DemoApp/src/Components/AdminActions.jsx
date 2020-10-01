import React, { Component } from "react";
import UserService from "../services/users.service";
import {Link} from "react-router-dom";
import AuthService from "../services/auth.service";
import {Redirect} from "react-router-dom";


//Page for viewing all user's of the application
export default class AdminActions extends Component{
        constructor(props)
            {
                super(props);
                this.retrieveUsers = this.retrieveUsers.bind(this);
                this.refreshList = this.refreshList.bind(this);
                this.setActiveUser = this.setActiveUser.bind(this);
                

                this.state ={
                    users: [],
                    activeUser: null,
                    currentIndex: -1,
                    searchUser: "",
                    redirect: null,
                    currentUser: { username: ""}
                };
            }

            //Retrieves all users on form load
            componentDidMount(){
                const currentUser =  AuthService.getCurrentUser();
                if (!currentUser) this.setState({ redirect: "/login"});
                
                this.retrieveUsers();

            }


            //Called upon page refresh
            refreshList(){
                this.retrieveUsers();
                this.setState({
                    activeUser: null,
                    currentIndex: -1
                });
            }


            //Sets the active user for the view
            setActiveUser(user, index)
            {
                this.setState(
                    {
                        activeUser: user,
                        currentIndex: index
                    });
            }

            //Method for interacting with the database to retrieve users
            retrieveUsers()
            {
                UserService.getUsersList()
                    .then(response=>
                        {
                            this.setState({users: response.data});
                            
                        },
                        error =>{
                            this.setState({
                                content:
                                (error.response &&
                                    error.respons.data &&
                                    error.response.data.message) ||
                                    error.message ||
                                    error.toString()
                            });
                        }
                        );
                        
            }

    render(){
        if(this.state.redirect){
            return <Redirect to={this.state.redirect}/>
        }

        const { users, activeUser, currentIndex} = this.state;
        return(
            <div className="list row d-flex justify-content-start" id="userList" data-test="component-AdminActions">
                <div className="col-sm-2">
                    <h4>User List</h4>
                    <ul className="list-group">
                        {users.map((user, index) => (
                            <li
                            className={
                                "list-group-item " +
                                (index === currentIndex ? "active" : "")
                            }
                            onClick={() => this.setActiveUser(user, index)}
                            key={index}
                            >
                                {user.username}
                            </li>
                        ))}
                    </ul>

                </div>

                <div className="col-md-6">
                    {activeUser ? (
                        <div>
                            <h4>User: </h4>
                            <p><br></br></p>
                            <div>
                <label>
                  <strong>Username:</strong>
                </label>{" "}
                {activeUser.username}
              </div>
              <div>
                <label>
                  <strong>Email Address:</strong>
                </label>{" "}
                {activeUser.email}
              </div>
              <div>
                <label>
                  <strong>roles:</strong>
                </label>{" "}
                {activeUser.roles.map((role, index) => <li key={index}>{role.name}</li>)}
              </div>
              <Link
                to={"adminActions/update/" + activeUser._id}
                className="badge badge-warning"
                >
                 Edit
                </Link>
                        </div>

                    ) : (
                        <div>
                            <br/>
                            <p>Click on a user to display their details</p>
                        </div>
                    )}
                </div>
            </div>
        );
        }
}