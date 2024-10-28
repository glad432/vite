import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";

const socialLinks = [
  {
    href: "https://gladw-in.github.io/",
    icon: faGlobe,
    label: "Personal Website",
  },
  {
    href: "https://www.linkedin.com/in/glad432/",
    icon: faLinkedin,
    label: "LinkedIn",
  },
  {
    href: "https://github.com/gladw-in",
    icon: faGithub,
    label: "GitHub",
  },
];

const currentYear = new Date().getFullYear();

const Footer = () => {
  return (
    <footer className="bg-black text-xs md:text-sm text-center text-white">
      <div className="pt-9 mb-9 flex justify-center space-x-9">
        {socialLinks.map(({ href, icon, label }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noreferrer"
            className="text-neutral-200 hover:text-blue-700"
            aria-label={label}
          >
            <FontAwesomeIcon icon={icon} size="xl" />
          </a>
        ))}
      </div>
      <div className="p-4 bg-neutral-700 text-neutral-200">
        &copy; GLAD432 <span className="text-neutral-400">{currentYear}</span>{" "}
        All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;
