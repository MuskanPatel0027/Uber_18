import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { CaptainDataContext } from '../Context/CaptainContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const CaptainSignup = () => {
  const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [userData, setUserData] = useState({})
  const {captain, setCaptain} = React.useContext(CaptainDataContext);

  const [vehicleColor, setVehicleColor] = useState('');
  const [vehiclePlate, setVehiclePlate] = useState('');
  const [vehicleCapacity, setVehicleCapacity] = useState('');
  const [vehicleType, setVehicleType] = useState('');
    const submitHandler = async(e) => {
      e.preventDefault();
      
      const captainData = {
        fullname: {
          firstname: firstname,
          lastname: lastname
        },
        email: email,
        password: password,
        vehicle: {
          color: vehicleColor,
          plate: vehiclePlate,    
          capacity: parseInt(vehicleCapacity),
          vehicleType: vehicleType    
        }
      };

      try {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainData);
        if(response.status === 201){
          const data = response.data;
          setCaptain(data.captain); 
          localStorage.setItem('captain_token', data.token);
          navigate('/captain-home');
        }
        setEmail('');
        setPassword('');
        setFirstname('');
        setLastname('');
        setVehicleColor('');
        setVehiclePlate('');
        setVehicleCapacity('');
        setVehicleType(''); 
      } catch (error) {
        console.error('Registration error:', error.response?.data || error.message);
        alert('Error: ' + (error.response?.data?.error || error.message));
      }
    }
  
  return (
    <div className='p-7 flex flex-col justify-between h-screen'>
      <div>
        <img src="https://static.vecteezy.com/system/resources/previews/027/127/451/large_2x/uber-logo-uber-icon-transparent-free-png.png" alt="Uber logo" className='w-16  mb-10' />

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

          <h3 className='text-lg mb-5 font-base'>Vehicle Details</h3>

          <input
            className='bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
            required type="text"
            placeholder='Vehicle Color'
            value={vehicleColor}
            onChange={(e)=>{
              setVehicleColor(e.target.value);
            }}
          />

          <input
            className='bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
            required type="text"
            placeholder='Vehicle Plate Number'
            value={vehiclePlate}
            onChange={(e)=>{
              setVehiclePlate(e.target.value);
            }}
          />

          <input
            className='bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
            required type="number"
            placeholder='Vehicle Capacity'
            value={vehicleCapacity}
            onChange={(e)=>{
              setVehicleCapacity(e.target.value);
            }}
          />

          <select
            className='bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
            required
            value={vehicleType}
            onChange={(e)=>{
              setVehicleType(e.target.value);
            }}
          >
            <option value="">Select Vehicle Type</option>
            <option value="car">Car</option>
            <option value="bike">Bike</option>
            <option value="auto">Auto</option>
          </select>
          
                <button
            className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2  w-full text-xl placeholder:text-base'
          >Create Captain Account</button>

          <p className='text-center'>Already have a account?<Link to="/CaptainLogin" className='text-blue-600'>Login here</Link></p>

        </form>
      </div>

      <div>
       <p className='text-[10px] leading-tight'>This site is protected by reCAPTCHA and the Google <span className='underline'>Privacy Policy </span>and <span className='underline'>Terms of Services</span> apply.</p>
      </div>

    </div>
  )
}

export default CaptainSignup