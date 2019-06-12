import React from "react";
import GenerateButton from "./GenerateButton";
import "../styles/ToolBar.css";

const Toolbar = ({ onClick, onGenerate }) => {
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

export default Toolbar;
