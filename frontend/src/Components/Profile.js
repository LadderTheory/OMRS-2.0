import React from "react";
import AuthService from "../services/auth.service";

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();
  console.log(currentUser);
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
        <strong>Squadron:</strong> {currentUser.squadron} 
      </p>
      <p>
        <strong>Email:</strong> {currentUser.email}
      </p>
      <strong>Roles:</strong>
      <ul>
        {currentUser.roles &&
          currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
      </ul>
      </div>
      </div>
    </div>
  );
};

export default Profile;