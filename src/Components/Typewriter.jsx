import React, { useEffect, useRef } from "react";
import Typewriter from "typewriter-effect/dist/core";

const FEATURES = [
  { text: "Efficiency", color: "#4CAF50" },
  { text: "Safety", color: "#2196F3" },
  { text: "Quick", color: "#FF9800" },
  { text: "Speed", color: "#673AB7" },
  { text: "Reliability", color: "#F44336" },
  { text: "Protection", color: "#009688" },
  { text: "Robust", color: "#C775C9" },
];

const TypewriterComponent = () => {
  const typewriterRef = useRef(null);

  useEffect(() => {
    const shuffledFeatures = [...FEATURES];
    shuffleArray(shuffledFeatures);

    const typewriter = new Typewriter(typewriterRef.current, {
      loop: true,
      delay: 50,
    });

    shuffledFeatures.forEach((feature) => {
      typewriter
        .pauseFor(1000)
        .deleteAll()
        .typeString(
          `<span style="color: ${feature.color}">${feature.text}</span>`
        )
        .pauseFor(1000);
    });

    typewriter.start();

    return () => typewriter.stop();
  }, []);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  return (
    <div className="rounded p-5 mb-5 border-2 text-center border-solid simp_border">
      <h1 className="mb-4 text-3xl font-extrabold text-white md:text-5xl lg:text-6xl">
        <span className="cursor-default text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-blue-400 to-blue-400">
          Python Minifier
        </span>
      </h1>
      <div className="mb-2 md:mb-4">
        <div className="mb-3 text-gray-700 text-[13px] lg:text-[15px] font-['Source_Code_Pro']">
          Optimizing Python minifier for{" "}
          <span ref={typewriterRef} className="font-bold"></span>
        </div>
      </div>
    </div>
  );
};

export default TypewriterComponent;
