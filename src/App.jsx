import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './common/ProtectedRoute';
import Navbar from './components/navbar.component';
import UserAuthForm from './pages/userAuthForm.page';
import Editor from './pages/editor.pages';
import Home from './pages/dashboard/Home';
import Wrapper from './components/Wrapper';
import ViewBlog from './pages/blog/ViewBlog';
import EditBlog from './features/blog/EditBlog';
import Reports from './pages/blog/Reports';
import AdminDashboard from './pages/Admin/adminDashboard';
import AdminLayout from './components/AdminLayout';
import ViewReport from './pages/blog/ViewReport';
import CreateBlog from './features/blog/CreateBlog';
import AuthProvider from './auth/AuthProvider';
import Dashboard from './pages/Dashboard';
import NotFound from './common/404';

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<Wrapper />}>
          <Route path="/" element={<Home />} />
          <Route path="signin" element={<UserAuthForm type="sign-in" />} />
          <Route path="signup" element={<UserAuthForm type="sign-up" />} />

          {/* Protected Routes */}
          <Route
            path="blogs/:id"
            element={
              <ProtectedRoute roles={['user', 'admin']}>
                <ViewBlog />
              </ProtectedRoute>
            }
          />
          <Route
            path="blogs/edit/:id"
            element={
              <ProtectedRoute roles={['user', 'admin']}>
                <EditBlog />
              </ProtectedRoute>
            }
          />
          <Route
            path="/editor"
            element={
              <ProtectedRoute roles={['user', 'admin']}>
                <CreateBlog />
              </ProtectedRoute>
            }
          />
          <Route
            path="blogs/report/:id"
            element={
              <ProtectedRoute roles={['user', 'admin']}>
                <ViewReport />
              </ProtectedRoute>
            }
          />

          {/* Admin Routes */}
          <Route
            path="reports"
            element={
              <ProtectedRoute roles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute roles={['admin']}>
                <AdminLayout>
                  <Dashboard />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
        </Route>

        {/* 404 Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;