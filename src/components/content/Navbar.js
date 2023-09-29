import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  return (
    <>
      <nav className='navbar'>
      <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
        <i className="fas fa-globe-americas"></i>
          </Link>
        <div className='navbar-container'>
          
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <div className='spacer'>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='/Climate' className='nav-links' onClick={closeMobileMenu}>
                <h1 className='nav-h1'>Climate Change</h1>
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/Deforestation'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                <h1 className='nav-h1'>Plant Trees</h1>
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/Ocean'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                <h1 className='nav-h1'>Save The Ocean</h1>
              </Link>
            </li>
          </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;