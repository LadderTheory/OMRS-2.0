import React, { Component } from "react";
import UserDataService from "../services/users.service";
import AdminDataService from "../services/admins.service";

export default class UpdateUser extends Component{

    constructor(props){
        super(props);

        this.onChangeuserName = this.onChangeuserName.bind(this);
        this.onChangepassword = this.onChangepassword.bind(this);
        this.onChangeadminStatus = this.onChangeadminStatus.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);

        this.state={
            currentUser:{
                id:null,
                userName: '',
                password: ''
                
            },
            message: '',
            adminStatus:false
        };
    }

    componentDidMount()
    {
        this.getUser(this.props.match.params.id);
    }

    componentWillUnmount()
    {
        this.setState = (state, callback) =>
            {
                return;
            };
    }

    onChangeuserName(e){
        const userName = e.target.value;

        this.setState(function (prevState)
        {
            return{
                currentUser:
                {
                    ...prevState.currentUser,
                    userName:userName
                }
            };
        });
    }

    onChangepassword(e){
        const password = e.target.value;

        this.setState(function (prevState)
        {
            return{
                currentUser:
                {
                    ...prevState.currentUser,
                    password:password
                }
            };
        });
    }

    onChangeadminStatus(e)
    {
        const adminStatus = e.target.value;
        this.setState(function(prevState)
        {
            return{
                adminStatus:{
                    ...prevState.adminStatus,
                    adminStatus:adminStatus
                }
            };
        });
    }
    getUser(id)
    {
        UserDataService.get(id)
            .then(response=>
                {
                    this.setState({
                        currentUser:response.data
                    });
                    console.log(response.data);
                })
            .catch(e=>
                {
                    console.log(e);
                });
    }

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

    saveAdmin()
    {
        console.log("Admin Added");
        const newAdmin={
            firstName:this.state.firstName,
            lastName:this.state.lastName,
            userName:this.state.userName,
            password:this.state.password,
            adminStatus:this.state.adminStatus
        };

        AdminDataService.create(newAdmin)
            .then(response=>{
                this.setState({
                    firstName:response.data.firstName,
                    lastName: response.data.lastName,
                    userName: response.data.userName,
                    password: response.data.password,
                    adminStatus:response.data.adminStatus,
                    submitted: true
                });
                console.log(response.data);
            })
            .catch(e=>{
                console.log(e);
            });
    }

    newAdmin()
    {
        this.setState({
            firstName:"",
            lastName:"",
            userName:"",
            password:"",
            adminStatus:false,
            submitted: false
        });
    }

    render()
    {
        const{currentUser} = this.state;

        return(

            <div className="col-md-6">
                {currentUser ? (

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
                                    <input type="text" className="form-control" id="password"  onChange={this.onChangepassword} placeholder="New Password" name="password"></input>

                                </div>
                            </div>

                            <div className="form-row d-flex justify-content-center">
                                <button onClick={this.updateUser} type="button" className="badge badge-success">Update</button>
                                <button onClick={this.deleteUser} type="button" className="badge badge-danger mr-2">Delete</button>
                                
                                <input   className="AdminCheck" type="checkbox" id="AdminCheck" value="Make an Admin"/>
                                <label  for="AdminCheck">Make User an Admin</label>
                                <div>
                                    <br/>
                                    <p>{this.state.message}</p>
                                </div>
                            </div>
                        </form>
                    </div>

                ) : (
                    <div>
                        <br/>
                        <p>Please click on a Tutorial...</p>
                    </div>
                
                )}
            </div>
        )
    }
}