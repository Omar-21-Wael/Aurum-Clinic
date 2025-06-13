import React from 'react';
import { FaFacebookSquare,FaInstagram ,FaLinkedin ,FaWhatsappSquare  } from "react-icons/fa";
import footer from './Footer.module.css';

const Footer = () => {
    return ( <footer className={footer.box}>

<div className={footer.group}>    
        <img
className={footer.logo}
alt="logo"
src={"/logo.png"}
/>
    <div>
        
  <span>Quick Links</span>
        <ul>
        <li>Home</li>
            <li>About Us</li>  
            <li>Our Services</li>  
    <li>Book Appointment</li>  
        </ul>
    </div>


<div className={footer.textWrapper2}>
    <span>Specialties</span> 
            <ul>
               <li>Pediatrics</li>
                 <li>Dermatology</li>  
                       <li>Dentistry</li>  
             <li> Internal Medicine</li> 
                     <li>more..</li> 
            </ul>
</div>


 <div className={footer.textWrapper3}>
 <span>Contact Info</span>
    <ul>
<li>Address: Nasr City, Cairo</li> 
<li>Phone: +20 123 456 7890</li>  
<li>Email: info@aurumclinic.com</li>    
    </ul>
</div>
   <div className={footer.textWrapper4}>
    <span>Social</span>
    <ul>
        <li><FaFacebookSquare/>Facebook</li>
        <li><FaInstagram/>Instagram</li>
        <li><FaLinkedin/>LinkedIn</li>
        <li><FaWhatsappSquare/>WhatsApp</li>
    </ul>
</div>
</div>
<p className={footer.Wrapper}>
 © 2025 Aurum Clinic. All rights reserved.
</p>
</footer>
 );
}
 
export default Footer;