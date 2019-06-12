import React from "react";
import "../styles/ColorPicker.css";

const ColorPicker = ({
  colorClickedHex,
  colorClickedRgb,
  isClicked,
  onClick
}) => {
  const paletteColorCodes = [
    "#E94A35",
    "#F59D00",
    "#F5E100",
    "#009755",
    "#083D7A",
    "#6EC4FD",
    "#7935E9",
    "#B58989",
    "#B7B7B7",
    "#D2B85C",
    "#745029",
    "#790000",
    "#F26D7D",
    "#6DF2B5",
    "#ffffff",
    "#000000"
  ];

  const paletteColors = paletteColorCodes.map(color => (
    <PaletteColor color={color} onClick={onClick} />
  ));

  return (
    <div className={isClicked ? "colorPicker visible" : "colorPicker hidden"}>
      <div className="palette">{paletteColors}</div>
      <label className="colorPickerText">Hex</label>
      <input
        type="text"
        name="hexInput"
        className="colorPickerInput"
        value={colorClickedHex}
      />
      <label className="colorPickerText">RGB</label>
      <input type="text" className="colorPickerInput" value={colorClickedRgb} />
    </div>
  );
};

export default ColorPicker;

const PaletteColor = ({ color, onClick }) => {
  return (
    <div
      className="paletteColor"
      style={{ background: color }}
      onClick={onClick}
    />
  );
};

//`background:${color}`
