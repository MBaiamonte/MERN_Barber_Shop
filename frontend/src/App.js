import {BrowserRouter, Routes, Route} from 'react-router-dom';
import HomePage from './views/HomePage';
import LoginPage from './views/LoginPage';
import RegisterForm from './components/RegisterForm';
import ServicePage from './views/ServicePage';

function App() {
  return (

      <BrowserRouter>
        <Routes>
          <Route element={<HomePage/>} path="/"/>
          <Route element={<LoginPage/>} path="/login"/>
          <Route element={<RegisterForm/>} path="/register"/>
          <Route element={<ServicePage/>} path="/services"/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
