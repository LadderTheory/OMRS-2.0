import React, { useState } from 'react';



//Child component for Mission reports component
function DateType(props)
{   
    // the customer wants the date to default to 2 days ago
    let two_back = new Date();
    two_back.setDate(two_back.getDate() - 2);

    // variable names correspond to the input id's
    const [dateStart, setdateStart] = useState(two_back);
    const [dateEnd, setDateEnd] = useState(two_back);

    // converts the html value for date (yyyy-mm-dd) to a javascript date object
    const dateFromValue = (value) => {
        let d = value.split('-');
        let newDate = new Date();
        newDate.setFullYear(d[0]);
        newDate.setMonth(d[1] - 1);
        newDate.setDate(d[2]);

        return newDate;
    }

    //Passes the start date back to the parent component
    const dateStartChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        props.handleChangeDateStart(name, value);

        setdateStart(dateFromValue(value))
    }
    //Passes the end date back to the parent component
    const dateEndChange = (e) =>{
        const name = e.target.name;
        const value = e.target.value;
        props.handleChangeDateEnd(name, value);

        setDateEnd(dateFromValue(value));
    }

    // converts the javascript date object into html date format (yyyy-mm-dd)
    const formatDate = (date) => {
        let year = date.getFullYear();
        // month and day both need to have 2 digits, even when led by a 0 (e.g. 01 for january)
        // without that, the page will break
        let month = ('0' + (date.getMonth() + 1)).slice(-2);
        let day = ('0' + (date.getDate())).slice(-2);
        return `${year}-${month}-${day}`
    }

    return(
        <div className='form-group'>
        <label htmlFor='dateStart' >Starting Date: </label>
        <input value={formatDate(dateStart)} type="date" className="form-control mb-1" id="dateStart" name='dateStart' onChange={dateStartChange} required></input>

        <label htmlFor='dateEnd'>Ending Date: </label>
        <input value={formatDate(dateEnd)} type="date" className="form-control mb-1" id="dateEnd" name='dateEnd' onChange={dateEndChange} required></input>
        </div>
    )
}

export default DateType;