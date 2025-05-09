import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar.component";
import UserAuthForm from "./pages/userAuthForm.page";
import Editor from "./pages/editor.pages"; // Import your Editor component
import { EditorProvider } from "./context/editor-context"; // Import your EditorProvider
import Home from "./pages/dashboard/Home";
import Wrapper from "./components/Wrapper";
import ViewBlog from "./pages/blog/ViewBlog";
import EditBlog from "./pages/blog/EditBlog";
import Reports from "./pages/blog/Reports";

const App = () => {
  return (
    <EditorProvider> {/* Wrap your routes with EditorProvider */}
      <Routes>
        <Route element={<Wrapper />}>
          <Route path="/" element={<Home />} />
          <Route path="signin" element={<UserAuthForm type="sign-in" />} />
          <Route path="signup" element={<UserAuthForm type="sign-up" />} />
          <Route path="blogs/edit/:id" element={<EditBlog />} />
          <Route path="blogs/:id" element={<ViewBlog />} />
          <Route path="reports" element={<Reports />} />
        </Route>
        <Route path="/editor" element={<Editor />} />
      </Routes>
    </EditorProvider>
  );
};

export default App;