import React,{useContext} from 'react'
import { UserDataContext } from '../Context/UserContext.jsx'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react';

const UserProtectWrapper = ({children}) => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
useEffect(() => {
    if (!token) {
      navigate('/userLogin');
    }
  }, [token]);

 return (
    <>
      {children}
    </>
  )
}

export default UserProtectWrapper 