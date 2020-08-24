import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";



export default class LoginPage extends Component{
    render()
    {
        return(
            <div id="login-id">
            <form>
            <div className="form-row d-flex justify-content-center">
            <div class="container mt-5">
                <h1>Login</h1>

                <div class="row">
                    <div class="col-sm-8">
                        <div class="card">
                            <div class="card-body">
                                <form action="/login" method="POST">
                                    <div className="form-group">
                                    <label for="username" id= "label">Username:</label>
                                    <input type="text" class="form-control" name="username" placeholder="Username"/>
                                    </div>
                                    <div className="form-group">
                                    <label for="password" id="label">Password:</label>
                                    <input type="password" class="form-control" name="password" placeholder="password"/>
                                    </div>
                                    <div className="form-group">
                                    <Link to="/createUser">Don't have an account? Sign up now!</Link></div>
                                <button type="submit" class="btn btn-dark">Login</button>
                                </form>
                            </div>
                        </div>
                    </div>

                    

                </div>
            </div>
            </div>
            </form></div>);



    }

}