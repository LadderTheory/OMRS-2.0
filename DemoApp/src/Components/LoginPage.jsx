import React, { Component } from "react";
import UserDataService from "../services/users.service"
import {  Link  } from "react-router-dom";




export default class LoginPage extends Component{
    constructor(props)
    {
        super(props);
        this.onChangeSearchuserName = this.onChangeSearchuserName.bind(this);
   
        this.searchUser = this.searchUser.bind(this);

        this.state =
        {
            searchUser:"",
            user:[],
            username:""
        };
        
    }
    onChangeSearchuserName(e)
    {
        const searchUser = e.target.value;
        this.setState({
            searchUser:searchUser
        });
    }
    
    searchUser()
    {
        UserDataService.findbyuserName(this.state.searchUser)
            .then(response=> {
                this.setState({username: response.data})
                
            })
            .catch(e=>{
                console.log(e);
            })
    }
    render()
    {
        const{searchUser} = this.state;
       
        return(
            <div id="login-id">
            <form>
            <div className="form-row d-flex justify-content-center">
            <div class="container mt-5">
                <h1>Login</h1>

                <div class="row">
                    <div class="col-lg-8">
                        <div class="card">
                            <div class="card-body">
                                <form>
                                    <div className="form-group">
                                    <label for="username" id= "label">Username:</label>
                                    <input 
                                    type="text" 
                                    class="form-control" 
                                    name="username" 
                                    placeholder="Username"
                                    value={searchUser}
                                    onChange={this.onChangeSearchuserName}
                                    />
                                    </div>
                                    <div className="form-group">
                                    <label for="password" id="label">Password:</label>
                                    <input type="password" class="form-control" name="password" placeholder="password"/>
                                    </div>
                                    <div className="form-group">
                                    <Link to="/createUser">Don't have an account? Sign up now!</Link></div>
                                <button onClick={this.searchUser} type="submit" class="btn btn-dark">Login</button>
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