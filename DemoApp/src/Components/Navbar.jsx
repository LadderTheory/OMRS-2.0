import React from "react";
import { Link } from "react-router-dom";


//Navbar for Demo Application
function Navbar() {
    return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <a className="navbar-brand"><img src="../public/Images/Brand2.png" alt="brand" width="120px" height="30px"></img></a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            {/* Navbar Links */}
                            <li> <Link to={'/InputMission'} className="nav-link active">Input Mission</Link>
                            </li>
                            <li> <Link to={'/missionList'} className="nav-link">Missions</Link>
                            </li>
                            <li><Link to={'/adminActions'} className="nav-link">Admin</Link></li>
                            <li><Link to={'/missionReports'} className="nav-link">Mission Reports</Link></li>
                    
                            <li className="nav-item dropdown">
                                 <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Data Management
                                  </a>
                                  <div className="dropdown-menu p-3 mb-2 bg-secondary text-white" aria-labelledby="navbarDropdown">
                                     <a className="dropdown-item " href="#"><Link to={'/AddInfo'} className="nav-link">Add Item</Link></a>
                                     <a className="dropdown-item" href="#"><Link to={'/EditInfo'} className="nav-link">Edit Item</Link></a>
                                     <a className="dropdown-item" href="#"><Link to={'/DeleteInfo'} className="nav-link">Delete Item</Link></a>
                                    </div>
                                </li>           
                        </ul>
                    </div>
                </nav>
                <br />
            </div>
            
    );
}
export default Navbar;