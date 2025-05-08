
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar.component";
import UserAuthForm from "./pages/userAuthForm.page";
import Editor from "./pages/editor.pages"; // Import your Editor component
import { createContext } from "react";
import Home from "./pages/dashboard/Home";
import Wrapper from "./components/Wrapper";
import ViewBlog from "./pages/blog/ViewBlog";
import EditBlog from "./pages/blog/EditBlog";
import Reports from "./pages/blog/Reports";


//export const UserContext = createContext({})

const App = () => {
  // const [userAuth, setUserAuth] = useState();
  /* useEffect(() => {
      let userInSession = lookInSesstion("user");
      userInSession ? setUserAuth(JSON.parse(userInSession)) : setUserAuth({access_token: null});
  }, []) */

  return (
    //<UserContext.Provider value={userAuth, setUserAuth}>
    <Routes>
<<<<<<< HEAD
      <Route path="/" element={<Navbar />}> 
        <Route index element ={<HomePage/>} />
=======
      <Route element={<Wrapper />}>
        <Route path="/" element={<Home />} />

>>>>>>> a812f0770f289c6004486343b04a31161cd4707e
        <Route path="signin" element={<UserAuthForm type="sign-in" />} />
        <Route path="signup" element={<UserAuthForm type="sign-up" />} />
        <Route path="blogs/edit/:id" element={<EditBlog />} />
        <Route path="blogs/:id" element={<ViewBlog />} />
        <Route path="reports" element={<Reports />} />
      </Route>
      <Route path="/editor" element={<Editor />} />
    </Routes>
    //</UserContext.Provider>
  );
};

export default App;
