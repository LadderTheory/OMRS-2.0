import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "../services/auth.service";

//Function that marks a field as required
const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};
//Login function for the application
const Login = (props) => {
  const form = useRef();
  const checkBtn = useRef();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  //Function to set the state of the username field
  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  //Function to set the state of the password field
  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  /* Logs in the user based on the username and password fields 
  passed to the authentication service*/
  const handleLogin = async (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      try {
        await AuthService.login(username, password);
        //props.history.push("/missionlist");
        //window.location.reload();
      } catch (err) {
        setMessage(err.response.data.message)
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  return (
    <div className="col-md-12">
      <div className="card card-container">
      
        <Form onSubmit={handleLogin} ref={form}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <Input
              type="text"
              className="form-control"
              name="username"
              id="username"
              value={username}
              onChange={onChangeUsername}
              validations={[required]}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <Input
              type="password"
              className="form-control"
              name="password"
              id="password"
              value={password}
              onChange={onChangePassword}
              validations={[required]}
            />
          </div>

          <div className="form-group">
            <button id="redButton" className="btn btn-primary btn-block" disabled={loading} data-testid="login">
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Login</span>
            </button>
          </div>

          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
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

export default Login;