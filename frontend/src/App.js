import {BrowserRouter, Routes, Route} from 'react-router-dom';
import HomePage from './views/HomePage';
import LoginPage from './views/LoginPage'

function App() {
  return (

      <BrowserRouter>
        <Routes>
          <Route element={<HomePage/>} path="/"/>
          <Route element={<LoginPage/>} path="/login"/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
