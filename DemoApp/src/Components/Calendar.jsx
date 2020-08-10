import React, {useState} from "react";
import Calendar1 from "react-calendar";


function Calendar()
{
    const [value, onChange] = useState(new Date());
   
    
    return(
        

        <div>
            <Calendar1 
            onChange={onChange}
            value={value}
            />
            
        </div>
    );
}
export default Calendar;