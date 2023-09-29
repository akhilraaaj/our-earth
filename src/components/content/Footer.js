import React from 'react';
import './Footer.css';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const ActionButton = styled.button`
    padding: 8px 20px;
    border-radius: 2px;
    outline: none;
    border: none;
    font-size: 18px;
    margin-top: 15px;
    margin-bottom: 16px;
    border: 1px solid #fff;
    justify-content: center;

  &:hover {
    background-color: #618264;
  }
`;

const FooterHeading = styled.div`
  font-size:  20px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #ffffff;
  @media screen and (max-width: 960px) {
    justify-content: center;
    text-align: center;
}
`;


function Footer() {
  return (
    <div className='footer-container' name="footer">
      <section className='footer-subscription'>
        <p className='footer-subscription-heading'>
          Join the cause to promote awareness and receive updates
        </p>
        <p className='footer-subscription-text'>
          You can unsubscribe at any time.
        </p>
        <div className='input-areas'>
        <form method='POST' action='https://getform.io/f/89af6557-a362-47c9-b001-0ab555e8b471' className='flex flex-col max-w-[600px] w-full'>
             <input className='bg-[#CEDEBD] border-bg-[#00704A] p-2' type="text" placeholder='Name' name='name' />
            <input className='my-4 p-2 bg-[#CEDEBD]' type="email" placeholder='Email' name='email' />
            <textarea className='bg-[#CEDEBD] p-2' name="message" rows="2" placeholder='Message'></textarea>
            <ActionButton>Subscribe</ActionButton>
          </form>
        </div>
      </section>
      <div class='footer-links'>
        <div className='footer-link-wrapper'>
            <FooterHeading>Let us all come together and make a change to save our planet</FooterHeading>
        </div>
      </div>
      <section class='social-media'>
        <div class='social-media-wrap'>
          <div class='footer-logo'>
            <Link to='/' className='social-logo'>
            <span>OUR-EARTH</span><i className="fas fa-globe-americas"></i>
            </Link>
          </div>
          <small class='website-rights'>Copyright © 2023</small>
          <div class='social-icons'>
            <Link
              class='social-icon-link facebook'
              to='https://www.facebook.com/'
              target='_blank'
              aria-label='Facebook'
            >
              <i class='fab fa-facebook-f' />
            </Link>
            <Link
              class='social-icon-link instagram'
              to='https://www.instagram.com/'
              target='_blank'
              aria-label='Instagram'
            >
              <i class='fab fa-instagram' />
            </Link>
            <Link
              class='social-icon-link youtube'
              to='https://www.youtube.com/'
              target='_blank'
              aria-label='Youtube'
            >
              <i class='fab fa-youtube' />
            </Link>
            <Link
              class='social-icon-link twitter'
              to='https://twitter.com/'
              target='_blank'
              aria-label='Twitter'
            >
              <i class='fab fa-twitter' />
            </Link>
            <Link
              class='social-icon-link twitter'
              to='https://www.linkedin.com/'
              target='_blank'
              aria-label='LinkedIn'
            >
              <i class='fab fa-linkedin' />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Footer;