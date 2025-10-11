import './App.css';
import MenuAppBar from './components/MenuAppBar/MenuAppBar';
import UserAuthentication from './components/MenuAppBar/UserAuthentication/UserAuthentication';

function App() {
  return (
    <div className="App">
      <MenuAppBar />
      <UserAuthentication />
    </div>
  );
}

export default App;
