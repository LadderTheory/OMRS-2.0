import React, { useState, useEffect } from "react";
import AuthService from "../services/auth.service";
import UserService from "../services/users.service";

const Profile = () => {
  const { id } = AuthService.getCurrentUser();

  const initialUser = {
    username: '',
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    // roles: [],
    squadron: ''
  }
  
  const [ currentUser, setCurrentUser ] = useState(initialUser);

  useEffect(() => {
    retrieveUser(id);
}, []);

  const retrieveUser = async (id) => {
    try {
      const { data } = await UserService.getUserByID(id);
      console.log(data);
      setCurrentUser({
        username: data.username,
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        // roles: data.roles,
        squadron: data.squadron,
        email: data.email
      });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div id="profile-container" className="container">
      <div className="card p-0">
        <div className="card-header" id="cardHeader">
          <h3>
            <strong>{currentUser.username}</strong> Profile
        </h3>
        </div>
        <div id="cardBody" className="card-body">
          <p>
            <strong>Username:</strong> {currentUser.username}
          </p>
          <p>
            <strong>Name:</strong> {currentUser.firstName + " " + currentUser.lastName}
          </p>
          <p>
            <strong>Phone:</strong> {currentUser.phone}
          </p>
          <p>
            <strong>Squadron:</strong> {currentUser.squadron.name}
          </p>
          <p>
            <strong>Email:</strong> {currentUser.email}
          </p>
          <strong>Roles:</strong>
          <ul>
            {/* {currentUser.roles && */}
              {/* currentUser.roles.map((role, index) => <li key={index}>{role}</li>)} */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;