import React, { Component } from "react";
import UserDataService from "../services/users.service"
import axios from "axios";
import { BrowserRouter as Router, Switch, Route, Link, Redirect} from "react-router-dom";

//User Creation Form
export default class CreateUser extends Component{
    constructor(props)
    {
        super(props);

        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeuserName = this.onChangeuserName.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.saveUser = this.saveUser.bind(this);
        this.newUser = this.newUser.bind(this);


        this.state={
            firstName:"",
            lastName:"",
            userName:"",
            password:"",
            adminStatus:false,
            submitted: false,
        };
    }

    onChangeFirstName(e)
    {
        this.setState({
            firstName: e.target.value
        });
    }

    onChangeLastName(e)
    {
        this.setState({
            lastName: e.target.value
        });
    }

    onChangeuserName(e)
    {
        this.setState({
            userName: e.target.value
        });
    }

    onChangePassword(e)
    {
        this.setState({
            password: e.target.value
        });
    }

    saveUser()
    {
        console.log("Form submitted");
        const newUser ={
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            userName: this.state.userName,
            password: this.state.password,
            adminStatus:false
        };

        UserDataService.create(newUser)
            .then(response=>{
                this.setState({
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,
                    userName: response.data.userName,
                    password: response.data.password,
                    adminStatus:false,
                    submitted: true

                });
                console.log(response.data);
            })
            .catch(e=>{
                console.log(e);
            });
    }

    newUser()
    {
        this.setState({
            firstName:"",
            lastName:"",
            userName:"",
            password:"",
            submitted: false,
            adminStatus:false,
            redirect: "/login"
            
        });
    }
    render()
    {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
          }
       
        return(
            <div className="submit-form">
            {this.state.submitted ? (
                <form>
                    <div className="form-row d-flex justify-content-center">
                        <h2>Thanks for submitting! Please wait for administrator approval.</h2>
                    </div>
                    <div className="form-row d-flex justify-content-center">
                        <button className="btn btn-dark btn-lg" onClick={this.newUser}>Return to Login Page</button>
                    </div>

                </form>
            ) :(
                <form>
                        <div className="form-row d-flex justify-content-center">
                        <div className="form-group col-md-6">
                            <label for="firstName">First Name:</label>
                            <input type="text" className="form-control" id="firstName" value={this.state.firstName} onChange={this.onChangeFirstName} placeholder="First Name" name="firstName"/>
                        </div>
                        </div>
                        <div className="form-row d-flex justify-content-center">
                        <div className="form-group col-md-6">
                            <label for="lastName">Last Name: </label>
                            <input type="text" className="form-control" id="lastName" value={this.state.lastName} onChange={this.onChangeLastName} placeholder="Last Name" name="lastName"></input>

                        </div>
                        </div>
                        <div className="form-row d-flex justify-content-center">
                        <div class="form-group col-md-6">
                            <label for="userName">userName:</label>
                            <input type="text" className="form-control" id="userName" value={this.state.userName} onChange={this.onChangeuserName}  placeholder="userName" name="userName"></input>

                        </div>
                        </div>
                        <div className="form-row d-flex justify-content-center">
                        <div class="form-group col-md-6">
                            <label for="password">Password: </label>
                            <input type="password" className="form-control" id="password" value={this.state.password} onChange={this.onChangePassword}   placeholder="Password" name="password"></input>

                        </div>
                        </div>
                        {/* <div className="form-row d-flex justify-content-center">
                        <div class="form-group col-md-6">
                            <label for="confirmation">Confirmation: </label>
                            <input type="password" className="form-control" id="confirmation" name="confirmation"></input>
                        </div>
                        </div> */}
                        <div className="form-row d-flex justify-content-center">
                        <button onClick={this.saveUser} type="button" className="btn btn-dark btn-lg">Create Account</button>
                        </div>
                </form>
            )}</div>
        );
    }
}