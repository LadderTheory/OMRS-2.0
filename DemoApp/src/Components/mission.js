import React from "react";

function Mission(props) {
  return (
 
    <tr>
      <td>{props.msnNumber}</td> 
      <td>{props.callSign}</td>
      <td>{props.squadron}</td>
      <td>{props.airframe}</td>
      <td>{props.source}</td>
      <td>{props.destination}</td>
      <td>{props.msnDate}</td>
    </tr>
  
  );
}

export default Mission;