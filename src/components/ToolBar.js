import React from "react";
import GenerateButton from "./GenerateButton";
import "../styles/ToolBar.css";

const ToolBar = ({ colors, onClick, onGenerate, selectedButton }) => {
  const toolBarColorButtons = colors.map(({ id, color }) => {
    return(
      <button className={selectedButton === id ? "toolBarColorButton selected" : "toolBarColorButton"} onClick={() => onClick(id)} />
    )
  })
  return (
    <div className="toolBar">
      {toolBarColorButtons}
      <GenerateButton onGenerate={onGenerate} />
    </div>
  );
};

export default ToolBar;
