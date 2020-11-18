import React from 'react';
import App from './App';
import { shallow, mount } from 'enzyme';
import toJson from "enzyme-to-json";


describe("rendering components", () => {
  it("renders App component without crashing", () => {
    shallow(<App />);
  });
});