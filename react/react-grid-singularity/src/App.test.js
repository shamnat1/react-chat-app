import React from "react";
import { shallow, mount } from "enzyme";
import App from "./App";

import { render, screen } from '@testing-library/react';

it("renders without crashing", () => {
  const wrapper = shallow(<App />);
  console.log("wrap x c",wrapper)
  expect(wrapper).toMatchSnapshot()
});


test('renders heading in main page', () => {
  render(<App />);
  console.log("screen",screen)
  const linkElement = screen.getByText(/World Population Map & Graph/i);
  expect(linkElement).toBeInTheDocument();
});
