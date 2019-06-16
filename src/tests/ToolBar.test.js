import React from "react";
import { render } from "@testing-library/react";
import "jest-dom/extend-expect";
import "@testing-library/react/cleanup-after-each";
import ToolBar from "../components/ToolBar";
import { toolBarColorsDefault, lockStatusDefault } from "../defaultStates";

test("renders 5 color buttons", () => {
  const { getByTestId } = render(
    <ToolBar colors={toolBarColorsDefault} lockStatus={lockStatusDefault} />
  );
  expect(getByTestId("toolBarColorButton0")).toBeInTheDocument();
  expect(getByTestId("toolBarColorButton1")).toBeInTheDocument();
  expect(getByTestId("toolBarColorButton2")).toBeInTheDocument();
  expect(getByTestId("toolBarColorButton3")).toBeInTheDocument();
  expect(getByTestId("toolBarColorButton4")).toBeInTheDocument();
});

test("renders 5 lock buttons", () => {
  const { getByTestId } = render(
    <ToolBar colors={toolBarColorsDefault} lockStatus={lockStatusDefault} />
  );
  expect(getByTestId("lockButton0")).toBeInTheDocument();
  expect(getByTestId("lockButton1")).toBeInTheDocument();
  expect(getByTestId("lockButton2")).toBeInTheDocument();
  expect(getByTestId("lockButton3")).toBeInTheDocument();
  expect(getByTestId("lockButton4")).toBeInTheDocument();
});

test("renders 1 generate button", () => {
  const { getByText } = render(
    <ToolBar colors={toolBarColorsDefault} lockStatus={lockStatusDefault} />
  );
  expect(getByText("KAALER!")).toBeInTheDocument();
});
