import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { UserDataContext } from '../Context/UserContext.jsx'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useContext } from 'react'

const UserLogin = () => {
     const[email,setEmail] = useState('');
      const[password,setPassword] = useState('');
      const[userData,setUserData] = useState({});


      
  const navigate = useNavigate();
  const {user, setUser} = useContext(UserDataContext);

     const submitHandler = async (e) =>{
        e.preventDefault();
        const userData = {
          email: email,
          password: password
        }
        
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData)
      .then((response) => {
        if(response.status === 200){  
          setUser(response.data.user);
          localStorage.setItem('token', response.data.token);
          navigate('/home');
        }
      })
      .catch((error) => {
        console.log("BACKEND ERROR:", error.response.data);
      })

        setEmail('');
        setPassword('');
     }
 
  return (
    <div className='p-7 flex flex-col justify-between h-screen'>
      <div>
        <img src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="Uber logo" className='w-16  mb-10' />
       
      <form 
      id="user-login-form"
      onSubmit={(e)=>{
        submitHandler(e);
      }}>
        
        <h3 className='text-xl mb-2 font-medium'>What's your email</h3>

        <input 
        value={email}
        onChange={(e) =>{
          setEmail(e.target.value);
        } 
        }
        className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
        required type="email" 
        placeholder='example@gmail.com' 
        />

        <h3 className='text-lg mb=2 font-medium'>Enter password</h3>

        <input 
        value={password}
         onChange={(e) =>{
          setPassword(e.target.value);
        } 
        }
        className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
        required type="password" 
        placeholder='password'
         />

        <button
        className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2  w-full text-lg placeholder:text-base'
        >Login</button>

        <p className='text-center'>New here?<Link to="/userSignup" className='text-blue-600'>Create new Account</Link></p>

      </form>
      </div>
      
      <div>
       <Link to="/captainLogin" className='bg-[#10b461] text-white flex items-center justify-center font-semibold mb-5 rounded px-4 py-2  w-full text-lg placeholder:text-base'>Sign in as Captain</Link>
      </div>

    </div>
  )
}

export default UserLogin