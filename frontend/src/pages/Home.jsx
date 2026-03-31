import React from "react";
import { useState,useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanels from "../assets/Components/LocationSearchPanels";
import VehiclePanel from "../assets/Components/VehiclePanel";
import ConfermRide from "../assets/Components/ConfermRide";
import LookingForDriver from "../assets/Components/LookingForDriver";
import WaitingForDriver from "../assets/Components/WaitingForDriver";

const Home = () => {
 
  const vehiclePanelRef = useRef(null);
  const panelRef = useRef(null);
  const confermRideRef = useRef(null);
  const panelCloseRef = useRef(null);
  const vehicleFoundRef = useRef(null);
   const waitingForDriverRef = useRef(null);
  

  const [pickupLocation, setPickupLocation] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [confermRidePanel, setconfermRidePanel] = useState(false);
  const [vehicleFound, setvehicleFound] = useState(false);
  const [waitingForDriver, setwaitingForDriver] = useState(false);


   const submitHandler = (e) => {
   e.preventDefault();
  }
  
     useGSAP(function(){
        if(panelOpen){
          gsap.to(panelRef.current, {
            height:'70%',
            padding: 20
          } )
          gsap.to(panelCloseRef.current, {
           opacity:1,
          })
        }else{
          gsap.to(panelRef.current, {
            height: '0%',
                padding: 0
          } )
          gsap.to(panelCloseRef.current, {
            opacity:0,
          })
        }
     },[panelOpen]);

      useGSAP(function(){
        if(vehiclePanel){
          gsap.to(vehiclePanelRef.current, {
            transform: 'translateY(0)',
          } )
        } else{
          gsap.to(vehiclePanelRef.current, {
            transform: 'translateY(100%)',
          } )
        }},[vehiclePanel]);   

          useGSAP(function(){
        if(confermRidePanel){
          gsap.to(confermRideRef.current, {
            transform: 'translateY(0)',
          } )
        } else{
          gsap.to(confermRideRef.current, {
            transform: 'translateY(100%)',
          } )
        }},[confermRidePanel]); 

           useGSAP(function(){
        if(waitingForDriver){
          gsap.to(waitingForDriverRef.current, {
            transform: 'translateY(0)',
          } )
        } else{
          gsap.to(waitingForDriverRef.current, {
            transform: 'translateY(100%)',
          } )
        }},[waitingForDriver]); 

           useGSAP(function(){
        if(vehicleFound){
          gsap.to(vehicleFoundRef.current, {
            transform: 'translateY(0)',
          } )
        } else{
          gsap.to(vehicleFoundRef.current, {
            transform: 'translateY(100%)',
          } )
        }},[vehicleFound]); 

 

  
  return (
    <div className='h-screen relative overflow-hidden'>
      <img className="w-16 absolute left-5 top-5"
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt="uber logo"/>

      <div className='h-screen w-screen'>
        <img
          className="h-full w-full object-cover "
          src="https://miro.medium.com/v2/resize:fit:1280/0*gwMx05pqII5hbfmX.gif"
          alt="map-img"
        />
      </div>

      <div className="flex flex-col justify-end  h-screen absolute top-0 w-full ">
        <div className="bg-white h-[30%] p-6 relative">
          <h5
          ref={panelCloseRef} 
          onClick={()=>{
            setPanelOpen(false)
          }}
          className='absolute top-6 right-6 text-2xl'>
            <i className="ri-arrow-down-s-line"></i>
            </h5>
          <h4 className="text-2xl font-semibold">Find a trip</h4>
      <form onSubmit={(e)=>{
            submitHandler(e);
          }

          }>
            <div className="absolute h-16 w-1 top-[45%] left-10  bg-gray-900 rounded-full "></div>
            <input
             onClick={()=>{
              setPanelOpen(true)
             }
              
            }
            value={pickupLocation}
            onChange={(e)=>{
              setPickupLocation(e.target.value);
            }}
              className="bg-[#eee] px-12 py-2 text-lg rounded-lg mt-5 w-full"
              type="text"
              id="pickup"
              name="pickup"
              placeholder="Add pick-up location"
            />
            <input
            onClick={()=>{
              setPanelOpen(true)
             }
              
            }
              value={destination}
              onChange={(e)=>{
                setDestination(e.target.value);
              }}
              className="bg-[#eee] px-12 py-2 text-lg rounded-lg mt-3 w-full"
              type="text"
              id="destination"
              name="destination"
              placeholder="Enter your destination"
            />
          </form>
        </div>

        <div className="h-0 bg-white"
        ref={panelRef}>
            <LocationSearchPanels setPanelOpen={setPanelOpen} setVehiclePanel={setVehiclePanel} />
        </div>
      </div>
       
     
       <div ref={vehiclePanelRef} className='bg-white translate-y-full w-full fixed z-10 bottom-0 px-3 py-10 pt-142'>
          <VehiclePanel setVehiclePanel={setVehiclePanel}  setconfermRidePanel={setconfermRidePanel} />
       </div>

       <div ref={confermRideRef} className='bg-white translate-y-full w-full fixed z-10 bottom-0 px-3 py-6 pt-12'>
         <ConfermRide setvehicleFound={setvehicleFound} setconfermRidePanel={setconfermRidePanel} />
       </div>
        
        <div ref={vehicleFoundRef} className='bg-white translate-y-full w-full fixed z-10 bottom-0 px-3 py-6 pt-12'>
         <LookingForDriver setvehicleFound={setvehicleFound} />
       </div>

       <div ref={waitingForDriverRef}  className='bg-white w-full fixed z-10 bottom-0 px-3 py-6 pt-12'>
         <WaitingForDriver setwaitingForDriver={setwaitingForDriver} />
       </div>
        
    </div>
  );
};

export default Home;
