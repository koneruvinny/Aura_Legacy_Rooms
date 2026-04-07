import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Send, Globe, MessageCircle } from 'lucide-react';
import '../css/Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-grid">
          {/* Brand Column */}
          <div className="footer-col brand-col">
            <Link to="/" className="footer-logo">
              <div className="logo-icon-v">
                <span className="v-orange">v</span>
              </div>
              <span className="logo-text">olvo</span>
            </Link>
            <p className="footer-tagline">
              Redefining premium stays and co-living experiences. Find your perfect aura with us.
            </p>
            <div className="social-links">
              <a href="#" className="social-link"><Globe size={20} /></a>
              <a href="#" className="social-link"><MessageCircle size={20} /></a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="footer-col">
            <h4 className="footer-title">Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/listings">Explore Rooms</Link></li>
              <li><Link to="/about">About Aura</Link></li>
              <li><Link to="/contacts">Contact Us</Link></li>
            </ul>
          </div>

          {/* Support Column */}
          <div className="footer-col">
            <h4 className="footer-title">Support</h4>
            <ul className="footer-links">
              <li><a href="#">Help Center</a></li>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Cancellation Policy</a></li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="footer-col">
            <h4 className="footer-title">Contact Us</h4>
            <ul className="contact-info">
              <li>
                <MapPin size={18} className="contact-icon" />
                <span>123 Luxury Lane, Manali, India</span>
              </li>
              <li>
                <Phone size={18} className="contact-icon" />
                <span>+91 98765 43210</span>
              </li>
              <li>
                <Mail size={18} className="contact-icon" />
                <span>support@aura.com</span>
              </li>
            </ul>
            <div className="footer-newsletter">
              <h5>Stay Updated</h5>
              <div className="newsletter-small">
                <input type="email" placeholder="Email address" />
                <button className="newsletter-btn"><Send size={14} /></button>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} Aura Booking Platform. All rights reserved.</p>
          <div className="footer-bottom-links">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
