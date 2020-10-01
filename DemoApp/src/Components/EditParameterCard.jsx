import React, { Component } from "react";


export default class EditParameterCard extends Component{
    constructor(props){
        super(props);

    }

    render(){
        return(
            <div className="card">
                <div className="card-body">

                <a className="float-right btn btn-outline-danger">Delete</a>
                <br/>
                <br/>
                
                <form>
                    <div className="form-group">
                    <div className="form-group">
                        <label for="ParameterDropdown">Example select</label>
                            <select class="form-control" id="ParameterDropdown">
                                  <option>1</option>
                                  <option>2</option>
                                  <option>3</option>
                            </select>
                    </div>
                    <label for="NewParameterName">New Parameter Name: </label>
                    
                    <input id="NewParameterName" type="text" className="form-control"/>
                    <br/>
                    <div className="d-flex justify-content-center">
                    <button id="AddParameter" className="text-center btn btn-success">Edit</button>
                    </div>
                    </div>
                </form>

                </div>
            </div>
        );
    };
}