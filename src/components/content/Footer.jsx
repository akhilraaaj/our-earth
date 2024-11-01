import React from 'react';
import { Link } from 'react-router-dom';

// bg-[#00704A]
function Footer({ bgColor }) {
  const currentYear = new Date().getFullYear();
  return (
    <div className={`flex flex-col items-center justify-center bg-[${bgColor}] py-2`} name="footer">
      <section className='text-center p-6'>
        <p className='text-white text-2xl font-extrabold mb-8'>
          Join the cause to promote awareness and receive updates
        </p>
        <p className='text-white md:text-xl text-lg'>
          You can unsubscribe at any time.
        </p>
        <div className='flex flex-col items-center justify-center p-8'>
          <form method='POST' action='https://getform.io/f/89af6557-a362-47c9-b001-0ab555e8b471' className='flex flex-col md:w-3/4 w-full'>
            <input className='bg-[#CEDEBD] border-bg-[#00704A] p-2 rounded-md' type="text" placeholder='Name' name='name' />
            <input className='my-4 p-2 bg-[#CEDEBD] rounded-md' type="email" placeholder='Email' name='email' />
            <textarea className='bg-[#CEDEBD] p-2 rounded-md' name="message" rows="2" placeholder='Message'></textarea>
            <button className='btn btn-success border border-green-200 bg-transparent text-white text-lg px-4 mt-6 w-full'>Subscribe</button>
          </form>
        </div>
      </section>
      <p className='md:text-xl text-lg font-bold mb-8 text-white text-center'>Let us all come together and make a change to save our planet</p>
      <section className='md:w-8/12 w-full px-4 mb-8 mt-6'>
        <div className='flex md:flex-row flex-col justify-between items-center w-full md:gap-32 gap-6'>
          <Link to='/' className='text-white justify-self-start cursor-pointer no-underline flex items-center '>
            <span className='text-2xl mr-2 md:font-extrabold font-bold'>OUR-EARTH</span><i className="fas fa-globe-americas text-2xl"></i>
          </Link>
          <small className='text-base md:font-bold font-medium text-white'>Copyright © { currentYear }</small>
        </div>
      </section>
    </div>
  );
}

export default Footer;