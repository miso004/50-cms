

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Contexts
import { AuthProvider } from './contexts/AuthContext';
import { ToastProvider } from './contexts/ToastContext';
import { MenuProvider } from './contexts/MenuContext';

// Components
import ErrorBoundary from './components/common/ErrorBoundary';
import AdminLayout from './components/layout/AdminLayout';
import Layout from './components/layout/Layout';

// Public Pages (방문자용)
import Home from './pages/Public/Home';
import About from './pages/Public/About';
import Contact from './pages/Public/Contact';
import Blog from './pages/Public/Blog';
import PostDetail from './pages/Public/PostDetail';

// Auth Pages
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import ForgotPassword from './pages/Auth/ForgotPassword';
import ResetPassword from './pages/Auth/ResetPassword';

// Post Pages
import PostList from './pages/Posts/PostList';
import WritePost from './pages/Posts/WritePost';
import EditPost from './pages/Posts/EditPost';
import PostDetailPage from './pages/Posts/PostDetail';

// Admin Pages (CMS 관리)
import Dashboard from './pages/Admin/Dashboard';
import UserManagement from './pages/Admin/UserManagement';
import PostManagement from './pages/Admin/PostManagement';
import CommentManagement from './pages/Admin/CommentManagement';
import MenuManagement from './pages/Admin/MenuManagement';
import Analytics from './pages/Admin/Analytics';
import BackupManager from './pages/Admin/BackupManager';
import SiteSettings from './pages/Admin/SiteSettings';

// Profile Pages
import UserProfile from './pages/Profile/UserProfile';

// Common Pages
import NotFound from './pages/NotFound';

function App() {
  return (
    <ErrorBoundary>
      <ToastProvider>
        <AuthProvider>
          <MenuProvider>
            <Router>
              <Routes>
                {/* ===== Public Pages (방문자용) ===== */}
                <Route path="/" element={<Layout><Home /></Layout>} />
                <Route path="/about" element={<Layout><About /></Layout>} />
                <Route path="/contact" element={<Layout><Contact /></Layout>} />
                <Route path="/blog" element={<Layout><Blog /></Layout>} />
                <Route path="/blog/:id" element={<Layout><PostDetail /></Layout>} />

                {/* ===== Auth Pages ===== */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />

                {/* ===== Post Pages ===== */}
                <Route path="/posts" element={<PostList />} />
                <Route path="/write" element={<WritePost />} />
                <Route path="/posts/:id" element={<PostDetailPage />} />
                <Route path="/posts/:id/edit" element={<EditPost />} />

                {/* ===== Admin Pages (CMS 관리) ===== */}
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<Dashboard />} />
                  <Route path="users" element={<UserManagement />} />
                  <Route path="posts" element={<PostManagement />} />
                  <Route path="comments" element={<CommentManagement />} />
                  <Route path="menus" element={<MenuManagement />} />
                  <Route path="analytics" element={<Analytics />} />
                  <Route path="backup" element={<BackupManager />} />
                  <Route path="settings" element={<SiteSettings />} />
                </Route>

                {/* ===== Profile Pages ===== */}
                <Route path="/profile" element={<UserProfile />} />

                {/* ===== 404 Page ===== */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Router>
          </MenuProvider>
        </AuthProvider>
      </ToastProvider>
    </ErrorBoundary>
  );
}

export default App;
