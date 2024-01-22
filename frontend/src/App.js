import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { AuthProvider } from './components/AuthContext';
import HomePage from './views/HomePage';
import LoginPage from './views/LoginPage'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<HomePage/>} path="/"/>
          <Route element={<LoginPage/>} path="/login"/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
