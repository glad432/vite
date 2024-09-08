import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretUp,
  faCaretDown,
  faDiamond,
  faSquare,
  faCircleQuestion,
} from "@fortawesome/free-solid-svg-icons";
import { faPython } from "@fortawesome/free-brands-svg-icons";
import blogJson from "../Article/blog.json";

const Article = () => {
  const [articleData, setArticleData] = useState(null);
  const [isContentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    setArticleData(blogJson.article);
  }, []);

  const toggleContent = () => {
    setContentVisible((prev) => !prev);
  };

  const renderContent = () => {
    if (!articleData) return null;

    let content = (
      <div id="display-content" className="overflow-y-auto max-h-[100%]">
        <h1 className="sm:text-xl lg:text-3xl text-gray-600 text-left font-bold mb-4">
          <FontAwesomeIcon icon={faPython} className="text-blue-500 pr-2" />
          {articleData.title}
        </h1>
      </div>
    );

    articleData.sections.forEach((section) => {
      if (section.section_title !== "FAQs") {
        content = (
          <>
            {content}
            <div className="mb-4">
              <h2 className="text-[15px] text-gray-500 lg:text-xl font-bold py-4">
                <FontAwesomeIcon
                  icon={faDiamond}
                  className="text-cyan-900 pr-2"
                />
                {section.section_title}
              </h2>
              {section.section_content && (
                <p className="text-[13px] lg:text-[15px]">
                  {section.section_content}
                </p>
              )}
              {section.sub_sections && section.sub_sections.length > 0 && (
                <div className="ml-4 mb-2">
                  {section.sub_sections.map((subsection, index) => (
                    <div key={index}>
                      <h4 className="text-[14px] text-gray-500 lg:text-lg font-bold py-2">
                        <FontAwesomeIcon
                          icon={faSquare}
                          className="text-cyan-900 pr-2"
                        />
                        {subsection.subsubsection_title}
                      </h4>
                      <p className="text-[13px] lg:text-[15px]">
                        {subsection.subsubsection_content}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        );
      }
    });

    const faqSection = articleData.sections.find(
      (section) => section.section_title === "FAQs"
    );

    if (faqSection) {
      const faqPairs = faqSection.section_content.split("\n\n");
      content = (
        <>
          {content}
          <h2 className="text-[15px] text-gray-500 lg:text-xl font-bold py-4">
            <FontAwesomeIcon
              icon={faCircleQuestion}
              className="text-blue-700 pr-2"
            />
            FAQs
          </h2>
          <ul className="list-none list-inside">
            {faqPairs.map((pair, index) => {
              const [question, answer] = pair.split("\nA:");
              return (
                <li key={index} className="text-[13px] lg:text-[15px]">
                  <strong>{question}</strong>
                  <br />
                  A: {answer}
                </li>
              );
            })}
          </ul>
        </>
      );
    }

    return content;
  };

  return (
    <div className="grid place-items-center pb-[25px]">
      <span
        id="show-btn"
        className="relative cursor-pointer text-center text-white bg-gray-700 hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5"
        onClick={toggleContent}
      >
        Learn More{" "}
        <FontAwesomeIcon icon={isContentVisible ? faCaretUp : faCaretDown} />
      </span>

      <div
        id="article"
        className={`font-['Source_Code_Pro'] select-text mx-4 md:mx-auto md:max-w-2xl lg:max-w-4xl xl:max-w-6xl p-4 md:p-8 mt-8 mb-8 transition-all duration-100 ease-in-out ${
          isContentVisible ? "" : "hidden"
        }`}
      >
        {renderContent()}
      </div>
    </div>
  );
};

export default Article;
