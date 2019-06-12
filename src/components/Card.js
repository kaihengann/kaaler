import React from "react";
import "../styles/Card.css";

const Card = ({ className, iconId, header, text }) => {
  return (
    <div className={`card ${className}`}>
      <i id={iconId} className="icon" />
      <h3>{header}</h3>
      <p>{text}</p>
    </div>
  );
};

export default Card;
