import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Loader2 } from "lucide-react";
import toast from 'react-hot-toast';

const ACCESS_KEY = "5a1db5fd-26ae-4798-b74f-328c31a45a63";

function Footer({ bgColor }) {
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true);
    const toastId = toast.loading('Sending your message...');

    try {
      const formData = new FormData(event.target);
      formData.append("access_key", ACCESS_KEY);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        toast.success("Thank you for subscribing!", {
          id: toastId,
          duration: 5000
        });
        event.target.reset();
      } else {
        throw new Error(data.message || 'Form submission failed');
      }
    } catch (error) {
      console.error('Submission error:', error);
      toast.error(
        error.message === 'Invalid access key format. Must be a valid UUID.' 
          ? 'System configuration error. Please contact support.'
          : 'Failed to submit form. Please try again later.',
        { id: toastId }
      );
    } finally {
      setIsLoading(false);
    }
  };

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
          <form onSubmit={onSubmit} className='flex flex-col md:w-3/4 w-full'>
            <input 
              className='bg-white/90 border-bg-[#00704A] p-2 rounded-md'
              type="text"
              placeholder='Name'
              name='name'
              required
              disabled={isLoading}
            />
            <input 
              className='my-4 p-2 bg-white/90 rounded-md'
              type="email"
              placeholder='Email'
              name='email'
              required
              disabled={isLoading}
            />
            <textarea 
              className='bg-white/90 p-2 rounded-md'
              name="message"
              rows="2"
              placeholder='Message'
              disabled={isLoading}
            />
            <button 
              type='submit'
              disabled={isLoading}
              className='border border-green-200 bg-transparent text-white font-extrabold tracking-widest text-lg px-4 py-3 rounded-lg mt-6 w-full flex items-center justify-center gap-2 hover:bg-white/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
            >
              {isLoading ? (
                <button className='flex items-center gap-4'>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Sending...
                </button>
              ) : 'Subscribe'}
            </button>
          </form>
        </div>
      </section>
      
      <p className='md:text-xl text-lg font-bold mb-8 text-white text-center'>
        Let us all come together and make a change to save our planet
      </p>
      
      <section className='md:w-8/12 w-full px-4 mb-8 mt-6'>
        <div className='flex md:flex-row flex-col justify-between items-center w-full md:gap-32 gap-6'>
          <Link to='/' className='text-white justify-self-start cursor-pointer no-underline flex items-center'>
            <span className='text-2xl mr-2 md:font-extrabold font-bold'>OUR-EARTH</span>
            <i className="fas fa-globe-americas text-2xl" />
          </Link>
          <small className='text-base md:font-bold font-medium text-white'>
            Copyright © {currentYear}
          </small>
        </div>
      </section>
    </div>
  );
}

export default Footer;