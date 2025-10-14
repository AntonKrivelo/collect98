import './App.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { Routes, Route, Navigate } from 'react-router-dom';
import MenuAppBar from './components/MenuAppBar/MenuAppBar';
import AuthPage from './pages/AuthPage/AuthPage';
import RegisterAuth from './components/RegisterAuth/RegisterAuth';
import LoginAuth from './components/LoginAuth/LoginAuth';

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
        <Route path="/" element={<Navigate to="/auth/register" replace />} />
        <Route path="/auth/*" element={<AuthPage />} />
        <Route path="/auth/register" element={<RegisterAuth />} />
        <Route path="/auth/login" element={<LoginAuth />} />
      </Routes>
    </div>
  );
}

export default App;
