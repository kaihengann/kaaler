import React from "react";
import "../styles/ShowCase.css";
import GeneralButton from "./GeneralButton"
import { textColor } from "../colorContrast";

const ShowCase = ({ bgColor, buttonColor }) => {
  return (
    <div className="showCase">
      <div className="showCaseText">
        <h1>HELPING OUR CLIENTS ACHIEVE SUCCESS</h1>
        <p>We make high-level design affordable for everyone</p>
        <div className="showCaseButtons">
          <GeneralButton className="button hiEmphasis" text="Get Started" link="#0" buttonStyle={textColor(buttonColor)}/>
          <GeneralButton className="button midEmphasis" text="Contact Us" link="#0" />
        </div>
      </div>
    </div>
  );
};

export default ShowCase;
