import React from 'react'

const Loading = () => {
  return (
    <div className='flex flex-col h-screen justify-center items-center login'>
      <img src='https://cdn.pixabay.com/animation/2023/06/02/22/11/22-11-28-528_512.gif' alt='' />
      <h2 className='text-4xl font-extrabold mt-8 text-[#00704A]'>Please Wait...</h2>
    </div>
  )
}

export default Loading