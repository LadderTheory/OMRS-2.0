import React, { Component } from "react";
import UserService from "../services/users.service";
import AuthService from "../services/auth.service";
import { Redirect } from "react-router-dom";

//Form for updating the status of a user
export default class UpdateUser extends Component{

    constructor(props) {
        super(props);

        this.onChangeuserName = this.onChangeuserName.bind(this);
        this.onChangepassword = this.onChangepassword.bind(this);
        //this.onChangeAdminStatus = this.onChangeAdminStatus.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.makeAdmin = this.makeAdmin.bind(this); 

        this.state = {
            activeUser: {
                id: null,
                username: '',
                password: '',
                roles: []
            },
            message: '',
            redirect: null,
            currentUser: { username: ""}
    
        };
    }

    //Grabs the selected user based on their id on form load
    componentDidMount()
    {
        const currentUser =  AuthService.getCurrentUser();
        if (!currentUser) this.setState({ redirect: "/login"});
        this.getUser(this.props.match.params.id);
    }
     //Sets the property when changed.
    onChangeuserName(e){
        const userName = e.target.value;

        this.setState(function (prevState)
        {
            return{
                activeUser: {
                    ...prevState.activeUser,
                    username: userName
                }
            };
        });
    }
    
    makeAdmin() {
        UserService.makeAdmin(
            this.state.activeUser._id,
        )
            .then(response =>
                {
                    console.log(response.data);
                    this.setState({
                        message: response.data
                    });
                })
            .catch(e=>
                {
                    console.log(e);
                });
    }



    //Sets the property when changed. 
    onChangepassword(e){
        const password = e.target.value;

        this.setState(function (prevState)
        {
            return{
                activeUser: {
                    ...prevState.activeUser,
                    password:password
                }
            };
        });
    }
    

    //Retrieves a user from the database based on the passed in id
    getUser(id) {
        UserService.getUserByID(id)
            .then(response => {
                this.setState({
                    activeUser: response.data
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    //Sends a patch request to the database based on the information inserted into the form.
    updateUser()
    {
        UserService.updateUserInfo(
            this.state.activeUser._id,
            this.state.activeUser
        )
            .then(response =>
                {
                    console.log(response.data);
                    this.setState({
                        message: "The User's credentials were updated successfully!"
                    });
                })
            .catch(e=>
                {
                    console.log(e);
                });
    }

    //Sends a delete request to the database based on the selected user.
    deleteUser(){
        UserService.deleteUser(this.state.activeUser._id)
            .then(response =>{
                console.log(response.data);
                this.props.history.push('/users');
            })
            .catch(e=>
                {
                    console.log(e);
                })
    }

    render(){
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
          }
        const { activeUser } = this.state;

        return(

            <div className="col-md-6" data-test="component-UpdateUser">

                    <div className="edit-form">
                        
                        <div className="d-flex justify-content-center">

                        </div>
                        <h4>Update User</h4>
                        <form>
                        <div className="form-row d-flex justify-content-center">
                                <div className="form-group col-md-6">
                                    <label for="userName">Username: </label>
                                    <input type="text" className="form-control" id="userName" value={activeUser.username} onChange={this.onChangeuserName} placeholder="Username" name="userName"></input>
                                </div>
                            </div>
                            <div className="form-row d-flex justify-content-center">
                                <div class="form-group col-md-6">
                                    <label for="password">Password: </label>
                                    <input type="text" className="form-control" id="password" onChange={this.onChangepassword} placeholder="New Password" name="password"></input>
                                </div>
                            </div>
                            <div>
                            <label>
                  <strong>roles:</strong>
                </label>{" "}
                {activeUser.roles.map((role, index) => <li key={index}>{role.name}</li>)}

                            </div>

                            <div className="form-row d-flex justify-content-center">
                                <button onClick={this.updateUser} type="button" className="badge badge-success">Update</button>
                                <button onClick={this.deleteUser} type="button" className="badge badge-danger mr-2">Delete</button>
                                <button onClick={this.makeAdmin} type="button" className="badge badge-danger mr-2">Toggle Admin</button>
                                <div>
                                    <br/>
                                    <p>{this.state.message}</p>
                                </div>
                            </div>
                        </form>
                    </div>
            </div>
        )
    }
}