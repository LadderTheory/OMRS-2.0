import React, { Component} from "react";
import ParameterDataService from "../services/Parameter.service";
import { Link } from "react-router-dom";
// import SquadronDataService from 
import AuthService from "../services/auth.service";
import { Redirect } from "react-router-dom";
import AddParameterCard from "./AddParameterCard";
import EditParameterCard from "./EditParameterCard";


//Show a list of all missions in the database based on Mission Number.
export default class DataManagement extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchMsnNumber = this.onChangeSearchMsnNumber.bind(this);
    // this.retrieveSquadrons = this.retrieveSquadrons.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.retrieveParameters = this.retrieveParameters.bind(this); 
    this.clearComponents = this.clearComponents.bind(this);
    this.cancelClear = this.cancelClear.bind(this);
    this.deleteClear = this.deleteClear.bind(this);
    this.clearAllCards = this.clearAllCards.bind(this);
    this.editComplete = this.editComplete.bind(this);

  

    this.state = {
      parameters: [],
      currentMsn: null,
      currentIndex: -1,
      searchMsn: "",
      redirect: null,
      currentUser: { username: "" },
      addParameters: '',
      editParameters: '',
      currentParameter:'',
      message:'',
      currentParameterName: '',
      activeParameter:''
    };
  }

  //Retrieves all missions in the database when the form loads
  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();
    if (!currentUser) this.setState({ redirect: "/login" });
    // this.retrieveMissions();
  }

  componentWillUnmount() {
    // fix Warning: Can't perform a React state update on an unmounted component
    this.setState = (state, callback) => {
      return;
    };
  }

  //Sets the property when changed.
  onChangeSearchMsnNumber(e) {
    const searchMsn = e.target.value;
    this.setState({
      searchMsn: searchMsn
    });
  }

  addParameterComponent = () =>{
    this.setState({
      addParameters: <AddParameterCard currentParameter={this.state.currentParameter} clearAdd={this.clearComponents} cancel={this.cancelClear}/>,
      message: '',
      editParameters:''   
    })
  }

  editParameterComponent(parameter) {    
    this.setState({
      editParameters: <EditParameterCard cancel={this.cancelClear} 
      currentParameterName={parameter.name} 
      currentParameterID={parameter._id} 
      currentParameter={this.state.currentParameter} 
      delete={this.deleteClear}
      editCompletion={this.editComplete}
      />,
      message: '',
      addParameters:''
    });
 }
  refreshList()
  {
    this.retrieveParameters(this.state.currentParameter);
  }

  retrieveParameters(parameter)
  {
   
    this.clearAllCards();
    switch(parameter){
        case "squadron":
            ParameterDataService.retrieveSquadrons().then(
                response => {
                  this.setState({
                    parameters: response.data,
                    currentParameter: 'squadron'
                  });
                },
                error => {
                  this.setState({
                    content:
                      (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                      error.message ||
                      error.toString()
                  });
                },
              )
        break;
        case "msntype":
            ParameterDataService.retrieveMsnTypes().then(
                response => {
                  this.setState({
                    parameters: response.data,
                    currentParameter: 'msntype',
                    
            
                  });
                },
                error => {
                  this.setState({
                    content:
                      (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                      error.message ||
                      error.toString()
                  });
                },
              )
        break;
        case "channel":
            ParameterDataService.retrieveChannels().then(
                response => {
                  this.setState({
                    parameters: response.data,
                    currentParameter: 'channel'
                  });
                },
                error => {
                  this.setState({
                    content:
                      (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                      error.message ||
                      error.toString()
                  });
                },
              )
            break;
        case "commTypes":
            ParameterDataService.retrieveCommTypes().then(
                response => {
                  this.setState({
                    parameters: response.data,
                    currentParameter: 'commTypes'
                  });
                },
                error => {
                  this.setState({
                    content:
                      (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                      error.message ||
                      error.toString()
                  });
                },
              )
            break;
        case "operation":
            ParameterDataService.retrieveOperations().then(
                response => {
                  this.setState({
                    parameters: response.data,
                    currentParameter: 'operation'
                  });
                },
                error => {
                  this.setState({
                    content:
                      (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                      error.message ||
                      error.toString()
                  });
                },
              )
            break;
        case "legtypes":
            ParameterDataService.retrieveLegTypes().then(
                response => {
                  this.setState({
                    parameters: response.data,
                    currentParameter: 'legtypes'
                  });
                },
                error => {
                  this.setState({
                    content:
                      (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                      error.message ||
                      error.toString()
                  });
                },
              )
            break;
        case "bases":
            ParameterDataService.retrieveBases().then(
                response => {
                  this.setState({
                    parameters: response.data,
                    currentParameter: 'bases'
                  });
                },
                error => {
                  this.setState({
                    content:
                      (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                      error.message ||
                      error.toString()
                  });
                },
              )
            break;
            case "aircraft":
            ParameterDataService.retrieveAircraft().then(
                response => {
                  this.setState({
                    parameters: response.data,
                    currentParameter: 'aircraft'
                  });
                },
                error => {
                  this.setState({
                    content:
                      (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                      error.message ||
                      error.toString()
                  });
                },
              )
            break;
        
      };
    }

    clearComponents() {
      this.setState({
          addParameters: null,
          message: 'Successufully added new item'
      });
      this.refreshList();
    }
    cancelClear(){
      this.setState({
        addParameters:null,
        editParameters: null
      });

    }
    deleteClear(){
      this.setState({
        editParameters: null,
        message: 'Sucessfully deleted item'
      });
      this.refreshList();
    }
    clearAllCards()
    {
      this.setState({
        editParameters:'',
        addParameters:''  
      });
    }
    editComplete(){
      this.setState({
        editParameters: null,
        message:'sucessfully edited item'
      })
      this.refreshList();
    }
  

//   //Locates a specific group of missions based on Mission Number
//   searchMsn(){
//     if (this.state.searchMsn === "") {
//       this.retrieveMissions();
//     }
//     else {
//       MissionDataService.findByMissionNumber(this.state.searchMsn)
//         .then(response => {
//           this.setState({ missions: response.data });
//           console.log(response.data);
//         })
//         .catch(e => {
//           console.log(e);
//         });
//     }
//   }
  





  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
  
    const { parameters, currentParameterName, currentIndex } = this.state;
    return (
        <div class="col-xxl">
        <br/>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
            <ul class="nav navbar-nav navbar-dark justify-content-center">
                                <li><a class="dropdown-item" href="#" onClick={this.retrieveParameters.bind(this.retrieveParameters, "squadron")}>Squadron</a></li>
                                <li><a class="dropdown-item" href="#" onClick={this.retrieveParameters.bind(this.retrieveParameters, "bases")}>Base</a></li>
                                <li><a class="dropdown-item" href="#" onClick={this.retrieveParameters.bind(this.retrieveParameters, "aircraft")}>Aircraft</a></li>
                                <li><a class="dropdown-item" href="#" onClick={this.retrieveParameters.bind(this.retrieveParameters, "msntype")}>Mission Type</a></li>
                                <li><a class="dropdown-item" href="#" onClick={this.retrieveParameters.bind(this.retrieveParameters, "channel")}>Channel</a></li>
                                <li><a class="dropdown-item" href="#" onClick={this.retrieveParameters.bind(this.retrieveParameters, "commTypes")}>Commercial Type</a></li>
                                <li><a class="dropdown-item" href="#" onClick={this.retrieveParameters.bind(this.retrieveParameters, "operation")}>Operation</a></li>
                                <li><a class="dropdown-item" href="#" onClick={this.retrieveParameters.bind(this.retrieveParameters, "bases")}>Source/Dest Base</a></li>
                                <li><a class="dropdown-item" href="#" onClick={this.retrieveParameters.bind(this.retrieveParameters, "bases")}>ICAO Source/Dest</a></li>
                                <li><a class="dropdown-item" href="#" onClick={this.retrieveParameters.bind(this.retrieveParameters, "legtypes")}>Leg Type</a></li>

            </ul>
        </nav>
<div >
        <div class="col-sm">
        {/* <div className="col-md-6">
        <br/>
          {/* <div className="input-group mb-3">
            <input type="text" className="form-control" placeholder="Search by Msn Number" onChange={this.onChangeSearchMsnNumber}/>
            <div className="input-group-append">
              <button className="btn btn-dark" type="button" onClick={this.searchMsn}>Search</button>
            </div>
          </div> */}
<div className="d-flex justify-content-start col-sm-6">
          <ul className="list-group col-sm-3">
            {parameters.map((parameter, index) => (
              <li
                
                className={
                  "list-group-item"  +
                  (index === currentIndex ? "active" : "")
                }                
                key={index} onClick={()=>
                  this.editParameterComponent(parameter)              
                  }>
                {parameter.name}
              </li>
            ))}<button className="btn btn-secondary" onClick={this.addParameterComponent}>Add new</button>
          </ul>          
        </div>
         {this.state.addParameters}
         {this.state.editParameters}
         {this.state.message}
         
            </div>
         </div>
        </div>
    );
    }        
}
