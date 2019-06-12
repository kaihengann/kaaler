import React from "react";
import "../styles/Button.css";

const Button = ({ className, text, link }) => {
  return (
    <a href={link} className={className}>
      {text}
    </a>
  );
};

export default Button;
