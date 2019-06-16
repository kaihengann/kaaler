import React from "react";
import "jest-dom/extend-expect";
import { render } from "@testing-library/react";
import "@testing-library/react/cleanup-after-each";
import ShowCase from "../components/ShowCase";

test("renders h1 element", () => {
  const { getByText } = render(<ShowCase buttonColor="1,1,1" />);
  expect(getByText("HELPING OUR CLIENTS ACHIEVE SUCCESS")).toBeInTheDocument();
});

test("renders p element", () => {
  const { getByText } = render(<ShowCase buttonColor="1,1,1" />);
  expect(
    getByText("We make high-level design affordable for everyone")
  ).toBeInTheDocument();
});

test("renders 2 buttons with the right text", () => {
  const { getByText } = render(<ShowCase buttonColor="1,1,1" />);
  expect(getByText("Get Started")).toBeInTheDocument();
  expect(getByText("Contact Us")).toBeInTheDocument();
});
