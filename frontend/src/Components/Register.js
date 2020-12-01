import React, { useState, useRef, useEffect } from "react";
import { isEmail } from "validator";
import AuthService from "../services/auth.service";

//Function for the Register component
function Register(props) {
  const initialNewUser = {
    username: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
    squadron: ''
  }
  const form = useRef();
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const [newUser, setNewUser] = useState(initialNewUser);
  const [squadrons, setSquadrons] = useState([]);
  //Retrieves a list of squadrons when the component loads
  useEffect(() => {
    retrieveSquadrons();
  }, []);
  //function to handle the changes in input values on the parent form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value })
  }
  //Retrieves a list of squadrons
  const retrieveSquadrons = async () => {
    const { data } = await AuthService.getSquadrons();
    setSquadrons(data);
  }
  //Validates an inputted user and sends the information to the database, where it can be approved
  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");
    setSuccessful(false);
    try {
      const { data } = await AuthService.register(newUser)
      setMessage(data.message);
      setSuccessful(true);
    } catch (err) {
      setMessage(err.response.data.message)
      console.log(err.response.data.message)
    }
  }
  return (
    <div className="col-md-12">
      <div className="card card-container">
        <form onSubmit={handleRegister} ref={form}>
          {!successful && (
            <div>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  className="form-control"
                  name="username"
                  autofill="off" 
                  autoComplete="off"
                  value={newUser.username}
                  onChange={handleInputChange}
                  required
                  pattern="[A-Za-z0-9]{1,}"
                  title="This field should contain only uppercase letters, lowercase letters and numbers"
                />
              </div>
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="firstName"
                  autofill="off" 
                  autoComplete="off"
                  value={newUser.firstName}
                  onChange={handleInputChange}
                  required
                  pattern="[A-Za-z]{1,}"
                  title="This field should contain only upper and lowercase letters"
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="lastName"
                  autofill="off" 
                  autoComplete="off"
                  value={newUser.lastName}
                  onChange={handleInputChange}
                  required
                  pattern="[A-Za-z]{1,}"
                  title="This field should contain only upper and lowercase letters"
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone (111-111-1111)</label>
                <input
                  type="tel"
                  className="form-control"
                  name="phone"
                  autofill="off" 
                  autoComplete="off"
                  value={newUser.phone}
                  onChange={handleInputChange}
                  pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                  title="This field should contain only whole numbers and dashes in the format of 111-111-1111"               
                />
              </div>
              <div className="form-group">
                <label htmlFor="squadron">Squadron</label>
                <select onChange={handleInputChange} className="form-control" id="squadron" placeholder="Squadron" name="squadron" value={newUser.squadron} required>
                  <option value="">Squadron</option>
                  {squadrons.map((squadron) => (<option key={squadron._id} value={squadron._id}>{squadron.name}</option>))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  autofill="off" 
                  autoComplete="off"
                  value={newUser.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  autofill="off" 
                  autoComplete="off"
                  value={newUser.password}
                  onChange={handleInputChange}
                  pattern="^(?=(.*[a-zA-Z].*){2,})(?=.*\d.*)(?=.*\W.*)[a-zA-Z0-9\S]{8,15}$"
                  title="Passwords should be between 8 to 15 charaters and contain at least two letters, one number, one special character. Spaces are not allowed."
                  required
                />
              </div>
              <div className="form-group">
                <button id="redButton" className="btn btn-primary btn-block">Register</button>
              </div>
            </div>
          )}
          {message && (
            <div className="form-group">
              <div
                className={successful ? "alert alert-success" : "alert alert-danger"}
                role="alert"
              >
                {message}
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Register;