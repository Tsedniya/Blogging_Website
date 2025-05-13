import { Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar.component';
import UserAuthForm from './pages/userAuthForm.page';
import Editor from './pages/editor.pages';
import Home from './pages/dashboard/Home';
import Wrapper from './components/Wrapper';
import ViewBlog from './pages/blog/ViewBlog';
import EditBlog from './pages/blog/EditBlog';
import Reports from './pages/blog/Reports';
import AdminDashboard from './pages/Admin/adminDashboard';
import ViewReport from './pages/blog/ViewReport';
import CreateBlog from './features/blog/CreateBlog';
import AdminLayout from './components/AdminLayout';
import NewAdminPage from './pages/Admin/NewAdminpage';
import Dashboard from './pages/Dashboard';

const App = () => {
  return (
    <Routes>
      {/* Wrapper layout for normal user-facing pages */}
      <Route element={<Wrapper />}>
        <Route path="/" element={<Home />} />
        <Route path="signin" element={<UserAuthForm type="sign-in" />} />
        <Route path="signup" element={<UserAuthForm type="sign-up" />} />
        <Route path="blogs/:id" element={<ViewBlog />} />
        <Route path="blogs/report/:id" element={<ViewReport />} />
        <Route path="reports" element={<AdminDashboard />} />
      </Route>

      {/* Admin Layout for dashboard and admin-specific pages */}
      <Route
        path="/dashboard"
        element={
          <AdminLayout>
            <Dashboard />
          </AdminLayout>
        }
      />

      {/* Standalone pages */}
      <Route path="blogs/edit/:id" element={<EditBlog />} />
      <Route path="/editor" element={<CreateBlog />} />
    </Routes>
  );
};

export default App;
