import React, { useState } from "react";
import Header from "./Components/Header";
import TypewriterComponent from "./Components/Typewriter";
import EditableEditor from "./Components/EditableEditor";
import ReadonlyEditor from "./Components/ReadonlyEditor";
import Footer from "./Components/Footer";
import SocialShare from "./Components/SocialShare";
import Article from "./Components/Article";
import useDarkMode from "./hooks/useDarkMode";
import { READONLY_EDITOR_OPTIONS } from "./constants";

const App = () => {
  const [content, setContent] = useState("");
  const [darkMode, toggleTheme] = useDarkMode();

  const handleContentChange = (value) => {
    setContent(value);
  };

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
      <div className="mx-4 md:mx-auto md:max-w-2xl lg:max-w-4xl xl:max-w-6xl p-4 md:p-8 bg-white mt-8 mb-8 rounded-lg shadow transition-all duration-100 ease-in-out">
        <TypewriterComponent />
        {renderEditors()}
      </div>
      <SocialShare />
      <Article />
      <Footer />
    </div>
  );
};

export default App;
