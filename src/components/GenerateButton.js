import React from "react";
import "../styles/GenerateButton.css";
import { ClassicSpinner } from "react-spinners-kit";

const GenerateButton = ({ onGenerate, isLoading }) => {
  return (
    <React.Fragment>
      {isLoading ? (
        <button className="generateButton" onClick={onGenerate}>
          <div className="spinner">
            <ClassicSpinner
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
