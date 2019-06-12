import React from "react";
import GenerateButton from "./GenerateButton";
import "../styles/ToolBar.css";

const ToolBar = ({ onClick, onGenerate }) => {
  return (
    <div className="toolBar">
      <button className="colorButton" onClick={onClick} />
      <button className="colorButton" onClick={onClick} />
      <button className="colorButton" onClick={onClick} />
      <button className="colorButton" onClick={onClick} />
      <button className="colorButton" onClick={onClick} />
      <GenerateButton onGenerate={onGenerate} />
    </div>
  );
};

export default ToolBar;
// class paletteButton extends React.Component
// this.state = { isSelected: true, color: #000000}
// handleonClick => setState !isSelected 
// <button className={isSelected? "colorButton selected": "colorButton"} onClick={onClick} />

// Is separating PaletteColor and ToolBarColor a good idea? Yes because they need diff logic.

// ToolBarColor
//  -on click, gets highlighted(assigned selected class), make colorpalette visible, change selectedcolor

// PaletteColor
// -on click, gets highlighted(assigned selected class), change selectedcolor, change toolbar color

// How to change color of ToolBarColor from outside
// Modifying style attri of #app
// Change appStyle
// eg. appStyle[colorVar] = newColor

// After modifying appStyle, will render be updated?
// Maybe set onChange handler for Toolbar?
// Shift style att to Toolbar -> Tool