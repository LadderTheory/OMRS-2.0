import React from "react";

function Navbar()
{
return(
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <a class="navbar-brand" >Demo</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse nabar-collapse" id="navbarText">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                    <a class="nav-link">Input Msn<span class="sr-only"></span></a>
                </li>
                <li class="nav-item">
                    <a class="nav-link">Misions</a>
                </li>
            </ul>
            
        </div>
    </nav>
    
);
}
export default Navbar;