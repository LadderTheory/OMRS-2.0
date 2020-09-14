import React, { Component } from 'react';
import ParameterService from '../services/Parameters.service';
export default class AddInfo extends Component {
    constructor(props) {
        super(props);
        this.retrieveParameters = this.retrieveParameters.bind(this);
        this.state = {
           squadrons: [],
           airframes:[],
           locations:[],
           currentIndex: -1
        };
    }
    
    componentDidMount() {
        this.retrieveParameters();
    }

    retrieveParameters(){
        ParameterService.retrieveSquadron()
            .then(response=> {
                this.setState({squadrons: response.data});
                console.log(response.data);
            })
            .catch(e=>{
                console.log(e);
            });
    }
   render() {
       const{squadrons, airframes, locations, currentIndex } =this.state; 
     return (

        <div className="editData">
        {this.state.submitted ? (
                <form>
                <div className="form-row d-flex justify-content-center">
                <h2>Data Deleted Successfully</h2>
                </div>
                <div className="form-row d-flex justify-content-center">
                <button className="align-self-center btn btn-dark btn-lg h-90" onClick={this.mainEdit}>Return</button>
                </div>
                </form>
            ) : (
                <div>
                {/* This area is for the inputs for editing a Squadron name */}
                <div className="form-row d-flex justify-content-center">
                    <div className="form-group col-md-3">
                    <label for="exampleFormControlSelect1">Current Squadron</label>
                        {/* <select class="form-control" id="exampleFormControlSelect1">
                            {squadrons.map((squadron)=> (
                                <option>{squadron.Name}
                                </option>
                            ))}
                          </select>    */}
                          <ul className="list-group">
                            {squadrons.map((squadron, index) => (
                                <li className={"list-group-item" + (index === currentIndex ? "active" : "")} key={index}>
                                {squadron.Name}
                                </li>
                            ))}
                          </ul>
                   </div>
                   <div className="form-row d-flex">
            <button onClick={this.saveChanges} type="button" className="align-self-center btn btn-dark btn-lg h-90">Delete</button>      
            </div>
                </div>
                {/* This area is for the inputs for Deleting an Airframe name */}
                <div className="form-row d-flex justify-content-center">
                    <div className="form-group col-md-3">
                    <label for="exampleFormControlSelect1">Current Airframe</label>
                    <select class="form-control" id="exampleFormControlSelect1">
                    <options></options>
                          </select>                          
                    </div>
                    <div className="form-row d-flex">
            <button onClick={this.saveChanges} type="button" className="align-self-center btn btn-dark btn-lg h-90">Delete</button>      
            </div>
                </div>

                {/* This area is for the inputs for Deleting a Location*/}
                <div className="form-row d-flex justify-content-center">
                    <div className="form-group col-md-3">
                    <label for="exampleFormControlSelect1">Current Location</label>
                    <select class="form-control" id="exampleFormControlSelect1">
                    <options></options>
                          </select>
                    </div>
                    <div className="form-row d-flex">
            <button onClick={this.saveChanges} type="button" className="align-self-center btn btn-dark btn-lg h-60">Delete</button>      
            </div>
                </div>
                {/* <div className="form-row d-flex justify-content-center">
            <button onClick={this.saveChanges} type="button" className="btn btn-dark btn-lg">Delete</button>      
            </div> */}
                </div>
                )
            }</div>
        )
    }
}