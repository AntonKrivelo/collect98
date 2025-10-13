import './App.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { Routes, Route } from 'react-router-dom';
import MenuAppBar from './components/MenuAppBar/MenuAppBar';
import UserAuthentication from './components/UserAuthentication/UserAuthentication';
import InventoryPage from './pages/InventoryPage/InventoryPage';
import AdminPage from './pages/AdminPage/AdminPage';

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
        <Route path="/register" element={<UserAuthentication mode="register" />} />
        <Route path="/login" element={<UserAuthentication mode="login" />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/inventory" element={<InventoryPage />} />
      </Routes>
    </div>
  );
}

export default App;
