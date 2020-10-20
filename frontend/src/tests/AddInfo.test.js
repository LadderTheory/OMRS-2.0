import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import {findByTestAttr} from  './testUtils';
import AddInfo from '../Components/AddInfo';

//Configure Enzyme adapter
Enzyme.configure({adapter: new EnzymeAdapter()});

/**
 * Factory function to create a ShallowWrapper for the Input Mission Component component
 * @function setup
 * @returns {ShallowWrapper}
 */
const setup = () =>{
    return shallow(<AddInfo/>)
}
test("component renders without error", ()=>
{
    const wrapper = setup();
    const AddInfoComponent = findByTestAttr(wrapper, "component-AddInfo");
    expect(AddInfoComponent.length).toBe(1);

});
test("All components in the form are initialized", () =>{
    const wrapper = setup();
    const squadron = findByTestAttr(wrapper, "squadron").text();
    const airframe = findByTestAttr(wrapper, "airframe").text();
    const locations = findByTestAttr(wrapper, "locations").text();

    expect(squadron).toBe("");
    expect(airframe).toBe("");
    expect(locations).toBe("");
});
