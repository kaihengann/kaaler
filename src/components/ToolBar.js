import React from "react";
import GenerateButton from "./GenerateButton";
import "../styles/ToolBar.css";

const ToolBar = ({
  colors,
  onClick,
  onGenerate,
  selectedButton,
  lockStatus,
  onLock
}) => {
  
  const toolBarLockButtons = lockStatus.map(({ id, isLocked }) => {
    console.log(isLocked);
    return (
      <button
        className={isLocked ? "lockButton locked" : "lockButton unlocked"}
        key={id}
        id={id}
        onClick={() => onLock(id, isLocked)}
      />
    );
  });

  const toolBarColorButtons = colors.map(({ id, colorHex, colorRgb }) => {
    return (
      <button
        className={
          selectedButton === id
            ? "toolBarColorButton selected"
            : "toolBarColorButton"
        }
        key={id}
        id={id}
        onClick={() => onClick(id, colorHex, colorRgb)}
      />
    );
  });
  return (
    <div className="toolBar">
      {toolBarColorButtons}
      <div className="locks">
        {toolBarLockButtons} 
      </div>
      <GenerateButton onGenerate={onGenerate} />
    </div>
  );
};

export default ToolBar;
