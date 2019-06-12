import React from "react";
import "../styles/GenerateButton.css";

const GenerateButton = ({ onGenerate }) => {
  return (
    <button className="generateButton" onClick={onGenerate}>
      KAALER!
    </button>
  );
};

export default GenerateButton;
