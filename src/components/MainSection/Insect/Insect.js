import React, { useState, useRef, useEffect } from "react";
import "./Insect.css";

const Insect = ({ type, onDrag, onEat, position }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isEaten, setIsEaten] = useState(false);
  const insectRef = useRef(null);

  const insectImages = {
    beetle: "/assets/beetle.svg",
    ant: "/assets/ant.svg",
    wasp: "/assets/wasp.svg",
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging && insectRef.current) {
        const insectRect = insectRef.current.getBoundingClientRect();
        const newX = e.clientX - insectRect.width / 2 + window.scrollX;
        const newY = e.clientY - insectRect.height / 2 + window.scrollY;

        onDrag({ x: newX, y: newY });
      }
    };

    const handleMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
        handleDragEnd();
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDragging, onDrag]);

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    const insectRect = insectRef.current.getBoundingClientRect();
    const owlRect = document.querySelector(".owl").getBoundingClientRect();

    const insectPosition = {
      x: insectRect.left + window.scrollX,
      y: insectRect.top + window.scrollY,
    };

    const owlMouthPosition = {
      x: owlRect.left + owlRect.width * 0.4,
      y: owlRect.top + owlRect.height * 0.6,
    };

    const distance = Math.sqrt(
      Math.pow(insectPosition.x - owlMouthPosition.x, 2) +
        Math.pow(insectPosition.y - owlMouthPosition.y, 2)
    );

    if (distance < 50) {
      handleEat();
    }
  };

  const handleEat = () => {
    setIsEaten(true);
    setTimeout(() => {
      onEat();
    }, 200);
  };

  return (
    <div
      ref={insectRef}
      className={`insect ${type} ${isEaten ? "eaten" : ""}`}
      onMouseDown={handleMouseDown}
      style={{
        position: "absolute",
        top: `${position.y}px`,
        left: `${position.x}px`,
        opacity: isEaten ? 0 : 1,
        width: "100px",
        height: "100px",
        zIndex: 500,
      }}
    >
      <img
        src={insectImages[type.toLowerCase()]}
        alt={type}
        className="insect-picture"
      />
    </div>
  );
};

export default Insect;
