import React from 'react'

const RidePopUp = (props) => {
  return (
   <div>
        
         <h5
           onClick={()=>{
            props.setridePopupPanel(false)
           }}
           className='p-1 w-[93%] text-center absolute top-0 '><i className="text-3xl text-gray-500 ri-arrow-drop-down-line"></i></h5>

            <h3 className='text-2xl font-semibold mb-5'>New Ride Available!</h3>

           <div className='flex items-center justify-between mt-4 bg-yellow-400 rounded-lg p-3'>
             <div className='flex items-center gap-3' >
                 <img className='w-12 h-12 rounded-full object-cover' src="https://tse1.mm.bing.net/th/id/OIP._zzVdVW0DFF6kGe932VqOwHaHa?pid=Api&P=0&h=180" />
                 <h2 className='text-lg font-medium'>Muskan Patel</h2>
            </div>
            <h5 className='text-lg font-semibold'>
                2.2 KM
            </h5>

           </div>

            <div className='gap-2 flex items-center flex-col justify-between '>
               
           <div className='w-full mt-5'>

           <div className='flex items-center gap-5 p-3 border-b'>
        <i className="text-lg ri-map-pin-fill"></i>
        <div>
            <h3 className='text-lg font-medium'>552/11-A</h3>
            <p className='text-sm -mt-1 text-gray-600'>Lower Lake,Bhopal</p>
        </div>
           </div>

           <div className='flex items-center gap-5 p-3 border-b'>
       <i className="ri-rectangle-fill"></i>
        <div>
            <h3 className='text-lg font-medium'>552/11-A</h3>
            <p className='text-sm -mt-1 text-gray-600'>Lower Lake,Bhopal</p>
        </div>
           </div>


            <div className='flex items-center gap-5 p-3'>
        <i className="ri-money-rupee-circle-fill"></i>
        <div>
            <h3 className='text-lg font-medium'>174</h3>
            <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
        </div>
           </div>
            </div>
                <div className='flex w-full items-center justify-between'>
                    <button
                onClick={()=>{
                    props.setConfermridePopupPanel(true);
                  
                }}
                 className='mt-5 bg-green-600 text-white font-semibold p-3 px-8 rounded-lg'>Accept</button>

                 
                <button
                onClick={()=>{
                 props.setridePopupPanel(false)
                }}
                 className='mt-5 bg-gray-300 text-gray-700 font-semibold p-3 px-8 rounded-lg'>Ignore</button>
                </div>
            </div>
    </div>
  )
}

export default RidePopUp