import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import {findByTestAttr} from  './testUtils';
import InputMission from '../Components/InputMission';

//Configure Enzyme adapter
Enzyme.configure({adapter: new EnzymeAdapter()});

/**
 * Factory function to create a ShallowWrapper for the Input Mission Component component
 * @function setup
 * @returns {ShallowWrapper}
 */
const setup = () =>{
    return shallow(<InputMission/>)
}

test("component renders without error", ()=>
{
    const wrapper = setup();
    const InputMissionComponent = findByTestAttr(wrapper, "component-InputMission");
    expect(InputMissionComponent.length).toBe(1);

});
test("All components in the form are initialized", () =>{
    const wrapper = setup();
    const msnDate = findByTestAttr(wrapper,"msnDate").text();
    const msnNumber = findByTestAttr(wrapper,"msnNumber").text();
    const callSign = findByTestAttr(wrapper,"callSign").text();
    const squadron = findByTestAttr(wrapper,"squadron").text();
    const airframe = findByTestAttr(wrapper,"airframe").text();
    const source =  findByTestAttr(wrapper,"source").text();
    const destination = findByTestAttr(wrapper,"destination").text();

    expect(msnDate).toBe("");
    expect(msnNumber).toBe("");
    expect(callSign).toBe("");
    expect(squadron).toBe("squadron");
    expect(airframe).toBe("airframe");
    expect(source).toBe("source");
    expect(destination).toBe("location");
});


