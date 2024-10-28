import React, { useState, useRef, useEffect, useCallback } from "react";
import Editor from "@monaco-editor/react";

const EditableEditor = ({ content, onContentChange, darkMode }) => {
  const [deviceType, setDeviceType] = useState("");
  const [linesCount, setLinesCount] = useState(0);
  const [kbCount, setKbCount] = useState(0);
  const editorRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setDeviceType(width > 1024 ? "pc" : width > 768 ? "tablet" : "mobile");
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fontSizeMap = {
    pc: 14,
    tablet: 14,
    mobile: 12,
  };

  const updateCounts = useCallback(() => {
    if (editorRef.current) {
      const lineCount = editorRef.current.getModel().getLineCount();
      setLinesCount(lineCount);
    }
    const kbSize = (content.length / 1024).toFixed(3);
    setKbCount(kbSize);
  }, [content]);

  useEffect(() => {
    updateCounts();
  }, [content, updateCounts]);

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
    updateCounts();
    editorRef.current.onDidChangeModelContent(updateCounts);
  };

  return (
    <div>
      <h2 className="relative text-2xl font-bold mt-8 mb-5 text-white bg-black rounded py-6 pl-[15px]">
        Original Code
      </h2>
      <div className="flex mb-2">
        <div className="text-left mr-1 font-bold px-4 py-2 bg-blue-500 rounded text-white">
          Lines: {linesCount}
        </div>
        <div className="text-left font-bold px-4 py-2 bg-blue-500 rounded text-white">
          {kbCount} Kb
        </div>
      </div>
      <Editor
        height="290px"
        width="auto"
        defaultLanguage="python"
        theme={darkMode ? "vs-dark" : "vs-light"}
        value={content}
        options={{
          minimap: { enabled: false },
          matchBrackets: "always",
          fontFamily: "Source Code Pro",
          renderValidationDecorations: "on",
          scrollbar: { vertical: "visible", horizontal: "visible" },
          fontWeight: "bold",
          formatOnPaste: true,
          semanticHighlighting: true,
          folding: deviceType !== "mobile",
          cursorBlinking: "smooth",
          cursorSmoothCaretAnimation: true,
          cursorStyle: "line",
          fontSize: fontSizeMap[deviceType],
        }}
        onMount={handleEditorDidMount}
        onChange={onContentChange}
      />
    </div>
  );
};

export default EditableEditor;
