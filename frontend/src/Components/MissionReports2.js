import React, { useState, useEffect, useRef } from 'react';
import MissionsService from '../services/missions.service';
import AuthService from '../services/auth.service';
import { Redirect, Link, useHistory, useParams} from 'react-router-dom';
import ParametersService from '../services/Parameter.service';
import DataManagementFilterType from '../Components/ReportFilterTypes/DataManagementType';



function MissionReports2(){
   
    
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [checked, setChecked] = useState(false);
    const [filters, setFilters] = useState([]);
    const [filterString, setFilterString] = useState('test');
    const [ActiveComponents, setActiveComponents] = useState('');
    const prevComponentsRef = useRef();
    const history = useHistory();


    useEffect(() => {
      
       
    }, []);

    


    const getSquadrons = async (e) => {
            if(e.target.checked === true){
            const { name } = e.target;
            const { data } = await ParametersService.retrieveSquadrons();
            DataFilterType('squadron', data);
            }
        }

    const getAirframes = async (e) => {
        if(e.target.checked === true){
            const { name } = e.target;
            const { data } = await ParametersService.retrieveAircraft();
            DataFilterType('aircraft', data);
            }
        }
    const getBases = async (e) => {
        if(e.target.checked === true){
            const { name } = e.target;
            const { data } = await ParametersService.retrieveBases();
            DataFilterType('base', data);
            }
        }
    const getChannels = async (e) => {
        if(e.target.checked === true){
            const { name } = e.target;
            const { data } = await ParametersService.retrieveChannels();
            DataFilterType('channel', data);
            }
        }
    const getCommTypes = async (e) => {
        if(e.target.checked === true){
            const { name } = e.target;
            const { data } = await ParametersService.retrieveCommTypes();
            DataFilterType('commtype', data);
            }
        }
    const getMsnTypes = async (e) => {
        if(e.target.checked === true){
            const { name } = e.target;
            const { data } = await ParametersService.retrieveMsnTypes();
            DataFilterType('msntype', data);
            }
        }
    const getOperations = async (e) => {
        if(e.target.checked === true){
            const { name } = e.target;
            const { data } = await ParametersService.retrieveOperations();
            DataFilterType('operation', data);
            }
        }
   
    
    
    const DataFilterType = (name, data) => {

        
            setActiveComponents([...ActiveComponents, <DataManagementFilterType selectedFilter={name} _id={name} data={data} />])
            console.log(ActiveComponents);
                
        
    }

    

 




    return(
        <div>
        <div className=' d-flex justify-content-center' id='MRParameters'>
        <table className='overflow-hidden p-3 mb-3 mb-md-0 mr-md-3 bg-light'>
            <tr>
            <input type="checkbox" className="hidden btn btn-lg btn-light" name="missiondate" id="MissionDate"/><label for="MissionDate">Mission Date</label>
            <input type="checkbox" className="hidden btn btn-lg btn-light" name="missionnum" id="MissionNum"/><label for="MissionNum">Mission Number</label>
            <input type="checkbox" className="hidden btn btn-lg btn-light" name="callsign" id="CallSign"/><label for="CallSign">CallSign </label>
            </tr>
            <tr>
            <input type="checkbox" className="hidden btn btn-lg btn-light" name="commander" id="Commander"/><label for="Commander">Commander </label>
            <input type="checkbox" onClick={getSquadrons} className="hidden btn btn-lg btn-light" name="squadron" id="Squadron"/><label for="Squadron">Squadron </label>
            <input type="checkbox" onClick={getAirframes} className="hidden btn btn-lg btn-light" name="airframe" id="Airframe"/><label for="Airframe">Airframe </label>
            </tr>
            <tr>
            <input type="checkbox" onClick={getOperations} className="hidden btn btn-lg btn-light" name="operation" id="Operation"/><label for="Operation">Operation </label>
            <input type="checkbox" onClick={getBases} className="hidden btn btn-lg btn-light" name="base" id="Base"/><label for="Base">Base </label>
            <input type="checkbox" onClick={getMsnTypes} className="hidden btn btn-lg btn-light" name="missiontype" id="MissionType"/><label for="MissionType">Mission Type </label>
            </tr>
            <tr>
            <input type="checkbox" onClick={getCommTypes} className="hidden btn btn-lg btn-light" name="commercialtype" id="CommercialType"/><label for="CommercialType">Commercial Type </label>
            <input type="checkbox" onClick={getChannels} className="hidden btn btn-lg btn-light" name="channel" id="Channel"/><label for="Channel">Channel </label>
            </tr>
        </table>
            {ActiveComponents}
        </div>
        {/* <div className="d-flex justify-content-end">
        <Link to={{ pathname: 'missionreports/report/', state: filters }}  className='btn btn-lg btn-light'>Next</Link>
        </div> */}
        </div>


    );
}

export default MissionReports2;