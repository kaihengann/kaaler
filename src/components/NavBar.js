import React from "react";
import "../styles/NavBar.css";
import { textColor } from "../colorContrast";

const NavBar = ({ bgColor }) => {
  return (
    <div className="navBar">
      <a href="#0" style={textColor(bgColor)}>
        HOME
      </a>
      <a href="#0" style={textColor(bgColor)}>
        ABOUT
      </a>
      <a href="#0" style={textColor(bgColor)}>
        BLOG
      </a>
      <a href="#0" style={textColor(bgColor)}>
        WORK
      </a>
      <a href="#0" style={textColor(bgColor)}>
        CONTACT
      </a>
    </div>
  );
};

export default NavBar;
