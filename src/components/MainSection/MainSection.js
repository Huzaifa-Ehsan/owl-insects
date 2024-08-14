import React, { useState } from "react";
import "./MainSection.css";
import InsectSelection from "./InsectSelection/InsectSelection";
import Insect from "./Insect/Insect";
import Owl from "./Owl/Owl";

const MainSection = () => {
  const [insects, setInsects] = useState([]);
  const [eyePosition, setEyePosition] = useState({ x: 0, y: 0 });

  const handleSelectInsect = (type) => {
    const insectSize = 100;
    const selectionRect = document
      .querySelector(".select-insect")
      .getBoundingClientRect();
    const owlRect = document.querySelector(".owl").getBoundingClientRect();

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let newX, newY;
    let isOverlapping;

    do {
      newX = Math.random() * (viewportWidth - insectSize);
      newY = Math.random() * (viewportHeight - (insectSize + 50));

      isOverlapping =
        (newX < selectionRect.right &&
          newX + insectSize > selectionRect.left &&
          newY < selectionRect.bottom &&
          newY + insectSize > selectionRect.top) ||
        (newX < owlRect.right &&
          newX + insectSize > owlRect.left &&
          newY < owlRect.bottom &&
          newY + insectSize > owlRect.top);
    } while (isOverlapping);

    const newInsect = {
      id: Date.now(),
      type,
      x: newX,
      y: newY,
    };

    setInsects([...insects, newInsect]);
  };

  const handleDrag = (insectId, position) => {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const insectSize = 100; 

    const clampedX = Math.max(
      0,
      Math.min(position.x, windowWidth - insectSize)
    );
    const clampedY = Math.max(
      0,
      Math.min(position.y, windowHeight - (insectSize + 50))
    );

    setInsects((prevInsects) =>
      prevInsects.map((insect) =>
        insect.id === insectId
          ? { ...insect, x: clampedX, y: clampedY }
          : insect
      )
    );

    setEyePosition({
      x: (clampedX / windowWidth) * 100 - 50,
      y: (clampedY / windowHeight) * 100 - 50,
    });
  };

  const handleEatInsect = (id) => {
    setInsects(insects.filter((insect) => insect.id !== id));
  };

  return (
    <div className="main-section">
      <img src="/assets/bg-grass.svg" alt="" className="background" />
      <div className="select-insect">
        <InsectSelection onSelectInsect={handleSelectInsect} />
      </div>
      <Owl eyePosition={eyePosition} />
      {insects.map((insect) => (
        <Insect
          key={insect.id}
          type={insect.type}
          onDrag={(position) => handleDrag(insect.id, position)}
          onEat={() => handleEatInsect(insect.id)}
          position={{ x: insect.x, y: insect.y }}
        />
      ))}
      <div className="button-select">
        <button className="button">
          <img src="/assets/left-hand.svg" alt="left" className="button-img" />
          <span>Back</span>
        </button>
        <button className="button">
          <img src="/assets/right-hand.svg" alt="left" className="button-img" />
          <span>Right</span>
        </button>
      </div>
    </div>
  );
};

export default MainSection;
