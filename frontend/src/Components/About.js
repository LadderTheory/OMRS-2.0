import React, {useState} from 'react';
import AboutCreateMission from './AboutFiles/AboutCreateMission'
import AboutMissionReports from './AboutFiles/AboutMissionReports';
import AboutViewMission from './AboutFiles/AboutViewMission';
import AboutDataManagement from './AboutFiles/AboutDataManagement';
import AboutUserManagement from './AboutFiles/AboutUserManagement';
import AboutViewFeedback from './AboutFiles/AboutViewFeedback';

//About page component
function About() {

//this const sets the rendered text which will appear in the text area.
const [renderedAboutText, setRenderedAboutText] = useState("");

//each of these functions changes which text is displayed in the Text Area
const setCreateMission = () => {
    setRenderedAboutText(AboutCreateMission);
    document.getElementById('aboutTextArea').scrollTop = 0
};
const setAboutMissionReports = () => {
    setRenderedAboutText(AboutMissionReports);
    document.getElementById('aboutTextArea').scrollTop = 0
};

const setAboutViewMission = () => {
    setRenderedAboutText(AboutViewMission);
    document.getElementById('aboutTextArea').scrollTop = 0
};

const setAboutDataManagement = () => {
    setRenderedAboutText(AboutDataManagement);
    document.getElementById('aboutTextArea').scrollTop = 0
};

const setAboutUserManagement = () => {
    setRenderedAboutText(AboutUserManagement);
    document.getElementById('aboutTextArea').scrollTop = 0
};

const setAboutViewFeedback = () => {
    setRenderedAboutText(AboutViewFeedback);
    document.getElementById('aboutTextArea').scrollTop = 0
}
 
    return(
        // this div creates the vertical navigation bar along the left side of the component, and houses the text area that will display the selected text file.
        <div className="container">            
            <div className="card p-0 bg-dark align-items-center">
                <div class="container-fluid h-100">
                    <div class="row h-100">
                        <aside class="col-12 col-md-2 p-0 bg-dark" id="aboutAside">
                            <nav class="navbar navbar-expand navbar-dark bg-dark flex-md-column flex-row align-items-start">
                                <div class="collapse navbar-collapse">
                                    <ul class="flex-md-column flex-row navbar-nav w-100 justify-content-between navbar-dark">
                                    {/* These are all the current items listed in the About page, and this list will, presumably, expand as more features are added in future updates. */}
                                        <li><button name="createMission" class="dm" href="#" onClick={setCreateMission}>Creating Missions</button></li>
                                        <li><button name="viewMission" class="dm" href="#" onClick={setAboutViewMission}>Viewing Missions</button></li>
                                        <li><button name="missionReports" class="dm" href="#" onClick={setAboutMissionReports}>Mission Reports</button></li>   
                                        <li><button name="dataManagement" class="dm" href="#" onClick={setAboutDataManagement}>Data Management</button></li>
                                        <li><button name="userManagement" class="dm" href="#" onClick={setAboutUserManagement}>User Management</button></li>
                                        <li><button name="viewFeedback" class="dm" href="#" onClick={setAboutViewFeedback}>View Feedback</button></li>                       
                                    </ul>
                                </div>
                            </nav>
                        </aside>
                        <main className="col">
                            {/* this area is where the text area is rendered that will display the selected text. The text itself is rendered in the "renderedAboutText" value, and there is a placeholder line to direct the user to select a file to read. */}
                            <textarea className="form-control rounded-1" id="aboutTextArea" rows="15" name='textarea-name' readOnly placeholder="Please select an option from the side menu." value={renderedAboutText}/>
                        </main>
                    </div>
                </div>
            </div>
        </div>          
    )  
}
//this line exports the page.
export default About;