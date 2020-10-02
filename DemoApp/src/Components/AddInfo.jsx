import React, { Component } from 'react';
import ParameterService from '../services/Parameter.service';
import UserService from "../services/user.service";
import AuthService from "../services/auth.service";
import { Redirect } from "react-router-dom";
export default class AddInfo extends Component {
    constructor(props) {
        super(props);
        
        this.mainEdit=this.mainEdit.bind(this);
        this.saveSquadron = this.saveSquadron.bind(this);
        this.saveAirframe = this.saveAirframe.bind(this);
        this.saveLocation = this.saveLocation.bind(this);
        this.newParameter = this.newParameter.bind(this);
        this.addParameters = this.addParameters.bind(this);
        this.onChangeSquadron=this.onChangeSquadron.bind(this);
        this.onChangeAirframe=this.onChangeAirframe.bind(this);
        this.onChangeLocation=this.onChangeLocation.bind(this);

        this.state = {
            squadron: '',
            airframe: '',
            location: '',
            Type:'',
            Name: '',
            submitted: false,
            redirect: null,
            currentUser: { username: "" }
        };
    }
    onComponentDidMount(){
        const currentUser = AuthService.getCurrentUser();
    if (!currentUser) this.setState({ redirect: "/login" });
    }

    onChangeSquadron(e)
    {
        this.setState({
            squadron: e.target.value
        });        
    }
    onChangeAirframe(e)
    {
        this.setState({
            airframe: e.target.value,
        });
    }

    onChangeLocation(e)
    {
        this.setState({
            location: e.target.value
        });
    }

    saveSquadron() {
        console.log('Change submitted');
        const parameter = {
            Name: this.state.squadron,
            Type: "Squadron"
        };

        ParameterService.create(parameter)
            .then(response=>{
                this.setState({
                    Name: response.data.Name,
                    Type: response.data.Type,
                    submitted: true
                })
                console.log(response.data);
            })
            .catch(e=>{
                console.log(e);
            });
    }
    saveAirframe() {
        console.log('Change submitted');
        const parameter = {
            Name: this.state.airframe,
            Type:"Airframe"
        };
        ParameterService.create(parameter)
            .then(response=>{
                this.setState({
                    Name: response.data.Name,
                    Type: response.data.Type,
                    submitted: true
                })
                console.log(response.data);
            })
            .catch(e=>{
                console.log(e);
            })
    }
    saveLocation() {
        console.log('Change submitted');
        const parameter = {
            Name: this.state.location,
            Type: "Location"
        };
        ParameterService.create(parameter)
        .then(response=>{
            this.setState({
                Name: response.data.Name,
                Type: response.data.Type,
                submitted: true
            })
            console.log(response.data);
        })
        .catch(e=>{
            console.log(e);
        });
    }
    newParameter() {
        this.setState({
            squadron:"",
            airframe:"",
            location:"",
            Type:"",
            Name: ""
        });
    }
    addParameters() {
        if (this.state.squadron!==""){
            this.saveSquadron();
        }
        if (this.state.airframe!==""){
            this.saveAirframe();
        }
        if (this.state.location!==""){
            this.saveLocation();
        }
        this.newParameter();
        this.setState({
            submitted: true
        })
    }
    mainEdit() {
        this.setState({
            squadron: '',
            airframe: '',
            location: '',
            submitted: false
        });
    }
   render() {
     return (
     //   <p>Hello World</p>
        <div className="editData" data-test="component-AddInfo">
        {this.state.submitted ? (
                <form>
                <div className="form-row d-flex justify-content-center">
                <h2>Data Added Successfully</h2>
                </div>
                <div className="form-row d-flex justify-content-center">
                <button className="btn btn-dark btn-lg" onClick={this.mainEdit}>Return</button>
                </div>
                </form>
            ) : (
                <div>
                <div className="d-flex justify-content-center"></div> 
                <form>
                        <div className="form-row d-flex justify-content-center">
                            <div className="form-group col-md-6">
                             <label for="squadron">Squadron</label>
                             <input type="text" data-test="squadron" className="form-control" id="squadron" value={this.state.squadron} onChange={this.onChangeSquadron} placeholder="Squadron" name="squadron"></input>
                        
                            </div>
                        </div>
                        <div className="form-row d-flex justify-content-center">
                          <div className="form-group col-md-6">
                               <label for="airframe">Airframe</label>
                                  <input type="text" data-test="airframe" className="form-control" id="airframe" value={this.state.airframe} onChange={this.onChangeAirframe} placeholder="Airframe" name="airframe"></input>

                           </div>
                        </div>
                        <div className="form-row d-flex justify-content-center">
                        <div className="form-group col-md-6">
                        <label for="locations">Locations</label>
                          <input type="text" data-test="locations" className="form-control" id="Locations" value={this.state.location} onChange={this.onChangeLocation} placeholder="Locations" name="Locations"></input>
                        </div>
                </div>
                    <div className="form-row d-flex justify-content-center">
                    <button onClick={this.addParameters} type="button" className="btn btn-dark btn-lg">Add</button>
                    </div>
                    </form>
                </div>
            )}
            </div>
        );
    }

}