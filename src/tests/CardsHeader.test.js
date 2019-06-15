import React from "react";
import { render } from "@testing-library/react";
import "jest-dom/extend-expect";
import "@testing-library/react/cleanup-after-each";
import CardsHeader from "../components/CardsHeader";
import Card from "../components/Card";

test("renders a header", () => {
  const { getByText } = render(<CardsHeader text="hi" />);
  expect(getByText("hi")).toBeInTheDocument();
});
