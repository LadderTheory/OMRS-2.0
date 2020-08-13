import React, { useState, Component } from "react";
import Calendar1 from "react-calendar";
import { tileGroupProps } from "react-calendar/src/shared/propTypes";


function MissionCalendar() {

    const [val, onChange] = useState(new Date());

        return (
            
            <div >
                <Calendar1
                    onChange={parentCallback(val)}
                />

            </div>
        );
}
export default MissionCalendar;