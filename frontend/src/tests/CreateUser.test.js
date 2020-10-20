import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import {findByTestAttr} from  './testUtils';
import CreateUser from '../Components/CreateUser';

//Configure Enzyme adapter
Enzyme.configure({adapter: new EnzymeAdapter()});

/**
 * Factory function to create a ShallowWrapper for the Input Mission Component component
 * @function setup
 * @returns {ShallowWrapper}
 */
const setup = () =>{
    return shallow(<CreateUser/>)
}
test("component renders without error", ()=>
{
    const wrapper = setup();
    const CreateUserComponent = findByTestAttr(wrapper, "component-CreateUser");
    expect(CreateUserComponent.length).toBe(1);

});
test("All components in the form are initialized", () =>{
    const wrapper = setup();
    const firstName = findByTestAttr(wrapper, "firstName").text();
    const lastName = findByTestAttr(wrapper, "lastName").text();
    const userName = findByTestAttr(wrapper, "userName").text();
    const password = findByTestAttr(wrapper, "password").text();

    expect(firstName).toBe("");
    expect(lastName).toBe("");
    expect(userName).toBe("");
    expect(password).toBe("");
});
