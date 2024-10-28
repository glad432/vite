import React, { useEffect, useState } from "react";
import Header from "./Components/Header";
import TypewriterComponent from "./Components/Typewriter";
import EditableEditor from "./Components/EditableEditor";
import ReadonlyEditor from "./Components/ReadonlyEditor";
import Footer from "./Components/Footer";
import SocialShare from "./Components/SocialShare";
import Article from "./Components/Article";
import { READONLY_EDITOR_OPTIONS } from "./constants";

const App = () => {
  const [content, setContent] = useState("");
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode ? JSON.parse(savedMode) : false;
  });

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    const htmlTag = document.querySelector("html");

    if (htmlTag) {
      htmlTag.classList.toggle("dark", darkMode);
      htmlTag.classList.toggle("light", !darkMode);
    }

    return () => {
      if (htmlTag) {
        htmlTag.classList.remove("dark", "light");
      }
    };
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  const handleContentChange = (value) => setContent(value);

  const renderEditors = () => (
    <>
      <EditableEditor
        content={content}
        onContentChange={handleContentChange}
        darkMode={darkMode}
      />
      <ReadonlyEditor
        content={content}
        darkMode={darkMode}
        preserveGlobals=""
        preserveLocals=""
        hasContent={content.length > 1}
        options={READONLY_EDITOR_OPTIONS}
      />
    </>
  );

  return (
    <div className="bg-gray-100 select-none font-sans transition-colors duration-200 ease-in-out enable-motion">
      <Header darkMode={darkMode} toggleTheme={toggleTheme} />
      <main className="mx-4 md:mx-auto md:max-w-2xl lg:max-w-4xl xl:max-w-6xl p-4 md:p-8 bg-white mt-8 mb-8 rounded-lg shadow transition-all duration-100 ease-in-out">
        <TypewriterComponent />
        {renderEditors()}
      </main>
      <SocialShare />
      <Article />
      <Footer />
    </div>
  );
};

export default App;
