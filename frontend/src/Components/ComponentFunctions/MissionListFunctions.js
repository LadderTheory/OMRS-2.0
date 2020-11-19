import React, { useState, useEffect } from 'react';
import MissionsService from "../../services/missions.service";
import ParametersService from "../../services/Parameter.service";
export const MissionListFunctions = () => {
    const [missions, setMissions] = useState([]);
    const [currentMsn, setCurrentMission] = useState();
    const [selectedListItemIndex, setSelectedListItemIndex] = useState(-1);
    const [filter, setFilter] = useState();
    const [squadrons, setSquadrons] = useState([]);

    //Gets a list of air lift missions and squadrons when the component loads
    useEffect(() => {
        getAirLiftMsns();
        getSquadrons();
    }, []);

    //Retrieves all of the data in the missions collection in the database
    const getAirLiftMsns = async () => {
        const { data } = await MissionsService.getAirLiftMsns();
        setMissions(data);
    };
    //Retrieves all of data in the squadrons collection in the database
    const getSquadrons = async () => {
        const { data } = await ParametersService.retrieveSquadrons();
        setSquadrons(data);
    }
    //Sets a filter's value based on the name and new value of the item that triggered the function
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilter({ ...filter, [name]: value })
    }
    //Queries the database based on the parameters set in the filter array
    const handleSearch = async () => {
        const { data } = await MissionsService.findByFilter(filter);
        setMissions(data);
    }
    //Grabs the corresponding mission from the list when it is clicked
    const setActiveMission = (mission, index) => {
        setCurrentMission(mission);
        setSelectedListItemIndex(index);
    }

    //Clears the currently active filters
    const clearFilters = () => {
        getAirLiftMsns()
        document.getElementById("dateStart").value = "";
        document.getElementById("dateEnd").value = "";
        document.getElementById("squadron").value = "";
        setFilter();
    }

        return{missions, currentMsn, selectedListItemIndex, filter, squadrons, getAirLiftMsns, getSquadrons,
        handleFilterChange, handleSearch, setActiveMission, clearFilters}
}