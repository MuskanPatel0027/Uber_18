import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useContext } from 'react'
import axios from 'axios'
import { UserDataContext } from '../Context/UserContext.jsx'


const UserSignup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');


  const navigate = useNavigate();
  const {user, setUser} = useContext(UserDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();

  const newUser = {
  fullname: {
    firstname: firstname,
    lastname: lastname
  },
  email: email,
  password: password
};

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/users/register`,
      newUser
    );

    // backend returns 201 on successful creation — accept any 2xx
    if (response.status >= 200 && response.status < 300 && response.data?.user) {
      setUser(response.data.user);
      localStorage.setItem('token', response.data.token);
      navigate('/home');

      // clear inputs after successful signup
      setEmail('');
      setPassword('');
      setFirstname('');
      setLastname('');
    }

  } catch (error) {
    console.error("BACKEND ERROR:", error?.response?.data || error?.message || error);
  }
  }


  return (
    <div className='p-7 flex flex-col justify-between h-screen'>
      <div>
        <img src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="Uber logo" className='w-16  mb-10' />

        <form
          id="user-signup-form"
          onSubmit={(e) => {
            submitHandler(e);
          }}>


          <h3 className='text-lg mb-2 font-base'>What's your name</h3>
          <div className='flex gap-4 mb-5'>
            <input
              className='bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base'
              required type="text"
              placeholder='firstname'
              value={firstname}
              onChange={(e) => {
                setFirstname(e.target.value);
              }}
            />

            <input
              className='bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base'
              type="text"
              placeholder='lastname'
              value={lastname}
              onChange={(e) => {
                setLastname(e.target.value);
              }}
            />
          </div>

          <h3 className='text-lg mb-5 font-base'>What's your email</h3>

          <input
            className='bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
            required type="email"
            placeholder='example@gmail.com'
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />

          <h3 className='text-lg mb-5 font-base'>Enter password</h3>

          <input
            className='bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
            required type="password"
            placeholder='password'
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          <button
            className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2  w-full text-xl placeholder:text-base'
          >Create Account</button>

          <p className='text-center'>Already have a account?<Link to="/userLogin" className='text-blue-600'>Login here</Link></p>
        </form>
      </div>

         <div>
        <p className='text-[10px] text-gray-500 leading-tiglg'>By proceeding, you consent to get calls, WhatsApp or SMS messages, including by automated means, from Uber and it's affiliates to the number provided.</p>
      </div>
     </div>
  )
}

export default UserSignup