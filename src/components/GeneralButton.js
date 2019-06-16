import React from "react";
import "../styles/GeneralButton.css";

const GeneralButton = ({ className, text, link, buttonStyle }) => {
  return (
    <a href={link} className={className} style={buttonStyle}>
      {text}
    </a>
  );
};

export default GeneralButton;
