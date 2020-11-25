import React from "react";
import AboutCreateMission from '../AboutFiles/AboutCreateMission';
import AboutMissionReports from '../AboutFiles/AboutMissionReports';
import AboutViewMission from '../AboutFiles/AboutViewMission';
import AboutDataManagement from '../AboutFiles/AboutDataManagement';
import AboutUserManagement from '../AboutFiles/AboutUserManagement';
import AboutViewFeedback from '../AboutFiles/AboutViewFeedback';

export const AboutFunctions = () => {
const {renderedAboutText, setRenderedAboutText} = React.useState("");

const setCreateMission = (e) => {
    console.log("it hit the aboutfunction")
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

return{renderedAboutText, setCreateMission, setAboutMissionReports, setAboutViewMission, 
    setAboutDataManagement, setAboutUserManagement, setAboutViewFeedback}
};