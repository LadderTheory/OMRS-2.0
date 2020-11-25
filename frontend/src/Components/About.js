import React, {useState} from 'react';
import AboutCreateMission from './AboutFiles/AboutCreateMission'
import AboutMissionReports from './AboutFiles/AboutMissionReports';
import AboutViewMission from './AboutFiles/AboutViewMission';
import AboutDataManagement from './AboutFiles/AboutDataManagement';
import AboutUserManagement from './AboutFiles/AboutUserManagement';
import AboutViewFeedback from './AboutFiles/AboutViewFeedback';


//About page component
function AboutPage (props) {

//this const sets the rendered text which will appear in the text area.
const [renderedAboutText, setRenderedAboutText] = useState("");

//each of these functions changes which text is displayed in the Text Area
const setCreateMission = (e) => {
    setRenderedAboutText(AboutCreateMission);
};
const setAboutMissionReports = (e) => {
    setRenderedAboutText(AboutMissionReports);
};

const setAboutViewMission = (e) => {
    setRenderedAboutText(AboutViewMission);
};

const setAboutDataManagement = (e) => {
    setRenderedAboutText(AboutDataManagement);
};

const setAboutUserManagement = (e) => {
    setRenderedAboutText(AboutUserManagement);
};

const setAboutViewFeedback = (e) => {
    setRenderedAboutText(AboutViewFeedback);
}
    //this renders the components.
    // const {renderedAboutText, setCreateMission, setAboutMissionReports, setAboutViewMission, 
        // setAboutDataManagement, setAboutUserManagement, setAboutViewFeedback} = AboutFunctions()

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
                            {/* this area is where the text area is rendered that will display the selected text. The text itself is rendered in the "renderedAboutText" value, and there is a placeholder line to direct the user to select a file to read. */}
                            <textarea className="form-control rounded-1" id="aboutTextArea" rows="15" readOnly placeholder="Please select an option from the side menu." value={renderedAboutText}></textarea>
                        </main>
                    </div>
                </div>
            </div>
        </div>          
    )  
}
//this line exports the page.
export default AboutPage;