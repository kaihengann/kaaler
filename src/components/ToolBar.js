import React from "react";
import GenerateButton from "./GenerateButton";
import "../styles/ToolBar.css";

const ToolBar = ({
  colors,
  onClick,
  onGenerate,
  selectedButton,
  lockStatus,
  onLock,
  isLoading
}) => {
  const toolBarLockButtons = lockStatus.map(({ id, isLocked }) => {
    return (
      <button
        className={isLocked ? "lockButton locked" : "lockButton unlocked"}
        key={id}
        id={id}
        data-testid={`lockButton${id}`}
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
        data-testid={`toolBarColorButton${id}`}
        onClick={() => onClick(id, colorHex, colorRgb)}
      />
    );
  });
  return (
    <div className="toolBar">
      {toolBarColorButtons}
      <div className="locks">{toolBarLockButtons}</div>
      <GenerateButton onGenerate={onGenerate} isLoading={isLoading} />
    </div>
  );
};

export default ToolBar;
