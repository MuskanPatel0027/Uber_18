import { useState, useRef, useEffect } from "react";
import axios from "axios";
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
  const [activeField, setActiveField] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [isFetchingSuggestions, setIsFetchingSuggestions] = useState(false);
  const [fetchError, setFetchError] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [confermRidePanel, setconfermRidePanel] = useState(false);
  const [vehicleFound, setvehicleFound] = useState(false);
  const [waitingForDriver, setwaitingForDriver] = useState(false);
  const [fare, setfare] = useState({})


   const submitHandler = (e) => {
   e.preventDefault();
  }

  const handleSuggestionSelect = (field, suggestion) => {
    if (!field || !suggestion) return;

    setPanelOpen(false);
    setActiveField(null);
    setSuggestions([]);
    setFetchError("");

    if (field === "pickup") {
      setPickupLocation(suggestion);
      return;
    }

    setDestination(suggestion);
    if (pickupLocation.trim().length >= 3) {
      setVehiclePanel(true);
    }
  };

  const fetchSuggestions = async (query) => {
    setIsFetchingSuggestions(true);
    setFetchError("");
    try {
      const token = localStorage.getItem('token');
     
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
        params: { query },
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const results = Array.isArray(response.data)
        ? response.data.map((item) => item.name || "")
        : [];
      setSuggestions(results);
    } catch (error) {
      setSuggestions([]);
      setFetchError(
        error.response?.data?.error || error.response?.data?.message || error.message || "Unable to load suggestions"
      );
    } finally {
      setIsFetchingSuggestions(false);
    }
  };

  useEffect(() => {
    if (!panelOpen || !activeField) {
      setSuggestions([]);
      setFetchError("");
      return;
    }

    const query = activeField === "pickup" ? pickupLocation : destination;
    if (!query || query.trim().length < 3) {
      setSuggestions([]);
      setFetchError("");
      return;
    }

    const timer = setTimeout(() => {
      fetchSuggestions(query.trim());
    }, 300);

    return () => clearTimeout(timer);
  }, [activeField, panelOpen, pickupLocation, destination]);
  
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


     async function findTrip() {
  try {
    setVehiclePanel(true);

    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/rides/fare`,
      {
        params: {
          pickupLocation,
          dropoffLocation: destination
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    );

   setfare(response.data);
    console.log(response.data);

  } catch (error) {
    console.error("ERROR:", error.response?.data || error.message);
  }
}

async function createRide(vehicleType){
  const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/create`,
      {
        pickupLocation,
        dropoffLocation: destination,
        vehicleType   // 🔥 important
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      console.log(response.data);
        }
      






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
              onFocus={() => {
                setPanelOpen(true);
                setActiveField("pickup");
              }}
              onClick={() => {
                setPanelOpen(true);
                setActiveField("pickup");
              }}
              value={pickupLocation}
              onChange={(e) => {
                setActiveField("pickup");
                setPickupLocation(e.target.value);
              }}
              className="bg-[#eee] px-12 py-2 text-lg rounded-lg mt-5 w-full"
              type="text"
              id="pickup"
              name="pickup"
              placeholder="Add pick-up location"
            />
            <input
              onFocus={() => {
                setPanelOpen(true);
                setActiveField("destination");
              }}
              onClick={() => {
                setPanelOpen(true);
                setActiveField("destination");
              }}
              value={destination}
              onChange={(e) => {
                setActiveField("destination");
                setDestination(e.target.value);
              }}
              className="bg-[#eee] px-12 py-2 text-lg rounded-lg mt-3 w-full"
              type="text"
              id="destination"
              name="destination"
              placeholder="Enter your destination"
            />
          </form>
         <button onClick={findTrip} className="bg-black text-white w-full mt-3 px-6 py-2 rounded-lg hover:bg-gray-800 transition duration-200">
  Find Ride
</button>
        </div>

        <div className="h-0 bg-white"
        ref={panelRef}>
            <LocationSearchPanels
              activeField={activeField}
              suggestions={suggestions}
              isLoading={isFetchingSuggestions}
              error={fetchError}
              onSelectSuggestion={handleSuggestionSelect}
              setPanelOpen={setPanelOpen}
            />
        </div>
      </div>
       
     
       <div ref={vehiclePanelRef} className='bg-white translate-y-full w-full fixed z-10 bottom-0 px-3 py-10 pt-142'>
          <VehiclePanel createRide={createRide} fare={fare} setVehiclePanel={setVehiclePanel}  setconfermRidePanel={setconfermRidePanel} />
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
}

export default Home;
