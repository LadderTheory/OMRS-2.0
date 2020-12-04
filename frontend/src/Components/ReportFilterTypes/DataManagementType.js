import React, { useEffect, useState } from 'react';

//Child component for the Mission Reports component
function DataManagementType(props)
{   
    const [data, setData] = useState([]);
    

    useEffect(() =>{
    setData(props.data);
    }, []);

    //Function to pass the input value back to the parent component
    const inputChange = (e) =>{
        const name = e.target.name;
        const value = e.target.value;
        props.handleChange(name, value);
    }

    return(
        <div className='form-group'>
            <label htmlFor={props._id}>{props.label + ':'}</label>
            <select data-testid='dmSelect' className= 'form-control mb-1' id={props._id} name={props.selectedFilter} onChange={inputChange} required>
                <option value="">Select a(n) {props.label}:</option>{data.filter(filteredData => filteredData.active === true).map((filter) => (<option key={filter._id} value={filter._id}>{filter.name}</option>))}
            </select>
        </div>
    )
}

export default DataManagementType;