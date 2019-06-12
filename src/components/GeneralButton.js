import React from "react";
import "../styles/GeneralButton.css";

const GeneralButton = ({ className, text, link }) => {
  return (
    <a href={link} className={className}>
      {text}
    </a>
  );
};

export default GeneralButton;
