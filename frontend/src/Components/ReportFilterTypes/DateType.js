import React from 'react';



//Child component for Mission reports component
function DateType(props)
{   
    //Passes the start date back to the parent component
    const dateStartChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        props.handleChangeDateStart(name, value);
    }
    //Passes the end date back to the parent component
    const dateEndChange = (e) =>{
        const name = e.target.name;
        const value = e.target.value;
        props.handleChangeDateEnd(name, value);
    }

    return(
        <div className='form-group'>
        <label >Starting Date: </label>
        <input type="date" className="form-control mb-1" id="dateStart" name='dateStart' onChange={dateStartChange}></input>

        <label >Ending Date: </label>
        <input type="date" className="form-control mb-1" id="dateEnd" name='dateEnd' onChange={dateEndChange} ></input>
        </div>
    )
}

export default DateType;