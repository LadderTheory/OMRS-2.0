import React from 'react';

//Child component to pass information to the parent Mission Reports component
function TextType(props)
{   
    //Passes the input to the parent component
    const inputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        props.handleChange(name, value)
    }

    return(
        <div className='form-group'>
            <label >{props.selectedFilter+ ':'}</label>
            <input id={props.selectedFilter} type='text' onChange={inputChange} name={props.selectedFilter} className='form-control'></input>
        </div>
    )
}

export default TextType;