import React from 'react'

const LocationSearchPanels = (props) => {
    
    console.log(props);


    const location = [
        "b-222 pebbles bay, baghmugalia, BHOPAL, Madhya Pradesh",
        "b-225 pebbles bay, baghmugalia, BHOPAL, Madhya Pradesh",
        "b-252 pebbles bay, baghmugalia, BHOPAL, Madhya Pradesh",
        "b-262 pebbles bay, baghmugalia, BHOPAL, Madhya Pradesh"
    ]

  return (
    <div>
        {
            location.map(function(elem,idx){
                return (
                 <div
                    key={idx}
                 onClick={()=>{
                    props.setVehiclePanel(true)
                    props.setPanelOpen(false)
                 }} 
                  className='flex gap-4 border-2 border-gray-100 active:border-black p-3 rounded-xl my-2 items-center justify-start'>
        <h2 className='bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full'><i className="ri-map-pin-fill"></i></h2>
        <h4 className='font-medium'>{elem}</h4>
    </div>
                )
            })
        }

    </div>
  )
}

export default LocationSearchPanels                                                                       

