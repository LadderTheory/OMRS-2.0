import React, { useState, useEffect } from "react";
import MissionsService from "../services/missions.service";
import AuthService from "../services/auth.service";
import { Redirect, Link } from "react-router-dom";
import ParametersService from "../services/Parameter.service";
import { useTable } from 'react-table';

function ReportDisplay(props) {
    const [missions, setMissions] = useState([]);

    useEffect(() => {
        retrieveMissions(props.location.state);
        
    }, []);

    const retrieveMissions = async (filter) => {
        const { data } = await MissionsService.findByParameters(filter);
        setMissions(data);
    }

    const Table = ({columns, data}) =>{
        const{
            getTableProps,
            getTableBodyProps,
            headerGroups,
            rows,
            prepareRow,
        } = useTable({
            columns,
            data,
        })
        
        return(
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup=> (
                        <tr {...headerGroup.getHeaderGroupProps}>
                            {headerGroup.headers.map(column =>(
                                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row, i) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        )
    }
    const columns = React.useMemo(
        () => [
            {
                Header: 'Mission Number',
                accessor: 'msnNumber'
            },
            {
                Header: 'Mission Number',
                accessor: 'msnNumber'
            },
            {
                Header: 'Mission Number',
                accessor: 'msnNumber'
            },
            {
                Header: 'Mission Number',
                accessor: 'msnNumber'
            },
            {
                Header: 'Mission Number',
                accessor: 'msnNumber'
            },
            {
                Header: 'Mission Number',
                accessor: 'msnNumber'
            },
            {
                Header: 'Mission Number',
                accessor: 'msnNumber'
            },
            {
                Header: 'Mission Number',
                accessor: 'msnNumber'
            },
            {
                Header: 'Mission Number',
                accessor: 'msnNumber'
            },
            {
                Header: 'Mission Number',
                accessor: 'msnNumber'
            },
            {
                Header: 'Mission Number',
                accessor: 'msnNumber'
            },
            {
                Header: 'Mission Number',
                accessor: 'msnNumber'
            },
            {
                Header: 'Mission Number',
                accessor: 'msnNumber'
            },
        ]
    )

    return(
        <div>
        <div className="card p-0 mt-3 " id="reportdisplaycard">
                            <div className="card-header" id="reportdisplayheader">
                                <h4>Airlift Mission Report</h4>
                            </div>
                <div className="card-body" id="cardBody">
                <div>
                <div className="container horizontal-scrollable"> 
                <div className="row text-center"> 
                                <table className="table table-striped">
                <thead>
                    
                        <th>Mission Number</th>
                        <th>Callsign</th>
                        <th>Commander</th>
                        <th>Squadron</th>
                        <th>Aircraft</th>
                        <th>Base</th>
                        <th>Mission Date</th>
                        <th>Mission Type</th>
                        <th>Channel</th>
                        <th>Commercial Type</th>
                        <th>Operation</th>
                        <th>Remarks</th>
                        <th>LegNumber</th>
                        <th>Scheduled Take Off</th>
                        <th>Scheduled Land</th>
                        <th>Actual Take Off</th>
                        <th>Actual Land</th>
                        <th>Duration</th>
                        <th>Passenger On</th>
                        <th>Passenger Off</th>
                        <th>Passenger Through</th>
                        <th>Cargo On</th>
                        <th>Cargo Off</th>
                        <th>Cargo Through</th>
                        <th>Pallet On</th>
                        <th>Pallet Off</th>
                        <th>Pallet Through</th>
                        <th>Max ACL</th>
                        <th>ICAO Source</th>
                        <th>ICAO Destination</th>
                        <th>Leg Remarks</th>
                        
                </thead>
                <tbody>
                   {missions.map((mission) => 
                   <tr>
                       <td>{mission.msnNumber}</td>
                       <td>{mission.callSign}</td>
                       <td>{mission.commander}</td>
                       <td>{mission.squadron}</td>
                       <td>{mission.aircraft}</td>
                       <td>{mission.base}</td>
                       <td>{mission.date}</td>
                       <td>{mission.msnType}</td>
                       <td>{mission.channel}</td>
                       <td>{mission.commType}</td>
                       <td>{mission.operation}</td>
                       <td>{mission.remarks}</td>
                       <td>{mission.legs.legNumber}</td>
                       <td>{mission.legs.scheduledTakeOff}</td>
                       <td>{mission.legs.scheduledLand}</td>
                       <td>{mission.legs.actualTakeOff}</td>
                       <td>{mission.legs.actualLand}</td>
                       <td>{mission.legs.duration}</td>
                       <td>{mission.legs.passengerOn}</td>
                       <td>{mission.legs.passengerOff}</td>
                       <td>{mission.legs.passengerThru}</td>
                       <td>{mission.legs.cargoOn}</td>
                       <td>{mission.legs.cargoOff}</td>
                       <td>{mission.legs.cargoThru}</td>
                       <td>{mission.legs.palletOn}</td>
                       <td>{mission.legs.palletOff}</td>
                       <td>{mission.legs.palletThru}</td>
                       <td>{mission.legs.maxACL}</td>
                       <td>{mission.legs.ICAOSource}</td>
                       <td>{mission.legs.ICAODest}</td>
                       <td>{mission.legs.remarks}</td>
                       
                   </tr>
                   )}
                </tbody>
            </table>
            </div>
            </div>
                                    </div>
                                </div>
                                </div>
                        <div className='d-flex justify-content-center'>
                <button type='button' id='Exportbutton' className='btn btn-lg '>Export to CSV</button> 
                </div>
        </div>
    )

}
export default ReportDisplay;