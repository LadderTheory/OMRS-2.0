import React, { useState, useEffect } from "react";
import ParameterDataService from "../services/Parameter.service";
import AuthService from "../services/auth.service";
import { Redirect, Link } from "react-router-dom";
import AddParameterCard2 from "./AddParameterCard2";
import EditParameterCard2 from "./EditParameterCard2";

function DataManagement2() {

  //This area sets all the initial state values for each variable, and also declares the function by which each variable can be changed or its properties modified.
  //The "const" declares it as a constant.
  //The area within the [] braces (i.e. [example, setExample]) declare the variable, then set the function one would use to change that variable. It's important to name these something significant and descriptive
  //so that the function of the variable is clear and the likelihood of confusing two or more variables for each other is lessened.
  //The "useState()" area is where the initial state is set, such as an empty string(""), an initial value(-1), an empty index([]), a boolean state(false), and so on.
  const [parameters, setParameters] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [message, setMessage] = useState("");
  const [changeMessage, setChangeMessage] = useState("");
  const [deleteMessage, setDeleteMessage] = useState("");
  const [renderedComponent, setRenderedComponent] = useState();
  const [selectedParameter, setSelectedParameter] = useState();
  const [display, setDisplay] = useState(false);

//this method gathers the squadrons present in the database into a prop to be passed to another component.
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
          clearMessages();
      }
//this method gathers the aircrafts present in the database into a prop to be passed to another component.
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
          clearMessages();
      }      
//this method gathers the bases present in the database into a prop to be passed to another component.
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
        clearMessages();
      }
//this method gathers the mission types present in the database into a prop to be passed to another component.  
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
        clearMessages();
    }
//this method gathers the channels present in the database into a prop to be passed to another component.
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
        clearMessages();
    }
//this method gathers the Commercial Types present in the database into a prop to be passed to another component.
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
        clearMessages();
    }
//this method gathers the operations present in the database into a prop to be passed to another component.
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
        clearMessages();
    }
//this method gathers the ICAOs present in the database into a prop to be passed to another component.
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
        clearMessages();
    }
//this method gathers the leg types present in the database into a prop to be passed to another component.
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
        clearMessages();
    }

//This method both renders the "Edit Parameter Card" component and passes it all the necessary props. Additionally, it also clears rendered cards and messages through the handleClear and clearMessages methods.
//"Cards" in this context refers to the components that are loaded to either add or edit entries in the Data Management section of the app.
const editParameterComponent = (name, id)=>{
  setRenderedComponent(
    <EditParameterCard2 selectedParameter={selectedParameter} parameterName={name} parameterID={id} handleClear={clearCards} showChangeMessage={showChangeMessage} showDeleteMessage={showDeleteMessage}/>
  )
  clearMessages();
}

//add a refreshList={} below to refresh the list on add.
//This method renders the "Add Parameter Card" component. Additionally, it also clears rendered cards and messages through the handleClear and clearMessages methods.
//"Cards" in this context refers to the components that are loaded to either add or edit entries in the Data Management section of the app.
const addParameterComponent = ()=>{
  setRenderedComponent (
    <AddParameterCard2 selectedParameter={selectedParameter} showMessage={showMessage} handleClear={clearCards}  />
  )
  clearMessages();
}

//this method clears any cards that are rendered by setting the "setRenderedComponent" variable to an empty value.
const clearCards = () => {
  setRenderedComponent();
}

//this method clears all rendered messages off the page by setting each string to an empty value.
const clearMessages = () => {
  setMessage("");
  setChangeMessage("");
  setDeleteMessage("");
}

//this method changes the displayed message to state that an item was added(this is passed to the "addParameterComponent" method above).
const showMessage = () => {
  setMessage("Item Successfully Added.")
}

//this method changes the displayed message to state that an item was edited(this is passed to the "editParameterComponent" method above).
const showChangeMessage = () => {
  setChangeMessage("Item Successfully Edited.")
}

//this method changes the displayed message to state that an item was deleted(this is passed to the "editParameterComponent" method above).
const showDeleteMessage = () => {
  setDeleteMessage("Item Successfully Deleted.")
}

//this section is where all the components are returned to and rendered based on their state.
return (
  //this div places the navbar component on it's own line separated from the rest of the page components.
  <div class="col-xxl">
  <br/>
  {/* This portion creates a navbar component that is populated with the various fields a user will be able to interact with through the Data Management section of the webpage */}
  <nav className="navbar navbar-expand navbar-dark justify-content-center" id="data-Management-Component">
      <ul class="nav navbar-nav navbar-dark justify-content-center">
              {/* each of these line items contains an anchor tag. Within those anchor tags is an onClick method that gathers the data into a prop to be passed to another component of the webpage */}
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
  {/*This div is the container in which all the data items will be rendered, dependending on which anchor is chosen from the Navbar created above.*/}
  {/* The map function here renders the contents of the database into a list of selectable items on the webpage, as well as creating a function for each item to function as a "button" that will load
        an instance of the "editParameterCard" component. The intention here is that when a specific data item is selected from the list, that items name and index number will be passed to the edit component
        to allow for the delete or update requests to be performed on the correct database item.*/}
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
          // This line is where the data from the item you clicked will be gathered and sent to the rendered component, as well as rendering the component the receives the data itself
          key={index} onClick={() => editParameterComponent(parameter.name, parameter._id)}>
          {parameter.name}
        </li>              
      ))}
      {/* This line creates an "add new" button to the mapped list, which will allow the user to add a new item to the list they selected from the navbar. */}
      {display ? (
        <button className="btn btn-primary btn-lg" onClick={addParameterComponent}>Add new</button> 
         ) : (
     <br/>
      )}            
    </ul>                    
  </div>
  <div class="span9">
    
  {/* This div takes the state of the renderedComponent, message, changeMessage, and deleteMessage constants, and displays them. This allows the add and edit components to be conditionally rendered through the same
   constant, as well as giving a location for each of the messages to be displayed, depending on which action was most recently completed. */}
  </div>
          {renderedComponent}
          {message}
          {changeMessage}
          {deleteMessage}
    
  </div>
 </div>
</div>
);
}

//this line exports everything to the page.
export default DataManagement2;