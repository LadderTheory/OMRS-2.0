import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import {findByTestAttr} from  './testUtils';
import DeleteInfo from '../Components/DeleteInfo';

//Configure Enzyme adapter
Enzyme.configure({adapter: new EnzymeAdapter()});

/**
 * Factory function to create a ShallowWrapper for the Input Mission Component component
 * @function setup
 * @returns {ShallowWrapper}
 */
const setup = () =>{
    return shallow(<DeleteInfo/>)
}
test("component renders without error", ()=>
{
    const wrapper = setup();
    const DeleteInfoComponent = findByTestAttr(wrapper, "component-DeleteInfo");
    expect(DeleteInfoComponent.length).toBe(1);

});
test("All components in the form are initialized", () =>{
    const wrapper = setup();
    const squadron = findByTestAttr(wrapper, "squadron").text();
    const airframe = findByTestAttr(wrapper, "airframe").text();
    const location = findByTestAttr(wrapper, "location").text();

    expect(squadron).toBe("squadron");
    expect(airframe).toBe("airframe");
    expect(location).toBe("location");
});
