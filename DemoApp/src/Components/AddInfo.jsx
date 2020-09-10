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
                <div className="d-flex justify-content-center"></div> 
                <form>
                        <div className="form-row d-flex justify-content-center">
                            <div className="form-group col-md-6">
                             <label for="squadron">Squadron</label>
                             <input type="text" className="form-control" id="squadron" value={this.state.squadron} onChange={this.onChangeSquadron} placeholder="Squadron" name="squadron"></input>
                        
                            </div>
                        </div>
                        <div className="form-row d-flex justify-content-center">
                          <div className="form-group col-md-6">
                               <label for="airframe">Airframe</label>
                                  <input type="text" className="form-control" id="airframe" value={this.state.airframe} onChange={this.onChangeAirframe} placeholder="Airframe" name="airframe"></input>

                           </div>
                        </div>
                        <div className="form-row d-flex justify-content-center">
                        <div className="form-group col-md-6">
                        <label for="locations">Locations</label>
                          <input type="text" className="form-control" id="Locations" value={this.state.locations} onChange={this.onChangeLocations} placeholder="Locations" name="Locations"></input>
                        </div>
                </div>
                    <div className="form-row d-flex justify-content-center">
                    <button onClick={this.saveChanges} type="button" className="btn btn-dark btn-lg">Add</button>
                    </div>
                    </form>
                </div>
            )}
            </div>
        );
    }

}