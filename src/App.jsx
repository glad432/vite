import React, { useState, useEffect } from "react";
import Header from "./Components/Header";
import TypewriterComponent from "./Components/Typewriter";
import EditableEditor from "./Components/EditableEditor";
import ReadonlyEditor from "./Components/ReadonlyEditor";
import Footer from "./Components/Footer";
import SocialShare from "./Components/SocialShare";
import Article from "./Components/Article";

const App = () => {
  const [content, setContent] = useState("");
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    const htmlTag = document.querySelector("html");
    htmlTag.classList.toggle("dark", darkMode);
    htmlTag.classList.toggle("light", !darkMode);
  }, [darkMode]);

  const handleContentChange = (value) => {
    setContent(value);
  };

  const toggleTheme = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <div>
      <div className="bg-gray-100 select-none font-sans transition-colors duration-200 ease-in-out enable-motion">
        <Header darkMode={darkMode} toggleTheme={toggleTheme} />
        <div className="mx-4 md:mx-auto md:max-w-2xl lg:max-w-4xl xl:max-w-6xl p-4 md:p-8 bg-white mt-8 mb-8 rounded-lg shadow transition-all duration-100 ease-in-out">
          <TypewriterComponent />
          <EditableEditor
            content={content}
            onContentChange={handleContentChange}
            darkMode={darkMode}
          />
          <ReadonlyEditor
            content={content}
            darkMode={darkMode}
            preserveGlobals={""}
            preserveLocals={""}
            hasContent={content.length > 1}
            options={[
              "combine_imports",
              "remove_pass",
              "remove_literal_statements",
              "remove_annotations",
              "hoist_literals",
              "rename_locals",
              "rename_globals",
              "convert_posargs_to_args",
              "preserve_shebang",
              "remove_asserts",
              "remove_debug",
              "remove_explicit_return_none",
            ]}
          />
        </div>
        <SocialShare />
        <Article />
        <Footer />
      </div>
    </div>
  );
};

export default App;
