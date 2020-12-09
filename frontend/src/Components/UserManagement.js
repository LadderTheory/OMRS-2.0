import React, { useState, useEffect } from "react";
import UserService from "../services/users.service";
import { Link } from "react-router-dom";

//Page for viewing all user's of the application
function UserManagement(props) {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState();
    const [selectedListItemIndex, setSelectedListItemIndex] = useState(-1);
    //Retrieves a list of users when the component loads
    useEffect(() => {
        retrieveUsers();
    }, []);
    //Sets a selected user when a user clicks on a specific user in the list
    const clickedListItem = (user, index) => {
        setSelectedUser(user);
        setSelectedListItemIndex(index);
    }
    //Retrieves a list of users from the database
    const retrieveUsers = async () => {
        try {
            const { data } = await UserService.getUsersList();
            setUsers(data);
        } catch (err) {
            console.log(err);
        }
    }

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
                            name={user.username}
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
                                <label name={"user" + selectedUser.username}>
                                {selectedUser.username}
                                </label>
                            </div>
                            <div>
                            <label>
                                    <strong>Name:</strong>
                                </label>{" "}
                                <label name={"user" + selectedUser.firstName}>
                                {selectedUser.firstName + " " + selectedUser.lastName}
                                </label>
                            </div>
                            <div>
                            <label>
                                    <strong>Phone:</strong>
                                </label>{" "}
                                <label name={"user" + selectedUser.phone}>
                                {selectedUser.phone}
                                </label>
                            </div>
                            <div>
                            <label>
                                    <strong>Squadron:</strong>
                                </label>{" "}
                                <label name={"user" + selectedUser.squadron.name}>
                                {selectedUser.squadron.name}
                                </label>
                            </div>
                            <div>
                                <label>
                                    <strong>Email Address:</strong>
                                </label>{" "}
                                <label name={"user" + selectedUser.email}>
                                {selectedUser.email}
                                </label>
                            </div>
                            <div>
                                <label>
                                    <strong>roles:</strong>
                                </label>{" "}
                                <label>
                                {selectedUser.roles.map((role, index) => <li name={selectedUser.username + role.name} key={index}>{role.name}</li>)}
                                </label>
                            </div>
                            <Link
                                to={"usermanagement/update/" + selectedUser._id}
                                name="userEditBtn"
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