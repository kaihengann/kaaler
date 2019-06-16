import React from "react";
import { render } from "@testing-library/react";
import "jest-dom/extend-expect";
import "@testing-library/react/cleanup-after-each";
import GeneralButton from "../components/GeneralButton"

test('renders a button with the right text', () => {
  const { getByText } = render(<GeneralButton text='hello' />);
  expect(getByText("hello")).toBeInTheDocument();
});