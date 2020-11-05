import React, { useState, useEffect } from "react";
import MissionsService from "../services/missions.service";
import AuthService from "../services/auth.service";
import { Redirect, Link } from "react-router-dom";
import ParametersService from "../services/Parameter.service";
import MissionReports from '../Components/MissionReports2';

function SelectedReportFilters(props){

    const [missions, setMissions] = useState([]);
    const [currentMsn, setCurrentMission] = useState();
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [filters, setFilters] = useState([]);
    const [squadrons, setSquadrons] = useState([]);
    const [airframes, setAirframes] = useState([]);
    const [operations, setOperations] = useState([]);
    const [bases, setBases] = useState([]);
    const [msnTypes, setMsnTypes] = useState([]);
    const [commTypes, setCommTypes] = useState([]);
    const [channels, setChannels] = useState([]);
   

     

    useEffect(() => {
      
        setFilters(props.location.state);
        
        
    }, []);

    const obtainFilters = () =>{
       
    }
    
    const getAirliftMsns = async () =>{
        const { data } = await MissionsService.getAirLiftMsns();
        setMissions(data);
    };
    const getSquadrons = async () => {
        const { data } = await ParametersService.retrieveSquadrons();
        setSquadrons(data);
    }
    const getAirframes = async () => {
        const { data } = await ParametersService.retrieveAircraft();
        setAirframes(data);
    }
    const getOperations = async () => {
        const { data } = await ParametersService.retrieveOperations();
        setOperations(data);
    }
    const getBases = async () => {
        const { data } = await ParametersService.retrieveBases();
        setBases(data);
    }
    const getMsnTypes = async () => {
        const { data } = await ParametersService.retrieveMsnTypes();
        setMsnTypes(data);
    }
    const getCommTypes = async () => {
        const { data } = await ParametersService.retrieveCommTypes();
        setCommTypes(data);
    }
    const getChannels = async () => {
        const { data } = await ParametersService.retrieveChannels();
        setChannels(data);
    }



    return(
        <div>

        </div>
    );
}

export default SelectedReportFilters;