import React, { useState, useRef } from "react";
import AuthService from "../services/auth.service";

//Login function for the application
const Login = (props) => {
  const form = useRef();
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
      try {
        await AuthService.login(username, password);
        props.history.push("/missionlist");
        window.location.reload();
      } catch (err) {
        setMessage(err.response.data.message)
        setLoading(false);
      }
  };

  return (
    <div className="col-md-12">
      <div className="card card-container">
      
        <form onSubmit={handleLogin} ref={form}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="form-control"
              name="username"
              id="username"
              value={username}
              onChange={onChangeUsername}
              autofill="off" 
              autoComplete="off"
              pattern="[A-Za-z0-9]{1,}"
              title="This field should contain only uppercase letters, lowercase letters and numbers"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              id="password"
              value={password}
              onChange={onChangePassword}
              required
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
              <div className="alert alert-danger" name="loginMessage" role="alert">
                {message}
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;