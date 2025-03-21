import React, { useEffect } from 'react';
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import { Routes, Route } from "react-router-dom";
import { useAuthStore } from './store/useAuthStore'; 

const App = () => {    // type rafce it will automatically diaplay the boilerplate
  
  // Destructuring authUser and checkAuth from useAuthStore()  
  const {authUser, checkAuth} = useAuthStore()

  useEffect(() => {
    checkAuth()
  }, [checkAuth]);
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/setiings" element={<SettingsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </div>
  )
}

export default App
