import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
       <div className="footer-content">
        <div className="footer-content-left">
            <p>Tomato connects you with the best restaurants around you. Discover new flavors, enjoy fast and reliable delivery, and experience food ordering made simple and convenient.</p>
            <div className="footer-social-icons">
                <img src={assets.facebook_icon} alt='' />
                <img src={assets.twitter_icon} alt='' />
                <img src={assets.linkedin_icon} alt='' />
            </div>
        </div>
        <div className="footer-content-center">
            <h2>COMPANY</h2>
            <ul>
                <li>Home</li>
                <li>About us</li>
                <li>Delivery</li>
                <li>Privacy Policy</li>
            </ul>
        </div>
         <div className="footer-content-right">
              <h2>GET IN TOUCH</h2>
              <ul>
                <li>+91 8882892501</li>
                <li>contact@Tomato.com</li>
              </ul>
        </div>
     </div>
     <hr />
     <p className='footer-copyright'>By continuing past this page, you agree to our Terms of Service, Cookie Policy, Privacy Policy and Content Policies. All trademarks are properties of their respective owners
2026 © Tomato™ Ltd. All rights reserved.</p>
    </div>
  )
}

export default Footer