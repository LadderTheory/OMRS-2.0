import React, {useState} from 'react';
import {AboutFunctions} from './ComponentFunctions/AboutFunctions';


//About page component
function AboutPage (props) {

    const {renderedAboutText, setCreateMission, setAboutMissionReports, setAboutViewMission, 
        setAboutDataManagement, setAboutUserManagement, setAboutViewFeedback} = AboutFunctions()

    return(
        <div className="container">            
            <div className="card p-0 bg-dark align-items-center">
                <div class="container-fluid h-100">
                    <div class="row h-100">
                        <aside class="col-12 col-md-2 p-0 bg-dark" id="aboutAside">
                            <nav class="navbar navbar-expand navbar-dark bg-dark flex-md-column flex-row align-items-start">
                                <div class="collapse navbar-collapse">
                                    <ul class="flex-md-column flex-row navbar-nav w-100 justify-content-between navbar-dark">
                                    {/* Change <a> to links or buttons */}
                                        <li><button class="dm" href="#" onClick={setCreateMission}>Creating Missions</button></li>
                                        <li><button class="dm" href="#" onClick={setAboutViewMission}>Viewing Missions</button></li>
                                        <li><button class="dm" href="#" onClick={setAboutMissionReports}>Mission Reports</button></li>   
                                        <li><button class="dm" href="#" onClick={setAboutDataManagement}>Data Management</button></li>
                                        <li><button class="dm" href="#" onClick={setAboutUserManagement}>User Management</button></li>
                                        <li><button class="dm" href="#" onClick={setAboutViewFeedback}>View Feedback</button></li>                       
                                    </ul>
                                </div>
                            </nav>
                        </aside>
                        <main class="col">
                            <textarea className="form-control rounded-1" id="aboutTextArea" rows="15" placeholder="Please select an option from the side menu." value={renderedAboutText}></textarea>
                        </main>
                    </div>
                </div>
            </div>
        </div>          
    )  
}

export default AboutPage;