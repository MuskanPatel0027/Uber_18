import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Start from './pages/Start.jsx'
import CaptainLogin from './pages/CaptainLogin.jsx'
import CaptainSignup from './pages/CaptainSignup.jsx'
import UserLogin from './pages/UserLogin.jsx'
import UserSignup from './pages/UserSignup.jsx'
import UserProtectWrapper from './pages/UserProtectWrapper.jsx'
import UserLogout from './pages/UserLogout.jsx'
import CaptainHome from './pages/CaptainHome.jsx'
import CaptainProtectWrapper from './pages/CaptainProtectWrapper.jsx'
import Riding from './pages/Riding.jsx'
import CaptainRiding from './pages/CaptainRiding.jsx'
import 'remixicon/fonts/remixicon.css'

const App = () => {
  return (
    <div>
      <Routes>
      <Route path='/' element={<Start />} />
      <Route path='/captainLogin' element={<CaptainLogin />} />
      <Route path='/captainSignup' element={<CaptainSignup />} />
      <Route path='/captain-riding' element={<CaptainRiding />} />
      <Route path='/userLogin' element={<UserLogin />} />
      <Route path='/userSignup' element={<UserSignup />} />
      <Route path='/riding' element={<Riding />} />


      <Route path='/home' element={
        <UserProtectWrapper>
          <Home />
        </UserProtectWrapper> 
      } />

      <Route path='/user/logout' element={
        <UserProtectWrapper>
          <UserLogout />
        </UserProtectWrapper>   
      } />
      <Route path='/captain-home' element={
      <CaptainProtectWrapper>
        <CaptainHome />
      </CaptainProtectWrapper>
      }/>
      
      </Routes>
    </div>
  )
}

export default App