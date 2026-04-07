import React from 'react'
import { Link } from 'react-router-dom'
import FinishRide from '../assets/Components/FinishRide';
import { useState,useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

const CaptainRiding = () => {
    const [FinishRidePanel, setFinishRidePanel] = useState(false);

    const FinishRidePanelRef = useRef(null)

   useGSAP(function(){
        if(FinishRidePanel){
          gsap.to(FinishRidePanelRef.current, {
            transform: 'translateY(0)',
          } )
        } else{
          gsap.to(FinishRidePanelRef.current, {
            transform: 'translateY(100%)',
          } )
        }},[FinishRidePanel]); 

  return (
     
          
      <div className='h-screen'>
       
<div className='fixed p-6 top-0 flex items-center justify-between w-screen'>
  <img className='w-16' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="uber logo" />
      <Link to="/home" className='h-10 w-10 bg-white flex items-center justify-center rounded-full'>
        <i className="text-lg font-medium ri-logout-box-line"></i>
      </Link>
</div>

       <div className='h-4/5' >
         <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1280/0*gwMx05pqII5hbfmX.gif" alt="map" />
       </div>
        
       <div
       onClick={()=>{
        setFinishRidePanel(true)
       }}
        className='h-1/5 relative p-6 bg-yellow-400 justify-between flex items-center'>
          <h5
           onClick={()=>{
        
           }}
           className='p-1 w-[95%] text-center absolute top-0 '><i className="text-3xl text-gray-700 ri-arrow-down-s-line"></i></h5>
       <h4 className='text-xl font-semibold'>4 KM away</h4>
       <button                  
       className='flex justify-center  mt-5 bg-green-600 text-white font-semibold p-3 px-8 rounded-lg'>Complete Ride</button>
           
       </div>
       <div ref={FinishRidePanelRef}  className='bg-white  translate-y-full w-full fixed z-10 bottom-0 px-3 py-10 pt-142'>
          <FinishRide setFinishRidePanel={setFinishRidePanel} />
       </div>


    </div>
   
  )
}

export default CaptainRiding