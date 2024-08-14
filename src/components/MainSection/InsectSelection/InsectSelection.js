import React from "react";
import "./InsectSelection.css";

const InsectSelection = ({ onSelectInsect }) => {
  const insects = [
    { name: "Beetle", img: "/assets/beetle.svg" },
    { name: "Ant", img: "/assets/ant.svg" },
    { name: "Wasp", img: "/assets/wasp.svg" },
  ];

  return (
    <div className="insect-selection">
      {insects.map((insect) => (
        <button
          key={insect.name}
          onClick={() => onSelectInsect(insect.name)}
          className="insect-button"
        >
          <img src={insect.img} alt={insect.name} className="insect-image" />
          <span>{insect.name}</span>
        </button>
      ))}
    </div>
  );
};

export default InsectSelection;
