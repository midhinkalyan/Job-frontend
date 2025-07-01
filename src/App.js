
import './App.css';
import Home from './components/home_page/home';
import Login from './components/login_page/login';
import Profile from './components/profilepage/profile';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div>
    <Router>
      <Routes>
        <Route path="/home" element={<Home/>}/>
        <Route path="/" element={<Login/>}/>
        <Route path="/profile" element={
          <Profile/>
        }/>
      </Routes>
    </Router>
    </div>
  );
}

export default App;
