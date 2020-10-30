import React, { useState, useEffect, } from 'react';
import MissionsService from '../services/missions.service';
import AuthService from '../services/auth.service';
import { Redirect, Link, useHistory, useParams} from 'react-router-dom';
import ParametersService from '../services/Parameter.service';


function MissionReports2(){
   
    
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [checked, setChecked] = useState(false);
    const [filters, setFilters] = useState([]);
    const [filterString, setFilterString] = useState('test');
     const history = useHistory();
    const collectFilters = async (e) =>{
        if(e.target.checked === true){
        const { name } = e.target;
        filters.push(name);
        console.log(filters);
        buildFilters();
        }
        if(e.target.checked === false){
        const { name } = e.target;
        const index = filters.indexOf(name);
        filters.splice(index, 1);
        console.log(filters);
        buildFilters();
        }

    }
    const buildFilters = ()=>
    {
        let filterString2 = '';
     filters.map(filter =>
        {
            filterString2 += filter+'?';
        
        });
        console.log(filterString2);
        setFilterString(filterString2);

        
    }

    

 




    return(
        <div>
        <div className=' d-flex justify-content-center' id='MRParameters'>
        <table className='overflow-hidden p-3 mb-3 mb-md-0 mr-md-3 bg-light'>
            <tr>
            <input type="checkbox" onClick={collectFilters} className="hidden btn btn-lg btn-light" name="missiondate" id="MissionDate"/><label for="MissionDate">Mission Date</label>
            <input type="checkbox" onClick={collectFilters} className="hidden btn btn-lg btn-light" name="missionnum" id="MissionNum"/><label for="MissionNum">Mission Number</label>
            <input type="checkbox" onClick={collectFilters} className="hidden btn btn-lg btn-light" name="callsign" id="CallSign"/><label for="CallSign">CallSign </label>
            </tr>
            <tr>
            <input type="checkbox" onClick={collectFilters} className="hidden btn btn-lg btn-light" name="commander" id="Commander"/><label for="Commander">Commander </label>
            <input type="checkbox" onClick={collectFilters} className="hidden btn btn-lg btn-light" name="squadron" id="Squadron"/><label for="Squadron">Squadron </label>
            <input type="checkbox" onClick={collectFilters} className="hidden btn btn-lg btn-light" name="airframe" id="Airframe"/><label for="Airframe">Airframe </label>
            </tr>
            <tr>
            <input type="checkbox" onClick={collectFilters} className="hidden btn btn-lg btn-light" name="operation" id="Operation"/><label for="Operation">Operation </label>
            <input type="checkbox" onClick={collectFilters} className="hidden btn btn-lg btn-light" name="base" id="Base"/><label for="Base">Base </label>
            <input type="checkbox" onClick={collectFilters} className="hidden btn btn-lg btn-light" name="missiontype" id="MissionType"/><label for="MissionType">Mission Type </label>
            </tr>
            <tr>
            <input type="checkbox" onClick={collectFilters} className="hidden btn btn-lg btn-light" name="commercialtype" id="CommercialType"/><label for="CommercialType">Commercial Type </label>
            <input type="checkbox" onClick={collectFilters} className="hidden btn btn-lg btn-light" name="channel" id="Channel"/><label for="Channel">Channel </label>
            </tr>
        </table>
            
        </div>
        <div className="d-flex justify-content-end">
        <Link to={{ pathname: 'missionreports/report/', state: filters }}  className='btn btn-lg btn-light'>Next</Link>
        </div>
        </div>


    );
}

export default MissionReports2;