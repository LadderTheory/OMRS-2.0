import React, { useEffect, useState } from 'react';


function DateType(props)
{   


    useEffect(() =>{
        //console.log(props.selectedFilter);
        
    }, []);

    const inputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        props.handleChangeDateStart(name, value);
    }
    const dateEndChange = (e) =>{
        const name = e.target.name;
        const value = e.target.value;
        props.handleChangeDateEnd(name, value);
    }

   

    return(
        <div className='form-group'>
        <label >Starting Date: </label>
        <input type="date" className="form-control mb-1" id="dateStart" name='dateStart' onChange={inputChange}></input>

        <label >Ending Date: </label>
        <input type="date" className="form-control mb-1" id="dateEnd" name='dateEnd' onChange={dateEndChange} ></input>
        </div>
    )
}

export default DateType;