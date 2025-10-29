import './App.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import MenuAppBar from './components/MenuAppBar/MenuAppBar';
import AuthPage from './pages/AuthPage/AuthPage';
import AdminPage from './pages/AdminPage/AdminPage';
import Dashboard from './pages/Dashboard/Dashboard';
import CategoriesPage from './pages/CategoriesPage/CategoriesPage';
import MyPage from './pages/MyPage/MyPage';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { Routes, Route, Navigate } from 'react-router-dom';
import InventoriesPage from './pages/InventoriesPage/InventoriesPage';

function App() {
  return (
    <div className="App">
      <MenuAppBar />
      <ConfirmDialog
        className="my-confirm-dialog"
        style={{
          padding: '20px',
          borderRadius: '5px',
          backgroundColor: '#FFF',
        }}
      />
      <Routes>
        <Route path="/" element={<Navigate to="/auth" replace />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/admin-panel" element={<AdminPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/my-page" element={<MyPage />} />
        <Route path="/inventories" element={<InventoriesPage />} />
      </Routes>
    </div>
  );
}

export default App;
