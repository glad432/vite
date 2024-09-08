import React, { useState, useRef, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDownLeftAndUpRightToCenter,
  faArrowUpRightFromSquare,
  faClipboardList,
  faDownload,
} from "@fortawesome/free-solid-svg-icons";

const ReadonlyEditor = ({ content, darkMode, hasContent }) => {
  const [linesCount, setLinesCount] = useState(0);
  const [kbCount, setKbCount] = useState(0);
  const [minifiedCode, setMinifiedCode] = useState("");
  const [error, setError] = useState("");
  const [preserveGlobals, setPreserveGlobals] = useState("");
  const [preserveLocals, setPreserveLocals] = useState("");
  const [contentHeight, setContentHeight] = useState(null);
  const editorRef = useRef(null);
  const [deviceType, setDeviceType] = useState("");
  const [copied, setCopied] = useState(false);
  const [isMinifying, setIsMinifying] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width > 1024) {
        setDeviceType("pc");
      } else if (width <= 1024 && width > 768) {
        setDeviceType("tablet");
      } else {
        setDeviceType("mobile");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [content]);

  const fontSizeMap = {
    pc: 14,
    tablet: 14,
    mobile: 12,
  };

  const options = [
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
  ];
  const toggleContent = () => {
    setContentHeight(
      contentHeight
        ? null
        : `${document.querySelector(".content-ll").scrollHeight}px`
    );
  };
  const transformOption = (option) => {
    let words = option.split("_");
    let transformed = words
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");

    return transformed;
  };
  const createOptionsCheckboxes = () => {
    return options.map((option) => (
      <label
        key={option}
        htmlFor={option}
        className="flex items-center mb-5 cursor-pointer pl-2"
      >
        <input type="checkbox" id={option} className="sr-only peer" />
        <div className="absolute w-9 h-5 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-green-600"></div>
        <span className="cursor-pointer ml-2 text-neutral-500 text-lg font-medium pl-10">
          {transformOption(option)}
        </span>
      </label>
    ));
  };

  const checkAll = () => {
    options.forEach((option) => {
      document.getElementById(option).checked = true;
    });
  };

  const resetOptions = () => {
    options.forEach((option) => {
      document.getElementById(option).checked = false;
    });
    document.getElementById("preserveLocals").value = "";
    document.getElementById("preserveGlobals").value = "";
  };

  const buildQuery = () => {
    var query = options
      .map((option) => {
        var checkbox = document.getElementById(option);
        if (checkbox && checkbox.checked) {
          return `${option}=true`;
        } else {
          return `${option}=false`;
        }
      })
      .join("&");
    const preserveGlobalsInput = document.getElementById("preserveGlobals");
    const preserveGlobals = preserveGlobalsInput
      ? preserveGlobalsInput.value.split(",").map((str) => str.trim())
      : [];
    if (preserveGlobals.length > 0) {
      query += `&preserve_globals=${encodeURIComponent(
        JSON.stringify(preserveGlobals)
      )}`;
    }
    const preserveLocalsInput = document.getElementById("preserveLocals");
    const preserveLocals = preserveLocalsInput
      ? preserveLocalsInput.value.split(",").map((str) => str.trim())
      : [];
    if (preserveLocals.length > 0) {
      query += `&preserve_locals=${encodeURIComponent(
        JSON.stringify(preserveLocals)
      )}`;
    }
    return query;
  };

  const updateLinesCount = () => {
    if (editorRef.current) {
      const lineCount = editorRef.current.getModel().getLineCount();
      setLinesCount(lineCount);
    }
  };

  const updateKbCount = () => {
    const contentLength = editorRef.current.getModel().getValue().length;
    const kbSize = (contentLength / 1024).toFixed(3);
    setKbCount(kbSize);
  };

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
    updateLinesCount();
    updateKbCount();
    editorRef.current.onDidChangeModelContent(() => {
      updateLinesCount();
      updateKbCount();
    });
  };

  const minifyCode = async () => {
    if (hasContent && !isMinifying) {
      setIsMinifying(true);
      setError("");
      try {
        const response = await fetch(
          `https://python-minifier-flask.vercel.app/minify?${buildQuery()}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "text/plain",
            },
            body: content,
          }
        );
        const data = await response.json();
        if (data.error) {
          setError(data.error);
        } else {
          setMinifiedCode(data.minified_code);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setIsMinifying(false);
      }
    }
  };
  const DownloadPythonFile = () => {
    var dwcontent = minifiedCode;
    if (dwcontent.length !== 0) {
      var blob = new Blob([dwcontent], {
        type: "text/x-python",
      });
      var dataUri = URL.createObjectURL(blob);
      var downloadLink = document.createElement("a");
      downloadLink.href = dataUri;
      downloadLink.download = "default.py".trim();
      downloadLink.click();
      URL.revokeObjectURL(dataUri);
    }
  };

  const handleCopyContent = async () => {
    if (editorRef.current.getModel().getValue() !== "") {
      await navigator.clipboard.writeText(editorRef.current.getValue());
      const lastLineNumber = editorRef.current.getModel().getLineCount();
      editorRef.current.revealLine(lastLineNumber);
      editorRef.current.setSelection({
        startLineNumber: 1,
        startColumn: 1,
        endLineNumber: lastLineNumber,
        endColumn: editorRef.current
          .getModel()
          .getLineMaxColumn(lastLineNumber),
      });
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const handleDownload = () => {
    DownloadPythonFile();
  };

  return (
    <div>
      <div className="text-left w-[500px] my-10 p-4 rounded border-t-[5px] border-solid border-blue-500 blue_big_box md:mx-auto md:p-8">
        <p
          id="toggleContent1"
          className="cursor-pointer underline underline-offset-3 decoration-8 decoration-blue-600 mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl"
          onClick={toggleContent}
        >
          Options:
        </p>
        <div
          className="relative overflow-hidden content-ll [transition:max-height_0.6s_ease-in-out] pt-4"
          style={{ maxHeight: contentHeight }}
        >
          <div id="optionsContainer">{createOptionsCheckboxes()}</div>
          <div className="relative mb-3">
            <input
              type="text"
              id="preserveLocals"
              className="block rounded-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              spellCheck="false"
              value={preserveLocals}
              onChange={(e) => setPreserveLocals(e.target.value)}
            />
            <label
              htmlFor="preserveLocals"
              className="absolute cursor-text font-bold text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
            >
              Preserved Locals:
            </label>
          </div>
          <div className="relative mb-2">
            <input
              type="text"
              id="preserveGlobals"
              className="block rounded-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              spellCheck="false"
              value={preserveGlobals}
              onChange={(e) => setPreserveGlobals(e.target.value)}
            />
            <label
              htmlFor="preserveGlobals"
              className="absolute cursor-text font-bold text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
            >
              Preserved Globals:
            </label>
          </div>
          <p className="text-sm mb-2 text-neutral-500">
            <span className="text-red-500 font-bold">*</span> Delimiter is comma
          </p>
          <a
            className="text-blue-500 text-base hover:underline hover:text-blue-600"
            href="https://dflook.github.io/python-minifier/transforms"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn More
            <FontAwesomeIcon
              icon={faArrowUpRightFromSquare}
              size="sm"
              className="ml-1"
            />
          </a>

          <div className="  mt-4 space-x-2 text-center">
            <button
              onClick={checkAll}
              id="selectall"
              className="text-2xl font-bold bg-green-500 text-white py-1 px-2 rounded hover:bg-green-600 ease-out overflow-hidden transform md:hover:scale-x-105 md:hover:scale-y-100"
            >
              Select All
            </button>
            <button
              onClick={resetOptions}
              id="Unselectall"
              className="text-2xl font-bold bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600 ease-out overflow-hidden transform md:hover:scale-x-105 md:hover:scale-y-100"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
      <div className="  mt-10 mb-2 md:mb-4 text-center">
        <span
          id="minify"
          className="relative rounded cursor-pointer pt-5 p-4 overflow-hidden group bg-blue-500 hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-blue-400 transition-all ease-out duration-300"
          onClick={minifyCode}
        >
          <span className="absolute right-0 w-8 h-40 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
          <span className="relative font-bold text-2xl">
            Minify{" "}
            <FontAwesomeIcon icon={faDownLeftAndUpRightToCenter} size="sm" />
          </span>
        </span>
      </div>
      <h2 className="  relative text-2xl font-bold mt-8 mb-5 text-white bg-black block rounded py-6 pl-[15px] red_black_head">
        Minified Code
      </h2>
      {error ? (
        <div className="  text-left mb-2 font-bold px-4 py-2 bg-red-500 rounded text-white max-w-[fit-content]">
          Error: {error}
        </div>
      ) : (
        <div className="flex">
          <div className="  text-left mr-1 mb-2 font-bold px-4 py-2 bg-red-500 rounded text-white max-w-[fit-content]">
            Lines: {linesCount}
          </div>
          <div className="  text-left mb-2 font-bold px-4 py-2 bg-red-500 rounded text-white max-w-[fit-content]">
            {kbCount} Kb
          </div>
        </div>
      )}
      <Editor
        height="290px"
        width="auto"
        defaultLanguage="python"
        theme={darkMode ? "vs-dark" : "vs-light"}
        defaultValue=""
        value={minifiedCode}
        options={{
          minimap: { enabled: false },
          matchBrackets: "always",
          fontFamily: "Source Code Pro",
          renderValidationDecorations: "on",
          scrollbar: { vertical: "visible", horizontal: "visible" },
          fontWeight: "bold",
          readOnly: true,
          formatOnPaste: true,
          semanticHighlighting: true,
          folding: !deviceType.includes("mobile"),
          cursorBlinking: "smooth",
          cursorSmoothCaretAnimation: true,
          cursorStyle: "line",
          fontSize: fontSizeMap[deviceType],
        }}
        onMount={handleEditorDidMount}
      />
      <div className="mb-2 md:mb-4  ">
        <button
          className="px-4 py-2 mt-2 font-bold cursor-pointer bg-red-500 rounded text-white hover:bg-red-600 ease-out overflow-hidden transform md:hover:scale-x-105 md:hover:scale-y-100 mr-1"
          onClick={handleDownload}
          id="dw"
        >
          Download <FontAwesomeIcon icon={faDownload} />
        </button>
        <button
          className="px-4 py-2 mt-2 font-bold cursor-pointer bg-green-500 rounded text-white hover:bg-green-600 ease-out overflow-hidden transform md:hover:scale-x-105 md:hover:scale-y-100"
          onClick={handleCopyContent}
          id="copy"
        >
          {copied ? "Copied" : "Copy"}{" "}
          <FontAwesomeIcon icon={faClipboardList} />
        </button>
      </div>
    </div>
  );
};

export default ReadonlyEditor;
