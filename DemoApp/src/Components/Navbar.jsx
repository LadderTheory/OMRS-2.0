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
                        <ul className="navbar-nav">
                        <li class="nav-item">
                        <a class="nav-link" href="#"> Data Management </a>
                            <ul class="dropdown-menu">
                                <li><a className="dropdown-item " href="#"><Link to={'/AddInfo'} className="nav-link">Add Item</Link></a></li>
                                <li><a className="dropdown-item" href="#"><Link to={'/EditInfo'} className="nav-link">Edit Item</Link></a></li>
                                <li><a className="dropdown-item" href="#"><Link to={'/DeleteInfo'} className="nav-link">Delete Item</Link></a></li>

                            </ul>
                        </li>
                        <li class="nav-item">
                        <a class="nav-link" href="#"> User Management </a>
                            <ul class="dropdown-menu">
                                <li><a className="dropdown-item " href="#"><Link to={'/InputMission'} className="nav-link active">Input Mission</Link></a></li>
                                <li><a className="dropdown-item" href="#"><Link to={'/missionList'} className="nav-link">Missions</Link></a></li>
                                <li><a><Link to={'/missionReports'} className="nav-link">Mission Reports</Link></a></li>

                            </ul>
                        </li>
                            

                        </ul>
                    </div>
                </nav>
                <br />
            </div>
            
    );
}
export default Navbar;