import React, { useEffect, useState } from "react";
import UserService from "../services/users.service";
import { useParams } from "react-router-dom";

//Form for updating the status of a user
function EditUser(props) {

    const initialUser = {
        id: '',
        username: '',
        password: '',
        roles: [],
        status: ''
    };

    const [user, setUser] = useState(initialUser);
    const [message, setMessage] = useState('');

    const { id } = useParams();

    useEffect(() => {
        retrieveUser(id);
    }, []);

    const retrieveUser = async (id) => {
        try {
            const { data } = await UserService.getUserByID(id)
            setUser(data);
        } catch (err) {
            console.log(err);
        }
    }

    //function to handle onChange events for inputs on the parent component
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value })
    }

    const makeAdmin = async () => {
        try {
            const { data } = await UserService.makeAdmin(id);
            setMessage(data);
            retrieveUser(id);
        } catch (err) {
            console.log(err);
        }
    }

    const makeActive = async () => {
        try {
            const { data } = await UserService.makeActive(id);
            setMessage(data);
            retrieveUser(id);
        } catch (err) {
            console.log(err);
            
        }
    }

    //Sends a patch request to the database based on the information inserted into the form.
    const saveUser = async (id) => {
        try {
            const { data } = await UserService.updateUserInfo(id, user);
            console.log(data);
            setMessage(data);
        } catch (err) {
            console.log(err);
        }
    }

    //Sends a delete request to the database based on the selected user.
    const deleteUser = async (id) => {
        try {
            await UserService.deleteUser(id)
            props.history.push('/usermanagement');
        } catch (err) {
            console.log(err.message)
        }
    }

    return (
        <div>
            <div className="container">
                <div className="col-md-7">
                <div className="card p-0">
                    <div className="card-header" id="cardHeader">
                        <h4>Update User</h4>
                    </div>
                    <div className="card-body" id="cardBody">
                         <form>
                            <div className="form-row d-flex justify-content-center">
                                <div className="form-group col-md-6">
                                    <label>Username: </label>
                                    <input type="text" className="form-control" id="userName" value={user.username} onChange={handleInputChange} placeholder="Username" name="userName"></input>
                                </div>
                            </div>
                            <div className="form-row d-flex justify-content-center">
                                <div className="form-group col-md-6">
                                    <label>Password: </label>
                                    <input type="text" className="form-control" id="password" onChange={handleInputChange} placeholder="New Password" name="password"></input>
                                </div>
                            </div>
                            <div className="form-row d-flex justify-content-center">
                            <div className="form-group col-md-6">
                                <label>
                                    <strong>Roles:</strong>
                                </label>{" "}
                                {user.roles.map((role, index) => <li key={index}>{role.name}</li>)}
                                </div>
                            </div>
                            <div className="form-row d-flex justify-content-center">
                            <div className="form-group col-md-6">
                                <label>
                                    <strong>Status:</strong>
                                </label>{" "}
                                {user.active ? "Account Activated" : "Account Deactivated"}
                            </div>
                            </div>
                            <div className="row d-flex justify-content-center">
                                <div className="btn-toolbar mb-2" role="toolbar" aria-label="toolbar with button groups">
                                    <div className="btn-group mr-3" role="group" aria-label="First group">
                                        <button onClick={() => saveUser(id)} type="button" className="btn btn-lg" id="redButton">Update</button>
                                    </div>
                                    <div className="btn-group mr-3" role="group" aria-label="Second group">
                                        <button onClick={() => deleteUser(id)} type="button" className="btn btn-lg" id="redButton">Delete</button>
                                    </div>
                                    <div className="btn-group mr-3" role="group" aria-label="Third group">
                                        <button onClick={makeAdmin} type="button" className="btn btn-lg" id="redButton">Toggle Admin</button>
                                    </div>
                                    <div className="btn-group" role="group" aria-label="Third group">
                                        <button onClick={makeActive} type="button" className="btn btn-lg" id="redButton">Toggle Active</button>
                                    </div>
                                </div>
                                {message}
                            </div>
                        </form>
                    </div>
                </div>
                </div>
            </div>
        </div>
    )

}

export default EditUser;