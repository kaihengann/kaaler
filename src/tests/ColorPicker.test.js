import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/react/cleanup-after-each";
import "jest-dom/extend-expect";
import ColorPicker from "../components/ColorPicker";
import { paletteColorsDefault } from "../defaultStates";

test("renders colorpicker with 16 colors", () => {
  const { getByTestId } = render(<ColorPicker colors={paletteColorsDefault} />);
  expect(getByTestId("colorpicker11")).toBeInTheDocument();
  expect(getByTestId("colorpicker12")).toBeInTheDocument();
  expect(getByTestId("colorpicker13")).toBeInTheDocument();
  expect(getByTestId("colorpicker14")).toBeInTheDocument();
  expect(getByTestId("colorpicker15")).toBeInTheDocument();
  expect(getByTestId("colorpicker16")).toBeInTheDocument();
  expect(getByTestId("colorpicker17")).toBeInTheDocument();
  expect(getByTestId("colorpicker18")).toBeInTheDocument();
  expect(getByTestId("colorpicker19")).toBeInTheDocument();
  expect(getByTestId("colorpicker20")).toBeInTheDocument();
  expect(getByTestId("colorpicker21")).toBeInTheDocument();
  expect(getByTestId("colorpicker22")).toBeInTheDocument();
  expect(getByTestId("colorpicker23")).toBeInTheDocument();
  expect(getByTestId("colorpicker24")).toBeInTheDocument();
  expect(getByTestId("colorpicker25")).toBeInTheDocument();
  expect(getByTestId("colorpicker26")).toBeInTheDocument();
});

test("renders input form with hex code", () => {
  const { getByLabelText } = render(
    <ColorPicker
      colors={paletteColorsDefault}
      selectedColorHex="#ffffff"
      selectedColorRgb="255, 255, 255"
    />
  );
  expect(getByLabelText("Hex")).toBeInTheDocument();
});

test("renders input form with rgb code", () => {
  const { getByLabelText } = render(
    <ColorPicker
      colors={paletteColorsDefault}
      selectedColorHex="#ffffff"
      selectedColorRgb="255, 255, 255"
    />
  );
  expect(getByLabelText("RGB")).toBeInTheDocument();
});
