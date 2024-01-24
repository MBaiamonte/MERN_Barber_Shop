import {BrowserRouter, Routes, Route} from 'react-router-dom';
import HomePage from './views/HomePage';
import LoginPage from './views/LoginPage';
import RegisterForm from './components/RegisterForm';

function App() {
  return (

      <BrowserRouter>
        <Routes>
          <Route element={<HomePage/>} path="/"/>
          <Route element={<LoginPage/>} path="/login"/>
          <Route   element={<RegisterForm/>} path="/register"/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
