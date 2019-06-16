import React from "react";
import { render } from "@testing-library/react";
import "jest-dom/extend-expect";
import "@testing-library/react/cleanup-after-each";
import GenerateButton from "../components/GenerateButton";

test("renders a button with the right text", () => {
  const { getByText } = render(<GenerateButton />);
  expect(getByText("KAALER!")).toBeInTheDocument();
});
