import React, { useState, useEffect } from "react";
import ParameterDataService from "../services/Parameter.service";
import AuthService from "../services/auth.service";
import { Redirect, Link } from "react-router-dom";
import AddParameterCard2 from "./AddParameterCard2";
import EditParameterCard2 from "./EditParameterCard2";

function DataManagement2() {

  const [parameters, setParameters] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [message, setMessage] = useState("");
  const [renderedComponenet, setRenderedComponent] = useState();
  const [selectedParameter, setSelectedParameter] = useState();
  const [display, setDisplay] = useState(false);


const retrieveSquadrons = async ()=>{
    const {data} = await ParameterDataService.retrieveSquadrons()
          try{
            setParameters(data);
          } catch (err) {
            console.log(err);
          }
          setDisplay(true);
          setSelectedParameter("Squadrons");
          clearCards();
      }
const retrieveAircrafts = async ()=>{
    const {data} = await ParameterDataService.retrieveAircraft()
          try{
            setParameters(data);
          } catch (err) {
            console.log(err);
          }
          setDisplay(true);
          setSelectedParameter("Aircraft");
          clearCards();
      }      
const retrieveBases = async ()=>{
  const {data} = await ParameterDataService.retrieveBases()
        try{
          setParameters(data);
        } catch (err) {
          console.log(err);
        }
        setDisplay(true);
        setSelectedParameter("Bases");
        clearCards();
      }  
const retrieveMsnTypes = async ()=>{
  const {data} = await ParameterDataService.retrieveMsnTypes()
        try{
          setParameters(data);
        } catch (err) {
          console.log(err);
        }
        setDisplay(true);
        setSelectedParameter("MsnTypes");
        clearCards();
    }
const retrieveChannels = async ()=>{
  const {data} = await ParameterDataService.retrieveChannels()
        try{
          setParameters(data);
        } catch (err) {
          console.log(err);
        }
        setDisplay(true);
        setSelectedParameter("Channels");
        clearCards();
    }
const retrieveCommTypes = async ()=>{
  const {data} = await ParameterDataService.retrieveCommTypes()
        try{
          setParameters(data);
        } catch (err) {
          console.log(err);
        }
        setDisplay(true);
        setSelectedParameter("CommTypes");
        clearCards();
    }
const retrieveOperations = async ()=>{
  const {data} = await ParameterDataService.retrieveOperations()
        try{
          setParameters(data);
        } catch (err) {
          console.log(err);
        }
        setDisplay(true);
        setSelectedParameter("Operations");
        clearCards();
    }
const retrieveICAOs = async ()=>{
  const {data} = await ParameterDataService.retrieveICAOs()
        try{
          setParameters(data);
        } catch (err) {
          console.log(err);
        }
        setDisplay(true);
        setSelectedParameter("ICAOs");
        clearCards();
    }
const retrieveLegTypes = async ()=>{
  const {data} = await ParameterDataService.retrieveLegTypes()
        try{
          setParameters(data);
        } catch (err) {
          console.log(err);
        }
        setDisplay(true);
        setSelectedParameter("LegTypes");
        clearCards();
    }

const editParameterComponent = (name, id)=>{
  setRenderedComponent(
    <EditParameterCard2 selectedParameter={selectedParameter} parameterName={name} parameterID={id} handleClear={clearCards} showMessage={showMessage} />
  )
}

const addParameterComponent = ()=>{
  setRenderedComponent (
    <AddParameterCard2 selectedParameter={selectedParameter} showMessage={showMessage} handleClear={clearCards} />
  )
}

const clearCards = () => {
  setRenderedComponent();
  
}

const showMessage = () => {
  setMessage("Item Successfully Changed")
}


return (
  <div class="col-xxl">
  <br/>
  <nav className="navbar navbar-expand navbar-dark justify-content-center" id="data-Management-Component">
      <ul class="nav navbar-nav navbar-dark justify-content-center">
            <li><a class="dm"  onClick={retrieveSquadrons}>Squadron</a></li>
            <li><a class="dm"  onClick={retrieveBases}>Base</a></li>
            <li><a class="dm"  onClick={retrieveAircrafts}>Aircraft</a></li>
            <li><a class="dm"  onClick={retrieveMsnTypes}>Mission Type</a></li>
            <li><a class="dm"  onClick={retrieveChannels}>Channel</a></li>
            <li><a class="dm"  onClick={retrieveCommTypes}>Commercial Type</a></li>
            <li><a class="dm"  onClick={retrieveOperations}>Operation</a></li>
            <li><a class="dm"  onClick={retrieveBases}>Source/Dest Base</a></li>
            <li><a class="dm"  onClick={retrieveICAOs}>ICAO Source/Dest</a></li>
            <li><a class="dm"  onClick={retrieveLegTypes}>Leg Type</a></li>
      </ul>
  </nav>
  {/*start the column div here*/}
  <div class="container">
    <div class="row">
     <div className="d-flex col-4" id="data-management">
       <ul className="list-group" >
       {parameters.map((parameter, index) => (
        <li                
          className={
            "list-group-item"  +
            (index === currentIndex ? "active" : "")
          }                
          key={index} onClick={() => editParameterComponent(parameter.name, parameter._id)}>
          {parameter.name}
        </li>              
      ))}
      {display ? (
        <button className="btn btn-primary btn-lg" onClick={addParameterComponent}>Add new</button> 
         ) : (
     <br/>
      )}            
    </ul>                    
  </div>
  <div class="span9">
    
  </div>         
          {renderedComponenet}
          {message}
    
  </div>
 </div>
</div>
);
}

export default DataManagement2;