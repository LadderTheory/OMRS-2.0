import React, { useEffect, useState } from 'react';


function DataManagementType(props)
{   
    const [data, setData] = useState([]);
    

    useEffect(() =>{
        //console.log(props.selectedFilter);
        setData(props.data);
    }, []);

    const inputChange = (e) =>{
        const name = e.target.name;
        const value = e.target.value;
        props.handleChange(name, value);
    }

   

    return(
        <div className='form-group'>
            <label for={props._id}>{props.selectedFilter}:</label>
            <select className= 'form-control mb-1' id={props._id} name={props.selectedFilter} onChange={inputChange} >
                <option>Select a(n) {props.selectedFilter}:</option>{data.map((filter) => (<option value={filter._id}>{filter.name}</option>))}
            </select>
        </div>
    )
}

export default DataManagementType;