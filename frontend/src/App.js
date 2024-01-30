import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { useState } from 'react';
import HomePage from './views/HomePage';
import LoginPage from './views/LoginPage';
import RegisterForm from './components/RegisterForm';
import ServicePage from './views/ServicePage';
import AboutUsPage from './views/AboutUsPage';

function App() {
  const [loggedUser, setLoggedUser] = useState(null)
  return (

      <BrowserRouter>
        <Routes>
          <Route element={<HomePage setLoggedUser={setLoggedUser} loggedUser={loggedUser}/>} path="/"/>
          <Route element={<LoginPage setLoggedUser={setLoggedUser} />} path="/login"/>
          <Route element={<RegisterForm setLoggedUser={setLoggedUser}/>} path="/register"/>
          <Route element={<ServicePage/>} path="/services"/>
          <Route element={<AboutUsPage/>} path="/aboutUs"/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
