import React from "react";
import "../styles/CardsContainer.css";
import Card from "./Card";
import CardsHeader from "./CardsHeader";

const CardsContainer = () => {
  return (
    <div className="cardsContainer">
      <CardsHeader className="cardsHeader" text="WHAT WE OFFER" />
      <Card
        className="card1"
        iconId="iconBranding"
        header="Branding"
        text="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit ducimus
          magni"
      />
      <Card
        className="card2"
        iconId="iconWebDesign"
        header="Web Design"
        text="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit ducimus
          magni"
      />
      <Card
        className="card3"
        iconId="iconUxUi"
        header="UX/UI"
        text="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit ducimus
          magni"
      />
      <Card
        className="card4"
        iconId="iconSEO"
        header="SEO"
        text="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit ducimus
          magni"
      />
      <Card
        className="card5"
        iconId="iconPhotography"
        header="Photography"
        text="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit ducimus
          magni"
      />
      <Card
        className="card6"
        iconId="iconMotion"
        header="Motion"
        text="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit ducimus
          magni"
      />
    </div>
  );
};

export default CardsContainer;
