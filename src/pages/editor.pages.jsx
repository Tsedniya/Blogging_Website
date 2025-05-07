import BlogEditor from "../components/blog-editor.component";
import PublishForm from "../components/publish-form.component";
import { createContext } from "react";
import { EditorProvider } from "../context/editor-context";

//export const EditorContext = createContext({});

const Editor = () => {
  // const [blog, setBlog ] = useState(blogStructure)
  // const [ editorState, setEditorState] = useState("editor");
  // const [textEditor, setTextEditor ] = useState({isReady: false});
  // let {userAuth: {access_token}} = useContext(UserContext)
  return (
    //<EditorContext.Provider  value = {{ blog,setBlog, editorState,setEditorState, textEditor, setTextEditor}}
    // user can only edit when its logged in so here is the condition
    /* {access_token === null ? <Navigate to="/signin"/>
       :editorState == "editor" ? <BlogEditor/> : <PublishForm/>
       } */
    <>
      <EditorProvider>
        <BlogEditor />
        <PublishForm />
      </EditorProvider>
    </>
  );
};
export default Editor;
