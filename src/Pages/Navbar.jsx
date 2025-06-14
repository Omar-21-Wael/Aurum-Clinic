import { NavLink } from 'react-router-dom';
import styles from './navstyle.module.css';
import React, { useState, useEffect } from 'react';
import { PiListBold  } from "react-icons/pi";

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <>
      
        {/* شكل الـ Navbar (SVG) */}
        {!isMobile ? (
          <>
          <div className={styles.navbarWrapper}>
            <svg
              className={styles.svgBackground}
              viewBox="0 15 1439 162"
              preserveAspectRatio="xMidYMid meet"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1438 0H-1.56707V60.5334L-1.56704 162C-25.3752 162 133.392 162 133.392 162C146.296 151.521 170.827 92.3105 200.372 87.9113C261.354 78.8313 1439 87.9113 1439 87.9113L1438 0Z"
                fill="#A4EFFB"
              />
            </svg>
            <img src= {process.env.PUBLIC_URL + "/logo.png"} alt="Logo" className={styles.logo} />

            {/* روابط التنقل */}
            <div className={styles.navLinks}>
              <NavLink
                to="/"
                style={({ isActive }) => ({
                  color: isActive ? '#2B2B2B' : '#FCFCFC',
                })}
                className={styles.navItem}
              >
                Home
              </NavLink>
              <NavLink
                to="/about"
                style={({ isActive }) => ({
                  color: isActive ? '#2B2B2B' : '#FCFCFC',
                })}
                className={styles.navItem}
              >
                About
              </NavLink>
              <NavLink
                to="/doctors"
                style={({ isActive }) => ({
                  color: isActive ? '#2B2B2B' : '#FCFCFC',
                })}
                className={styles.navItem}
              >
                Doctors
              </NavLink>
              <NavLink
                to="/services"
                style={({ isActive }) => ({
                  color: isActive ? '#2B2B2B' : '#FCFCFC',
                })}
                className={styles.navItem}
              >
                Services
              </NavLink>
            </div>
            <NavLink to="/contact" className={styles.contactUs}>
              <button className={styles.but}>Contact Us</button>
            </NavLink>  
            </div>
            </>
          ):(
              <div className={styles.mobileNavbar}>
      <svg width="113" height="85" viewBox="0 0 113 85" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0 -1.52588e-05H113V40L75.5 85H0V-1.52588e-05Z" fill="#A4EFFB"/>
</svg>
            <img src={process.env.PUBLIC_URL + "/logo.png"} alt="Logo" className={styles.logo} />
            <button className={styles.list}><PiListBold  size={22} color='white' />
</button>
    <NavLink to="/contact" className={styles.contactUs}>
              <button className={styles.but}>Contact Us</button>
            </NavLink> 
      </div>
          
        
        )}
    
    </>
  );
};

export default Navbar;
