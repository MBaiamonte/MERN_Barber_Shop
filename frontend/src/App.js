import {BrowserRouter, Routes, Route, useParams} from 'react-router-dom';
import { useState } from 'react';
import HomePage from './views/HomePage';
import LoginPage from './views/LoginPage';
import RegisterForm from './components/RegisterForm';
import ServicePage from './views/ServicePage';
import AboutUsPage from './views/AboutUsPage';
import DashboardPage from './views/DashboardPage';
import {UserProvider} from './components/UserContext';
import AppointmentFormPage from './views/AppointmentFormPage';


function App() {

  return (

      <BrowserRouter>
        <UserProvider>
          <Routes>
            <Route element={<HomePage />} path="/"/>
            <Route element={<LoginPage/>} path="/login"/>
            <Route element={<RegisterForm/>} path="/register"/>
            <Route element={<ServicePage/>} path="/services"/>
            <Route element={<AboutUsPage/>} path="/aboutUs"/>
            <Route element={<DashboardPage />} path='/profile/:userId'/>
            <Route element={<AppointmentFormPage />} path='/appointment/:userId/book'/>
          </Routes>
          </UserProvider>
      </BrowserRouter>
  );
}

export default App;
