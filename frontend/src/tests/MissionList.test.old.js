import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import {findByTestAttr} from  './testUtils';
import MissionList from '../Components/MissionList';

//Configure Enzyme adapter
Enzyme.configure({adapter: new EnzymeAdapter()});

/**
 * Factory function to create a ShallowWrapper for the Input Mission Component component
 * @function setup
 * @returns {ShallowWrapper}
 */
const setup = () =>{
    return shallow(<MissionList/>)
}
test("component renders without error", ()=>
{
    const wrapper = setup();
    const MissionListComponent = findByTestAttr(wrapper, "component-MissionList");
    expect(MissionListComponent.length).toBe(1);

});
test("All components in the form are initialized", () =>{
    const wrapper = setup();
});
