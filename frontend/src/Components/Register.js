import React, { useState, useRef, useEffect } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import AuthService from "../services/auth.service";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

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
  const checkBtn = useRef();

  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const [newUser, setNewUser] = useState(initialNewUser);
  const [squadrons, setSquadrons] = useState([]);

  useEffect(() => {
    retrieveSquadrons();
  }, []);

  //function to handle the changes in input values on the parent form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value })
  }

  const retrieveSquadrons = async () => {
    const { data } = await AuthService.getSquadrons();
    setSquadrons(data);
  }

  const handleRegister = async (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      try {
        const { data } = await AuthService.register(newUser)
        setMessage(data.message);
        setSuccessful(true);
      } catch (err) {
        setMessage(err.response.data.message)
        console.log(err.response.data.message)
      }
    };
  }

  return (
    <div className="col-md-12">
      <div className="card card-container">

        <Form onSubmit={handleRegister} ref={form}>
          {!successful && (
            <div>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <Input
                  type="text"
                  className="form-control"
                  name="username"
                  value={newUser.username}
                  onChange={handleInputChange}
                  validations={[required, vusername]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <Input
                  type="text"
                  className="form-control"
                  name="firstName"
                  value={newUser.firstName}
                  onChange={handleInputChange}
                  validations={[required]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <Input
                  type="text"
                  className="form-control"
                  name="lastName"
                  value={newUser.lastName}
                  onChange={handleInputChange}
                  validations={[required]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <Input
                  type="text"
                  className="form-control"
                  name="phone"
                  value={newUser.phone}
                  onChange={handleInputChange}
                  validations={[required]}
                />
              </div>

              {/* <div className="form-group">
                <label htmlFor="squadron">Squadron</label>
                <Input
                  type="select"
                  className="form-control"
                  name="squadron"
                  value={newUser.squadron}
                  onChange={handleInputChange}
                  validations={[required]}
                />
              </div> */}
              <div className="col">
                <label>Squadron</label>
                <select onChange={handleInputChange} className="form-control" id="squadron" placeholder="Squadron" name="squadron" value={newUser.squadron}>
                  <option>Squadron</option>
                  {squadrons.map((squadron) => (<option key={squadron._id} value={squadron._id}>{squadron.name}</option>))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Input
                  type="text"
                  className="form-control"
                  name="email"
                  value={newUser.email}
                  onChange={handleInputChange}
                  validations={[required, validEmail]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Input
                  type="password"
                  className="form-control"
                  name="password"
                  value={newUser.password}
                  onChange={handleInputChange}
                  validations={[required, vpassword]}
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
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
};

export default Register;