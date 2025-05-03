import { Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar.component';
import UserAuthForm from './pages/userAuthForm.page';
import Editor from './pages/editor.pages'; // Import your Editor component

const App = () => {
  return (
    <Routes>
      
      <Route path="/" element={<Navbar />}>
        <Route path="signin" element={<UserAuthForm type="sign-in" />} />
        <Route path="signup" element={<UserAuthForm type="sign-up" />} />
        
      </Route>
      <Route path = "/editor" element = {<Editor/>}/>
     
    </Routes>
  );
}

export default App;