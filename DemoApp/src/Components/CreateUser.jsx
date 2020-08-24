import React, { Component } from "react";


export default class CreateUser extends Component{
    render()
    {
        return(
            <div>
                <form>
                        <div className="form-row d-flex justify-content-center">
                        <div className="form-group col-md-6">
                            <label for="firstName">First Name:</label>
                            <input type="text" className="form-control" id="firstName" placeholder="First Name" name="firstName"/>
                        </div>
                        </div>
                        <div className="form-row d-flex justify-content-center">
                        <div className="form-group col-md-6">
                            <label for="lastName">Last Name: </label>
                            <input type="text" className="form-control" id="lastName"  placeholder="Last Name" name="lastName"></input>

                        </div>
                        </div>
                        <div className="form-row d-flex justify-content-center">
                        <div class="form-group col-md-6">
                            <label for="username">Username:</label>
                            <input type="text" className="form-control" id="username"  placeholder="Username" name="username"></input>

                        </div>
                        </div>
                        <div className="form-row d-flex justify-content-center">
                        <div class="form-group col-md-6">
                            <label for="password">Password: </label>
                            <input type="password" className="form-control" id="password"  placeholder="Password" name="password"></input>

                        </div>
                        </div>
                        <div className="form-row d-flex justify-content-center">
                        <div class="form-group col-md-6">
                            <label for="confirmation">Confirmation: </label>
                            <input type="password" className="form-control" id="confirmation" name="confirmation"></input>
                        </div>
                        </div>
                        <div className="form-row d-flex justify-content-center">
                        <button type="button" className="btn btn-dark btn-lg">Create Account</button>
                        </div>
                </form>
            </div>
        );
    }
}