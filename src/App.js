import React from 'react'
import {
  Navigate,
  Route,
  BrowserRouter,
  Routes,
} from "react-router-dom";
import "./Styles/App.scss"
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Login from './Pages/Login';
import LandingPage from './Pages/LandingPage';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/in" element={<LandingPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

