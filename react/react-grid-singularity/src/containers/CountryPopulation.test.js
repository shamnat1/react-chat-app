import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { shallow, configure} from "enzyme";
import CountryPopulation from "./CountryPopulation";
import { Provider } from 'react-redux'
import store from '../redux/store';

describe("Country Population component", () => {

    let wrapper;
    let testProps;
    beforeEach(() => {
        wrapper = shallow(<Provider store={store}><CountryPopulation/></Provider>);
    });

    afterEach(() => {
        // wrapper.remove();
    })

    it("CountryPopulation component renders correctly", () => {

        expect(wrapper).toMatchSnapshot();
    });



});
/*

let container = null;
let testProps;
beforeEach(() => {
    testProps = {
        match :{
            params :{
                id:"356b03dc-9ec5-11e7-97a6-d501104f897e"
            }
        }
    };
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

it("renders Agent data", async () => {
    const fakeAgent = [{"identifier":"f53b3e0e-6a21-11eb-9439-0242ac130002","agentIdentifier":"356b03dc-9ec5-11e7-97a6-d501104f897e","number":"+49151484522","dateTime":"2020-10-05T14:48:00.000Z","duration":"230","resolution":"need reschedule"}];
    jest.spyOn(global, "fetch").mockImplementation(() =>
        Promise.resolve({
            json: () => Promise.resolve(fakeAgent)
        })
    );

    await act(async () => {
        render(<Agent {...testProps}/>, container);
    });

    expect(container.querySelector("h1").textContent).toBe(" Agent Logs ");

    expect(container.querySelector("tr td:first-child").textContent.trim()).toBe(fakeAgent[0].number);
    expect(container.querySelector("tr td:first-child+td+td").textContent.trim()).toBe(fakeAgent[0].resolution);


    // remove the mock to ensure tests are completely isolated
    global.fetch.mockRestore();
});
*/
