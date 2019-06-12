import React from "react";
import "../styles/ColorPicker.css";

const ColorPicker = ({ colorClickedHex, colorClickedRgb, isClicked }) => {
  return (
    <div className={isClicked ? "colorPicker visible" : "colorPicker hidden"}>
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
