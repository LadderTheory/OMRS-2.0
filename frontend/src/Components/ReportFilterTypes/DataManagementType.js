import React, { useEffect, useState } from 'react';
import ParameterDataService from '../../services/Parameter.service';

function DataManagementType(props)
{   
    const [data, setData] = useState([]);

    useEffect(() =>{
        //console.log(props.selectedFilter);
        setData(props.data);
    }, []);



   

    return(
        <div className='form-group'>
            <select className= 'form-control mb-1' name={props.selectedFilter} >
                {data.map((filter) => (<option value={filter._id}>{filter.name}</option>))}
            </select>
        </div>
    )
}

export default DataManagementType;