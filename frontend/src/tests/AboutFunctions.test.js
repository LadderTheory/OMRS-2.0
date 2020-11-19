import {AboutFunctions} from '../Components/ComponentFunctions/AboutFunctions';
import {act, renderHook} from '@testing-library/react-hooks';
import AboutCreateMission from '../Components/AboutFiles/AboutCreateMission';
import AboutMissionReports from '../Components/AboutFiles/AboutMissionReports';
import AboutViewMission from '../Components/AboutFiles/AboutViewMission';
import AboutDataManagement from '../Components/AboutFiles/AboutDataManagement';
import AboutUserManagement from '../Components/AboutFiles/AboutUserManagement';
import AboutViewFeedback from '../Components/AboutFiles/AboutViewFeedback';


describe("setCreateMission", () => {
    it("sets the rendered about text to be about creating a mission", () => {
        const { result } = renderHook(AboutFunctions)

        act(() => {
            result.current.setCreateMission()
        })
        
        expect(result.current.renderedAboutText).toBe(AboutCreateMission)
    })
});
describe("setAboutMissionReports", () => {
    it("sets the rendered about text to be about MissionReports", () => {
        const { result } = renderHook(AboutFunctions)

        act(() => {
            result.current.setAboutMissionReports()
        })
        
        expect(result.current.renderedAboutText).toBe(AboutMissionReports)
    })
});
describe("setAboutViewMission", () => {
    it("sets the rendered about text to be about viewing a mission", () => {
        const { result } = renderHook(AboutFunctions)

        act(() => {
            result.current.setAboutViewMission()
        })
        
        expect(result.current.renderedAboutText).toBe(AboutViewMission)
    })
});
describe("setAboutDataManagement", () => {
    it("sets the rendered about text to be about using the Data management component", () => {
        const { result } = renderHook(AboutFunctions)

        act(() => {
            result.current.setAboutDataManagement()
        })
        
        expect(result.current.renderedAboutText).toBe(AboutDataManagement)
    })
});
describe("setAboutUserManagement", () => {
    it("sets the rendered about text to be about using the User management component", () => {
        const { result } = renderHook(AboutFunctions)

        act(() => {
            result.current.setAboutUserManagement()
        })
        
        expect(result.current.renderedAboutText).toBe(AboutUserManagement)
    })
});
describe("setAboutViewFeedback", () => {
    it("sets the rendered about text to be about using the Feedback component", () => {
        const { result } = renderHook(AboutFunctions)

        act(() => {
            result.current.setAboutViewFeedback()
        })
        
        expect(result.current.renderedAboutText).toBe(AboutViewFeedback)
    })
});