import React from 'react'

const CaptainDetail = () => {
  return (
    <div><div className='flex items-center justify-between'>
              <div className='flex items-center justify-start gap-3'>
                <img className='w-10 h-10 rounded-full object-cover' src="https://tse4.mm.bing.net/th/id/OIP.q0yQN9xXD5h0UwzX4G1HggHaE8?pid=Api&P=0&h=180" alt="captain image" />
                <h4 className='text-lg font-medium'>Tarun Patel</h4>
              </div>
            <div>  
              <h4 className='text-xl font-semibold'> <i className="ri-money-rupee-circle-line"></i>342</h4>
              <p className='text-sm text-gray-600'>Earned</p>
</div>

            </div>
            
            <div className='flex mt-8 p-3 rounded-xl bg-gray-100 justify-center gap-5 items-start'>
              <div className='text-center'>
                <i className="text-3xl mb-2 font-thin ri-timer-2-line"></i>
                <h5 className='text-lg font-medium'>182</h5>
                <p className='text-sm text-gray-600'>Hours</p>
              </div>
              <div  className='text-center'>
                <i className="text-3xl mb-2 font-thin ri-dashboard-2-line"></i>
                   <h5 className='text-lg font-medium'>182</h5>
                <p className='text-sm text-gray-600'>Hours</p>
                </div>
              <div  className='text-center'>
                <i className="text-3xl mb-2 font-thin ri-sticky-note-line"></i>
                  <h5 className='text-lg font-medium'>182</h5>
                <p className='text-sm text-gray-600'>Hours</p>
                </div>
            </div></div>
  )
}

export default CaptainDetail