import React from 'react'

const LookingForDriver = (props) => {
  return (
    <div>
        
         <h5
           onClick={()=>{
            props.setvehicleFound(false)
           }}
           className='p-1 w-[93%] text-center absolute top-0 '><i className="text-3xl text-gray-500 ri-arrow-drop-down-line"></i></h5>

            <h3 className='text-2xl font-semibold mb-5'>Looking for a Driver</h3>
            <div className='gap-2 flex items-center flex-col justify-between '>
                <img className='h-20' src="https://tse4.mm.bing.net/th/id/OIP.ymjpxr4RPlwbLenCbbpYywHaE7?pid=Api&P=0&h=180" alt="" />
           <div className='w-full mt-5'>

           <div className='flex items-center gap-5 p-3 border-b'>
        <i className="text-lg ri-map-pin-fill"></i>
        <div>
            <h3 className='text-lg font-medium'>552/11-A</h3>
            <p className='text-sm -mt-1 text-gray-600'>{props.pickupLocation}</p>
        </div>
           </div>

           <div className='flex items-center gap-5 p-3 border-b'>
       <i className="ri-rectangle-fill"></i>
        <div>
            <h3 className='text-lg font-medium'>552/11-A</h3>
            <p className='text-sm -mt-1 text-gray-600'>{props.destination}</p>
        </div>
           </div>


            <div className='flex items-center gap-5 p-3'>
        <i className="ri-money-rupee-circle-fill"></i>
        <div>
            <h3 className='text-lg font-medium'>₹{props.fare[props.vehicleType]}</h3>
            <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
        </div>
           </div>
            </div>
           
            </div>
    </div>
  )
}

export default LookingForDriver