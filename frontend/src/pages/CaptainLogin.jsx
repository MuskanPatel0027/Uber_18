import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useNavigate} from 'react-router-dom'
import axios from 'axios'
import { CaptainDataContext } from '../Context/CaptainContext'

const CaptainLogin = () => {
    const navigate = useNavigate();

     const[email,setEmail] = useState('');
        const[password,setPassword] = useState('');
       
        const {captain, setCaptain} = React.useContext(CaptainDataContext);
  
       const submitHandler = async (e) =>{
          e.preventDefault();
          const captain = { 
           email: email,
            password: password
          };
           
          const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captain)
           if(response.status === 200){
            const data = response.data;

            setCaptain(data.captain);
            localStorage.setItem('captain_token', data.token);
            navigate('/captain-home');
           }
          setEmail('');
          setPassword('');
       }

  return (
     <div className='p-7 flex flex-col justify-between h-screen'>
      <div>
        <img src="https://static.vecteezy.com/system/resources/previews/027/127/451/large_2x/uber-logo-uber-icon-transparent-free-png.png" alt="Uber logo" className='w-16  mb-10' />
       
      <form 
       id="captain-login-form"
      onSubmit={(e)=>{
        submitHandler(e);
      }}>
        
        <h3 className='text-xl mb=2 font-medium'>What's your email</h3>

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

        <p className='text-center'>Join a fleet<Link to="/CaptainSignup" className='text-blue-600'>Register as a Captain</Link></p>

      </form>
      </div>
      
      <div>
       <Link to="/userLogin" className='bg-[#d5622d] text-white flex items-center justify-center font-semibold mb-5 rounded px-4 py-2  w-full text-lg placeholder:text-base'>Sign in as User</Link>
      </div>

    </div>
  )
}

export default CaptainLogin