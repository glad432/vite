import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWhatsapp,
  faTelegramPlane,
  faFacebook,
  faXTwitter,
  faReddit,
} from "@fortawesome/free-brands-svg-icons";

const SOCIAL_LINKS = [
  {
    href: `whatsapp://send?text=${encodeURIComponent(
      "Check out this python minifier!! https://glad432.github.io/"
    )}`,
    icon: faWhatsapp,
    color: "text-green-500",
    title: "Share on WhatsApp",
  },
  {
    href: `https://telegram.me/share/url?url=${encodeURIComponent(
      "https://glad432.github.io/"
    )}&text=${encodeURIComponent("Check out this python minifier!!")}`,
    icon: faTelegramPlane,
    color: "text-blue-500",
    title: "Share on Telegram",
  },
  {
    href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      "https://glad432.github.io/"
    )}`,
    icon: faFacebook,
    color: "text-blue-700",
    title: "Share on Facebook",
  },
  {
    href: `https://x.com/intent/post?url=${encodeURIComponent(
      "https://glad432.github.io/"
    )}&text=${encodeURIComponent("Check out this python minifier!!")}`,
    icon: faXTwitter,
    color: "text-slate-600",
    title: "Share on X",
  },
  {
    href: `https://www.reddit.com/submit?url=${encodeURIComponent(
      "https://glad432.github.io/"
    )}&title=${encodeURIComponent("Check out this python minifier!!")}`,
    icon: faReddit,
    color: "text-red-500",
    title: "Share on Reddit",
  },
];

const SocialShare = () => (
  <div className="flex justify-center items-center pb-6">
    <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col md:flex-row md:items-center">
      <div className="mb-6 md:mb-0 md:mr-6">
        <p className="font-extrabold font-['Source_Code_Pro'] text-center tracking-wide uppercase">
          Share it on..
        </p>
      </div>
      <div className="flex flex-wrap justify-center">
        {SOCIAL_LINKS.map(({ href, icon, color, title }) => (
          <a
            key={title}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`icon-link mx-2 my-2 ${color}`}
            title={title}
          >
            <FontAwesomeIcon
              icon={icon}
              size="2x"
              className="transition-transform transform hover:-translate-y-2"
            />
          </a>
        ))}
      </div>
    </div>
  </div>
);

export default SocialShare;
