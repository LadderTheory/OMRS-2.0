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
        <div className="card p-1 mt-2 " id="reportdisplaycard">
                            <div className="card-header" id="reportdisplayheader">
                                <h4>Airlift Mission Report</h4>
                            </div>
                <div className="card-body" id="msnlistbody">
                <div>
                <div className="container horizontal-scrollable"> 
                <div className="row text-center"> 
                                <table className="table table-striped">
                <thead>
                    
                        <th>Squadron</th>
                        <th>Base</th>
                        <th>Aircraft</th>
                        <th>Mission Type</th>
                        <th>Channel</th>
                        <th>Commercial Type</th>
                        <th>Operation</th>
                        <th>Commander</th>
                        <th>Callsign</th>
                        <th>Mission Number</th>
                        <th>Mission Date</th>
                        <th>Remarks</th>
                        <th>Scheduled Take Off</th>
                        <th>Scheduled Land</th>
                        <th>Actual Take Off</th>
                        <th>Actual Land</th>
                        <th>Duration</th>
                        <th>Passenger On</th>
                        <th>Passenger Off</th>
                        <th>Passenger Thru</th>
                        <th>Cargo On</th>
                        <th>Cargo Off</th>
                        <th>Cargo Thru</th>
                        <th>Pallet On</th>
                        <th>Pallet Off</th>
                        <th>Pallet Thru</th>
                        <th>Remarks</th>
                        
                </thead>
                <tbody>
                   {/* {missions.map((mission) => 
                   <tr>
                       <td>{mission.squadron}</td>
                   </tr>
                   )} */}
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