import './App.css';
import AdminPanel from './components/AdminPanel/AdminPanel';
import Inventories from './components/Inventories/Inventories';
import MenuAppBar from './components/MenuAppBar/MenuAppBar';
import UserAuthentication from './components/UserAuthentication/UserAuthentication';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <MenuAppBar />
      <Routes>
        <Route path="/register" element={<UserAuthentication mode="register" />} />
        <Route path="/login" element={<UserAuthentication mode="login" />} />
        <Route path="/admin" element={<AdminPanel />} />
        {/* <Route path="/inventories" element={<Inventories />} /> */}
      </Routes>
    </div>
  );
}

export default App;
