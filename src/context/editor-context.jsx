import { createContext, useState } from "react";

// Create the context
export const EditorContext = createContext();

// Provide the context
export const EditorProvider = ({ children }) => {
  const [blog, setBlog] = useState({
    banner: "",
    title: "",
    tags: [],
    des: "",
    content: "",
  });

  const [editorState, setEditorState] = useState("editor"); // Default state

  return (
    <EditorContext.Provider
      value={{ blog, setBlog, editorState, setEditorState }}
    >
      {children}
    </EditorContext.Provider>
  );
};
