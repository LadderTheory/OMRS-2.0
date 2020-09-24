import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import {findByTestAttr} from  './testUtils';
import MissionReports from '../Components/MissionReports';

//Configure Enzyme adapter
Enzyme.configure({adapter: new EnzymeAdapter()});

/**
 * Factory function to create a ShallowWrapper for the Input Mission Component component
 * @function setup
 * @returns {ShallowWrapper}
 */
const setup = () =>{
    return shallow(<MissionReports/>)
}
test("component renders without error", ()=>
{
    const wrapper = setup();
    const MissionReportsComponent = findByTestAttr(wrapper, "component-MissionReports");
    expect(MissionReportsComponent.length).toBe(1);

});
test("All components in the form are initialized", () =>{
    const wrapper = setup();
    const squadron = findByTestAttr(wrapper, "squadron").text();
    const startDate = findByTestAttr(wrapper, "startDate").text();
    const endDate = findByTestAttr(wrapper, "endDate").text();

    expect(squadron).toBe("squadron");
    expect(startDate).toBe("");
    expect(endDate).toBe("");

});
