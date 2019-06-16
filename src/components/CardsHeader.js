import React from "react";
import "../styles/CardsHeader.css";

const CardsHeader = ({ text, className }) => {
  return (
    <h2 className={className}>
      {text}
    </h2>
  );
};

export default CardsHeader;
