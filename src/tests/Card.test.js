import React from "react";
import "jest-dom/extend-expect";
import { render } from "@testing-library/react"
import "@testing-library/react/cleanup-after-each"
import Card from "../components/Card"

test('should render card with header and text', () => {
  const { getByText } = render(<Card header="hi" text="hello"/>)
  expect(getByText("hi")).toBeInTheDocument();
  expect(getByText("hello")).toBeInTheDocument();
  // How to test for icon?
});