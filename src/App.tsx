

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ToastProvider } from './contexts/ToastContext';
import ErrorBoundary from './components/common/ErrorBoundary';
import Home from './pages/Home';
import PostList from './pages/Posts/PostList';
import PostDetail from './pages/Posts/PostDetail';
import WritePost from './pages/Posts/WritePost';
import EditPost from './pages/Posts/EditPost';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import Dashboard from './pages/Admin/Dashboard';
import UserManagement from './pages/Admin/UserManagement';
import PostManagement from './pages/Admin/PostManagement';
import CommentManagement from './pages/Admin/CommentManagement';
import MenuManagement from './pages/Admin/MenuManagement';
import Analytics from './pages/Admin/Analytics';
import BackupManager from './pages/Admin/BackupManager';
import SiteSettings from './pages/Admin/SiteSettings';
import UserProfile from './pages/Profile/UserProfile';
import NotFound from './pages/NotFound';

function App() {
  return (
    <ErrorBoundary>
      <ToastProvider>
        <AuthProvider>
          <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/posts" element={<PostList />} />
            <Route path="/posts/:id" element={<PostDetail />} />
            <Route path="/posts/:id/edit" element={<EditPost />} />
            <Route path="/write" element={<WritePost />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<UserProfile />} />
            {/* 관리자 페이지 */}
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/users" element={<UserManagement />} />
            <Route path="/admin/posts" element={<PostManagement />} />
            <Route path="/admin/comments" element={<CommentManagement />} />
            <Route path="/admin/menus" element={<MenuManagement />} />
            <Route path="/admin/analytics" element={<Analytics />} />
            <Route path="/admin/backup" element={<BackupManager />} />
            <Route path="/admin/settings" element={<SiteSettings />} />
            {/* 404 페이지 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          </Router>
        </AuthProvider>
      </ToastProvider>
    </ErrorBoundary>
  );
}

export default App;
