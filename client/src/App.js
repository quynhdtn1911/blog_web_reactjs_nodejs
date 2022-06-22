import './App.css';
import TopBar from './components/topbar/TopBar.jsx';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Home from './pages/home/Home';
import {Routes, Route} from 'react-router-dom'; 
import Detail from './pages/detail/Detail';
import Write from './pages/write/Write';
import Profile from './pages/profile/Profile';

function App() {
  return (
      <div className="App">
        <TopBar />
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/posts' element={<Home />}/>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/post/detail/:idPost' element={<Detail />} />
          <Route path='/write' element={<Write />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
      </div>
  );
}

export default App;
