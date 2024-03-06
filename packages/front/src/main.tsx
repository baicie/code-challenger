import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import Editor from "@monaco-editor/react";

function App() {
  return (
    <Editor
      height="90vh"
      defaultLanguage="javascript"
      defaultValue="// some comment"
    />
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
