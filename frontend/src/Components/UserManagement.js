import React, { useState, useEffect } from "react";
import UserService from "../services/users.service";
import { Link } from "react-router-dom";
import AuthService from "../services/auth.service";
import { Redirect } from "react-router-dom";


//Page for viewing all user's of the application
function UserManagement(props) {

    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState();
    const [redirect, setRedirect] = useState(false);
    const [selectedListItemIndex, setSelectedListItemIndex] = useState(-1);

    useEffect(() => {
        const loggedInUser = AuthService.getCurrentUser();
        retrieveUsers();
    }, []);

    const clickedListItem = (user, index) => {
        setSelectedUser(user);
        setSelectedListItemIndex(index);
    }

    const retrieveUsers = async () => {
        try {
            const { data } = await UserService.getUsersList();
            setUsers(data);
        } catch (err) {
            console.log(err);
        }
    }

    // if(this.state.redirect){
    //     return <Redirect to={this.state.redirect}/>
    // }

    //const { users, activeUser, currentIndex} = this.state;

    return (
        <div className="container" data-test="component-AdminActions">
        <div className="row">
            <div className="col-sm-4 mt-1">
                <h4>User List</h4>
                <ul className="list-group">
                    {users.map((user, index) => (
                        <li
                            id="listItem"
                            className={"list-group-item " + (index === selectedListItemIndex ? "active" : "")}
                            onClick={() => clickedListItem(user, index)}
                            key={index}
                        >
                            {user.username}
                        </li>
                    ))}
                </ul>

            </div>

            <div className="col">
                {selectedUser ? (
                    <div className="card p-0 mt-4 ml-1" id="profileCard">
                        <div className="card-header" id="cardHeader">
                            <h4>User: </h4>
                        </div>
                        <div className="card-body" id="cardBody">
                            <div>
                                <label>
                                    <strong>Username:</strong>
                                </label>{" "}
                                {selectedUser.username}
                            </div>
                            <div>
                            <label>
                                    <strong>Name:</strong>
                                </label>{" "}
                                {selectedUser.firstName + " " + selectedUser.lastName}
                            </div>
                            <div>
                            <label>
                                    <strong>Phone:</strong>
                                </label>{" "}
                                {selectedUser.phone}
                            </div>
                            <div>
                            <label>
                                    <strong>Squadron:</strong>
                                </label>{" "}
                                {selectedUser.squadron}
                            </div>
                            <div>
                                <label>
                                    <strong>Email Address:</strong>
                                </label>{" "}
                                {selectedUser.email}
                            </div>
                            <div>
                                <label>
                                    <strong>roles:</strong>
                                </label>{" "}
                                {selectedUser.roles.map((role, index) => <li key={index}>{role.name}</li>)}
                            </div>
                            <Link
                                to={"usermanagement/update/" + selectedUser._id}
                                className="badge badge-warning"
                            >
                                Edit
                </Link>
                        </div>
                    </div>
                ) : (
                        <div>
                            <br />
                            <p>Click on a user to display their details</p>
                        </div>
                    )}
            </div>
            </div>
        </div>
    );
}

export default UserManagement;