import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import About from './pages/About';
import Services from './pages/Services';
import {ToastContainer} from 'react-toastify';

import Privateroute from './components/Privateroute';
import Userdashboard from './pages/user-routes/Userdashboard';
import Profileinfo from './pages/user-routes/Profileinfo';

function App() {
  return (
    <BrowserRouter>
    <ToastContainer />
    <Routes>
      <Route path= "/" element = {<Home />} />
      <Route path= "/login" element = {<Login />} />
      <Route path= "/signup" element = {<Signup />} />
      <Route path= "/home" element = {<Home />} />
      <Route path= "/about" element = {<About />} />
      <Route path= "/services" element = {<Services />} />

      
      <Route path= "/user" element = {<Privateroute />} >
        <Route path= "dashboard" element = {<Userdashboard />} />
        <Route path= "profile-info" element = {<Profileinfo />} />
      </Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
