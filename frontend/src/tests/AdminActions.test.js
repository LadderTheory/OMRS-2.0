import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import {findByTestAttr} from  './testUtils';
import AdminActions from '../Components/AdminActions';

//Configure Enzyme adapter
Enzyme.configure({adapter: new EnzymeAdapter()});

/**
 * Factory function to create a ShallowWrapper for the Input Mission Component component
 * @function setup
 * @returns {ShallowWrapper}
 */
const setup = () =>{
    return shallow(<AdminActions/>)
}
test("component renders without error", ()=>
{
    const wrapper = setup();
    const AdminActionsComponent = findByTestAttr(wrapper, "component-AdminActions");
    expect(AdminActionsComponent.length).toBe(1);

});

