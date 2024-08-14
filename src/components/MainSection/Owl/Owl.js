import React from "react";
import "./Owl.css";

const Owl = ({ eyePosition }) => {
  const constrainedX = Math.max(-10, Math.min(10, eyePosition.x));
  const constrainedY = Math.max(-10, Math.min(10, eyePosition.y));

  const leftEyeStyle = {
    transform: `translate(${constrainedX}px, ${constrainedY}px)`,
    backgroundImage: "url(/assets/owl-eye.svg)",
    backgroundSize: "cover",
  };

  const rightEyeStyle = {
    transform: `translate(${constrainedX}px, ${constrainedY}px)`,
    backgroundImage: "url(/assets/owl-eye.svg)",
    backgroundSize: "cover",
  };

  return (
    <div className="owl">
      <div className="eye-container">
        <div className="eye left-eye" style={leftEyeStyle}></div>
        <div className="eye right-eye" style={rightEyeStyle}></div>
      </div>
    </div>
  );
};

export default Owl;
