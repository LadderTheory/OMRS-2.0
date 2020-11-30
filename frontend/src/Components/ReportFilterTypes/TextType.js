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
            <label >{props.label+ ':'}</label>
            <input id={props.selectedFilter} type='text' onChange={inputChange} name={props.selectedFilter}  autofill="off" 
              autoComplete="off" className='form-control' required pattern="[a-zA-Z0-9 ]{1,}" title="The field should contain only uppercase letters, lowercase letters, numbers and spaces"></input>
        </div>
    )
}

export default TextType;