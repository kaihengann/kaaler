import React from "react";
import "../styles/GenerateButton.css";
import { MetroSpinner } from "react-spinners-kit";

const GenerateButton = ({ onGenerate, isLoading }) => {
  return (
    <React.Fragment>
      {isLoading ? (
        <button className="generateButton" onClick={onGenerate}>
          <div className="spinner">
            <MetroSpinner
              size={20}
              color="#000000"
              loading={isLoading}
            />
          </div>
        </button>  
      ) : (
        <button className="generateButton" onClick={onGenerate}>
          KAALER!
        </button>
      )}
    </React.Fragment>
  );
};

export default GenerateButton;
