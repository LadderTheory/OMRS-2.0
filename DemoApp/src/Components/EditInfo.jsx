import React, { Component } from 'react';
export default class AddInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {

            squadron: '',
            airframe: '',
            location: '',

        }

    }
    saveChanges() {

        console.log('Change submitted');
        const newMission = {
            squadron: this.state.squadron,
            airframe: this.state.airframe,
            source: this.state.location,
        };
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
        <div className="editData">
        {this.state.submitted ? (
                <form>
                <div className="form-row d-flex justify-content-center">
                <h2>Data Edited Successfully</h2>
                </div>
                <div className="form-row d-flex justify-content-center">
                <button className="btn btn-dark btn-lg" onClick={this.mainEdit}>Return</button>
                </div>
                </form>
            ) : (
                <div>
                {/* This area is for the inputs for editing the Squadron name */}
                <div className="form-row d-flex justify-content-center">
                    <div className="form-group col-md-3">
                    <label for="exampleFormControlSelect1">Current Squadron Name</label>
                        <select class="form-control" id="exampleFormControlSelect1">
                        <option>552 ACNS</option>
                          <option>609 ACOMS</option>
                          <option>Green Lanterns</option>
                          <option>Bat Family</option>
                          <option>Wonder Woman</option>
                          </select>   
                    </div>
                    <div className="form-group col-md-3">
                    <label for="squadron">New Squadron Name</label>
                            <input type="text" className="form-control" id="squadron" value={this.state.squadron} onChange={this.onChangeSquadron} placeholder="Squadron" name="squadron"></input>                                          
                    </div>
                    <div className="form-row d-flex justify-content-center">
            <button onClick={this.saveChanges} type="button" className="align-self-center btn btn-dark btn-lg h-70">Edit</button>      
            </div>
                </div>

                {/* This area is for the inputs for editing the Airframe name */}
                 <div className="form-row d-flex justify-content-center">
                    <div className="form-group col-md-3">
                    <label for="exampleFormControlSelect1">Current Airframe</label>
                        <select class="form-control" id="exampleFormControlSelect1">
                        <option>AWACs</option>
                          <option>F16</option>
                          <option>Invisible Jet</option>
                          <option>Wings I guess</option>
                          <option>They can just fly</option>
                          </select>   
                    </div>
                    <div className="form-group col-md-3">
                    <label for="squadron">New Airframe</label>
                            <input type="text" className="form-control" id="squadron" value={this.state.squadron} onChange={this.onChangeSquadron} placeholder="Squadron" name="squadron"></input>                                          
                    </div>
                    <div className="form-row d-flex justify-content-center">
            <button onClick={this.saveChanges} type="button" className="align-self-center btn btn-dark btn-lg h-90">Edit</button>      
            </div>
                </div> 

                {/* This area is for the inputs for editing the Location*/}
                 <div className="form-row d-flex justify-content-center">
                    <div className="form-group col-md-3">
                    <label for="exampleFormControlSelect1">Current Location</label>
                      <select class="form-control" id="exampleFormControlSelect1">
                          <option>Tinker AFB, Oklahoma</option>
                          <option>Shaw AFB, South Carolina</option>
                          <option>Themyscera</option>
                          <option>Gotham City</option>
                          <option>Krypton</option>
                          </select>   
                    </div>
                    <div className="form-group col-md-3">
                    <label for="squadron">New Location</label>
                            <input type="text" className="form-control" id="squadron" value={this.state.squadron} onChange={this.onChangeSquadron} placeholder="Squadron" name="squadron"></input>                                          
                    </div>
                    <div className="form-row d-flex justify-content-center">
            <button onClick={this.saveChanges} type="button" className="align-self-center btn btn-dark btn-lg h-90">Edit</button>      
            </div>
                </div> 
                {/* <div className="form-row d-flex justify-content-center">
            <button onClick={this.saveChanges} type="button" className="btn btn-dark btn-lg">Edit</button>      
            </div> */}
            
                </div>
                
                )
            }</div>            
            
        )
    }

}