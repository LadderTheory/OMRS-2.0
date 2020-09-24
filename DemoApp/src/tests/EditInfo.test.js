import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import {findByTestAttr} from  './testUtils';
import EditInfo from '../Components/EditInfo';

//Configure Enzyme adapter
Enzyme.configure({adapter: new EnzymeAdapter()});

/**
 * Factory function to create a ShallowWrapper for the Input Mission Component component
 * @function setup
 * @returns {ShallowWrapper}
 */
const setup = () =>{
    return shallow(<EditInfo/>)
}
test("component renders without error", ()=>
{
    const wrapper = setup();
    const EditInfoComponent = findByTestAttr(wrapper, "component-EditInfo");
    expect(EditInfoComponent.length).toBe(1);

});
test("All components in the form are initialized", () =>{
    const wrapper = setup();
    const currentSquadron = findByTestAttr(wrapper, "currentSquadron").text();
    const currentAirframe = findByTestAttr(wrapper,"currentAirframe").text();
    const currentLocation = findByTestAttr(wrapper,"currentLocation").text();
    const newSquadron = findByTestAttr(wrapper, "newSquadron").text();
    const newAirframe = findByTestAttr(wrapper,"newAirframe").text();
    const newLocation = findByTestAttr(wrapper, "newLocation").text();

    expect(currentSquadron).toBe("squadron");
    expect(currentAirframe).toBe("airframe");
    expect(currentLocation).toBe("location");
    expect(newSquadron).toBe("");
    expect(newAirframe).toBe("");
    expect(newLocation).toBe("");
    
  
});
