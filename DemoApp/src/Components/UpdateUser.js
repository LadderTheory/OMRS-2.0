import React, { Component } from "react";
import UserDataService from "../services/users.service";

//Form for updating the status of a user
export default class UpdateUser extends Component{

    constructor(props) {
        super(props);

        this.onChangeuserName = this.onChangeuserName.bind(this);
        this.onChangepassword = this.onChangepassword.bind(this);
        this.onChangeAdminStatus = this.onChangeAdminStatus.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);

        this.state = {
            currentUser: {
                id: null,
                userName: '',
                password: '',
                adminStatus: false
            },
            message: ''
    
        };
    }

    //Grabs the selected user based on their id on form load
    componentDidMount()
    {
        this.getUser(this.props.match.params.id);
    }
     //Sets the property when changed.
    onChangeuserName(e){
        const userName = e.target.value;

        this.setState(function (prevState)
        {
            return{
                currentUser: {
                    ...prevState.currentUser,
                    userName: userName
                }
            };
        });
    }
    
    //Sets the property when changed. 
    onChangepassword(e){
        const password = e.target.value;

        this.setState(function (prevState)
        {
            return{
                currentUser: {
                    ...prevState.currentUser,
                    password:password
                }
            };
        });
    }
    
    //Sets the property when changed. 
    onChangeAdminStatus(e)
    {
        const adminStatus  = e.target.checked;
        console.log(e.target.checked);
        this.setState(function(prevState)
        {
            return{
                currentUser:
                {
                    ...prevState.currentUser,
                    adminStatus:adminStatus
                }
            };
        });
    }

    //Retrieves a user from the database based on the passed in id
    getUser(id) {
        UserDataService.get(id)
            .then(response => {
                this.setState({
                    currentUser: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    //Sends a patch request to the database based on the information inserted into the form.
    updateUser()
    {
        UserDataService.update(
            this.state.currentUser._id,
            this.state.currentUser
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
        UserDataService.delete(this.state.currentUser._id)
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
        const { currentUser } = this.state;

        return(

            <div className="col-md-6">

                    <div className="edit-form">
                        
                        <div className="d-flex justify-content-center">

                        </div>
                        <h4>Update User</h4>
                        <form>
                        <div className="form-row d-flex justify-content-center">
                                <div className="form-group col-md-6">
                                    <label for="userName">Username: </label>
                                    <input type="text" className="form-control" id="userName" value={currentUser.userName} onChange={this.onChangeuserName} placeholder="Username" name="userName"></input>
                                </div>
                            </div>
                            <div className="form-row d-flex justify-content-center">
                                <div class="form-group col-md-6">
                                    <label for="password">Password: </label>
                                    <input type="text" className="form-control" id="password" value={currentUser.password} onChange={this.onChangepassword} placeholder="New Password" name="password"></input>

                                </div>
                            </div>

                            <div className="form-row d-flex justify-content-center">
                                <button onClick={this.updateUser} type="button" className="badge badge-success">Update</button>
                                <button onClick={this.deleteUser} type="button" className="badge badge-danger mr-2">Delete</button>
                                
                                <input     onChange={this.onChangeAdminStatus} className="AdminCheck" type="checkbox" id="AdminCheck" />
                                <label  for="AdminCheck">Make User an Admin</label>
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