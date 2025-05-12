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
};
export default Editor;
