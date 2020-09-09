import React, {Component} from "react";
import MissionDataService from "../services/missions.service";
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
        


        this.state=
        {
            missions: [],
            squadron: "",
            start: "",
            end: ""
        };
    }
    //Sets the property when changed.
    onChangeSquadron(e)
    {
        const squadronChange = e.target.value;
        this.setState({
            squadron: squadronChange
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
    
    //Queries the mission database based on the squadron parameter
    SearchBySquadron()
    { 
        MissionDataService.findBySquadron(this.state.squadron)
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
        
        if(this.state.squadron ==="" && this.state.start !== "" && this.state.end!== "")
        {
            
                this.SearchByDate();
                console.log("Date");
            
        }
        else if(this.state.squadron !== "" && this.state.start === "" && this.state.end === "")
        {
            
                this.SearchBySquadron();
                console.log("Squadron");
            
        }
        else if(this.state.start !== "" && this.state.end !== "" && this.state.squadron !== "")
        {
            
                
                const data =
                {
                    squadron: this.state.squadron,
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
        const{missions} = this.state;
        return(
        <form>
        <div className="form-row d-flex justify-content-center col-md-4">
        <label for="squadron">Find by Squadron: </label>
        <input type="text" className="form-control" id="squadron" value={this.squadron} onChange={this.onChangeSquadron} name="squadron"/>
        <label for="start">Enter a starting date: </label>
        <input type="date" className="form-control" id="start" value={this.start} onChange={this.onChangeStart} name="start"/>
        <label for="end">Enter a end date: </label>
        <input type="date" className="form-control" id="end" value={this.end} onChange={this.onChangeEnd} name="end"/>
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

