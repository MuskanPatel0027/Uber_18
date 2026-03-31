import React from 'react'

const WaitingForDriver = (props) => {
  return (
     <div>
        
         <h5
           onClick={()=>{
            props.setwaitingForDriver(false)
           }}
           className='p-1 w-[93%] text-center absolute top-0 '><i className="text-3xl text-gray-500 ri-arrow-drop-down-line"></i></h5>

<div className='flex items-center justify-between'>
    <img className='h-12' src="https://tse4.mm.bing.net/th/id/OIP.ymjpxr4RPlwbLenCbbpYywHaE7?pid=Api&P=0&h=180" alt="" />
    <div className='text-right'>
<h2 className='text-lg font-medium'>Tarun Patel</h2>
<h4 className='text-xl font-semibold -mt-1 -mb-2 '>MP04 CV 5925</h4>
<p className='text-sm text-gray-600'>TUV 300 T10+</p>
    </div>
</div>
            <div className='gap-2 flex items-center flex-col justify-between '>
                <img className='h-20' src="https://tse4.mm.bing.net/th/id/OIP.ymjpxr4RPlwbLenCbbpYywHaE7?pid=Api&P=0&h=180" alt="" />
           <div className='w-full mt-5'>

           <div className='flex items-center gap-5 p-3 border-b'>
        <i className="text-lg ri-map-pin-fill"></i>
        <div> 
            <h3 className='text-lg font-medium'>552/11-A</h3>
            <p className='text-sm -mt-1 text-gray-600'>Lower Lake,Bhopal</p>
        </div>
           </div>

           <div className='flex i tems-center gap-5 p-3 border-b'>
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
           
            </div>
    </div>
  )
}

export default WaitingForDriver