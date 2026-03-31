import React from 'react'

const VehiclePanel = (props) => {
  return (
    <div>
        <h5
           onClick={()=>{
            props.setVehiclePanel(false) }}
           className='p-1 w-[93%] text-center absolute top-0 '><i className="text-3xl text-gray-500 ri-arrow-drop-down-line"></i></h5>
          <h3 className='text-2xl font-semibold mb-5'>Choose a Vehicle </h3>
        <div 
        onClick={()=>{
            props.setconfermRidePanel(true);
        }}
        className='mb-2 border-2 border-gray-300 active:border-black rounded-xl p-3 w-full flex items-center justify-between'>
                <img className='h-12' src="https://tse4.mm.bing.net/th/id/OIP.ymjpxr4RPlwbLenCbbpYywHaE7?pid=Api&P=0&h=180" alt="car logo" />
                <div className="ml-2 w-1/2">
                  <h4 className="font-medium text-base">UberGo <span><i className="ri-user-fill"></i>4</span></h4>
                <h5 className="font-medium text-sm">2 mins away</h5>
                <p className="font-normal text-xs text-gray-600">Affordable, compact rides</p>
              </div> 
               <h2 className="text-lg font-semibold">193</h2>
 </div> 
  
        <div
        onClick={()=>{
            props.setconfermRidePanel(true);
        }} 
        className='mb-2 border-2 border-gray-300 active:border-black rounded-xl p-3 w-full flex items-center justify-between'>
                <img className='h-12' src="https://tse1.mm.bing.net/th/id/OIP.RLXPc4XXmOPNyYAggjk9qwHaHa?pid=Api&P=0&h=180" />
                <div className="ml-2 w-1/2">
                  <h4 className="font-medium text-base">Bike <span><i className="ri-user-fill"></i>1</span></h4>
                <h5 className="font-medium text-sm">3 mins away</h5>
                <p className="font-normal text-xs text-gray-600">Affordable, Bike rides</p>
              </div> 
               <h2 className="text-lg font-semibold">56</h2>
 </div>

        <div
        onClick={()=>{
            props.setconfermRidePanel(true);
        }}
         className='mb-2 border-2 border-gray-300 active:border-black rounded-xl p-3 w-full flex items-center justify-between'>
                <img className='h-12' src="https://tse4.mm.bing.net/th/id/OIP.gERohywpalGF3NjolmHt5wHaE7?pid=Api&P=0&h=180" />
                <div className="ml-2 w-1/2">
                  <h4 className="font-medium text-base">UberAuto <span><i className="ri-user-fill"></i>3</span></h4>
                <h5 className="font-medium text-sm">2 mins away</h5>
                <p className="font-normal text-xs text-gray-600">Affordable, Auto rides</p>
              </div> 
               <h2 className="text-lg font-semibold">120</h2>
 </div>
    </div>
  )
}

export default VehiclePanel