import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { shallow, configure} from "enzyme";
import DataGraph from "./DataGraph";
import { Provider } from 'react-redux'
import store from '../redux/store';

describe("Country Population component", () => {

    let wrapper;
    let testProps;
    beforeEach(() => {
        wrapper = shallow(<Provider store={store}><DataGraph/></Provider>);
    });

    it("CountryPopulation component renders correctly", () => {

        expect(wrapper).toMatchSnapshot();
    });



});