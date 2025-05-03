import { Navigate } from "react-router-dom";
import BlogEditor from "../components/blog-editor.component";
import PublishForm from  "../components/publish-form.component";
//import { createContext } from "react";

/*const blogStructure = {

  title: '',
  banner: '',
  context: [],
  tags: [],
  des: '',
  author: { personal_info: {} }
};*/

//export const EditorContext = createContext({});

const Editor = () =>{
     // user can only edit when its logged in so here is the condition
     // const [ editorState, setEditorState] = useState(editor);
     // let {userAuth: {access_token}} = useContext(UserContext)
    return(

      // access_token === null ? <Navigate to="/signin"/>
       //:editorState == "editor" ? <BlogEditor/> : <PublishForm/>
       <>
       
       <BlogEditor />
       <PublishForm />
   </>
    )
}
export default Editor;