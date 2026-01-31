import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardLayout from './components/DashboardLayout';
import StudentDashboard from './pages/student/StudentDashboardPage';
import FacultyDashboard from './pages/faculty/FacultyDashboardPage';
import AdminDashboard from './pages/admin/AdminDashboardPage';
import { useAuth } from './hooks/useAuth';

export default function App() {
  const { user, loading } = useAuth();

  if (loading) return <div className="flex h-screen items-center justify-center">Loading...</div>;

  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/register" element={!user ? <RegisterPage /> : <Navigate to="/" />} />
        
        <Route path="/" element={user ? <DashboardLayout /> : <Navigate to="/login" />}>
          <Route index element={
            user?.role === 'admin' ? <AdminDashboard /> :
            user?.role === 'faculty' ? <FacultyDashboard /> : 
            <StudentDashboard />
          } />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
