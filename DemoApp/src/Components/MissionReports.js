import React, {Component} from "react";
import MissionDataService from "../services/missions.service";
import ParameterDataService from "../services/Parameter.service";
import Mission from "./mission";
import {jsPDF} from "jspdf";
import autoTable from 'jspdf-autotable';

//Form for creating mission reports based on requested parameters
export default class MissionReports extends Component{

    constructor(props)
    {
        super(props);
        this.onChangeSquadron = this.onChangeSquadron.bind(this);
        this.onChangeStart = this.onChangeStart.bind(this);
        this.onChangeEnd = this.onChangeEnd.bind(this);
        this.SearchBySquadron = this.SearchBySquadron.bind(this);
        this.SearchByDate = this.SearchByDate.bind(this);
        this.MissionReportSearch= this.MissionReportSearch.bind(this);
        this.PDFExport = this.PDFExport.bind(this)
        this.retrieveSquadrons = this.retrieveSquadrons.bind(this);
        


        this.state=
        {
            missions: [],
            Squadrons:[],
            currentSquadron: "",
            start: "",
            end: ""
        };
    }
    componentDidMount(){
        this.retrieveSquadrons();
    }
    //Sets the property when changed.
    onChangeSquadron(e)
    {
        const squadronChange = e.target.value;
        this.setState({
            currentSquadron:e.target.value
        });
    }
    //Sets the property when changed.    
    onChangeStart(e)
    {
        const startChange = e.target.value;
        this.setState({
            start: startChange
        });
    }
    //Sets the property when changed.
    onChangeEnd(e)
    {
        const endChange = e.target.value;
        this.setState({
            end: endChange
        });
    }
    //Retrieves the List of Squadrons from the database
    retrieveSquadrons(){
        ParameterDataService.retrieveSquadron()
            .then(response=> {
                this.setState({Squadrons:response.data});
                console.log(response.data);
            })
            .catch(e=>{
                console.log(e);
            })
    }
    
    //Queries the mission database based on the squadron parameter
    SearchBySquadron()
    { 
        MissionDataService.findBySquadron(this.state.currentSquadron)
            .then(response =>
                {
                
                    this.setState({missions: response.data});
                    console.log(response.data);
                })
            .catch(e=>{
                console.log(e);
             });
    }

    //Queries the mission database based on a range of the msnDate parameter
    SearchByDate()
    {
        const dateRange=
        {
            start: this.state.start,
            end:this.state.end
        };
        MissionDataService.findByDateRange(dateRange)
            .then(response=>
                {
                    this.setState({missions: response.data});
                    console.log(response.data);
                })
            .catch(e=>{
                console.log(e);
            });

    }

    //Queries the mission database based on multiple parameters
    MissionReportSearch()
    {
        
        if(this.state.currentSquadron ==="" && this.state.start !== "" && this.state.end!== "")
        {
            
                this.SearchByDate();
                console.log("Date");
            
        }
        else if(this.state.currentSquadron !== "" && this.state.start === "" && this.state.end === "")
        {
            
                this.SearchBySquadron();
                console.log("Squadron");
            
        }
        else if(this.state.start !== "" && this.state.end !== "" && this.state.currentSquadron !== "")
        {
            
                
                const data =
                {
                    squadron: this.state.currentSquadron,
                    start: this.state.start,
                    end: this.state.end
                };
                MissionDataService.findByParameters(data)
                    .then(response=>
                        {
                            this.setState({missions: response.data});
                            console.log(response.data);
                        })
                    .catch(e=>{
                            console.log(e);
                        });
            
        }
        else{
            console.log("Error");

        }
    }

    //Method for moving the shown queried data into a structured PDF file.
    PDFExport()
    {
        const json = this.state.missions;
        let array = json.map(obj =>Object.values(obj));
        const doc = new jsPDF();
        doc.autoTable({
            columnStyles: {
                0: {cellWidth: 0},
                1: {cellWidth: 20},
                2: {cellWidth: 25},
                3: {cellWidth: 20},
                4: {cellWidth: 20},
                5: {cellWidth: 20},
                6: {cellWidth: 20},
                7: {cellWidth: 30},
            },
            head:[['ID', 'Mission Number', 'CallSign', 'Squadron', 'Airframe', 'Source', 'Destination', 'Mission Date']],
            body:array
        });

        doc.save("missions.pdf");
    }

    render()
    {
        const{missions, Squadrons} = this.state;
        return(
        <form data-test="component-MissionReports">
        <div className="form-row d-flex justify-content-center col-md-4">
        <label for="squadron">Find by Squadron: </label>
        <select data-test="squadron" onChange={this.onChangeSquadron}  className="form-control" id="squadron">
            <option>squadron</option>
            {Squadrons.map((squadron)=> (
                <option>{squadron.Name}</option>
            ))}
        </select>
        <label for="start">Enter a starting date: </label>
        <input data-test="startDate" type="date" className="form-control" id="start" value={this.start} onChange={this.onChangeStart} name="start"/>
        <label for="end">Enter a end date: </label>
        <input data-test="endDate" type="date" className="form-control" id="end" value={this.end} onChange={this.onChangeEnd} name="end"/>
        <button onClick={this.MissionReportSearch}  type="button" className="btn btn-dark">Search</button>
        </div>
        <h4 className="d-flex justify-content-start">Missions found:</h4>
        <div className="d-flex justify-content-center col-md-8">
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Mission Number</th>
                        <th>Call Sign</th>
                        <th>Squadron</th>
                        <th>Airframe</th>
                        <th>Source</th>
                        <th>Destination</th>
                        <th>Mission Date</th>
                    </tr>
                </thead>
                <tbody>
                    {missions.map((mission) => <Mission
                    key={mission._id}
                    msnNumber={mission.msnNumber}
                    callSign={mission.callSign}
                    squadron={mission.squadron}
                    airframe={mission.airframe}
                    source={mission.source}
                    destination={mission.destination}
                    msnDate={mission.msnDate}
                    />)}
                </tbody>
            </table>
            
        </div>
        <button onClick={this.PDFExport} type="button" className="btn btn-dark d-flex justify-content-center">Export to PDF</button>
        </form>
        );
    }
}

