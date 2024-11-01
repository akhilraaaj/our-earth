import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bars3BottomRightIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';

function Navbar({ user, email }) {
  let Links = [
    { name: "CLIMATE CHANGE", link: "/home/climate" },
    { name: "PLANT TREES", link: "/home/deforestation" },
    { name: "SAVE THE OCEAN", link: "/home/ocean" },
    { name: "BLOG", link: "/home/blog" }
  ];

  const handleSignOut = () => {
    signOut(auth)
      .then(() => console.log("Sign Out"))
      .catch((error) => console.log(error));
  };

  const [open, setOpen] = useState(false);

  const handleToggle = () => {
      setOpen(!open);
  };

  const firstLetter = email ? email.charAt(0).toUpperCase() : '';

  return (
    <div className='px-4'>
    <div className='fixed inset-x-0 top-0 z-30 mx-auto max-w-6xl md:w-[98%] w-full border border-gray-100 bg-white/80 py-2 shadow backdrop-blur-lg md:top-6 md:rounded-3xl'>
      <div className='md:flex items-center justify-between px-6'>
        <div className='flex justify-between items-center'>
          <Link to='/home' className='font-extrabold text-2xl cursor-pointer text-[#2C7865] flex items-center md:gap-2'>
            <i className="fas fa-globe-americas"></i>
            <span className="md:inline ml-2 md:ml-0 md:mr-0 mr-2">Our </span>
            <span>Earth</span>
          </Link>
          <div className='md:hidden flex justify-end w-full'>
            <div onClick={handleToggle} className='block cursor-pointer w-7 h-7'>
              {open ? <XMarkIcon /> : <Bars3BottomRightIcon />}
            </div>
          </div>
        </div>
        <ul className={`md:flex md:items-center md:pb-0 pb-12 md:static md:z-auto w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'block' : 'hidden'}`}>
          {Links.map((link, index) => (
            <li key={index} className='md:ml-8 md:my-0 my-7 font-semibold'>
              <Link to={link.link} className='text-gray-800 font-extrabold hover:text-[#2C7865] duration-500'>{link.name}</Link>
            </li>
          ))}
          <li className='block md:hidden md:ml-8 font-semibold'>
            <button  className='btn btn-success bg-[#2C7865] text-white px-3 py-1 rounded-xl duration-500'>Log Out</button>
          </li>
          <li className="dropdown dropdown-bottom dropdown-end hidden md:block">
            <div tabIndex={0} role="button">
              <div className="avatar online placeholder ml-4">
                <div className="rounded-full w-10 bg-[#2C7865] flex justify-center items-center p-4">
                  <span className="text-2xl font-bold text-white">{firstLetter}</span>
                </div>
              </div>
            </div>
            <ul tabIndex={0} className="dropdown-content z-[1] w-64 menu px-2 py-3 shadow bg-gray-100 mt-2 rounded-box hidden md:block">
              <li className='mb-4 font-bold text-[#2C7865]'>
                <Link to='/home/dashboard'><span className="">Welcome, {email}!</span></Link>
              </li> 
              <li className='flex justify-center items-end text-center'>
                <button onClick={handleSignOut} className='btn btn-sm btn-success'>
                  <span className='text-white font-bold'>Log Out</span>
                </button>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    </div>
  );
}

export default Navbar;
