import React, {Component} from "react";
import MissionDataService from "../services/missions.service";
import Mission from "./mission";

export default class MissionReports extends Component{

    constructor(props)
    {
        super(props);
        this.onChangeSquadron = this.onChangeSquadron.bind(this);
        this.onChangeStart = this.onChangeStart.bind(this);
        this.onChangeEnd = this.onChangeEnd.bind(this);
        this.SearchBySquadron = this.SearchBySquadron.bind(this);
        this.SearchByDate = this.SearchByDate.bind(this);
        this.refreshList = this.refreshList.bind(this);
        


        this.state=
        {
            missions: [],
            squadron: "",
            start: "",
            end: ""
        };
    }

    onChangeSquadron(e)
    {
        const squadronChange = e.target.value;
        this.setState({
            squadron: squadronChange
        });
    }
    
    onChangeStart(e)
    {
        const startChange = e.target.value;
        this.setState({
            start: startChange
        });
    }

    onChangeEnd(e)
    {
        const endChange = e.target.value;
        this.setState({
            end: endChange
        });
    }

    refreshList()
    {
        this.SearchBySquadron();
    }

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
    SearchByDate()
    {
        MissionDataService.findByDateRange(this.state.start, this.state.end)
            .then(response=>
                {
                    this.setState({missions: response.data});
                    console.log(response.data);
                })
            .catch(e=>{
                console.log(e);
            });

    }

    render()
    {
        const{missions} = this.state;
        return(
        <form>
        <div className="form-row d-flex col-md-8">
        <label for="squadron">Find by Squadron: </label>
        <input type="text" className="form-control" id="squadron" value={this.squadron} onChange={this.onChangeSquadron} name="squadron"/>
        <button onClick={this.SearchBySquadron} type="button" class="btn btn-dark">Search</button>
        
        
        <label for="start">Enter a starting date: </label>
        <input type="date" className="form-control" id="start" value={this.start} onChange={this.onChangeStart} name="start"/>
        </div>
        <label for="end">Enter a end date: </label>
        <input type="date" className="form-control" id="end" value={this.end} onChange={this.onChangeEnd} name="end"/>

       
        <div className="col-md-8">
            <h4>Missions found for: {this.state.squadron}</h4>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Mission Number</th>
                        <th>Call Sign</th>
                        <th>         </th>
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
                    airframe={mission.airframe}
                    source={mission.source}
                    destination={mission.destination}
                    msnDate={mission.msnDate}
                    />)}
                </tbody>
            </table>
        </div>
        </form>
        );
    }
}

