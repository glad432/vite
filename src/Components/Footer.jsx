import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentYear(new Date().getFullYear());
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <footer className="bg-black text-xs md:text-sm text-center text-white">
      <div className="pt-9 mb-9 flex justify-center space-x-9">
        <a
          href="https://gladw-in.github.io/"
          target="_blank"
          rel="noreferrer"
          className="text-neutral-200 hover:text-blue-700"
        >
          <FontAwesomeIcon icon={faGlobe} size="xl" />
        </a>
        <a
          href="https://www.linkedin.com/in/glad432/"
          target="_blank"
          rel="noreferrer"
          className="text-neutral-200 hover:text-blue-700"
        >
          <FontAwesomeIcon icon={faLinkedin} size="xl" />
        </a>
        <a
          href="https://github.com/gladw-in"
          target="_blank"
          rel="noreferrer"
          className="text-neutral-200 hover:text-blue-700"
        >
          <FontAwesomeIcon icon={faGithub} size="xl" />
        </a>
      </div>
      <div className="p-4 bg-neutral-700 text-neutral-200">
        &copy; GLAD432 <span className="text-neutral-400">{currentYear}</span>{" "}
        All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;
