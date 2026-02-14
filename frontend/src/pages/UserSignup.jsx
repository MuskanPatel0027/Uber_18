import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const UserSignup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [userData, setUserData] = useState({})

  const submitHandler = (e) => {
    e.preventDefault(); //prevent from refreshing the page on submit
    setUserData({
      FullName:{
         Firstname:firstname,
        Lastname: lastname
       },
      Email: email,
      Password: password
    })
    setEmail('');
    setPassword('');
    setFirstname('');
    setLastname('');
  }


  return (
    <div className='p-7 flex flex-col justify-between h-screen'>
      <div>
        <img src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="Uber logo" className='w-16  mb-10' />

        <form
          id="user-login-form"
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
              onChange={(e)=>{
                setFirstname(e.target.value);
              }}
            />

            <input
              className='bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base'
              type="text"
              placeholder='lastname'
               value={lastname}
              onChange={(e)=>{
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
              onChange={(e)=>{
                setEmail(e.target.value);
              }}
          />

          <h3 className='text-lg mb-5 font-base'>Enter password</h3>

          <input
            className='bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
            required type="password"
            placeholder='password'
             value={password}
              onChange={(e)=>{
                setPassword(e.target.value);
              }}
          />

          <button
            className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2  w-full text-xl placeholder:text-base'
          >Login</button>

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