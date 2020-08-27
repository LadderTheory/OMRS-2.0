import React, { Component } from "react";
import UserDataService from "../services/users.service"
import {  Link, Redirect} from "react-router-dom";


export default class LoginPage extends Component{
   
    constructor(props)
    {
        super(props);
        this.onChangeSearchuserName = this.onChangeSearchuserName.bind(this);
        this.onChangeSearchpassword= this.onChangeSearchpassword.bind(this);
  
        this.searchUser = this.searchUser.bind(this);
       

        this.state =
        {
            username: "",
            password: "",
            redirect:null
        };
        
    }
    onChangeSearchuserName(e)
    {
        const username = e.target.value;
        this.setState({
            username: username
        });
    }
    onChangeSearchpassword(e)
    {
        const password = e.target.value;
        this.setState({
            password: password
        });
    }
    


    searchUser() {
       
        UserDataService.findbyusername(this.state.username)
          .then(response => {
              const [user] = response.data;
              const{id, firstName, lastName, userName, password:passwordName, adminStatus } = user;
              console.log(passwordName);
            
            if(passwordName === this.state.password)
            {
                this.setState({ redirect: "/InputMission" });
            }
            
          })
          .catch(e => {
            console.log(e);
          });
      }

    render()
    {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
          }
       
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
                                    value={this.username}
                                    onChange={this.onChangeSearchuserName}
                                    />
                                    </div>
                                    <div className="form-group">
                                    <label for="password" id="label">Password:</label>
                                    <input 
                                    type="password" 
                                    class="form-control" 
                                    name="password" 
                                    placeholder="password"
                                    value={this.password}
                                    onChange={this.onChangeSearchpassword}
                                    />
                                    </div>
                                    <div className="form-group">
                                    <Link to="/createUser">Don't have an account? Sign up now!</Link></div>
                                <button onClick={this.searchUser} type="button" class="btn btn-dark">Login</button>
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