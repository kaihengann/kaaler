import React from "react";
import GenerateButton from "./GenerateButton";
import "../styles/ToolBar.css";

const ToolBar = ({ colors, onClick, onGenerate, selectedButton }) => {
  console.log(selectedButton);
  
  const toolBarColorButtons = colors.map(({ id, colorHex, colorRgb }) => {
    return (
      <button
      className={
        selectedButton === id
        ? "toolBarColorButton selected"
        : "toolBarColorButton"
      }
      key={id}
      onClick={() => onClick(id, colorHex, colorRgb)}
      />
      );
    });
    console.log(selectedButton);
  return (
    <div className="toolBar">
      {toolBarColorButtons}
      <GenerateButton onGenerate={onGenerate} />
    </div>
  );
};

export default ToolBar;
