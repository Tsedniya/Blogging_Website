<<<<<<< HEAD
import BlogEditor from "../components/blog-editor.component";
import React, { useContext } from "react";
import Publisher from "../components/publish-form.component"; // Import the Publisher component
import { EditorContext } from "../context/editor-context"; // Import your context

const Editor = () => {
    const { editorState } = useContext(EditorContext); // Access editorState from context

    return (
        <>
            {editorState === "editor" ? <BlogEditor /> : <Publisher />}
        </>
    );
=======
import PublishForm from '../components/publish-form.component';
import { createContext } from 'react';
import { EditorProvider } from '../context/editor-context';
import EditBlog from './blog/EditBlog';
import BlogEditor from '../components/blog-editor.component';

//export const EditorContext = createContext({});

const Editor = () => {
  return (
    <>
      <EditorProvider>
        <BlogEditor />
        <PublishForm />
      </EditorProvider>
    </>
  );
>>>>>>> ac540ad6845d669cc7a24cbd0f86129324d2f9b6
};
export default Editor;