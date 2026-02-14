import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import CaptainLogin from './pages/CaptainLogin.jsx'
import CaptainSignup from './pages/CaptainSignup.jsx'
import UserLogin from './pages/UserLogin.jsx'
import UserSignup from './pages/UserSignup.jsx'

const App = () => {
  return (
    <div>
      <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/captainLogin' element={<CaptainLogin />} />
      <Route path='/captainSignup' element={<CaptainSignup />} />
      <Route path='/userLogin' element={<UserLogin />} />
      <Route path='/userSignup' element={<UserSignup />} />
      </Routes>
    </div>
  )
}

export default App