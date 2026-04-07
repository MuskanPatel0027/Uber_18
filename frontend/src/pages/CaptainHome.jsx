import React from 'react'
import  { Link } from 'react-router-dom'
import CaptainDetail from '../assets/Components/CaptainDetail'
import RidePopUp from '../assets/Components/RidePopUp'
import ConfermridePopupPanel from '../assets/Components/ConfermridePopupPanel'
import { useState,useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";



const CaptainHome = () => {
  const [ridePopupPanel, setridePopupPanel] = useState(true)
    const [confermRidePopupPanel, setConfermridePopupPanel] = useState(false)

  const ridePopupPanelRef = useRef(null);
  const confermRidePopupPanelRef = useRef(null);

    useGSAP(function(){
        if(ridePopupPanel){
          gsap.to(ridePopupPanelRef.current, {
            transform: 'translateY(0)',
          } )
        } else{
          gsap.to(ridePopupPanelRef.current, {
            transform: 'translateY(100%)',
          } )
        }},[ridePopupPanel]); 


         useGSAP(function(){
        if(confermRidePopupPanel){
          gsap.to(confermRidePopupPanelRef.current, {
            transform: 'translateY(0)',
          } )
        } else{
          gsap.to(confermRidePopupPanelRef.current, {
            transform: 'translateY(100%)',
          } )
        }},[confermRidePopupPanel]); 


  return (
   <div>
      <div className='h-screen'>
<div className='fixed p-6 top-0 flex items-center justify-between w-screen'>
  <img className='w-16' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="uber logo" />
      <Link to="/home" className='h-10 w-10 bg-white flex items-center justify-center rounded-full'>
        <i className="text-lg font-medium ri-logout-box-line"></i>
      </Link>
</div>

       <div className='h-3/5' >
         <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1280/0*gwMx05pqII5hbfmX.gif" alt="map" />
       </div>
        
       <div className='h-2/5 p-6'>
            <CaptainDetail/>
       </div>

        <div ref={ridePopupPanelRef}  className='bg-white  translate-y-full w-full fixed z-10 bottom-0 px-3 py-10 pt-142'>
          <RidePopUp setridePopupPanel={setridePopupPanel} setConfermridePopupPanel={setConfermridePopupPanel} />
        </div>

       <div ref={confermRidePopupPanelRef}  className='bg-white  translate-y-full w-full fixed z-10 bottom-0 px-3 py-10 pt-142'>
          <ConfermridePopupPanel setConfermridePopupPanel={setConfermridePopupPanel} setridePopupPanel={setridePopupPanel}/>
       </div>

    </div>
   </div>
  )
}

export default CaptainHome