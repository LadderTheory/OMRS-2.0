import React, { useState, useEffect } from "react";
//Function for the profile component
const Profile = () => {

  const [ currentUser, setCurrentUser ] = useState({
    sub:"",
    email_verified:false,
    roles:[],
    name:"",
    preferred_username:"",
    given_name:"",
    family_name:"",
    email:""
  });
  //Retrieves the current user when the component loads
  useEffect(() => {
    retrieveUser()
  }, []);

  const retrieveUser = () => {
    setCurrentUser(JSON.parse(localStorage.getItem('user')));
  }

  return (
    <div id="profile-container" className="container">
      <div className="card p-0">
        <div className="card-header" id="cardHeader">
          <h3>
            <strong>{currentUser.preferred_username}</strong> Profile
        </h3>
        </div>
        <div id="cardBody" className="card-body">
          <p>
            <strong>Username:</strong> {currentUser.preferred_username}
          </p>
          <p>
            <strong>Name:</strong> {currentUser.name}
          </p>
          <p>
            {/* <strong>Phone:</strong> {currentUser.phone} */}
          </p>
          <p>
            {/* <strong>Squadron:</strong> {currentUser.squadron.name} */}
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