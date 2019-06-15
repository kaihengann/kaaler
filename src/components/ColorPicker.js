import React from "react";
import "../styles/ColorPicker.css";

const ColorPicker = ({
  colors,
  onClick,
  isClicked,
  selectedButton,
  selectedColorHex,
  selectedColorRgb
}) => {
  const paletteColorButtons = colors.map(({ id, colorHex, colorRgb }) => {
    return (
      <button
        className={
          selectedButton === id
            ? "paletteColorButton selected"
            : "paletteColorButton"
        }
        key={id}
        style={{ background: colorHex }}
        onClick={() => onClick(id, colorHex, colorRgb)}
      />
    );
  });

  return (
    <div className={isClicked ? "colorPicker visible" : "colorPicker hidden"}>
      <div className="palette">{paletteColorButtons}</div>
      <div className="inputForm">
        <label className="colorPickerText">Hex</label>
        <input
          type="text"
          name="hexInput"
          className="colorPickerInput"
          value={selectedColorHex}
          readOnly
        />
        <label className="colorPickerText">RGB</label>
        <input
          type="text"
          name="rgbInput"
          className="colorPickerInput"
          value={selectedColorRgb}
          readOnly
        />
      </div>
    </div>
  );
};

export default ColorPicker;
