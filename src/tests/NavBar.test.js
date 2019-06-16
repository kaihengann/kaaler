import React from "react";
import { render } from "@testing-library/react";
import "jest-dom/extend-expect";
import "@testing-library/react/cleanup-after-each";
import NavBar from "../components/NavBar";

test("renders 5 links with the right text", () => {
  const { getByText } = render(<NavBar bgColor="1,1,1" />);
  expect(getByText("HOME")).toBeInTheDocument();
  expect(getByText("ABOUT")).toBeInTheDocument();
  expect(getByText("BLOG")).toBeInTheDocument();
  expect(getByText("WORK")).toBeInTheDocument();
  expect(getByText("CONTACT")).toBeInTheDocument();
});
