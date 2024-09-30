import { useEffect, useState } from "react";

const useDarkMode = () => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    const htmlTag = document.querySelector("html");
    htmlTag.classList.toggle("dark", darkMode);
    htmlTag.classList.toggle("light", !darkMode);
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return [darkMode, toggleTheme];
};

export default useDarkMode;
