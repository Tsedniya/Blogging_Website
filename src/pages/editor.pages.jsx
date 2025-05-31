import React, { useContext } from "react";
import BlogEditor from "../components/blog-editor.component";
import PublishForm from "../components/publish-form.component"; // Import the Publisher component
import { EditorContext } from "../context/editor-context"; // Import your context

const Editor = () => {
    const { editorState } = useContext(EditorContext); // Access editorState from context

    return (
        <>
            {editorState === "editor" ? <BlogEditor /> : <PublishForm />}
        </>
    );
};

export default Editor;