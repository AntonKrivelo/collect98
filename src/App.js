import './App.css';
import MenuAppBar from './components/MenuAppBar/MenuAppBar';
import AuthPage from './pages/AuthPage/AuthPage';
import AdminPage from './pages/AdminPage/AdminPage';
import Dashboard from './pages/Dashboard/Dashboard';
import CategoriesPage from './pages/CategoriesPage/CategoriesPage';
import MyPage from './pages/MyPage/MyPage';
import { Routes, Route, Navigate } from 'react-router-dom';
import UserPage from './pages/UserPage/UserPage';

function App() {
  return (
    <div className="App">
      <MenuAppBar />
      <Routes>
        <Route path="/" element={<Navigate to="/auth" replace />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/admin-panel" element={<AdminPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/my-page" element={<MyPage />} />
        <Route path="/users/:id" element={<UserPage />} />
      </Routes>
    </div>
  );
}

export default App;
