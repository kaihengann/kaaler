import React from "react";
import Button from "./GeneralButton";
import "../styles/ShowCase.css";

const ShowCase = () => {
  return (
    <div className="showCase">
      <div className="showCaseText">
        <h1>HELPING OUR CLIENTS ACHIEVE SUCCESS</h1>
        <p>We make high-level design affordable for everyone</p>
        <div className="showCaseButtons">
          <Button className="button hiEmphasis" text="Get Started" link="#0" />
          <Button className="button midEmphasis" text="Contact Us" link="#0" />
        </div>
      </div>
    </div>
  );
};

export default ShowCase;
