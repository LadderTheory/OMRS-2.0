import React, { Component } from "react";
import UserDataService from "../services/users.service";
import {Link} from "react-router-dom";


export default class AdminActions extends Component{
        constructor(props)
            {
                super(props);
                this.retrieveUsers = this.retrieveUsers.bind(this);
                this.refreshList = this.refreshList.bind(this);
                this.setActiveUser = this.setActiveUser.bind(this);
                

                this.state ={
                    users: [],
                    currentUser: null,
                    currentIndex: -1,
                    searchUser: ""
                };
            }

            componentDidMount(){
                this.retrieveUsers();
            }

            componentWillUnmount()
            {
                this.setState = (state, callback)=>
                {
                    return;
                };
            }

            refreshList(){
                this.retrieveUsers();
                this.setState({
                    currentUser: null,
                    currentIndex: -1
                });
            }

            setActiveUser(user, index)
            {
                this.setState(
                    {
                        currentUser: user,
                        currentIndex: index
                    });
            }

            retrieveUsers()
            {
                UserDataService.getAll()
                    .then(response=>
                        {
                            this.setState({users: response.data});
                            console.log(response.data);
                        })
                        .catch(e=>
                            {
                                console.log(e);
                            });
            }

    render(){
        const { users, currentUser, currentIndex} = this.state;
        return(
            <div className="list row d-flex justify-content-start">
                <div className="col-sm-2">
                    <h4>User List</h4>
                    <p>All data is test data only</p>

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
                                {user.userName}
                            </li>
                        ))}
                    </ul>

                </div>

                <div className="col-md-6">
                    {currentUser ? (
                        <div>
                            <h4>User: </h4>
                            <p><br></br></p>
                            <div>
                <label>
                  <strong>Username:</strong>
                </label>{" "}
                {currentUser.userName}
              </div>
              <div>
                <label>
                  <strong>First name:</strong>
                </label>{" "}
                {currentUser.firstName}
              </div>
              <div>
                <label>
                  <strong>Last name:</strong>
                </label>{" "}
                {currentUser.lastName}
              </div>
              <Link
                to={"/adminActions/update/" + currentUser._id}
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