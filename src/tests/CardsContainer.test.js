import React from "react";
import "jest-dom/extend-expect";
import { render } from "@testing-library/react";
import "@testing-library/react/cleanup-after-each";
import CardsContainer from "../components/CardsContainer";

test("renders a header", () => {
  const { getByText } = render(<CardsContainer />);
  expect(getByText("WHAT WE OFFER")).toBeInTheDocument();
});

test("renders 6 cards", () => {
  const { getAllByText } = render(<CardsContainer />);
  const card1 = getAllByText(/Lorem ipsum/)[0];
  const card2 = getAllByText(/Lorem ipsum/)[1];
  const card3 = getAllByText(/Lorem ipsum/)[2];
  const card4 = getAllByText(/Lorem ipsum/)[3];
  const card5 = getAllByText(/Lorem ipsum/)[4];
  const card6 = getAllByText(/Lorem ipsum/)[5];
  expect(card1).toBeInTheDocument();
  expect(card2).toBeInTheDocument();
  expect(card3).toBeInTheDocument();
  expect(card4).toBeInTheDocument();
  expect(card5).toBeInTheDocument();
  expect(card6).toBeInTheDocument();
});
