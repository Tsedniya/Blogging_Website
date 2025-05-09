// context/editor-context.js
import { createContext, useState } from 'react';

export const EditorContext = createContext();

export const EditorProvider = ({ children }) => {
    const [editorState, setEditorState] = useState("editor"); // "editor" or "publisher"
    const [blog, setBlog] = useState({});
    
    return (
        <EditorContext.Provider value={{ 
            editorState, 
            setEditorState,  // Make sure this is included
            blog, 
            setBlog 
        }}>
            {children}
        </EditorContext.Provider>
    );
};